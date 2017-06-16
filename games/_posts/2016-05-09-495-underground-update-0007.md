---
layout: post
title: 495 Underground Update 0007
categories: adventure-game, strategy-game, turn-based-game, underground
---
I’ve designed the basics for the write up for the 5th tech test, **proximity encounters**.

---

#UNDERGROUND TECHNICAL TEST 05
##PROXIMITY ENCOUNTERS

All encounters in Underground have a certain proximity distance that triggers them. Encounters can result in peaceful resolution (neutral), collaboration (acquisition?), or hostility (conflict).

Certain people and creatures that the player will encounter are predisposed to collaboration, and others to hostility.  However, the players actions and choices can also have a significant sway on this, which will be addressed in future tech tests.

##WHY DO THIS TECH TEST?

The goal with this test is to move from the static interactions of the previous tech tests into a more dynamic setup. This is the first test that will rely (and iterate) directly on the core design of the game, even if only slightly.

We're also continuing to develop technical skills, learning how to create algorithms that give partially realistic movement to the encounters, and how those encounters react when they intersect with characters.

##WHAT DOES IT NEED TO DO?

- Black encounter dots move "autonomously" according to a simple but non-predictable algorithm
- Black dots have a 3 space radius awareness (BONUS, plus a 1 etra space radius "caution awareness")
- Black dot stops moving when it is encountered with, and enter encounter mode
- BONUS: Black dot and character can not move outside of the encounter zone once encounter mode is entered
- BONUS: Character dots can "pathfind" if the player clicks a hex that is not adjacent to their current position

##HOW WILL WE DO IT?

**Idea for the algorithm:**

BD = Black Encounter Dot

BD checks whether its radius is overlapping with a character.
(If it is, cancel additional movements and enter encounter mode)
Else,
BD chooses at random 1 of its X available directions to move in, excluding the direction that it last came from if any, and moves.
Loop

---

[ Today I Was Playing: ***Tropico 5*** ]
{: .emphasis}