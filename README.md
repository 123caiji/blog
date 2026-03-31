# 个人技术博客（未来科技风）

一个可直接部署到 **GitHub Pages** 的静态个人技术博客页面：深色主题、动态背景、滚动渐入、霓虹渐变描边、移动端导航、以及可配置的交互组件（首屏打字机、粒子连线、GitHub Star/Fork 徽标与设置面板）。

## 技术栈

- HTML / CSS / JavaScript（原生，无构建工具）
- GitHub Pages 静态托管

## 仓库文件说明

### 页面入口

- `index.html`
  - 页面骨架与内容结构（个人简介、论文发表、开源项目、文档资料、页脚）
  - 载入顺序：
    - `config.js`（配置真实信息）
    - `components/settings.js`（设置面板与本地持久化）
    - `components/typing.js`（首屏打字机效果）
    - `components/particles.js`（粒子连线效果）
    - `components/github.js`（头像/社交/DOI/Star-Fork 拉取与填充）
    - `script.js`（移动端导航、滚动渐入、平滑滚动、倾斜交互等总控制）

### 配置文件

- `config.js`
  - 只需要在这里填写“真实信息”，页面会自动填充：
    - 个人信息：`profile.name / avatarUrl / githubUser / githubUrl / linkedinUrl / twitterUrl`
    - 论文 DOI：`papers.paper1~paper3` 的 `doiText / doiUrl`
    - 项目仓库：`repos` 中的 `owner/repo`（用于获取 Star/Fork）

> 说明：你目前页面里的项目/论文卡片分别通过 `data-repo-key` / `data-paper-id` 对应到 `config.js`。

### 样式

- `style.css`
  - 未来科技风视觉实现：
    - 深色主题、动态网格背景 + 噪声纹理
    - 霓虹渐变描边（卡片边框层）
    - 响应式（移动端菜单、排版自适应）
    - 动态效果开关所需的类（如 `body.reduce-motion`、`body.neon-high`）
  - DOI、Star/Fork 徽标、设置面板、打字机光标、粒子画布等的样式都在这里。

### 运行逻辑（总控制）

- `script.js`
  - 接入设置系统并与组件联动：
    - 设置面板变更：触发滚动渐入、以及组件是否运行的刷新
  - 交互功能：
    - 移动端导航：汉堡菜单打开/关闭与点击外部收起
    - 平滑滚动（尊重“减少动态”设置）
    - 滚动渐入（`fade-in` → `visible`）
    - 桌面端卡片轻量 3D 倾斜跟随（同样受“减少动态”控制）

## 组件（多文件，可按需替换/扩展）

- `components/settings.js`
  - 设置面板 UI + `localStorage` 持久化
  - 控制项：
    - 动态背景、首屏打字机、粒子连线
    - 减少动态（节能/舒适）
    - GitHub 指标（Star/Fork）
    - 高亮霓虹模式
  - 触发事件：派发 `techblog:settings-change`，让其它组件同步更新。

- `components/typing.js`
  - 首屏打字机效果
  - 从 `#typing-text` 的 `data-typing-lines` 读取多行文本（逐字打出 + 删回循环）
  - 监听 `techblog:settings-change`：当“首屏打字机/减少动态”关闭时停止动画。

- `components/particles.js`
  - 粒子连线 Canvas 特效（性能优化：限制粒子数量 + 只在开启时启动）
  - 监听 `techblog:settings-change`：关闭则停止并清理画面。

- `components/github.js`
  - 根据 `config.js` 填充页面：
    - 头像：优先 `profile.avatarUrl`，否则用 `githubUser` 从 GitHub API 获取 `avatar_url`
    - 社交链接：根据 `data-social` 自动替换 href
    - 论文 DOI：根据 `data-paper-id` 从 `config.js` 填充 `DOI` 链接
    - 项目 Star/Fork：调用 GitHub REST API 拉取并显示在每个项目卡片的徽标处
  - 本地缓存：将仓库指标缓存到 `localStorage`（带 TTL），减少 API 调用。

## 文档资料

- `docs/`
  - 目前包含若干 Markdown 文档示例（如论文/资料条目对应的 md 文件）。
  - `index.html` 里的“文档资料”链接使用相对路径指向这些 md。

## 部署到 GitHub Pages

1. 确保你的仓库以静态方式托管（例如 Pages 指向 `root` 或 `gh-pages`）。
2. 将本仓库所有文件直接提交到仓库。
3. 在 GitHub Pages 的设置中选择合适的源分支（常见是 `gh-pages` 或 `main` 的静态根）。

> 由于所有资源都通过相对路径引用（`style.css / script.js / components/*.js / docs/...`），不需要额外构建流程。

## 使用提示

- 想替换成真实信息：只改 `config.js` 即可。
- 如果你的浏览器/网络环境限制 GitHub API：
  - `Star/Fork` 和 GitHub 头像可能不会显示（页面仍可正常工作）。
- 若想获得更舒适体验：打开设置里的“减少动态”。

