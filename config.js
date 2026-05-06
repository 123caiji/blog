// =============================================================================
// 个人博客：主要改这里即可。保存后刷新页面生效（GitHub Pages 推送后生效）。
// =============================================================================

window.TechBlogConfig = {
    // ----- 站点与首屏（对应 script.js 的 applySiteConfig）-----
    site: {
        // 浏览器标签标题 & 分享标题
        pageTitle: "我的博客",
        // 导航栏左侧 Logo 文案
        logoText: "我的博客",

        // SEO / Open Graph（上线后有利于搜索引擎与链接预览）
        metaDescription: "这里是网站简介，一两句话介绍你是谁、做什么方向。",
        ogDescription: "", // 留空则沿用 metaDescription

        // 首屏英文小标题（hero-kicker）
        heroKicker: "BUILD · SHARE · LEARN",
        // 打字机：竖线 | 分隔多句；也可用数组 typingLines 代替下面两行字符串
        typingFallback: "你好，访客",
        typingLines: ["你好，访客", "记录学习与工程实践", "开源与写作"],

        heroSubtitle: "在这里整理笔记、项目与阅读材料，方便自己也方便检索。",

        // 首屏状态行（status-dot 右侧整句）
        heroStatus: "写作中 | 欢迎交流",

        // 右侧「当前关注领域」列表（顺序即显示顺序）
        focusAreas: ["Web 与前端工程", "自动化与工作流", "阅读与写作"],

        // 右侧三个数字块：按顺序对应页面上的三个格子
        heroMetrics: [
            { value: "10+", label: "笔记与文章" },
            { value: "3", label: "开源仓库" },
            { value: "5+", label: "年经验" },
        ],

        // 页脚版权（{year} 会替换为当前年份）
        footerCopyright: "© {year} 我的博客 · 保留所有权利",
    },

    profile: {
        // 展示名（关于我标题）；留空则保留 index.html 里的默认字
        name: "博主昵称",
        avatarUrl: "",
        // 未设置 avatarUrl 时，填 GitHub 用户名可自动拉头像
        githubUser: "",

        githubUrl: "",
        linkedinUrl: "",
        twitterUrl: "",

        // 职位一行（class="position"）
        position: "软件工程师 | 博客作者",
        // 个人简介段落（替换整段 description）
        bio: "在这里写一段自我介绍：方向、兴趣、经历中的一两句话即可。上线前记得改成真实内容。",

        // 以下可选：填写后若 resume.contact 未写，会自动合并到简历页眉联系方式
        email: "",
        phone: "",
        location: "",
    },

    /**
     * 简历区块：由 components/resume.js 渲染。
     * - enabled: false 时整段隐藏，导航与侧栏「简历」入口一并隐藏。
     * - 每条经历/教育可设 year、tags，与侧栏「内容筛选」联动（tags 与筛选芯片 data-tag 对应，小写）。
     * - pdfUrl：可填仓库内相对路径如 docs/resume.pdf 或外链。
     */
    resume: {
        enabled: true,
        pdfUrl: "",
        headline: "全栈 / 平台方向工程师",
        summary:
            "擅长 Web 与自动化工具链，重视可维护性与文档；乐于开源协作与知识沉淀。以下内容可在 config.js 中按模块增删。",
        contact: {
            email: "",
            phone: "",
            location: "远程 / 上海",
        },
        experience: [
            {
                company: "示例科技有限公司",
                role: "高级软件工程师",
                period: "2022 — 至今",
                location: "上海",
                year: "2024",
                tags: "backend,ai",
                highlights: [
                    "负责核心业务后端与内部效能平台，推动 CI 与发布流程标准化。",
                    "主导一次关键服务重构，显著降低故障恢复时间。",
                ],
            },
            {
                company: "初创团队（示例）",
                role: "全栈开发",
                period: "2019 — 2022",
                location: "杭州",
                year: "2022",
                tags: "frontend,iot",
                highlights: ["从 0 到 1 搭建管理后台与数据看板。", "对接硬件网关与 MQTT 消息流。"],
            },
        ],
        education: [
            {
                school: "示例大学",
                degree: "计算机科学与技术 · 本科",
                period: "2015 — 2019",
                year: "2019",
                tags: "ai",
                extra: "主修方向：软件工程与分布式系统（可改）",
            },
        ],
        skillGroups: [
            { title: "语言与运行时", skills: ["JavaScript", "TypeScript", "Python", "Node.js"] },
            { title: "Web 与工程", skills: ["HTML/CSS", "REST API", "Git", "GitHub Actions"] },
            { title: "其他", skills: ["技术写作", "团队协作"] },
        ],
        certificates: [
            { name: "示例认证名称", issuer: "某机构", year: "2023", url: "" },
        ],
    },

    // 论文 DOI：HTML 里 data-paper-id 须与键名一致（paper1 / paper2 / paper3）
    papers: {
        paper1: {
            doiText: "",
            doiUrl: "",
        },
        paper2: {
            doiText: "",
            doiUrl: "",
        },
        paper3: {
            doiText: "",
            doiUrl: "",
        },
    },

    // 开源项目：键名 = HTML 里 data-repo-key；值为 GitHub 上 owner/repo
    repos: {
        "ai-image-generator": "",
        "blockchain-explorer": "",
        "smart-home-hub": "",
    },
};
