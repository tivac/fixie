"use strict";

var assert = require("assert"),

    strip = require("common-tags").stripIndent,

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    function test(css, expected) {
        return plugin.process(css).then((out) => assert.equal(out.css, expected));
    }
    
    describe(":ie11", function() {
        it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
            test(
                ":ie11(.fooga) { color: red; }",
                strip`
                _:-ms-fullscreen,:root .fooga {
                    color: red
                }`
            )
        );

        it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11(.fooga .wooga) { color: red; }",
                strip`
                _:-ms-fullscreen,:root .fooga .wooga {
                    color: red
                }`
            )
        );
    });

    describe(":ie10", function() {
        it("should transform :ie10(...) into an ie10 hack (single selector)", () =>
            test(
                ":ie10(.fooga) { color: red; }",
                strip`
                _:-ms-lang(x),.fooga {
                    color: red
                }`
            )
        );

        it("should transform :ie10(...) into an ie10 hack (multiple selectors)", () =>
            test(
                ":ie10(.fooga .wooga) { color: red; }",
                strip`
                _:-ms-lang(x),.fooga .wooga {
                    color: red
                }`
            )
        );
    });

    describe(":ie9plus", function() {
        it("should transform :ie9plus(...) into an ie9plus hack (single selector)", () =>
            test(
                ":ie9plus(.fooga) { color: red; }",
                strip`
                @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
                    .fooga {
                        color: red
                    }
                }`
            )
        );

        it("should transform :ie9plus(...) into an ie9plus hack (multiple selectors)", () =>
            test(
                ":ie9plus(.fooga .booga) { color: red; }",
                strip`
                @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
                    .fooga .booga {
                        color: red
                    }
                }`
            )
        );
    });

    describe(":ie9", function() {
        it("should transform :ie9(...) into an ie9 hack (single selector)", () =>
            test(
                ":ie9(.fooga) { color: red; }",
                strip`
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
                strip`
                @media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
                    .fooga .booga {
                        color: red
                    }
                }`
            )
        );
    });

    describe(":ie8910", function() {
        it("should transform :ie8910(...) into an ie8910 hack (single selector)", () =>
            test(
                ":ie8910(.fooga) { color: red; }",
                strip`
                @media screen\\0 {
                    .fooga {
                        color: red
                    }
                }`
            )
        );

        it("should transform :ie8910(...) into an ie8910 hack (multiple selectors)", () =>
            test(
                ":ie8910(.fooga .booga) { color: red; }",
                strip`
                @media screen\\0 {
                    .fooga .booga {
                        color: red
                    }
                }`
            )
        );
    });

     describe(":ie7", function() {
        it("should transform :ie7(...) into an ie7 hack (single selector)", () =>
            test(
                ":ie7(.fooga) { color: red; }",
                strip`
                *+html .fooga {
                    color: red
                }`
            )
        );

        it("should transform :ie7(...) into an ie7 hack (multiple selectors)", () =>
            test(
                ":ie7(.fooga .booga) { color: red; }",
                strip`
                *+html .fooga .booga {
                    color: red
                }`
            )
        );
    });

    describe(":ie678", function() {
        it("should transform :ie678(...) into an ie678 hack (single selector)", () =>
            test(
                ":ie678(.fooga) { color: red; }",
                strip`
                @media \\0screen\\,screen\\9 {
                    .fooga {
                        color: red
                    }
                }`
            )
        );

        it("should transform :ie678(...) into an ie678 hack (multiple selectors)", () =>
            test(
                ":ie678(.fooga .booga) { color: red; }",
                strip`
                @media \\0screen\\,screen\\9 {
                    .fooga .booga {
                        color: red
                    }
                }`
            )
        );
    });

    describe(":ie67", function() {
        it("should transform :ie67(...) into an ie67 hack (single selector)", () =>
            test(
                ":ie67(.fooga) { color: red; }",
                strip`
                .fooga {
                    *color: red
                }`
            )
        );

        it("should transform :ie67(...) into an ie67 hack (multiple selectors)", () =>
            test(
                ":ie67(.fooga .booga) { color: red; }",
                strip`
                .fooga .booga {
                    *color: red
                }`
            )
        );

        it("should transform :ie67(...) into an ie67 hack (multiple declarations)", () =>
            test(
                ":ie67(.fooga) { color: red; background: blue; }",
                strip`
                .fooga {
                    *color: red;
                    *background: blue
                }`
            )
        );
    });

    describe(":ie6", function() {
        it("should transform :ie6(...) into an ie6 hack (single selector)", () =>
            test(
                ":ie6(.fooga) { color: red; }",
                strip`
                .fooga {
                    _color: red
                }`
            )
        );

        it("should transform :ie6(...) into an ie6 hack (multiple selectors)", () =>
            test(
                ":ie6(.fooga .booga) { color: red; }",
                strip`
                .fooga .booga {
                    _color: red
                }`
            )
        );

        it("should transform :ie6(...) into an ie6 hack (multiple declarations)", () =>
            test(
                ":ie6(.fooga) { color: red; background: blue; }",
                strip`
                .fooga {
                    _color: red;
                    _background: blue
                }`
            )
        );
    });
});
