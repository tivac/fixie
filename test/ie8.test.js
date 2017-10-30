"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie8", () => {
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
