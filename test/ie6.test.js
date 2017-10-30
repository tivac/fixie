"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie6", () => {
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
