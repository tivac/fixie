"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie10", () => {
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
