"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie67", () => {
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
