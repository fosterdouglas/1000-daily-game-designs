---
layout: default
title: Projects
---

<div class="mw8 center cf pa3">
  <h1 class="fs-blue ttu tracked">Recent Projects</h1>
  <div class="pl3">
  {% for post in site.categories.projects %}
  <div>
    <h2 class="mt0"><a class="light hover-neutral" href="{{ post.url }}">{{ post.title }}</a></h2>
    <!-- <p>{{ post.description }}</p>
    {{ post.content }} -->
  </div>
  {% endfor %}
  </div>
</div>
