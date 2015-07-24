---
layout: post
title: 115 Dynamic Difficulty
tags: game-system/mechanic
---
This system tracks players movements, decisions, and focus closely, and responds behind the scenes to accommodate game difficulty scaling.

An algorithm analyzes the best and worst strategic moves in a single moment, and compares it to the player’s own moment-to-moment strategy.  For example, in a turn based game, a single turn’s decisions might be used as input; in a first person shooter, the target that the player focuses on first might be used as input; in a puzzle game, the general strategy in a single round might be used as input.  The algorithm compares the player’s decision to the best possible choice, and stores the delta between the two.  It constantly monitors this variable, and will adjust the game based on that delta, aiming to constantly challenge the gamer’s skill and Flow without ever becoming too easy or too difficult.

(Based loosely on the book and theory of [Flow](http://en.wikipedia.org/wiki/Mihaly_Csikszentmihalyi) by Mihaly Csikszentmihalyi.)