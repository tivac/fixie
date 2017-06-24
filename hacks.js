"use strict";

var postcss = require("postcss"),
    parser  = require("postcss-selector-parser");

function strip(rule, version, fn) {
    var transform = parser((selectors) =>
            selectors.walkPseudos((node) => {
                var name = node.value.slice(1);
                
                if(name !== version) {
                    return;
                }
                
                node.replaceWith(fn ? fn(node.nodes) : node.nodes);
            })
        );
    
    rule.selector = transform.process(rule.selector).result;
}

// Hacks are all sourced from http://stackoverflow.com/a/20541859/7847

// _:-ms-fullscreen, :root <selector>
exports.ie11 = (rule) => {
    strip(rule, "ie11", (node) =>
        parser.root().append([
            parser.string({ value : "_:-ms-fullscreen" }),
            parser.string({ value : `:root ${node.toString()}` })
        ])
    );

    return rule;
};

// _:-ms-lang(x), <selector>
exports.ie10plus = (rule) => {
    strip(rule, "ie10plus", (node) =>
        parser.root().append([
            parser.string({ value : "_:-ms-lang(x)" }),
            node
        ])
    );

    return rule;
};

// _:-ms-lang(x), <selector> { <prop>: <value>\9 }
exports.ie10 = (rule) => {
   strip(rule, "ie10", (node) =>
        parser.root().append([
            parser.string({ value : "_:-ms-lang(x)" }),
            node
        ])
    );

    rule.walkDecls((decl) => {
        decl.value += "\\9";
    });

    return rule;
};


// @media screen and (min-width:0\0) { <prop>: <value>\9 }
exports.ie910 = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen and (min-width:0\\0)"
        });

    strip(rule, "ie910");

    rule.walkDecls((decl) => {
        decl.value += "\\9";
    });

    media.append(rule);
    
    return media;
};

// @media screen and (min-width:0\0) and (min-resolution: +72dpi) { <declarations> }
exports.ie9plus = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen and (min-width:0\\0) and (min-resolution: +72dpi)"
        });

    strip(rule, "ie9plus");

    media.append(rule);
    
    return media;
};

// @media screen and (min-width:0\0) and (min-resolution: .001dpcm) { <decls> }
exports.ie9 = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen and (min-width:0\\0) and (min-resolution: .001dpcm)"
        });

    strip(rule, "ie9");

    media.append(rule);
    
    return media;
};

// @media screen\0 { <decls> }
exports.ie8910 = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "screen\\0"
        });

    strip(rule, "ie8910");

    media.append(rule);
    
    return media;
};

// @media \0screen { <decls> }
exports.ie8 = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "\\0screen"
        });

    strip(rule, "ie8");

    media.append(rule);
    
    return media;
};


// *+html <selector>
exports.ie7 = (rule) => {
    strip(rule, "ie7", (node) =>
        parser.root().append(
            parser.string({ value : `*+html ${node}` })
        )
    );
    
    return rule;
};

// @media @media \0screen\,screen\9 { { <decls> }
exports.ie678 = (rule) => {
    var media = postcss.atRule({
            name   : "media",
            params : "\\0screen\\,screen\\9"
        });

    strip(rule, "ie678");

    media.append(rule);
    
    return media;
};

// <selector> { *<prop>: <value> }
exports.ie67 = (rule) => {
    strip(rule, "ie67");

    rule.walkDecls((decl) => {
        decl.prop = `*${decl.prop}`;
    });

    return rule;
};

// <selector> { _<prop>: <value> }
exports.ie6 = (rule) => {
    strip(rule, "ie6");

    rule.walkDecls((decl) => {
        decl.prop = `_${decl.prop}`;
    });

    return rule;
};
