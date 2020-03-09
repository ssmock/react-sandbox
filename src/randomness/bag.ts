import { Seq, Set, Range, List } from "immutable";
import { Rng } from "./rng";

export type Bag<T> = {
    items: Set<T>;
};

export type FromBag<T> = {
    bag: Bag<T>;
    selection: T | null;
    bagEmpty: boolean;
};

export type ManyFromBag<T> = {
    bag: Bag<T>;
    selections: List<T>;
    bagEmpty: boolean;
    deficit: number;
}

export const Bags = {
    make<T>(items: T[]): Bag<T> {
        return {
            items: Set(items)
        };
    },

    takeOne<T>(bag: Bag<T>): FromBag<T> {
        const arr = bag.items.toArray();

        if (!arr.length) {
            return {
                bag,
                selection: null,
                bagEmpty: true
            }
        }

        const i = Rng.pick(0, arr.length - 1);
        const selection = arr[i];

        const newBag = Bags.make([
            ...arr.slice(0, i),
            ...arr.slice(i + 1, arr.length)
        ]);

        return {
            selection,
            bag: newBag,
            bagEmpty: false
        };
    },

    takeMany<T>(count: number, bag: Bag<T>): ManyFromBag<T> {
        return Range(0, count).reduce((agg: ManyFromBag<T>, i: number): ManyFromBag<T> => {
            const fromBag = Bags.takeOne(agg.bag);

            if (fromBag.selection === null) {
                return {
                    bag: agg.bag,
                    selections: agg.selections,
                    bagEmpty: true,
                    deficit: agg.deficit + 1
                };
            }

            return {
                bag: fromBag.bag,
                selections: agg.selections.push(fromBag.selection),
                bagEmpty: false,
                deficit: 0
            };
        }, {
            bag,
            selections: List<T>([]),
            bagEmpty: false,
            deficit: 0
        });
    },

    put<T>(items: T[], bag: Bag<T>): Bag<T> {
        return {
            items: bag.items.concat(items)
        };
    },

    peekOne<T>(bag: Bag<T>): FromBag<T> {
        const taken = Bags.takeOne(bag);

        return {
            bag,
            selection: taken.selection,
            bagEmpty: taken.bagEmpty
        };
    },

    peekMany<T>(count: number, bag: Bag<T>): ManyFromBag<T> {
        const taken = Bags.takeMany(count, bag);

        return {
            bag,
            selections: taken.selections,
            bagEmpty: taken.bagEmpty,
            deficit: taken.deficit
        };
    }
};