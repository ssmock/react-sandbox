export type PrecalcValues = {
    rads60: number;
    sin60: number;
};

const precalculate = () => {
    const rads60 = Math.PI / 3; 

    return {
        rads60,
        sin60: Math.sin(rads60)
    };
};

let vals: PrecalcValues | undefined = undefined;

export const precalc = () => {
    if (!vals) {
        vals = precalculate();
    }

    return vals;
};