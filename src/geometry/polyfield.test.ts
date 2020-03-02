import { Polyfields, Polyfield } from "./polyfield";
import { Hexagons } from "./hexagon";

describe("Polyfields.toOrigins", () => {
    it("should generate a single unit grid", () => {
        const p = {
            origin: { x: 10, y: 20 },
            rows: 3,
            columns: 5,
            polyOriginGenerator: (row: number, column: number) => ({ x: column, y: row })
        };

        const origins = Polyfields.toOrigins(p);

        expect(origins.length).toBe(15);

        expect(origins[0].x).toBe(0 + 10);
        expect(origins[0].y).toBe(0 + 20);

        expect(origins[14].x).toBe(4 + 10);
        expect(origins[14].y).toBe(2 + 20);

        expect(origins[5].x).toBe(0 + 10);
        expect(origins[5].y).toBe(1 + 20);

        expect(origins[10].x).toBe(0 + 10);
        expect(origins[10].y).toBe(2 + 20);
    });
});

describe("Polyfields.getHexagonOriginForLength(10)", () => {
    const getOrigin = Polyfields.getHexagonOriginForLength(10);
    const halfHeight = Hexagons.getHalfHeight(10);

    it("should offset row 0, column 0 by 5 for x", () => {
        const p = getOrigin(0, 0);
        
        expect(p.x).toBe(5);
    });
    
    it("should calculate x = 20 for row 1, column 1", () => {
        const p = getOrigin(0, 1);
        
        expect(p.x).toBe(20);
    });
    
    it("should calculate x = 35 for row 17, column 2", () => {
        const p = getOrigin(0, 2);
        
        expect(p.x).toBe(35);
    });
    
    it("should calculate x = 50 for row 99, column 3", () => {
        const p = getOrigin(99, 3);
        
        expect(p.x).toBe(50);
    });

    it("should not offset y in an even column", () => {
        const p = getOrigin(99, 20);
        
        expect(p.y).toEqual(0);
    });

    it("should offset y by half the hexagon's height in an odd column", () => {
        const p = getOrigin(99, 21);
        
        expect(p.y).toEqual(halfHeight);
    });
});