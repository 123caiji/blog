// 只需要改这里：头像/社交/论文 DOI/项目仓库全都在本文件配置。
// 部署到 GitHub Pages 后，前端会读取本配置并自动填充页面。

window.TechBlogConfig = {
    profile: {
        // 个人信息
        name: "张三",
        // 头像：二选一即可
        avatarUrl: "",
        // 如果没有 avatarUrl，且填写 githubUser，则会自动从 GitHub 拉取头像
        githubUser: "",

        // 社交链接：填写真实地址后会自动替换页面里的 href
        githubUrl: "",
        linkedinUrl: "",
        twitterUrl: ""
    },
    papers: {
        paper1: {
            doiText: "",
            doiUrl: ""
        },
        paper2: {
            doiText: "",
            doiUrl: ""
        },
        paper3: {
            doiText: "",
            doiUrl: ""
        }
    },
    repos: {
        "ai-image-generator": "",
        "blockchain-explorer": "",
        "smart-home-hub": ""
    }
};

