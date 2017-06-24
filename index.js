"use strict";

var postcss = require("postcss"),
    
    hacks = require("./hacks.js"),

    search = new RegExp(`:(${Object.keys(hacks).join(")|:(")})`);

module.exports = postcss.plugin("postcss-fixie", () => (css) => {
    css.walkRules(search, (rule) => {
        var version = rule.selector.match(search)[0].substring(1);

        rule.replaceWith(hacks[version](rule));
    });
});
