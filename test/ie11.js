"use strict";

var assert = require("assert"),

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    describe(":ie11()", function() {
        it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
            plugin.process(
                ":ie11(.fooga) { color: red; }"
            )
            .then((result) => assert.equal(
                result.toString(),
                "_:-ms-fullscreen,:root .fooga { color: red; }"
            ))
        );

        it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
            plugin.process(
                ":ie11(.fooga .wooga) { color: red; }"
            )
            .then((result) => assert.equal(
                result.toString(),
                "_:-ms-fullscreen,:root .fooga .wooga { color: red; }"
            ))
        );
    });
});
