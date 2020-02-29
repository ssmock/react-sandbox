import React from 'react';
import { Hexagon, Hexagons } from "./geometry/hexagon";
import { PrettyJson } from './PrettyJson';
import victor from 'victor';

export default { title: 'App' };

export const hexagon = () => {
    const h: Hexagon = { origin: new victor(100, 100), sideLength: 100 }
    const coords: string = Hexagons.toCoords(h);

    return (<svg>
        <polygon stroke="#000" points={coords} />
    </svg>)
}
