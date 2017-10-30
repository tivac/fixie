"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie8910", () => {
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
