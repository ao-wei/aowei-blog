CREATE TABLE IF NOT EXISTS fitness_activities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('distance', 'reps', 'time')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fitness_records (
  date TEXT PRIMARY KEY,
  values_json TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO fitness_activities (id, name, unit, kind, sort_order) VALUES
  ('running', '跑步', 'km', 'distance', 0),
  ('pushups', '俯卧撑', '次', 'reps', 1),
  ('squats', '深蹲', '次', 'reps', 2),
  ('pullups', '引体向上', '次', 'reps', 3),
  ('plank', '平板支撑', '秒', 'time', 4);

INSERT OR REPLACE INTO fitness_records (date, values_json, note) VALUES
  ('2026-05-29', '{"running":2,"pushups":24}', '');
