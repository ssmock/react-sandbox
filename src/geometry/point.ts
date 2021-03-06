export type Point = {
    x: number;
    y: number;
};

export const Points = {
    toSvg(p: Point) {
        return `${p.x},${p.y}`;
    },

    toSvgMany(p: Point[]) {
        return p.map(Points.toSvg).join(" ");
    },

    distance(p1: Point, p2: Point) {
        return Math.sqrt(
                Math.pow((p2.x - p1.x), 2)
                + (Math.pow((p2.y - p1.y), 2)));
    }
}