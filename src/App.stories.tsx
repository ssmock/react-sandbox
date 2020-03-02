import React from 'react';
import { Hexagon, Hexagons } from "./geometry/hexagon";
import { PrettyJson } from './PrettyJson';
import { Polyfield, Polyfields } from './geometry/polyfield';

export default { title: 'App' };

export const hexagon = () => {
    const h: Hexagon = { origin: { x: 100, y: 100 }, sideLength: 100 }
    const coords: string = Hexagons.toSvgCoords(h);

    return (<svg height="400" width="400" style={{ background: "#aaa" }}>
                <polygon stroke="#000" points={coords} />
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
        const coords = Hexagons.toSvgCoords({ origin, sideLength });

        return (<polygon stroke="#88A" fill="#FFF"
                         points={coords} />)
    });

    return (<svg height="400" width="400">
        {hexes}
    </svg>)
}