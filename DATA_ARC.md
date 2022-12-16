## sitemap

```txt
  /
    link to raid
    link to loot

  /loot
    list all loot categories (array)
    show all possible loot (array)
    show which pokemon are in each category (array)

  /loot/[category]
    list all loot from this category (array)
    list all pokemon from this category (array)

  /raid
    pokemon selector + type selector
    list all raid pokemon
    link to /[pokemon]
    sort/filter by loot category
    sort/filter by stat
    sort/filter by common dmg type
    sort/filter by taunt threat

  /raid/[pokemon]
    pokemon name (enum)
    game version (enum)
    taunt threat (enum)
    common dmg type (enum)
    ability (enum)
    def / sp. def (number / number)
    moves (array)
    loot (array)
    loot category (enum)

  /raid/[pokemon]/[type]

    all from /[pokemon]
    type damage relations

```
