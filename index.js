"use strict";

var postcss = require("postcss"),
    parser  = require("postcss-selector-parser"),
    
    transform = parser((selectors) => selectors.walk(console.log.bind(console)));

module.exports = postcss.plugin("postcss-fixie", () => (css, result) => {
    css.walkRules((rule) => {
        console.log(rule);

        transform.process(rule.selector);
    });
});
