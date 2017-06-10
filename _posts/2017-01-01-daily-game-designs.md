---
layout: project
title:  Daily Game Designs
image: dailygamedesigns.jpg
category: projects
role: Designer and Writer
description: My quest to create and share one interactive design, experience, game, or concept each day for 1000 days.
---
On the first day of 2015, I began an epic quest to design and share one idea each day.  The ideas are focused around interactivity and games, but also branch out into UI/UX design, opinion pieces, and product design.

My goal is to do at least 1000.

The posts can be found over at the [Daily Game Designs](http://www.foster-douglas.com/games) section of this site.  Below are some of my favorite posts (so far!):

{% for post in site.categories.games reversed %}
{% if post.favorite %}
<a href="{{ post.url }}">{{ post.title }}</a>
{% endif %}
{% endfor %}
