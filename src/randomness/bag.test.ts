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

xdescribe("Bags.takeOne", () => {
    beforeAll(() => {
        Rng.seed("Bags.take");
    });

    it("should take an item at random", () => {
        const items = Range(0, 10).toArray();
        const b = Bags.make(items);

        const taken = Bags.takeOne(b);

        expect(taken.bag.items.count()).toBe(9);
        expect(taken.selection).toEqual(3);
    });
});