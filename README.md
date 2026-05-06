# 个人博客网页

一个精美的个人博客网页，使用纯 HTML/CSS/JavaScript 构建，支持 GitHub Pages 部署。

## 功能特点

- **响应式设计** - 完美适配桌面和移动设备
- **深色奢华主题** - 深蓝色背景 + 金色点缀
- **个人介绍** - 展示头像、姓名、简介和技能列表
- **简历时间线** - 展示工作经历和教育背景
- **项目展示** - 展示项目卡片，支持自定义图片
- **文件展示** - 支持上传和展示文件供下载
- **联系方式** - 社交媒体链接

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts

## 快速开始

### 本地预览

使用浏览器直接打开 `index.html` 文件即可预览。

### GitHub Pages 部署

1. 将项目推送到 GitHub 仓库
2. 进入仓库设置页面
3. 在 "Pages" 部分：
   - 选择 `main` 分支
   - 选择 `/root` 目录
   - 点击 "Save"
4. 等待几分钟后，访问 `https://<username>.github.io/<repo-name>`

## 目录结构

```
.
├── index.html          # 主页面（包含所有 HTML、CSS 和 JavaScript）
├── assets/
│   ├── projects/       # 项目图片目录
│   └── files/          # 下载文件目录
├── .gitignore          # Git 忽略文件
└── README.md           # 项目说明
```

## 自定义内容

### 修改个人信息

编辑 `index.html` 文件：

1. **姓名**：搜索 `你好，我是 <span>你的名字</span>` 修改为你的名字
2. **简介**：修改 `<p class="hero-description">` 中的内容
3. **技能列表**：修改 `<ul>` 中的技能项
4. **简历内容**：修改 `<section id="resume">` 中的时间线内容
5. **项目信息**：修改 `<section id="projects">` 中的项目卡片
6. **社交链接**：修改 `<section id="contact">` 中的链接

### 添加图片

将图片放入对应的目录：
- 个人照片：`assets/profile.jpg`
- 关于页面图片：`assets/about.jpg`
- 项目图片：`assets/projects/project1.jpg`, `project2.jpg`, `project3.jpg`

如果图片不存在，页面会显示优雅的占位符。

### 添加下载文件

将文件放入 `assets/files/` 目录，并在 `index.html` 的文件展示部分添加对应的下载链接。

## 设计风格

- **主题**: 深色奢华风格
- **主色调**: 深蓝色 (#1a1a2e)
- **点缀色**: 金色 (#c9a962)、珊瑚红 (#e94560)
- **字体**: Cormorant Garamond (标题)、Inter (正文)

## 许可证

MIT License