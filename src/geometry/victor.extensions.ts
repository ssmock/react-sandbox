import victor from "victor";

export const VictorExtensions = {
    toSvgCoords(v: victor) {
        return `${v.x},${v.y}`;
    },

    toManySvgCoords(v: victor[]) {
        return v.map(VictorExtensions.toSvgCoords).join(" ");
    }
};