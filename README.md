postcss-fixie
=============

A simple PostCSS plugin to enable a set of easy-to-remember transforms for IE CSS Hacks. Goes especially well with `postcss-nested`.

The hacks used come from [this excellent Stack Overflow answer](http://stackoverflow.com/a/20541859/7847);

```css
.fooga {
    font-size: 1em;

    :ie11(&) {
        font-size: 1.2em;
    }
}

/* becomes */
.fooga {
    font-size: 1em;
}

/* IE 11+ hack */
_:-ms-fullscreen, :root .fooga {
    font-size: 1.2em;
}
```

## Available Hacks

- `:ie11(...)` targets IE 11
- `:ie10plus(...)` targets IE 10 & 11
- `:ie10(...)` targets IE 10
- `:ie910(...)` targets IE 9 & 10
- `:ie9plus(...)` targets IE 9, 10, & 11
- `:ie9(...)` targets IE 9
- `:ie8910(...)` targets IE 8, 9, & 10
- `:ie8(...)` targets IE 8
- `:ie7(...)` targets IE 7
- `:ie678(...)` targets IE 6, 7, & 8
- `:ie67(...)` targets IE 6 & 7
- `:ie6(...)` targets IE 6
