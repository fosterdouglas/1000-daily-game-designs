---
layout: post
title: 916 AI Strategy Memory
tags: game-algorithm, strategy-game
---
In *Middle Earth: Shadow of Mordor*, the enemies "remember and learn" what specific action abilities you used when approaching battle with them. If you vault over them too many times to dodge attacks, they’ll learn how to defend against it. If you always use fire abilities, they’re develop specific resistances to that.

What if this same system were applied to the NPC opponents in a strategy game?

In the strategy card game *Faeria*, the player and the computer traverse hex tiles to gain positional advantages and claim victory:

![aistrategy](/img/games/916_AI_Strategy_Memory.jpg "aistrategy")

How I imagine the logic works is some combination of the AI picking randomly from a subset of potential moves, of varying strategic significance. As levels get more difficult, the AI is given better cards, and like makes less non-ideal moves.

But, what if the AI could analyze the player’s past moves, both within the current level as well as across every level (depending on how meta the game wants to get with its "AI" character). So, if I tend to stick to the right hand side of the board, or if I always go for the bottom mana wells, or I always leave 2 characters behind to protect my main character… these are all variables that could be recognized and tracked.

The question then is, do you let the player know that the AI now knows this about you? In Middle-Earth: Shadow of Mordor they definitely let you know. But that’s an action game, not too much of a strategy game.

I’m sure I’m not the first person to think of this, and it’s probably stupidly complex from a programming standpoint to get the AI to successfully learn and then successfully implement the information it has. But, depending on the style of game, it could be an amazingly fruitful piece of tech to invest in.

[ Today I Was Playing: ***Faeria*** and ***Diablo III: Ultimate Evil Edition*** ]
{: .emphasis}
