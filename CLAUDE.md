# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

PowerBI 作品集展示页面，嵌入 AIA Group 的 Power BI 报告（Cloud & Cost Analytics 系列），支持标签切换浏览。

## 项目文件

- `pbi html.md` — 源数据文件，包含 Power BI 报告的 iframe 嵌入链接（title + src）
- `index.html` — 作品集展示页面（单文件，含全部样式、结构、交互脚本与主题切换）
- `promo.mp4` — 首页开场视频母版（1920×1080 / 50s / 45MB，未入库，仅本地留档）
- `promo-web.mp4` — 开场视频网页版（同分辨率，CRF26 压缩到约 14MB，**已入库**，页面实际加载的就是它）

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

## 启动动画（开场视频）

`index.html` 打开时先播放全屏开场视频 `promo-web.mp4`（1920×1080、约 50 秒），播完后淡出进入首页。本地与 GitHub Pages 加载同一个文件。

- 结构：`body` 顶部 `.intro-splash`（`#introSplash`）= `<video>` + 暗角 + 左下「开启声音」+ 右下「跳过开场 (Esc)」+ 底部进度条，跟随其后的一段 `<script>` 负责播放控制
- 跳过条件：`sessionStorage['aia-intro-seen'] === '1'`（本标签页看过/跳过过）或系统开启「减少动态效果」——在 `<head>` 脚本里提前判定并给 `<html>` 加 `.intro-skipped`，避免闪现
- 声音：浏览器禁止有声自动播放，故默认静音播放，用户点「开启声音」后取消静音（`aia-intro-seen` 不影响此按钮）
- 容错：`promo-web.mp4` 加载失败时先尝试 `video[data-fallback]` 的 COS 地址，仍失败则静默跳过，不影响首页
- 重播：hero 区的圆形按钮 `#introReplay`（`.theme-toggle.intro-replay`）会重置播放进度并重新播放
- 换视频：把新视频放到项目根，用 ffmpeg 压成网页版再替换 `promo-web.mp4`（建议 `ffmpeg -i 源.mp4 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart promo-web.mp4`）；`.gitignore` 里 `!promo-web.mp4` 已放行入库，push 后 Pages 自动部署
- App 打包：由 `AIA-Portfolio-App/scripts/sync-assets.js` 把 `promo-web.mp4` 复制进包内快照（`package.json` 的 `build.files` 含 `*.mp4`）
- 体积约束：GitHub Pages 单文件上限 100MB，仓库建议别放母版（45MB 的 `promo.mp4` 仍保持忽略）

