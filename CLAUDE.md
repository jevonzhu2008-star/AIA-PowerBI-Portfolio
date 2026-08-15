# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

PowerBI 作品集展示页面，嵌入 AIA Group 的 Power BI 报告（Cloud & Cost Analytics 系列），支持标签切换浏览。

## 项目文件

- `pbi html.md` — 源数据文件，包含 Power BI 报告的 iframe 嵌入链接（title + src）
- `index.html` — 作品集展示页面（单文件，含全部样式、结构、交互脚本与主题切换）

## 结构说明

页面采用两层标签导航：

```
主标签（4个）       子标签（每个主标签下2个）
📈 消费              📋 Profile / 📊 Report
🔄 云效率            📋 Profile / 📊 Report
💰 云&Kyndryl        📋 Profile / 📊 Report
⚙️ 成本管理          📋 Profile / 📊 Report
```

共 4 个主标签 × 2 个子标签 = 8 个 Power BI 嵌入作品。

## 修改指引

1. **新增/修改作品**：在 `pbi html.md` 中更新 iframe 链接，然后同步到 `index.html` 中对应的 `src` 属性
2. **添加新主标签**：在 HTML 的 `main-tabs` 中添加按钮，在 `<main class="content">` 中添加对应的 `main-panel` section（含 `div.sub-tabs-bar` + 两个 `div.sub-panel`），并在 JS 中无需额外改动（自动根据 `data-main` 属性匹配）
3. **修改样式**：所有样式在 `<style>` 中，深色主题（`#0f0f1a` 背景），主标签使用 `#e94560` 红色渐变，Profile 标签为蓝色（`#4facfe`），Report 标签为橙色（`#f4a64a`）
4. **子标签逻辑**：JS 通过 `btn.closest('.main-panel')` 确定子标签的作用域，同一主面板内的子标签互不干扰
5. **主题切换**：支持浅色/深色 UI。颜色通过 `:root` 中的 CSS 变量（含 `--overlay-*`、`--hero-gradient` 等令牌）控制，浅色主题在 `html[data-theme="light"]` 块中覆盖令牌。切换按钮位于 hero 区（`.theme-toggle`），用户选择存于 `localStorage` 键 `aia-portfolio-theme`，默认跟随系统偏好。改配色时优先改令牌，避免硬编码颜色
