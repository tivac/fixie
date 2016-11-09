"use strict";

var assert = require("assert"),

    postcss = require("postcss"),
    strip   = require("common-tags").stripIndent,

    plugin = require("../index.js"),
    
    nested = postcss([ require("postcss-nested"), plugin ]);

describe("postcss-fixie", function() {
    function test(css, expected, thing) {
        return (thing || plugin).process(css).then((out) => assert.equal(out.css, expected));
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie11(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                _:-ms-fullscreen,:root .fooga { color: blue; }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie10(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                _:-ms-lang(x),.fooga { color: blue; }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie9plus(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
                 .fooga { color: blue; } }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie9(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                @media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {
                 .fooga { color: blue; } }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie8910(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                @media screen\\0 {
                 .fooga { color: blue; } }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie7(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                *+html .fooga { color: blue; }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie678(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                @media \\0screen\\,screen\\9 {
                 .fooga { color: blue; } }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie67(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                .fooga { *color: blue; }`,
                nested
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

        it("should work with postcss-nested", () =>
            test(
                ".fooga { color: red; :ie6(&) { color: blue; } }",
                strip`
                .fooga { color: red; }
                .fooga { _color: blue; }`,
                nested
            )
        );
    });
});
