import { Hexagon, Hexagons } from "./hexagon";
import { Points } from "./point";

describe("Hexagons", () => {
    it("should have six points", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points).toHaveLength(6);
    });

    it("should use the origin as the first point", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[0]).toMatchObject({ x: 10, y: 20 });
    });

    it("should calculate a lateral second point", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[1]).toMatchObject({ x: 10 + 30, y: 20 });
    });

    it("should calculate an oblique third point", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[2].x).toBeGreaterThan(10);
        expect(points[2].y).toBeGreaterThan(20);
    });

    it("should calculate a fourth point below the second", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[3].x).toEqual(points[1].x);
        expect(points[3].y).toBeGreaterThan(points[1].y);
    });

    it("should calculate a fifth point below the origin", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);

        expect(points[4].x).toEqual(points[0].x);
        expect(points[4].y).toBeGreaterThan(points[0].y);
    });

    it("should calculate a sixth point below and to the left of the origin", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };

        const points = Hexagons.toCoords(h);
        
        expect(points[5].x).toBeLessThan(points[0].x);
        expect(points[5].y).toBeGreaterThan(points[0].y);
    });
    
    it("should have the same length on each side", () => {
        const h: Hexagon = { origin: { x: 10, y: 20 }, sideLength: 30 };
    
        const points = Hexagons.toCoords(h);
        
        [
            Points.distance(points[0], points[1]),    
            Points.distance(points[1], points[2]),    
            Points.distance(points[2], points[3]),    
            Points.distance(points[3], points[4]),    
            Points.distance(points[4], points[5]),    
            Points.distance(points[5], points[0]),    
        ]
        .forEach(dist => {
            expect(dist).toEqual(h.sideLength);
        });
    });
});