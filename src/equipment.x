extends layout

block body
  main
    section.contents.max-width
      aside.t-lead
        include:markdown-it ../data/home/tagline.md
      include nav.pug
      article
        h1 Our Equipment
        include:markdown-it ../data/equipment/index.md
      //aside
      //  include:markdown-it ../data/home/notes/index.md