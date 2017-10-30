"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie11", () => {
    it("should transform :ie11(...) into an ie11 hack (single selector)", () =>
        simple(`
            :ie11(.fooga) {
                color: red;
            }
        `)
    );

    it("should transform :ie11(...) into an ie11 hack (multiple selectors)", () =>
        simple(`
            :ie11(.fooga .wooga) {
                color: red;
            }
        `)
    );

    it("should work with postcss-nested", () =>
        nested(`
            .fooga {
                color: red;
                
                :ie11(&) {
                    color: blue;
                }
            }
        `)
    );
});
