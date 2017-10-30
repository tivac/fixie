"use strict";

var postcss = require("postcss"),
    dedent  = require("dedent"),

    plugin = require("../index.js");

function check(processor, css) {
    return processor.process(dedent(css))
        .then((out) => expect(out.css).toMatchSnapshot());
}

exports.simple = check.bind(null, plugin);
exports.nested = check.bind(null, postcss([ require("postcss-nested"), plugin ]));
