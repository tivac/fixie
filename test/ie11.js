"use strict";

var assert = require("assert"),

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    describe(":ie11()", function() {
        function test(css, expected) {
            return plugin.process(css).then((out) => assert.equal(out.toString(), expected));
        }

        it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
            test(
                ":ie11(.fooga) { color: red; }",
                "_:-ms-fullscreen,:root .fooga { color: red; }"
            )
        );

        it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11(.fooga .wooga) { color: red; }",
                "_:-ms-fullscreen,:root .fooga .wooga { color: red; }"
            )
        );

        it("should transform :ie11 ... into an ie11 hack (single selector)", () =>
            test(
                ":ie11 .fooga { color: red; }",
                "_:-ms-fullscreen,:root  .fooga { color: red; }"
            )
        );
        
        it("should transform :ie11 ... into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11 .fooga .booga { color: red; }",
                "_:-ms-fullscreen,:root  .fooga .booga { color: red; }"
            )
        );
    });
});
