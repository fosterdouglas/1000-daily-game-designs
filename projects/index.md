---
layout: default
title: Projects
---

<div class="pa3">
  <h1 class="fs-blue ttu tracked">Recent Projects</h1>
  <div class="pl3">
  {% for post in site.categories.projects %}
  <div class="mb4">
    <h2 class="neutral mt0">{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    {{ post.content }}
  </div>
  {% endfor %}
  </div>
</div>
