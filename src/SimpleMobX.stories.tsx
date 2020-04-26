import React from "react";
import { PrettyJson } from "./PrettyJson";
import { observable, computed, autorun, IReactionPublic, observe } from "mobx";
import { observer } from "mobx-react";

export default { title: "Simple MobX" };

type Countable = {
  count: number;
};

const CounterDisplay: React.FC<{ countable: Countable }> = observer(
  ({ countable }) => {
    return (
      <div>
        <p>{countable.count}</p>
        <div>
          <button onClick={() => countable.count--}>-</button>
          <button onClick={() => countable.count++}>+</button>
        </div>
      </div>
    );
  }
);

export const CounterDemo: React.FC = () => {
  const state = observable({
    count: 0,
  });

  return <CounterDisplay countable={state} />;
};

export const NamedThingDisplay: React.FC<{
  namedThing: { name: string };
}> = observer(({ namedThing }) => {
  return (
    <div>
      <PrettyJson data={namedThing.name} />
      <input
        onChange={(evt) => (namedThing.name = evt.target.value)}
        value={namedThing.name}
      />
    </div>
  );
});

export const NamedThingDemo: React.FC = () => {
  const state = observable({
    name: "test",
  });

  return (
    <div>
      <NamedThingDisplay namedThing={state} />
    </div>
  );
};

// These need to be classes to have observable attributes.
class Todo {
  id: number = Math.random();
  @observable title: string = "";
  @observable finished: boolean = false;
}

class TodoList {
  @observable todos: Array<Todo> = [];
  // Lazily evaluated. It really shouldn't matter though, because
  // these are intended to be pure.
  @computed get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }
}

@observer
class TodoListView extends React.Component<{ todoList: TodoList }> {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map((todo) => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView: React.FC<{ todo: Todo }> = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={() => (todo.finished = !todo.finished)}
    />
    <TodoTitle title={`${todo.title}${todo.finished ? " DONE" : ""}`} />
  </li>
));

// This doesn't need an observable attribute; its parent handles that part.
const TodoTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h4>{title}</h4>;
};

export const TodoListDemo = () => {
  const store = new TodoList();
  const t = new Todo();
  t.title = "test";
  store.todos.push(t);

  // This only fires because it references an observable instance (store)
  autorun((_v: IReactionPublic) => {
    console.log(store.unfinishedTodoCount);
  });

  observe(
    t,
    "finished",
    (chg) => {
      console.log("Got finished change", chg);
    },
    true
  );

  return <TodoListView todoList={store} />;
};

type Collector = {
  name: string;
  birthday: Date;
  collection: Collectable[];
};

type Collectable = {
  name: string;
  foundDate: Date;
  source: CollectableSource;
};

type CollectableSource = {
  name: string;
  location: CollectableSourceLocation;
};

type CollectableSourceLocation = {
  lat: number;
  long: number;
};

const CollectorForm: React.FC<{ collector: Collector }> = observer(
  ({ collector }) => {
    const addItem = () => {
      collector.collection.push({
        name: "Queen Bee Skull",
        foundDate: new Date(2019, 12, 31),
        source: {
          name: "The Four Corners",
          location: {
            lat: 36.9927152491,
            long: -109.040436537,
          },
        },
      });
    };

    return (
      <div>
        <input
          value={collector.name}
          onChange={(evt) => (collector.name = evt.target.value)}
        />
        <button onClick={() => addItem()}>Add Item</button>
      </div>
    );
  }
);

const CollectorDisplay: React.FC<{ collector: Collector }> = observer(
  ({ collector }) => {
    // TRICKY: PrettyJson doesn't look at any specific properties of an
    // object, so it won't receive observer updates without a dumb trick
    // like this. Note that we can't just assign these values here, and
    // then throw them away. They need to be used somehow, or the
    // transpiler will erase them.
    const rerenderFor = [
      collector.name,
      collector.birthday,
      // Furthermore, we need to make sure individual elements are accessed.
      ...collector.collection,
    ];

    return (
      <div title={rerenderFor.length.toString()}>
        <PrettyJson data={collector} />
      </div>
    );
  }
);

export const CollectorDemo = () => {
  const c: Collector = {
    name: "Horatio Horsham",
    birthday: new Date(1962, 1, 11),
    collection: [],
  };

  const c_ = observable(c);

  return (
    <div>
      <CollectorForm collector={c_} />
      <CollectorDisplay collector={c_} />
    </div>
  );
};
