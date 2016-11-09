"use strict";

var postcss  = require("postcss"),
    parser = require("postcss-selector-parser");

function pseudo(version, selector, fn) {
    if(typeof version === "string") {
        version = new RegExp(version);
    }
    
    return parser((selectors) =>
        selectors.walkPseudos((node) => {
            var name = node.value.slice(1);
            
            if(name.search(version) === -1) {
                return;
            }
            
            node.replaceWith(fn ? fn(node.nodes) : node.nodes);
        })
    ).process(selector).result
}

// _:-ms-fullscreen, :root <selector>
exports["ie11plus"] = (rule) => {
    rule.selector = pseudo(/ie11|ie11plus/, rule.selector, (node) =>
        parser.root().append([
            parser.string({ value : "_:-ms-fullscreen" }),
            parser.string({ value : `:root ${node.toString()}` })
        ])
    );

    return rule;
};

exports["ie11"] = exports["ie11plus"];

// _:-ms-lang(x), <selector>
exports["ie10plus"] = (rule) => {
    rule.selector = pseudo(/ie10|ie10plus/, rule.selector, (node) =>
        parser.root().append([
            parser.string({ value : "_:-ms-lang(x)" }),
            node
        ])
    );

    return rule;
};


exports["ie10"] = exports["ie10plus"];

// exports["ie9plus"] = {
//     type : "media",
//     tmpl : `/* IE 9+ Hack */
// @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
//   <%- declarations %>
// }`
// };

exports["ie9plus"] = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen and (min-width:0\\0) and (min-resolution: +72dpi)"
        });

    rule.selector = pseudo("ie9plus", rule.selector);

    media.append(rule);
    
    return media;
};


// @media screen and (min-width:0\\0) and (min-resolution: .001dpcm) { <decls> }
exports["ie9"] = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen and (min-width:0\\0) and (min-resolution: .001dpcm)"
        });

    rule.selector = pseudo("ie9", rule.selector);

    media.append(rule);
    
    return media;
};

// exports["ie8910"] = {
//     type : "media",
//     tmpl : `/* IE 8/9/10 Hack */
// @media screen\\0 {
//     <%- declarations %>
// }`
// };

// @media screen\\0 { <decls> }
exports["ie8910"] = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen\\0"
        });

    rule.selector = pseudo("ie8910", rule.selector);

    media.append(rule);
    
    return media;
};

// exports["ie8"] = {
//     type : "selector",
//     tmpl : `/* IE 8 Hack */ html>/**/body <%- selector %>`
// };

// exports["ie7"] = {
//     type : "selector",
//     tmpl : `/* IE 7 Hack */ *+html <%- selector %>`
// };

// exports["ie67"] = {
//     type : "media",
//     tmpl : `/* IE 6/7 Hack */
// @media screen\\9 {
//     <%- declarations %>
// }`
// };

// exports["ie6"] = {
//     type : "selector",
//     tmpl : `/* IE 6 Hack */ * html <%- selector %>`
// };
