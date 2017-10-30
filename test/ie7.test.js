"use strict";

var simple = require("./util.js").simple,
    nested = require("./util.js").nested;

describe(":ie7", () => {
    it("should transform :ie7(...) into an ie7 hack (single selector)", () =>
        simple(`
            :ie7(.fooga) {
                color: red;
            }
        `)
    );

    it("should transform :ie7(...) into an ie7 hack (multiple selectors)", () =>
        simple(`
            :ie7(.fooga .booga) {
                color: red;
            }
        `)
    );

    it("should work with postcss-nested", () =>
        nested(`
            .fooga {
                color: red;
                
                :ie7(&) {
                    color: blue;
                }
            }
        `)
    );
});
