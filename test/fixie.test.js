"use strict";

var postcss = require("postcss"),
    dedent  = require("dedent"),

    plugin = require("../index.js");

describe("postcss-fixie", function() {
    var processors = {
            simple : plugin,
            nested : postcss([ require("postcss-nested"), plugin ])
        };

    function test(css, processor) {
        return processor.process(dedent(css)).then((out) => expect(out.css).toMatchSnapshot());
    }

    function simple(css) {
        return test(css, processors.simple);
    }

    function nested(css) {
        return test(css, processors.nested);
    }
    
    describe(":ie11", function() {
        it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
            simple(`
                :ie11(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
            simple(`
                :ie11(.fooga .wooga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie11(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie10plus", function() {
        it("should transform :ie10plus(...) into an ie10plus hack (single selector)", () =>
            simple(`
                :ie10plus(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie10plus(...) into an ie10plus hack (multiple selectors)", () =>
            simple(`
                :ie10plus(.fooga .wooga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie10plus(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie10", function() {
        it("should transform :ie10(...) into an ie10 hack (single selector)", () =>
            simple(`
                :ie10(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie10(...) into an ie10 hack (multiple selectors)", () =>
            simple(`
                :ie10(.fooga .wooga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie10(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie910", function() {
        it("should transform :ie910(...) into an ie910 (single selector)", () =>
            simple(`
                :ie910(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie910(...) into an ie910 (multiple selectors)", () =>
            simple(`
                :ie910(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie910(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie9plus", function() {
        it("should transform :ie9plus(...) into an ie9plus hack (single selector)", () =>
            simple(`
                :ie9plus(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie9plus(...) into an ie9plus hack (multiple selectors)", () =>
            simple(`
                :ie9plus(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie9plus(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie9", function() {
        it("should transform :ie9(...) into an ie9 hack (single selector)", () =>
            simple(`
                :ie9(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie9(...) into an ie9 hack (multiple selectors)", () =>
            simple(`
                :ie9(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie9(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie8910", function() {
        it("should transform :ie8910(...) into an ie8910 hack (single selector)", () =>
            simple(`
                :ie8910(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie8910(...) into an ie8910 hack (multiple selectors)", () =>
            simple(`
                :ie8910(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie8910(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie8", function() {
        it("should transform :ie8(...) into an ie8 hack (single selector)", () =>
            simple(`
                :ie8(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie8(...) into an ie8 hack (multiple selectors)", () =>
            simple(`
                :ie8(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie8(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie7", function() {
        it("should transform :ie7(...) into an ie7 hack (single selector)", () =>
            simple(`
                :ie7(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie7(...) into an ie7 hack (multiple selectors)", () =>
            simple(`
                :ie7(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie7(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie678", function() {
        it("should transform :ie678(...) into an ie678 hack (single selector)", () =>
            simple(`
                :ie678(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie678(...) into an ie678 hack (multiple selectors)", () =>
            simple(`
                :ie678(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie678(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie67", function() {
        it("should transform :ie67(...) into an ie67 hack (single selector)", () =>
            simple(`
                :ie67(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie67(...) into an ie67 hack (multiple selectors)", () =>
            simple(`
                :ie67(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie67(...) into an ie67 hack (multiple declarations)", () =>
            simple(`
                :ie67(.fooga) { color: red; background: blue; }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie67(&) {
                        color: blue;
                    }
                }
            `)
        );
    });

    describe(":ie6", function() {
        it("should transform :ie6(...) into an ie6 hack (single selector)", () =>
            simple(`
                :ie6(.fooga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie6(...) into an ie6 hack (multiple selectors)", () =>
            simple(`
                :ie6(.fooga .booga) {
                    color: red;
                }
            `)
        );

        it("should transform :ie6(...) into an ie6 hack (multiple declarations)", () =>
            simple(`
                :ie6(.fooga) { color: red; background: blue; }
            `)
        );

        it("should work with postcss-nested", () =>
            nested(`
                .fooga {
                    color: red;
                    
                    :ie6(&) {
                        color: blue;
                    }
                }
            `)
        );
    });
});
