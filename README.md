postcss-fixie
=============

A simple PostCSS plugin to enable a set of easy-to-remember transforms for IE CSS Hacks. Goes especially well with `postcss-nested`.

The hacks used come from [this excellent Stack Overflow answer](http://stackoverflow.com/a/20541859/7847);

```css
.fooga {
    font-size: 1em;

    ie11(&) {
        font-size: 1.2em;
    }
}

// becomes
```css
.fooga {
    font-size: 1em;
}

/* IE 11+ hack */
_:-ms-fullscreen, :root .fooga {
    font-size: 1.2em;
}
```
