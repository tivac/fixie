"use strict";

var p = require("postcss-selector-parser");

exports["ie11plus"] = {
    type : "selector",
    // _:-ms-fullscreen, :root <selector>
    fn   : (node) => p.root()
        .append([
            p.string({ value : "_:-ms-fullscreen" }),
            p.string({ value : `:root ${node.toString()}` })
        ])
};

exports["ie11"] = exports["ie11plus"];

exports["ie10plus"] = {
    type : "selector",
    tmpl : `/* IE 10+ Hack */ _:-ms-lang(x), <%- selector %>`
};

exports["ie11"] = exports["ie11plus"];

exports["ie9plus"] = {
    type : "media",
    tmpl : `/* IE 9+ Hack */
@media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
  <%- declarations %>
}`
};

exports["ie9"] = {
    type : "media",
    tmpl : `/* IE 9 Hack */
@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
    <%- declarations %>
}`
};

exports["ie8910"] = {
    type : "media",
    tmpl : `/* IE 8/9/10 Hack */
@media screen\\0 {
    <%- declarations %>
}`
};

exports["ie8"] = {
    type : "selector",
    tmpl : `/* IE 8 Hack */ html>/**/body <%- selector %>`
};

exports["ie7"] = {
    type : "selector",
    tmpl : `/* IE 7 Hack */ *+html <%- selector %>`
};

exports["ie67"] = {
    type : "media",
    tmpl : `/* IE 6/7 Hack */
@media screen\\9 {
    <%- declarations %>
}`
};

exports["ie6"] = {
    type : "selector",
    tmpl : `/* IE 6 Hack */ * html <%- selector %>`
};
