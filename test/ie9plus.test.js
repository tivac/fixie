"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie9plus", () => {
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
