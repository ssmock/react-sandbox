import victor from "victor";
import { Hexagon, Hexagons } from "./hexagon";

describe("Hexagons", () => {
    it("should have six points", () => {
        const h: Hexagon = { origin: new victor(10, 20), sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points).toHaveLength(6);
    });

    it("should use the origin as the first point", () => {
        const h: Hexagon = { origin: new victor(10, 20), sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[0]).toMatchObject({ x: 10, y: 20 });
    });

    it("should calculate a lateral second point", () => {
        const h: Hexagon = { origin: new victor(10, 20), sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[1]).toMatchObject({ x: 10 + 30, y: 20 });
    });

    it("should calculate an oblique third point", () => {
        const h: Hexagon = { origin: new victor(10, 20), sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[2].x).toBeGreaterThan(10);
        expect(points[2].y).toBeGreaterThan(20);
    });
});