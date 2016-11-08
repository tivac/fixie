"use strict";

var postcss = require("postcss"),
    parser  = require("postcss-selector-parser"),
    
    hacks = require("./hacks.js"),

    transform = parser((selectors) =>
        selectors.walkPseudos((node) => {
            var name = node.value.slice(1);
            
            if(!hacks[name] || hacks[name].type !== "selector") {
                return;
            }
            
            node.replaceWith(hacks[name].fn(node.nodes));
        })
    );

module.exports = postcss.plugin("postcss-fixie", () => (css, result) => {
    css.walkRules((rule) => {
        rule.selector = transform.process(rule.selector).result;
    });
});
