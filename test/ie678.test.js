"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie678", () => {
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
