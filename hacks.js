"use strict";

var p = require("postcss-selector-parser");

function pseudo(version, selector, fn) {
    if(typeof version === "string") {
        version = new RegExp(version);
    }
    
    return p((selectors) =>
        selectors.walkPseudos((node) => {
            var name = node.value.slice(1);
            
            if(name.search(version) === -1) {
                return;
            }
            
            node.replaceWith(fn(node.nodes));
        })
    ).process(selector).result
}

// _:-ms-fullscreen, :root <selector>
exports["ie11plus"] = (rule) => {
    rule.selector = pseudo(/ie11|ie11plus/, rule.selector, (node) =>
        p.root().append([
            p.string({ value : "_:-ms-fullscreen" }),
            p.string({ value : `:root ${node.toString()}` })
        ])
    );
};

exports["ie11"] = exports["ie11plus"];

// _:-ms-lang(x), <selector>
exports["ie10plus"] = (node) => p.root().append([
    p.string({ value : "_:-ms-lang(x)" }),
    node.toString()
]);

exports["ie10"] = exports["ie10plus"];

// exports["ie9plus"] = {
//     type : "media",
//     tmpl : `/* IE 9+ Hack */
// @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
//   <%- declarations %>
// }`
// };

// @media screen and (min-width:0\\0) and (min-resolution: .001dpcm) { <decls> }
exports["ie9"] = (node) => p.root().append(
    p.string({ value : `@ie9 ${node.toString()}` })
);

// exports["ie8910"] = {
//     type : "media",
//     tmpl : `/* IE 8/9/10 Hack */
// @media screen\\0 {
//     <%- declarations %>
// }`
// };

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
