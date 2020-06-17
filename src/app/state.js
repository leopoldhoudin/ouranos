import React, { useReducer, useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';

import { uuid4 } from 'utils';
import engine from 'engine';

const globalState = new Object();

const managers = new Array();
const trackers = new Object();

const getLocalStorageKey = name => `ouranos:state:${name}`;

const getSlice = name => globalState[name];

const setValue = (name, path, value) => {
  globalState[name] = {...globalState[name], ...{[path]: value}};
};

const setSlice = (name, slice) => {
  globalState[name] = slice;
};

const createSliceManager = (name, defaultSlice, options) => {
  options = options || {
    noLocalStorage: false,
    synced: false,
    transformInitial: null,
    restartEngineOnUpdate: false,
  };
  let {noLocalStorage, synced, transformInitial, restartEngineOnUpdate} = options;
  if (!transformInitial) {
    transformInitial = slice => slice;
  }

  const sliceFromStorage = window.localStorage.getItem(getLocalStorageKey(name));
  const initialSlice = (sliceFromStorage && !noLocalStorage)
    ? transformInitial(JSON.parse(sliceFromStorage))
    : transformInitial(defaultSlice);

  const reduceSlice = (oldSlice, action) => {
    let newSlice;
    if (action.path) {
      newSlice = JSON.parse(JSON.stringify(oldSlice));
      newSlice[action.path] = action.value;
      setValue(name, action.path, action.value);
    } else if (action.slice) {
      newSlice = action.slice;
      setSlice(name, action.slice);

      if (restartEngineOnUpdate) {
        engine.start();
      }
    }

    if (!noLocalStorage) {
      window.localStorage.setItem(getLocalStorageKey(name), JSON.stringify(newSlice));
    }

    if (name == 'bodies') {
      console.log(globalState);
    }

    return newSlice;
  };

  const useValue = ({reducer, initialState}) => useReducer(reducer, initialState);
  const { Provider, useTracked } = createContainer(useValue);
  globalState[name] = initialSlice;

  let timer = null;
  const Watcher = () => {
    const [state, setState] = useState();
    const [stateSlice, setStateSlice] = useTracked();

    const watchSlice = () => {
      const currSlice = getSlice(name);

      if (currSlice != state) {
        setState(currSlice);
        setStateSlice({slice: currSlice});
      }
    };

    useEffect(() => {
      if (timer) {
        clearInterval(timer);
      }

      timer = setInterval(watchSlice, 10);
    }, [state]);

    return null;
  };

  const Manager = ({managers, children}) => {
    if (managers.length > 0) {
      const NextManager = managers[0];
      const nextManagers = managers.slice(1, managers.length);

      return (
        <Provider reducer={reduceSlice} initialState={initialSlice}>
          {synced && <Watcher />}
          <NextManager managers={nextManagers}>{children}</NextManager>
        </Provider>
      );
    } else {
      return (
        <Provider reducer={reduceSlice} initialState={initialSlice}>
          {synced && <Watcher />}
          <>{children}</>
        </Provider>
      );
    }
  };

  managers.push(Manager);
  trackers[name] = useTracked;

  return Manager;
};

// Statuses are separated from their standard settings slices to ensure the
// dataflow is only from the services to the interface, and not the other way
// around. In addition, we don't want to persist them to local storage.
createSliceManager(
  'status',
  {
    engine: null,
  },
  {noLocalStorage: true, synced: true},
);

createSliceManager(
  'simulation',
  {
    // Timestamp of the simulation
    timestamp: 1577836800,
    // Speed of simulation
    speed: 1,
    // Body of focus (i.e. to follow)
    focus: null,
    // Whether to have a fix angle relative to the body of focus or not
    locked: false,
    // Bodies magnifying factor
    magnify: 1,
  },
  {
    synced: true,
    // noLocalStorage:true, // for debug
    transformInitial: slice => ({...slice, ...{timestamp: 1577836800}}),
  }
);

createSliceManager(
  'engine',
  {
    integrator: 'forward-euler',
  },
);

createSliceManager(
  'bodies',
  [
    {
      uuid: uuid4(),
      name: 'Sun',
      type: 'star',
      mass: 10000,
      radius: 10,
      texture: 'sun',
      initialConditions: {
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
      },
    },

    {
      uuid: uuid4(),
      name: 'Earth',
      type: 'planet',
      mass: 1,
      radius: 1,
      texture: 'earth',
      initialConditions: {
        position: {x: 100, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: -10},
        rotation: {x: 0, y: 0, z: 0},
      },
    },

    // {
    //   name: 'Earth',
    //   type: 'planet',
    //   mass: 1,
    //   radius: 10,
    //   texture: 'earth',
    //   initialConditions: {
    //     position: {x: 0, y: 0, z: 0},
    //     velocity: {x: 1, y: 0, z: 1},
    //     rotation: {x: 0, y: 0, z: 0},
    //   },
    // },
    // {
    //   uuid: uuid4(),
    //   name: 'Moon',
    //   type: 'planet',
    //   mass: 0.1,
    //   radius: 1,
    //   texture: 'moon',
    //   initialConditions: {
    //     position: {x: -50, y: 0, z: 0},
    //     rotation: {x: 0, y: 0, z: 0},
    //   },
    // },
  ],
);

createSliceManager(
  'physics',
  {
    G: 1,
  },
  {restartEngineOnUpdate: true},
);

createSliceManager(
  'graphics',
  {},
);

createSliceManager(
  'interface',
  {},
);

export const StateManager = ({children}) => {
  const NextManager = managers[0];
  const nextManagers = managers.slice(1, managers.length - 1);
  return <NextManager managers={nextManagers}>{children}</NextManager>;
};

export default {
  get: getSlice,
  set: setValue,
  use: name => trackers[name](),
};;
