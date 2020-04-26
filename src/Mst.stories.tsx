import React, { createContext, useContext } from "react";
import { PrettyJson } from "./PrettyJson";
import TWEEN from "@tweenjs/tween.js";
import {
  types,
  Instance,
  cast,
  SnapshotOrInstance,
  SnapshotIn,
  onSnapshot
} from "mobx-state-tree";
import { observer } from "mobx-react";

export default { title: "MST" };

const NamedThing = types
  .model({
    name: types.string
  })
  .actions(self => ({
    setName(value: string) {
      self.name = value;
    }
  }))
  .views(self => ({
    get plural() {
      return `${self.name}s`;
    }
  }));

const Counter = types
  .model({
    count: types.number
  })
  .actions(self => ({
    increment() {
      self.count++;
    },
    decrement() {
      self.count--;
    }
  }));

const RootModel = types.model({
  counter: Counter,
  namedThing: NamedThing
});

const rootStore = RootModel.create({
  counter: {
    count: 0
  },
  namedThing: {
    name: "test"
  }
});

onSnapshot(rootStore, snapshot => console.log("Snapshot: ", snapshot));

type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

const Provider = RootStoreContext.Provider;
function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

const CounterDisplay: React.FC<{}> = observer(() => {
  const { counter } = useMst();
  return (
    <div>
      <p>{counter.count}</p>
      <div>
        <button onClick={counter.decrement}>-</button>
        <button onClick={counter.increment}>+</button>
      </div>
    </div>
  );
});

export const CounterDemo: React.FC = () => {
  return (
    <Provider value={rootStore}>
      <CounterDisplay />
    </Provider>
  );
};
    
const NamedThingDisplay: React.FC<{}> = observer(() => {
  const { namedThing } = useMst();
  return (
    <div>
      <PrettyJson data={namedThing} />
      <div>
        <input
          onChange={evt => namedThing.setName(evt.target.value)}
          value={namedThing.name}
        />
      </div>
    </div>
  );
});

export const NamedThingDemo: React.FC = () => {
  return (
    <Provider value={rootStore}>
      <NamedThingDisplay />
    </Provider>
  );
};
