export const Mapping = {
    linear(scale: number, low: number, high: number) {
        return ((high - low) * scale) + low;
    },

    discrete(scale: number, low: number, high: number) {
        if (scale <= 0) {
            throw Error("Cannot project 0 into the given range.");
        }

        const x = Mapping.linear(scale, low - 1, high);
        return Math.ceil(x);
    }
};