"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie10plus", () => {
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
