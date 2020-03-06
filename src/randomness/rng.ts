import seedrandom from "seedrandom";

let lazyPrng: () => number;

export const Rng = {
    seed(s: any): void {
        const a = seedrandom.alea(s.toString());
        lazyPrng = a.quick;
    },

    get(): number {
        if (!lazyPrng) {
            throw Error("RNG has not been initialized; first call `Rng.seed` within this module.");
        }
    
        return lazyPrng();
    },

    pick<T>(low: number, high: number) {
        throw Error("Not implemented");
    }
}