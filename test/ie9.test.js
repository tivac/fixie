"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie9", () => {
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
