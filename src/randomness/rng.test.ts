import { Range } from "immutable";
import { Rng } from "./rng";

describe("Rng.get", () => {
    it("should get the same pseudorandom sequence given a particular seed", () => {
        Rng.seed("this");

        expect(Rng.get()).toEqual(0.3456902194302529);
        expect(Rng.get()).toEqual(0.7558765099383891);
    });
});

describe("Rng.pick", () => {
    it("should always pick a number in range", () => {
        Rng.seed("this");

        for (let i = 0; i < 200; i++) {
            const picked = Rng.pick(3, 11);

            expect(picked).toBeLessThanOrEqual(11);
            expect(picked).toBeGreaterThanOrEqual(3);
        }
    });

    it("should pick a relatively uniform distribution", () => {
        Rng.seed("this");
        
        const dist: number[][] = [[], [], [], []];
        
        for (let i = 0; i < 1000; i++) {
            const picked = Rng.pick(0, 3);
            
            dist[picked].push(i);
        }
        
        Rng.seed("that");

        for (let i = 0; i < 1000; i++) {
            const picked = Rng.pick(0, 3);

            dist[picked].push(i);
        }

        expect(dist[0].length / 100).toBeCloseTo(5, 1);
        expect(dist[1].length / 100).toBeCloseTo(5, 1);
        expect(dist[2].length / 100).toBeCloseTo(5, 1);
        expect(dist[3].length / 100).toBeCloseTo(5, 1);
    });
});