import React from 'react';
import { Hexagon, Hexagons } from "./geometry/hexagon";
import { PrettyJson } from './PrettyJson';

export default { title: 'App' };

export const hexagon = () => {
    const h: Hexagon = { origin: { x: 100, y: 100 }, sideLength: 100 }
    const coords: string = Hexagons.toSvgCoords(h);

    return (<svg height="400" width="400" style={{ background: "#aaa" }}>
                <polygon stroke="#000" points={coords} />
            </svg>);
}
