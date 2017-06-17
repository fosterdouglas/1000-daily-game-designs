---
layout: project
title:  Daily Game Designs
category: projects
---
On the first day of 2015, I began an epic quest to design and share one idea each day.  The ideas are focused around interactivity and games, but also branch out into UI/UX design, opinion pieces, and product design.

My goal is to do at least 1000. Lofty, I know!

All the posts I've done so far can be found over in the [Daily Game Designs](http://www.foster-douglas.com/games) archive section of this site.  Below are the posts that I've marked as my favorites:

{% for post in site.categories.games reversed %}
{% if post.favorite %}
<a href="{{ post.url }}">{{ post.title }}</a>
{% endif %}
{% endfor %}

<a href="/archive/" target="_blank" class="db br3 bw1 bree tc neutral b ba b--neutral pv2 ph4">Game Posts Archive</a>