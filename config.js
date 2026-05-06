/**
 * 站点与简历数据：修改此处即可更新页面文案与简历内容。
 * resume.enabled 为 false 时隐藏整块简历并去掉导航中的「简历」链接。
 */
window.TechBlogConfig = {
    profile: {
        name: "你的名字",
        email: "you@example.com",
        phone: "+86 138-0000-0000",
        location: "上海"
    },
    resume: {
        enabled: true,
        pdfUrl: "",
        name: "",
        headline: "全栈工程师 · 5 年经验",
        summary: "擅长 Web 与工程化，注重可维护性与交付质量。以下为示例数据，可在 config.js 中替换为你的真实经历。",
        contact: {
            website: "https://github.com/yourname"
        },
        experience: [
            {
                company: "示例科技有限公司",
                role: "高级开发工程师",
                period: "2022 – 至今",
                location: "上海",
                year: "2024",
                tags: "backend,frontend",
                highlights: [
                    "负责核心业务后端与前端协作，推动 CI/CD 与代码规范落地",
                    "主导性能优化，使关键接口 P99 延迟下降约 40%"
                ]
            },
            {
                company: "某互联网公司",
                role: "开发工程师",
                period: "2019 – 2022",
                location: "杭州",
                year: "2021",
                tags: "frontend",
                highlights: [
                    "参与中后台系统搭建与组件库建设",
                    "与产品、设计协作完成多个迭代上线"
                ]
            }
        ],
        education: [
            {
                school: "某某大学",
                degree: "计算机科学与技术 · 本科",
                period: "2015 – 2019",
                extra: "主修课程：数据结构、操作系统、计算机网络",
                year: "2019",
                tags: "education"
            }
        ],
        skillGroups: [
            { title: "语言与框架", skills: ["JavaScript", "TypeScript", "Node.js", "React"] },
            { title: "工程与运维", skills: ["Git", "Docker", "Linux", "CI/CD"] }
        ],
        certificates: [
            { name: "软考中级-软件设计师", issuer: "人社部与工信部", year: "2020" },
            {
                name: "某在线课程认证",
                issuer: "示例平台",
                year: "2021",
                url: "https://example.com/certificate/sample"
            }
        ]
    }
};
