"use strict";

var postcss = require("postcss"),
    parser  = require("postcss-selector-parser"),
    
    hacks = require("./hacks.js"),

    search = new RegExp(":(" + Object.keys(hacks).join(")|:(") + ")");

module.exports = postcss.plugin("postcss-fixie", () => (css, result) => {
    css.walkRules(search, (rule) => {
        var version = rule.selector.match(search)[0].substring(1);

        hacks[version](rule);
    });
});
