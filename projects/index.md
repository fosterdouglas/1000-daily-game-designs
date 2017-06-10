---
layout: default
title: Projects
---

<div class="mw8 center cf pa3">
  <h1 class="fs-blue ttu">Recent Projects</h1>
  <div class="pl3">
  {% for post in site.categories.projects %}
  <div class="post cf">
    <h2 class="mt0 mr3"><a class="light hover-neutral post-link" href="{{ post.url }}" data-link="{{ post.url }}" data-index="{{ forloop.index }}">{{ post.title }}</a></h2>
    <div class="pl3 measure-wide post-content"></div>
  </div>
  {% endfor %}
  </div>
</div>
