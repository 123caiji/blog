# 个人博客网页

一个精美的个人博客网页，使用纯 HTML/CSS/JavaScript 构建，支持 GitHub Pages 部署。

## 功能特点

- **响应式设计** - 完美适配桌面和移动设备
- **算法艺术背景** - 使用 p5.js 实现的粒子流动场动画
- **个人介绍** - 展示头像、姓名、简介和技能列表
- **简历时间线** - 展示工作经历和教育背景
- **项目展示** - 展示项目卡片，支持自定义图片
- **文件展示** - 支持上传和展示文件供下载
- **联系方式** - 社交媒体链接

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- p5.js (算法艺术背景)
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
├── index.html          # 主页面
├── art-background.js   # 算法艺术背景脚本
├── assets/
│   ├── projects/       # 项目图片目录
│   └── files/          # 下载文件目录
├── .gitignore          # Git 忽略文件
└── README.md           # 项目说明
```

## 自定义内容

### 修改个人信息

编辑 `index.html` 文件，修改以下内容：

- 第 836 行：`<h1 class="hero-title">你好，我是 <span>你的名字</span></h1>`
- 第 837 行：个人简介描述
- 第 733-736 行：技能列表

### 添加项目图片

将项目图片放入 `assets/projects/` 目录，命名为：
- `project1.jpg`
- `project2.jpg`
- `project3.jpg`

### 添加文件

将文件放入 `assets/files/` 目录，并在 `index.html` 的文件展示部分添加对应的链接。

### 修改社交链接

编辑 `index.html` 中的社交媒体链接：
- GitHub
- LinkedIn
- Twitter
- Email

## 设计风格

- **主题**: 深色奢华风格
- **主色调**: 深蓝色 (#1a1a2e)
- **点缀色**: 金色 (#c9a962)、珊瑚红 (#e94560)
- **字体**: Cormorant Garamond (标题)、Inter (正文)

## 许可证

MIT License