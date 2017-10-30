"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie910", () => {
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
