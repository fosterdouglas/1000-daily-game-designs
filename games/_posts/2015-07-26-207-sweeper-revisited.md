---
layout: post
title: 207 Sweeper Revisited
tags: game-mechanic-system, game-opinion
---
A use-case of Sweeper (from the previous post [#204](http://www.foster-douglas.com/games/204-sweeper/)), inspired by the mini-game from *Persona 4: Golden*.

![SweeperRevisted](/img/games/207_Sweeper_Revisited.jpg "SweeperRevisted")

The example above illustrates one of the most important aspects of this mini-game's design, which will be inspirational to the design of Sweeper.

In the current situation, the player has 3 card draws remaining, the bonus 2 which we earned from clearing the table completely the previous round. Since the boon cards available are average in desirability, the focus of this round immediately shifts from obtaining specific cards to instead clearing the table for the Sweep bonus.

The key decision comes down to picking which extension card to choose:

**Option A:** If the player chooses the left-most card, one other random card on the table will change, and the player will still have 3 card draws remaining, but 4 cards left to choose.  If the “Deal New Cards” card is the one that changes, it’s likely that it won’t change to something with the “1 More” extension on it, preventing the table from being cleared. 

**Option B:** If the player instead chooses to draw “Deal New Cards,” they’re left with 3 card draws remaining, and again 4 cards to choose.  However, the 4 cards are completely fresh, and one of them will likely have a “1 More” or better extension on it, allowing the player to easily clear the table.  This is not an ideal option if the board already contains a card that the player is interested in keeping.

Statistically speaking, option B is the wiser choice.  Although we don’t know the exact ratio of cards that contain “1 More” to cards that don’t, if we assume it’s 1:4, and option B gives us 4 completely new cards, we have a (statistically speaking) 100% chance of being able to clear the table.  It’s obviously not quite 100%, and I’m no statistician anyway, but we can say the odds are very favorable.

Option A is enticing though, because it allows the player to only change one random card (if they were interested in some of the other cards on the table), and if it isn’t the “Deal New Cards” that’s chosen (25% chance), then the player will be in a position to easily decide between securing desired cards or clearing the table.

All that analysis mumbo-jumbo aside, this is important to the design of the game because of the tension it creates in the player.  It’s giving the player decisions that are controversial, even when they are sometimes obvious decisions.  Without this dynamic, the game is reduced to a simple card-picking slog.

[ Today I Was Playing: ***Persona 4: Golden*** ]
{: .emphasis}

