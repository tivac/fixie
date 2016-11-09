"use strict";

var assert = require("assert"),

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    function test(css, expected) {
        return plugin.process(css).then((out) => assert.equal(out.css, expected.trim()));
    }
    
    describe(":ie11", function() {
        it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
            test(
                ":ie11(.fooga) { color: red; }",
                `
_:-ms-fullscreen,:root .fooga {
    color: red
}`
            )
        );

        it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11(.fooga .wooga) { color: red; }",
                `
_:-ms-fullscreen,:root .fooga .wooga {
    color: red
}`
            )
        );

        it("should transform :ie11 ... into an ie11 hack (single selector)", () =>
            test(
                ":ie11 .fooga { color: red; }",
                `
_:-ms-fullscreen,:root  .fooga {
    color: red
}`
            )
        );
        
        it("should transform :ie11 ... into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11 .fooga .booga { color: red; }",
                `
_:-ms-fullscreen,:root  .fooga .booga {
    color: red
}`
            )
        );
    });

    describe(":ie10", function() {
        it("should transform :ie10(...) into an ie10 hack (single selector)", () =>
            test(
                ":ie10(.fooga) { color: red; }",
                `
_:-ms-lang(x),.fooga {
    color: red
}`
            )
        );

        it("should transform :ie10(...) into an ie10 hack (multiple selectors)", () =>
            test(
                ":ie10(.fooga .wooga) { color: red; }",
                `
_:-ms-lang(x),.fooga .wooga {
    color: red
}`
            )
        );

        it("should transform :ie10 ... into an ie10 hack (single selector)", () =>
            test(
                ":ie10 .fooga { color: red; }",
                `
_:-ms-lang(x), .fooga {
    color: red
}`
            )
        );
        
        it("should transform :ie10 ... into an ie10 hack (multiple selectors)", () =>
            test(
                ":ie10 .fooga .booga { color: red; }",
                `
_:-ms-lang(x), .fooga .booga {
    color: red
}`
            )
        );
    });

    describe(":ie9", function() {
        it("should transform :ie9(...) into an ie9 hack (single selector)", () =>
            test(
                ":ie9(.fooga) { color: red; }",
                `
@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
    .fooga {
        color: red
    }
}`
            )
        );

        it("should transform :ie9(...) into an ie9 hack (multiple selectors)", () =>
            test(
                ":ie9(.fooga .booga) { color: red; }",
                `
@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
    .fooga .booga {
        color: red
    }
}`
            )
        );
        
        it("should transform :ie9 ... into an ie9 hack (single selector)", () =>
            test(
                ":ie9 .fooga { color: red; }",
                `
@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
     .fooga {
        color: red
    }
}`
            )
        );

        it("should transform :ie9 ... into an ie9 hack (multiple selectors)", () =>
            test(
                ":ie9 .fooga .booga { color: red; }",
                `
@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
     .fooga .booga {
        color: red
    }
}`
            )
        );
    });
});
