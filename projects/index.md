---
layout: default
title: Projects
---

<div class="mw8 center cf pa3">
  <h1 class="fs-blue ttu tracked">Recent Projects</h1>
  <div class="pl3">
  {% for post in site.categories.projects %}
    <h2 class="dib-ns mt0"><a class="light hover-neutral post-link" href="{{ post.url }}" data-link="{{ post.url }}">{{ post.title }}</a></h2>
    <div class="pl3 post-content"></div>
  {% endfor %}
  </div>
</div>
