import React from 'react';
import { Hexagon, Hexagons } from "./geometry/hexagon";
import { PrettyJson } from './PrettyJson';
import { Polyfield, Polyfields } from './geometry/polyfield';
import { Hex } from './components/hex';

export default { title: 'App' };

export const hexagon = () => {
    const h: Hexagon = { origin: { x: 100, y: 100 }, sideLength: 100 }

    return (<svg height="400" width="400" style={{ background: "#aaa" }}>
                <Hex Fill="#000" Stroke="#00F" Geometry={h} />
            </svg>);
}

export const hexField = () => {
    const sideLength = 12;
    const polyfield: Polyfield = {
        rows: 12,
        columns: 20,
        origin: { x: 20, y: 20 },
        polyOriginGenerator: Polyfields.getHexagonOriginForLength(sideLength)
    };
    const origins = Polyfields.toOrigins(polyfield);

    console.log(origins);

    const hexes = origins.map(origin => {
        return (<Hex Fill="#DB4" Stroke="#870" Geometry={{ origin, sideLength }} />)
    });

    return (<svg height="400" width="400">
        {hexes}
    </svg>)
}