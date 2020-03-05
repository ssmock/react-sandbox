import { Bags } from "./bag";

describe("Bags.take", () => {
    it("should return nothing when the bag is empty", () => {
        const b = { items: [] }

        const taken = Bags.take(b, 1);

        expect(taken.items).toBeEmpty();
        expect(taken.bag.items).toBeEmpty();
    });

    it("should reduce the size of the bag by the given number", () => {
    });    

    it("should return the given number of items", () => {

    });
});