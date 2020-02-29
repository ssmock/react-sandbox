import victor from "victor";
import { VictorExtensions } from "./victor.extensions";
import { precalc } from "./precalc";

export type Hexagon = {
    origin: victor;
    sideLength: number;
}

export const Hexagons = {
    toCoords(h: Hexagon) {
        const points = [
            h.origin,
            h.origin.clone().addScalarX(h.sideLength),
            h.origin,
            h.origin,
            h.origin,
            h.origin
        ]

        return points;
    },

    toSvgCoords(h: Hexagon) {
        const points = Hexagons.toCoords(h);

        return VictorExtensions.toManySvgCoords(points);
    }
}