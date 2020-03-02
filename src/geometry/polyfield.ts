import { Point } from "./point";
import { Hexagons } from "./hexagon";

export type Polyfield = {
    origin: Point;
    rows: number;
    columns: number;
    polyOriginGenerator: (row: number, column: number) => Point;
};

export const Polyfields = {
    toOrigins(polyField: Polyfield) {
        const origins: Point[] = [];

        for (let row = 0; row < polyField.rows; row++) {
            for (let column = 0; column < polyField.columns; column++) {
                const p = polyField.polyOriginGenerator(row, column);

                origins.push({
                    x: p.x + polyField.origin.x,
                    y: p.y + polyField.origin.y
                });
            }
        }

        return origins;
    },

    getHexagonOriginForLength: (sideLength: number) => {
        const halfHeight = Hexagons.getHalfHeight(sideLength);

        return (row: number, column: number): Point => {
            const x = (1.5 * column + .5) * sideLength;

            return {
                x,
                y: column % 2 === 0 ? 0 : halfHeight
            };
        };
    }
};