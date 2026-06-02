---
title: "LaTeX 与 Markdown 语法格式速查"
description: "整理写学习笔记时最常用的 Markdown 排版和 LaTeX 数学公式语法。"
published: 2026-06-02
tags: ["Markdown", "LaTeX", "写作"]
draft: false
---

这份速查只收录写学习笔记时高频用到的语法。目标不是覆盖所有细节，而是在写文章、推导公式、整理代码和插图时能快速查到最常用的格式。

## Markdown 常用排版

| 需求 | 写法 | 说明 |
| --- | --- | --- |
| 一级标题 | `# 标题` | 一篇文章通常只用一次一级标题，正文内多用二级、三级标题。 |
| 二级标题 | `## 小节` | 用来划分主要内容块。 |
| 三级标题 | `### 子问题` | 用来拆分小节内部的具体问题。 |
| 加粗 | `**重点**` | 强调关键概念、结论、术语。 |
| 斜体 | `*补充说明*` | 适合轻量提示，不要滥用。 |
| 删除线 | `~~旧说法~~` | 适合保留修订痕迹。 |
| 无序列表 | `- 条目` | 用于并列观点、步骤清单。 |
| 有序列表 | `1. 第一步` | 用于有明确顺序的流程。 |
| 引用 | `> 原文或摘录` | 用于引用材料、论文表述、课程原话。 |
| 分割线 | `---` | 用于隔开两个关系较弱的部分。 |
| 换行 | 行尾加两个空格 | 大多数时候优先用空行分段，而不是强制换行。 |

## 链接、图片与代码

| 需求 | 写法 | 说明 |
| --- | --- | --- |
| 行内链接 | `[显示文字](https://example.com)` | 适合引用课程、论文、文档。 |
| 站内图片 | `![图片说明](/images/blog/demo.png)` | 本站图片放在 `site/public/images/...`，引用时从 `/images/...` 开始。 |
| 行内代码 | `` `loss.backward()` `` | 适合函数名、变量名、命令片段。 |
| 代码块 | 三个反引号加语言名 | 例如 `python`、`bash`、`cpp`，便于高亮。 |
| 表格 | `\| 列 A \| 列 B \|` | 适合速查、对比、整理符号含义。 |
| 任务列表 | `- [ ] 待完成` | 适合学习计划或复盘清单。 |
| 转义字符 | `\*` | 当符号本身不想被解析为 Markdown 语法时使用。 |

代码块常用格式：

````md
```python
def train_step(batch):
    loss = model(batch)
    loss.backward()
```
````

## LaTeX 公式边界

| 需求 | 写法 | 说明 |
| --- | --- | --- |
| 行内公式 | `$x_i + y_i$` | 嵌在句子里的短公式。 |
| 独立公式 | `$$L = -\sum_i y_i \log p_i$$` | 单独成段展示的重要公式。 |
| 多行公式 | `\begin{aligned} ... \end{aligned}` | 适合推导链条。 |
| 文本说明 | `\text{loss}` | 在公式里插入普通文字。 |
| 空格 | `\,`、`\quad` | 控制公式中的间距。 |

渲染示例：行内公式 $x_i + y_i$ 会自然嵌入句子中。

$$
L = -\sum_{i=1}^{C} y_i \log p_i
$$

$$
\begin{aligned}
z_i &= W x_i + b \\
p_i &= \mathrm{softmax}(z_i)
\end{aligned}
$$

## LaTeX 基础结构

| 需求 | 写法 | 例子 |
| --- | --- | --- |
| 上标 | `x^2` | `$x^2$` |
| 多字符上标 | `x^{t+1}` | `$x^{t+1}$` |
| 下标 | `x_i` | `$x_i$` |
| 多字符下标 | `x_{i,j}` | `$x_{i,j}$` |
| 分式 | `\frac{a}{b}` | `$\frac{1}{n}$` |
| 根号 | `\sqrt{x}` | `$\sqrt{d_k}$` |
| n 次根 | `\sqrt[n]{x}` | `$\sqrt[3]{x}$` |
| 省略号 | `\dots` | `$x_1, x_2, \dots, x_n$` |
| 向量 | `\mathbf{x}` | `$\mathbf{x}$` |
| 帽子符号 | `\hat{y}` | `$\hat{y}$` |
| 均值符号 | `\bar{x}` | `$\bar{x}$` |

## 常用希腊字母

| 字母 | 写法 | 常见用途 |
| --- | --- | --- |
| alpha | `\alpha` | 学习率、系数。 |
| beta | `\beta` | 动量、分布参数。 |
| gamma | `\gamma` | 折扣因子、归一化参数。 |
| delta | `\delta` | 增量、小扰动。 |
| epsilon | `\epsilon` | 极小量、平滑项。 |
| theta | `\theta` | 模型参数。 |
| lambda | `\lambda` | 正则化系数。 |
| mu | `\mu` | 均值。 |
| sigma | `\sigma` | 标准差、激活函数。 |
| pi | `\pi` | 圆周率、策略函数。 |
| phi | `\phi` | 特征映射、函数参数。 |
| omega | `\omega` | 频率、权重。 |

大写希腊字母常用写法：

| 字母 | 写法 | 常见用途 |
| --- | --- | --- |
| Delta | `\Delta` | 变化量。 |
| Sigma | `\Sigma` | 协方差矩阵、求和相关记号。 |
| Phi | `\Phi` | 映射或分布函数。 |
| Omega | `\Omega` | 复杂度下界、集合。 |

## 常用运算符与关系符

| 需求 | 写法 | 例子 |
| --- | --- | --- |
| 求和 | `\sum_{i=1}^{n}` | `$\sum_{i=1}^{n} x_i$` |
| 连乘 | `\prod_{i=1}^{n}` | `$\prod_{i=1}^{n} p_i$` |
| 极限 | `\lim_{n \to \infty}` | `$\lim_{n \to \infty} a_n$` |
| 最大值 | `\max_i x_i` | `$\max_i x_i$` |
| 最小值 | `\min_i x_i` | `$\min_i x_i$` |
| 参数最大化 | `\arg\max_\theta` | `$\arg\max_\theta p(y \mid x)$` |
| 约等于 | `\approx` | `$p \approx q$` |
| 不等于 | `\ne` | `$x \ne 0$` |
| 小于等于 | `\le` | `$x \le y$` |
| 大于等于 | `\ge` | `$x \ge y$` |
| 正比于 | `\propto` | `$p(x) \propto e^{-x}$` |
| 属于 | `\in` | `$x \in X$` |
| 不属于 | `\notin` | `$x \notin X$` |

## 集合、逻辑与概率

| 需求 | 写法 | 例子 |
| --- | --- | --- |
| 实数集 | `\mathbb{R}` | `$\mathbf{x} \in \mathbb{R}^d$` |
| 自然数集 | `\mathbb{N}` | `$n \in \mathbb{N}$` |
| 并集 | `A \cup B` | `$A \cup B$` |
| 交集 | `A \cap B` | `$A \cap B$` |
| 子集 | `A \subset B` | `$A \subset B$` |
| 空集 | `\emptyset` | `$A = \emptyset$` |
| 且 | `\land` | `$a \land b$` |
| 或 | `\lor` | `$a \lor b$` |
| 非 | `\neg` | `$\neg a$` |
| 条件概率 | `p(y \mid x)` | `$p(y \mid x)$` |
| 期望 | `\mathbb{E}[X]` | `$\mathbb{E}_{x \sim p(x)}[f(x)]$` |
| 方差 | `\mathrm{Var}(X)` | `$\mathrm{Var}(X)$` |

## 括号、矩阵与分段函数

| 需求 | 写法 | 说明 |
| --- | --- | --- |
| 自适应圆括号 | `\left( ... \right)` | 括号随内容高度自动变大。 |
| 自适应方括号 | `\left[ ... \right]` | 常用于向量、期望、区间。 |
| 自适应花括号 | `\left\{ ... \right\}` | 花括号需要转义。 |
| 向量 | `\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}` | `\\` 表示换行。 |
| 矩阵 | `\begin{bmatrix} a & b \\ c & d \end{bmatrix}` | `&` 表示列分隔。 |
| 分段函数 | `\begin{cases} ... \end{cases}` | 用于条件定义。 |

矩阵示例：

```latex
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
```

分段函数示例：

```latex
f(x)=
\begin{cases}
x, & x \ge 0 \\
0, & x < 0
\end{cases}
```

## 机器学习笔记高频公式模板

| 场景 | 写法 |
| --- | --- |
| 均方误差 | `L = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2` |
| 交叉熵 | `L = -\sum_{i=1}^{C} y_i \log p_i` |
| Softmax | `p_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}` |
| 注意力 | `\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V` |
| 梯度下降 | `\theta_{t+1} = \theta_t - \eta \nabla_\theta L(\theta_t)` |
| 条件概率分解 | `p(x_1,\dots,x_T)=\prod_{t=1}^{T}p(x_t \mid x_{<t})` |

写作时优先保证结构清楚：标题划分问题，表格整理速查，代码块放可复制内容，公式只写必要步骤。常用语法记熟之后，剩下的查文档即可。
