import { Seq, Set, Range } from "immutable";

export type Bag<T> = {
    items: Set<T>;
};

export type FromBag<T> = {
    bag: Bag<T>;
    selection: T;
};

export type ManyFromBag<T> = {
    bag: Bag<T>;
    selections: Seq.Indexed<T>;
}

export const Bags = {
    make<T>(items: T[]): Bag<T> {
        return {
            items: Set(items)
        };
    },

    takeOne<T>(bag: Bag<T>): FromBag<T> {
        throw Error("Not implemented");
    },

    takeMany<T>(bag: Bag<T>, count: number): ManyFromBag<T> {
        return Range(0, count).reduce((agg: ManyFromBag<T>, i: number): ManyFromBag<T> => {
            const fromBag = Bags.takeOne(agg.bag);

            return {
                bag: {
                    items: agg.bag.items.remove(fromBag.selection)
                },
                selections: Seq<T>([])
            };
        }, {
            bag,
            selections: Seq<T>([])
        });
    },

    put<T>(bag: Bag<T>, ...items: T[]): Bag<T> {
        return {
            items: bag.items.concat(items)
        };
    }
};