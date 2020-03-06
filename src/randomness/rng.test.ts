import { Range } from "immutable";
import { Rng } from "./rng";

describe("Rng.get", () => {
    it("should throw an error if `get` is called before `seed`", () => {
        try {
            Rng.get();

            fail("It should have thrown an error.");
        }
        catch (ex) {
            expect((ex as Error).message).toMatch(/seed/i);
        }
    });

    it("should get the same pseudorandom sequence given a particular seed", () => {
        Rng.seed("this");

        expect(Rng.get()).toEqual(0.3456902194302529);
        expect(Rng.get()).toEqual(0.7558765099383891);
    });
});

xdescribe("Rng.pick", () => {
    it("should throw an error if `pick` is called before `seed`", () => {
        try {
            Rng.pick(0, 10);

            fail("It should have thrown an error.");
        }
        catch (ex) {
            expect((ex as Error).message).toMatch(/seed/i);
        }
    });

    it("should always pick a number in range", () => {
        Rng.seed("this");


        for (let i = 0; i < 200; i++) {
            const picked = Rng.pick(3, 11);

            expect(picked).toBeLessThanOrEqual(11);
            expect(picked).toBeGreaterThanOrEqual(3);
        }
    });
});