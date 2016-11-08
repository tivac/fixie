"use strict";

var assert = require("assert"),

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    describe("ie11()", function() {
        it("should transform ie1(...) into an ie11 hack", function() {
            plugin.process("ie11(.fooga) { color: red; }");
        });
    });
});
