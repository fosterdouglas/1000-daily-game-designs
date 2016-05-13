---
layout: post
title: 491 Underground Update 0005
tags: adventure-game, strategy-game, turn-based-game, underground
---
Kevin has been working hard on the 3rd tech test, the **cube hex grid**. The goal of this one is the systematically generate the hex grid using efficient reusable functions. We've been using this indispensable resource:

[http://www.redblobgames.com/grids/hexagons/#coordinates](http://www.redblobgames.com/grids/hexagons/#coordinates){:target="_blank"}

And some of the well-written code from it:

```
 function findNeighbors(grid, directions) {
    for (var i = 0; i < directions.length; i++) {
      var neighbor = grid.getHex(this.x + directions[i].x, this.y + directions[i].y, this.z + directions[i].z);
      if (neighbor != undefined) {
        this.neighbors.push(neighbor)
      }
    }
    console.log("It's a beautiful day in the neighborhood");
    console.log(this);
  }
```

We'll have future posts with more in depth explanation of code snippets like this.

![UndergroundUpdate0005](/img/games/492_Underground_Update_0005.png "UndergroundUpdate0005"){: .img-contain }

[ Today I Was Playing: ***nothing...*** ]
{: .emphasis}