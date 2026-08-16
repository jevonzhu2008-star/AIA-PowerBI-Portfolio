// AIA PowerBI 作品集 —— Electron 主进程
// 页面来源（智能回退）：
//   1. 外部项目目录 —— 本机开发/演示优先使用，更新页面即时生效
//   2. 包内快照 —— 拷贝到其他电脑（找不到外部目录）时自动使用，保证可运行
// 可用环境变量 AIA_PORTFOLIO_DIR 显式指定外部项目目录。
const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const DEFAULT_PROJECT_DIR =
  'D:\\OneDrive - IPowerBI\\文档 - AIA Group\\Project\\AIA 作品集';
const PROJECT_DIR = process.env.AIA_PORTFOLIO_DIR || DEFAULT_PROJECT_DIR;

// 解析页面来源：外部项目目录存在则用之，否则回退包内快照
function resolvePage() {
  const externalIndex = path.join(PROJECT_DIR, 'index.html');
  if (fs.existsSync(externalIndex)) {
    return {
      index: externalIndex,
      icon: path.join(PROJECT_DIR, 'icon-red.jpg'),
      source: 'external'
    };
  }
  return {
    index: path.join(__dirname, 'index.html'),
    icon: path.join(__dirname, 'icon-red.jpg'),
    source: 'bundled'
  };
}

function createWindow() {
  const page = resolvePage();
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    icon: fs.existsSync(page.icon) ? page.icon : undefined,
    backgroundColor: '#0a0a12', // 与页面 --color-bg 一致，避免加载闪白
    autoHideMenuBar: true,      // 隐藏菜单栏，保持 App 观感（Alt 可临时唤出）
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // 首帧渲染完成后再显示，避免白屏闪烁
  win.once('ready-to-show', () => win.show());

  // 页面上打开新窗口的外链（Power BI、B 站等）一律交给系统浏览器
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadFile(page.index);
}

app.whenReady().then(() => {
  const page = resolvePage();
  if (!fs.existsSync(page.index)) {
    dialog.showErrorBox(
      '无法找到作品集页面',
      `未找到页面：\n${page.index}\n\n请确认项目目录位置，或重新打包 App。`
    );
    app.quit();
    return;
  }

  // 日志（开发/测试可见）：记录本次页面来源，便于诊断
  console.log(`[AIA Portfolio] 页面来源: ${page.source} → ${page.index}`);

  createWindow();

  // macOS 点击 Dock 图标时若无窗口则重建
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除 macOS 外，所有窗口关闭即退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
