---
layout: default
title: 文章
---

<p class="page-intro">AI / Agent 学习记录与开源项目笔记。个人学习总结,难免有错,欢迎斧正。</p>

<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
