import seedrandom from "seedrandom";

let lazyPrng: () => number;

export function seed(val: any) {
    const a = seedrandom.alea(seed.toString());
    lazyPrng = a.quick;
}

export function rng(): number {
    if (!lazyPrng) {
        throw Error("RNG has not been initialized; first call `seed` within this module.");
    }

    return lazyPrng();
}