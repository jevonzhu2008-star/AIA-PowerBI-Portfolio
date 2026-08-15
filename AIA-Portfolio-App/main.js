// AIA PowerBI 作品集 —— Electron 主进程
// 页面指向「部署好的项目目录」（GitHub Pages 站点源 = 项目根目录），
// 因此更新项目根目录的 index.html 后，App 即时生效，无需重新打包。
const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// 项目根目录（含 index.html 及全部相对资源）。
// 默认指向本机项目；如移动项目位置，可用环境变量 AIA_PORTFOLIO_DIR 覆盖，无需重打包。
const PORTFOLIO_DIR =
  process.env.AIA_PORTFOLIO_DIR || 'D:\\OneDrive - IPowerBI\\文档 - AIA Group\\Project\\AIA 作品集';

const INDEX_FILE = path.join(PORTFOLIO_DIR, 'index.html');
const ICON_FILE = path.join(PORTFOLIO_DIR, 'icon-red.jpg');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    icon: fs.existsSync(ICON_FILE) ? ICON_FILE : undefined,
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

  win.loadFile(INDEX_FILE);
}

app.whenReady().then(() => {
  // 校验项目目录存在，否则给出明确提示而非白屏
  if (!fs.existsSync(INDEX_FILE)) {
    dialog.showErrorBox(
      '无法找到作品集页面',
      `未找到：\n${INDEX_FILE}\n\n请确认项目目录位置，或设置环境变量 AIA_PORTFOLIO_DIR 指向包含 index.html 的项目目录。`
    );
    app.quit();
    return;
  }

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
