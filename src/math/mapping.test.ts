import { Mapping } from "./mapping";

describe("Mapping.linear", () => {
    it("should map 0 to 0 in 0..10", () => {
        const m = Mapping.linear(0, 0, 10);
        expect(m).toEqual(0);
    });

    it("should map 1 to 10 in 0..10", () => {
        const m = Mapping.linear(1, 0, 10);
        expect(m).toEqual(10);
    });

    it("should map .25 to 2.5 in 0..10", () => {
        const m = Mapping.linear(.25, 0, 10);
        expect(m).toEqual(2.5);
    });

    it("should uniformly map to discrete values", () => {
        const bags: number[][] = [[], [], [], []];

        for (let i = 0; i < 1; i += .01) {
            const m = Mapping.linear(i, 0, 3);
            const m_ = Math.ceil(m);

            const b = bags[m_];
            if (m_ > bags.length || !b) {
                throw Error(`Projected number is out of range: ${m_} (i = ${i})`);
            }

            b.push(i);
        }

        expect(bags[0].length).toEqual(1);
        expect(bags[0][0]).toEqual(0);
        expect(bags[1].length).toEqual(bags[2].length);
        expect(bags[2].length).toEqual(bags[3].length);
    });
});

describe("Mapping.discrete", () => {
    it("should fail when given 0", () => {
        try {
            const m = Mapping.discrete(0, 1, 4);

            fail(Error("It should have failed."));
        }
        catch (ex) {
            expect((ex as Error).message).toMatch(/0/i);
        }
    });

    it("should map .01 to 1 in 1..4", () => {
        const m = Mapping.discrete(.01, 1, 4);
        expect(m).toEqual(1);
    });

    it("should map 1 to 4 in 1..4", () => {
        const m = Mapping.discrete(1, 1, 4);
        expect(m).toEqual(4);
    });

    it("should uniformly map to discrete values", () => {
        const bags: number[][] = [[], [], [], [], []];

        for (let i = .001; i < 1; i += .01) {
            const m = Mapping.discrete(i, 1, 4);
            const m_ = Math.ceil(m);

            const b = bags[m_];
            if (m_ > bags.length || !b) {
                throw Error(`Projected number is out of range: ${m_} (i = ${i})`);
            }

            b.push(i);
        }

        expect(bags[0].length).toEqual(0);
        expect(bags[1].length).toEqual(bags[2].length);
        expect(bags[2].length).toEqual(bags[3].length);
        expect(bags[3].length).toEqual(bags[4].length);
    });
});