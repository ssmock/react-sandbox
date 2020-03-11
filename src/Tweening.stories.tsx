import React from 'react';
import { PrettyJson } from './PrettyJson';
import TWEEN from "@tweenjs/tween.js";
import { createStore, Action } from "redux";
import { connect, Provider } from "react-redux";

type JunkState = {
    x: number;
};

const defaultState: JunkState = {
    x: 0
};

const reducer = (state: JunkState = defaultState, action: Action) => {
    if (action.type === "SetX") {
        return {
            ...state,
            x: Math.floor((action as any).x)
        }
    }

    return state;
};

const store = createStore(reducer);

export default { title: 'Tweening' };

const foo = { x: 0 };
const t = new TWEEN.Tween(foo)
    .to({ x: 100 }, 20000)
    .easing(TWEEN.Easing.Cubic.In)
    .onUpdate(({ x }) => {
        store.dispatch({ type: "SetX", x });
    })
    .yoyo(true)
    .repeat(Infinity)
    .onComplete(() => {
        alert("Boom")
    })
    .start();

function step() {
    window.requestAnimationFrame(step);
    TWEEN.update();
}

window.requestAnimationFrame(step);

const Thing = ({ x }: { x: number }) => {
    return (<div>{x}</div>);
};

const ConnectedThing =
    connect((state: JunkState) => ({ x: state.x }))(Thing);

export const fun = () => {
    return (<Provider store={store}>
        <ConnectedThing />
    </Provider>);
}
