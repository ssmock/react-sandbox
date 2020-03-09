import { Bags } from "./bag";
import { Rng } from "./rng";
import { Range } from "immutable";

describe("Bags.make", () => {
    it("should make a new bag containing a set of items", () => {
        const b = Bags.make([1, 2, 3]);

        expect(b.items.count()).toEqual(3);
    });

    it("should ignore duplicates of primative values", () => {
        const b = Bags.make([1, 2, 2, 1]);

        expect(b.items.count()).toEqual(2);
    });

    it("should not ignore structurally equal duplicates", () => {
        const b = Bags.make([
            { a: 1 },
            { a: 2 },
            { a: 2 },
            { a: 1 }]);

        expect(b.items.count()).toEqual(4);
    });
});

describe("Bags.takeOne", () => {
    beforeAll(() => {
        Rng.seed("Bags.takeOne");
    });

    it("should take an item at random", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const taken = Bags.takeOne(b);

        expect(taken.bag.items.count()).toBe(9);
        expect(taken.selection).toEqual(4);
    });

    it("should take several items at random", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const t1 = Bags.takeOne(b);
        expect(t1.bag.items.count()).toBe(9);
        expect(t1.selection).toEqual(1);

        const t2 = Bags.takeOne(t1.bag);
        expect(t2.bag.items.count()).toBe(8);
        expect(t2.selection).toEqual(7);

        const t3 = Bags.takeOne(t2.bag);
        expect(t3.bag.items.count()).toBe(7);
        expect(t3.selection).toEqual(6);
    });

    it("should exhaust a bag", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const finallyTaken =
            Range(0, 9).reduce((taken, i) => {
                return Bags.takeOne(taken.bag);
            }, Bags.takeOne(b));

        expect(finallyTaken.bag.items.count()).toBe(0);
    });
});

describe("Bags.takeMany", () => {
    beforeAll(() => {
        Rng.seed("Bags.takeMany");
    });

    it("should take several items at random, leaving some left", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const taken = Bags.takeMany(5, b);

        expect(taken.bagEmpty).toEqual(false);
        expect(taken.deficit).toEqual(0);
        expect(taken.selections.count()).toEqual(5);
        expect(taken.selections.toArray()).toEqual([
            7, 9, 1, 0, 8
        ]);
        expect(taken.bag.items.count()).toBe(5);
    });

    it("should exhaust a bag", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const taken = Bags.takeMany(10, b);

        expect(taken.bag.items.count()).toBe(0);
    });

    it("indicate a deficit", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const taken = Bags.takeMany(15, b);

        expect(taken.bag.items.count()).toBe(0);
        expect(taken.selections.count()).toBe(10);
        expect(taken.bagEmpty).toBe(true);
        expect(taken.deficit).toBe(5);
    });
});

xdescribe("Bags.peek", () => {
    it("should have tests", () => {
        fail();
    });
})

xdescribe("Bags.peekMany", () => {
    it("should have tests", () => {
        fail();
    });
})