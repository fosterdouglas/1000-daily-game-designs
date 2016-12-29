---
layout: default
title: Projects
---

<div class="pa3">
  <h1 class="fs-blue ttu tracked">Recent Projects</h1>
  <div class="pl3">
  {% for post in site.categories.projects %}
    <h2 class="light">{{ post.title }}</h2>
    <!-- <p class="light">{{ post.description }}</p>
    {{ post.content }} -->
  {% endfor %}
  </div>
</div>
