你是一位精通数据工程（Data Engineering）和现代前端开发（Full-Stack Frontend Developer）的专家。
请帮我使用 React + Tailwind CSS + Lucide React（图标库）+ Framer Motion（动画库）开发一个响应式、高科技感且专业的数据平台端到端架构拓扑图（Data Architecture Topology Dashboard）网页。

### 1. 业务场景与整体架构
展示一个企业级 FinOps & 数据平台的全链路数据流拓扑图，分为 4 个主要阶段（从左到右）：

1. Data Sources (数据源层):
   - REST API (Cloud Billing / Cost API)
   - SharePoint (Excel / CSV / Mappings)
   - Azure Blob Storage (Raw Files / Logs / Billing Drops)

2. Ingestion (数据集成与 Lakehouse 管道层 - Databricks Native):
   - Databricks Auto Loader (Cloud Files API / Event Grid Trigger)
   - Databricks Workflows / Delta Live Tables (DLT) & Jobs
   - 核心能力标记：Batch & Streaming Ingestion, Schema Evolution, File Notification

3. Databricks Lakehouse (ETL 转换与建模层 - Medallion Architecture):
   - Bronze Layer: Raw Delta Lake (ODS / Append-only)
   - Silver Layer: Cleansed / Transformed (Fact & Dim Tables, Key Resolution)
   - Gold Layer: Curated Data Marts (Star Schema, Chargeback / Aggregations)

4. Serving & Analytics (展示与语义模型层 - Power BI):
   - Power BI Semantic Model (Import / DirectQuery Composite Model, DAX, RLS/OLS)
   - Power BI Reports & Dashboards (FinOps Executive KPI, Drill-throughs)

---

### 2. 视觉风格与 UI 规范
- 主题：暗黑科技风（Dark Mode，如 Tailwind 的 `bg-slate-900` / `bg-slate-950`），支持高亮发光效果（Glow Effect）。
- 色彩系统（用颜色区分层级）：
  - Data Sources: 蓝色调 (Blue - `#3B82F6`)
  - Ingestion: Databricks 品牌红色调（`#FF3621`），Stage 与节点（Auto Loader、Workflows / DLT）图标使用 Databricks 官方图标风格
  - Databricks Medallion: 琥珀/紫色调 (Amber to Purple - Bronze `#D97706`, Silver `#94A3B8`, Gold `#F59E0B`)
  - Power BI: Microsoft Fabric 品牌绿色调（`#117865`），Stage 与节点（Semantic Model、Reports & Dashboards）图标使用 Microsoft Fabric 官方图标风格
- 卡片样式：Glassmorphism（玻璃拟态/半透明）、圆角（`rounded-xl`）、微弱边框（`border border-slate-800`）。
- 动效要求：
  - 数据流动效果：卡片之间的连接线需要有脉冲/光点流动动画（Pulsing Flow / Animated SVG Paths），展示数据正在实时 Data Ingestion。
  - Hover 效果：当鼠标悬停在某个节点卡片时，卡片高亮放大，并突出显示其前置与后置的数据流走向。

---

### 3. 核心功能与交互要求

1. 架构流向主看板（Interactive Topology View）：
   - 使用 flex/grid 布局，优雅呈现从 1 -> 2 -> 3 -> 4 的水平/流式拓扑布局。
   - 每个节点卡片（Node Card）包含：图标、标题、短描述、核心技术标签（Pills / Badges）。
   - 节点之间使用流畅的带有箭头的 SVG 曲线/直线连接。

2. 侧边栏/弹窗详情面板（Node Detail Modal / Drawer）：
   - 点击任意节点（如 Gold Layer 或 Power BI Semantic Model）时，从右侧滑出详细面板。
   - 详情面板显示：
     - **业务功能 (Business Capability)**
     - **技术实现 (Tech Stack & Code Snippet)**：提供一段简短的相关伪代码或 SQL/DAX 示例（带语法高亮，例如 Gold 层展示 Star Schema SQL，Power BI 展示 RLS / DAX 表达式）。
     - **输入/输出数据流 (Inputs & Outputs)**

3. 顶栏控制（Header Controls）：
   - 标题：“FinOps & Data Lakehouse Architecture”
   - 状态指示器：“Pipeline Status: Healthy (Live Streaming)”
   - 模式切换按钮：支持“简略模式 (Compact)”与“架构模式 (Detailed)”切换。

---

### 4. 技术栈与工程代码要求
- 请将代码写在单文件或模块化的干净组件结构中（如 `App.tsx`，`components/Topology.tsx` 等）。
- 使用 Tailwind CSS 完成所有样式，不要引入额外的外部 CSS 文件。
- 使用 `lucide-react` 图标库（如 `Database`, `Cloud`, `Server`, `BarChart3`, `Layers`, `ArrowRight` 等）。
- 使用 `framer-motion` 处理卡片进入动画、Hover 缩放和侧边栏滑出。
- 确保完全响应式（Responsive Design），在 Desktop 和 Tablet 屏幕上拥有最佳视觉呈现。

请直接生成完整的、可运行的 TypeScript/React 代码！