import { Point, Points } from "./point";
import { precalc } from "./precalc";

export type Hexagon = {
    origin: Point;
    sideLength: number;
}

export const Hexagons = {
    toCoords(h: Hexagon) {
        const numbers = precalc();
        const halfSideLength = h.sideLength / 2;
        const halfHeight = (numbers.sin60 * h.sideLength)

        const points = [
            h.origin,
            { x: h.origin.x + h.sideLength,
              y: h.origin.y },
            { x: h.origin.x + h.sideLength + halfSideLength,
              y: h.origin.y + halfHeight },
            { x: h.origin.x + h.sideLength,
              y: h.origin.y + (halfHeight * 2) },
            { x: h.origin.x,
              y: h.origin.y + (halfHeight * 2) },
            { x: h.origin.x - halfSideLength,
              y: h.origin.y + halfHeight }
        ]

        return points;
    },

    toSvgCoords(h: Hexagon) {
        const points = Hexagons.toCoords(h);

        return Points.toSvgMany(points);
    }
}