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
        const theSeed = "this";

        Rng.seed(theSeed);

        expect(Rng.get()).toEqual(0.3456902194302529);
        expect(Rng.get()).toEqual(0.7558765099383891);
    });
});