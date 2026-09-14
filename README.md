# 龙天彪的博客

个人技术博客:AI / Agent 学习记录与开源项目笔记。

- **线上地址:** https://123caiji.github.io/
- **技术栈:** Jekyll(kramdown)+ GitHub Pages,push 到 `main` 自动发布

## 怎么写一篇新文章

1. 在 `_posts/` 下新建 `YYYY-MM-DD-文章英文名.md`
2. 文件头加上 front matter:

```yaml
---
layout: post
title: "文章标题"
date: 2026-09-14
description: "一句话摘要(用于 SEO)"
---
```

3. 正文用 Markdown 写,push 即发布

## 本地预览(可选)

```bash
gem install bundler jekyll
jekyll serve
# 打开 http://localhost:4000/
```
