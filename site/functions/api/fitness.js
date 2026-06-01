const DEFAULT_ACTIVITIES = [
  { id: 'running', name: '跑步', unit: 'km', kind: 'distance' },
  { id: 'pushups', name: '俯卧撑', unit: '次', kind: 'reps' },
  { id: 'squats', name: '深蹲', unit: '次', kind: 'reps' },
  { id: 'pullups', name: '引体向上', unit: '次', kind: 'reps' },
  { id: 'plank', name: '平板支撑', unit: '秒', kind: 'time' },
];

const VALID_KINDS = new Set(['distance', 'reps', 'time']);

export async function onRequest(context) {
  const authError = authorize(context.request, context.env);
  if (authError) {
    return authError;
  }

  if (!context.env.FITNESS_DB) {
    return json({ error: 'Cloudflare D1 绑定 FITNESS_DB 未配置。' }, 503);
  }

  if (context.request.method === 'GET') {
    return json(await readState(context.env.FITNESS_DB));
  }

  if (context.request.method === 'PUT') {
    let payload;
    try {
      payload = await context.request.json();
    } catch (error) {
      return json({ error: '请求体必须是有效 JSON。' }, 400);
    }

    const state = normalizeState(payload);
    await replaceState(context.env.FITNESS_DB, state);
    return json(state);
  }

  return json({ error: '只支持 GET 和 PUT。' }, 405, {
    Allow: 'GET, PUT',
  });
}

function authorize(request, env) {
  const expectedToken = env.FITNESS_API_TOKEN;
  if (!expectedToken) {
    return json({ error: 'Cloudflare 环境变量 FITNESS_API_TOKEN 未配置。' }, 503);
  }

  const authorization = request.headers.get('Authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';

  if (token !== expectedToken) {
    return json({ error: '同步密钥不正确。' }, 401);
  }

  return null;
}

async function readState(db) {
  const activitiesResult = await db
    .prepare(
      `SELECT id, name, unit, kind
       FROM fitness_activities
       ORDER BY sort_order ASC, id ASC`,
    )
    .all();
  const recordsResult = await db
    .prepare(
      `SELECT date, values_json, note
       FROM fitness_records
       ORDER BY date DESC`,
    )
    .all();

  const activities = activitiesResult.results.length > 0
    ? activitiesResult.results.map((activity) => ({
        id: activity.id,
        name: activity.name,
        unit: activity.unit,
        kind: activity.kind,
      }))
    : DEFAULT_ACTIVITIES;

  const records = recordsResult.results
    .map((record) => {
      try {
        const values = JSON.parse(record.values_json || '{}');
        const note = String(record.note || '').trim();
        return note ? { date: record.date, values, note } : { date: record.date, values };
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean);

  return normalizeState({ version: 1, activities, records });
}

async function replaceState(db, state) {
  const statements = [
    db.prepare('DELETE FROM fitness_records'),
    db.prepare('DELETE FROM fitness_activities'),
    ...state.activities.map((activity, index) =>
      db
        .prepare(
          `INSERT INTO fitness_activities (id, name, unit, kind, sort_order)
           VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(activity.id, activity.name, activity.unit, activity.kind, index),
    ),
    ...state.records.map((record) =>
      db
        .prepare(
          `INSERT INTO fitness_records (date, values_json, note)
           VALUES (?, ?, ?)`,
        )
        .bind(record.date, JSON.stringify(record.values), record.note || ''),
    ),
  ];

  await db.batch(statements);
}

function normalizeState(input) {
  const activityMap = new Map(DEFAULT_ACTIVITIES.map((activity) => [activity.id, activity]));

  if (Array.isArray(input?.activities)) {
    input.activities.forEach((activity) => {
      if (!activity?.id || !activity?.name || !activity?.unit) {
        return;
      }

      const id = String(activity.id).trim();
      if (!id) {
        return;
      }

      activityMap.set(id, {
        id,
        name: String(activity.name).trim(),
        unit: String(activity.unit).trim(),
        kind: normalizeKind(activity.kind, activity.unit),
      });
    });
  }

  const validActivityIds = new Set(activityMap.keys());
  const records = Array.isArray(input?.records)
    ? input.records
        .map((record) => normalizeRecord(record, validActivityIds))
        .filter(Boolean)
    : [];

  return {
    version: 1,
    activities: Array.from(activityMap.values()),
    records: dedupeRecords(records).sort((a, b) => b.date.localeCompare(a.date)),
  };
}

function normalizeRecord(record, validActivityIds) {
  if (!record?.date || !isDateKey(record.date)) {
    return null;
  }

  const values = {};
  Object.entries(record.values || {}).forEach(([id, rawValue]) => {
    if (!validActivityIds.has(id)) {
      return;
    }
    const value = sanitizeNumber(rawValue);
    if (value > 0) {
      values[id] = value;
    }
  });

  const note = String(record.note || '').trim();
  if (Object.keys(values).length === 0 && !note) {
    return null;
  }

  return note ? { date: record.date, values, note } : { date: record.date, values };
}

function dedupeRecords(records) {
  const recordsByDate = new Map();
  records.forEach((record) => recordsByDate.set(record.date, record));
  return Array.from(recordsByDate.values());
}

function normalizeKind(kind, unit) {
  if (VALID_KINDS.has(kind)) {
    return kind;
  }

  const normalizedUnit = String(unit || '').trim().toLowerCase();
  if (normalizedUnit === 'km' || normalizedUnit === '公里') {
    return 'distance';
  }
  if (normalizedUnit === '秒' || normalizedUnit === '分钟' || normalizedUnit === 'min') {
    return 'time';
  }
  return 'reps';
}

function sanitizeNumber(value) {
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number) || number <= 0) {
    return 0;
  }
  return Math.round(number * 100) / 100;
}

function isDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}
