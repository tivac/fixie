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

        it("should transform :ie11 ... into an ie11 hack (single selector)", () =>
            test(
                ":ie11 .fooga { color: red; }",
                strip`
                _:-ms-fullscreen,:root  .fooga {
                    color: red
                }`
            )
        );
        
        it("should transform :ie11 ... into an ie11 hack (multiple selectors)", () =>
            test(
                ":ie11 .fooga .booga { color: red; }",
                strip`
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

        it("should transform :ie10 ... into an ie10 hack (single selector)", () =>
            test(
                ":ie10 .fooga { color: red; }",
                strip`
                _:-ms-lang(x), .fooga {
                    color: red
                }`
            )
        );
        
        it("should transform :ie10 ... into an ie10 hack (multiple selectors)", () =>
            test(
                ":ie10 .fooga .booga { color: red; }",
                strip`
                _:-ms-lang(x), .fooga .booga {
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
        
        it("should transform :ie9plus ... into an ie9plus hack (single selector)", () =>
            test(
                ":ie9plus .fooga { color: red; }",
                strip`
                @media screen and (min-width:0\\0) and (min-resolution: +72dpi) {
                     .fooga {
                        color: red
                    }
                }`
            )
        );

        it("should transform :ie9plus ... into an ie9plus hack (multiple selectors)", () =>
            test(
                ":ie9plus .fooga .booga { color: red; }",
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
        
        it("should transform :ie9 ... into an ie9 hack (single selector)", () =>
            test(
                ":ie9 .fooga { color: red; }",
                strip`
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
        
        it("should transform :ie8910 ... into an ie8910 hack (single selector)", () =>
            test(
                ":ie8910 .fooga { color: red; }",
                strip`
                @media screen\\0 {
                     .fooga {
                        color: red
                    }
                }`
            )
        );

        it("should transform :ie8910 ... into an ie8910 hack (multiple selectors)", () =>
            test(
                ":ie8910 .fooga .booga { color: red; }",
                strip`
                @media screen\\0 {
                     .fooga .booga {
                        color: red
                    }
                }`
            )
        );
    });
});
