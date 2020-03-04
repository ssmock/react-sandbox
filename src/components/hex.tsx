import React from "react";
import { Hexagon, Hexagons } from "../geometry/hexagon";

export type HexProps = {
    Stroke: string;
    Fill: string;
    Geometry: Hexagon;
};

export function Hex(props: HexProps) {
    const points = Hexagons.toSvgCoords(props.Geometry);

    return (<polygon stroke={props.Stroke} fill={props.Fill} points={points} />)
}