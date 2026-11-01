// 打包前同步：把项目根目录最新资源复制为 App 的「包内快照」。
// 这样 npm run build 打出的 exe 自带最新页面，其他电脑无需项目目录即可运行。
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..'); // 项目根目录
const APP = path.resolve(__dirname, '..');        // App 目录

const FILES = [
  'index.html',
  'icon-red.jpg',
  'promo-web.mp4', // 首页启动动画（开场视频，网页版）
  'Consumption_report.html',
  'Cloud Efficiency Saving_report.html',
  'Cloud and Kyndryl_report.html',
  'Cloud Cost Management_report.html',
  // 「文档」页签要加载的语义模型文档（与 index.html 中 docFiles 一一对应）
  'Consumption语义模型文档.md',
  'Cloud Efficiency Saving语义模型文档.md',
  'Cloud & kyndryl Spend语义模型文档.md',
  'Cloud Cost Management Introduction语义模型文档.md'
];
const LIB_FILES = ['marked.min.js', 'chart.umd.min.js'];

let copied = 0;
for (const f of FILES) {
  const src = path.join(ROOT, f);
  if (!fs.existsSync(src)) { console.warn(`⚠ 跳过（项目根无此文件）: ${f}`); continue; }
  fs.copyFileSync(src, path.join(APP, f));
  copied++;
}

fs.mkdirSync(path.join(APP, 'lib'), { recursive: true });
for (const f of LIB_FILES) {
  const src = path.join(ROOT, 'lib', f);
  if (!fs.existsSync(src)) { console.warn(`⚠ 跳过（项目根无此文件）: lib/${f}`); continue; }
  fs.copyFileSync(src, path.join(APP, 'lib', f));
  copied++;
}

console.log(`✅ 已同步 ${copied} 个资源到包内快照（来源: ${ROOT}）`);
