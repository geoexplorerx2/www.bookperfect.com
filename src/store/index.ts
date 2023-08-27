import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import { configureStore, MiddlewareArray  } from '@reduxjs/toolkit';
// import additionalMiddleware from 'additional-middleware';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to local storage fro the web. 
import thunk from "redux-thunk";

import reducers from "./reducers";
import history from "./history";

import { composeWithDevTools } from '@redux-devtools/extension'


const persistConfig = {
    key: 'root',
    storage,
};

// const persistedReducer = persistReducer<import("./reducers").RootState>(persistConfig, reducers)
const persistedReducer = persistReducer(persistConfig, reducers);

const thunkMiddleware = thunk;
const routersMiddleware = routerMiddleware(history)
const middlewares = [thunkMiddleware, routersMiddleware];

// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = composeWithDevTools({trace: true});
// const store = createStore(connectRouter(history)(persistedReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));
const store = createStore((persistedReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: [...middlewares],
// });
// export type RootState = ReturnType<typeof store.getState>

// export default () => {
//     let persistor = persistStore(store)
//     return { store , persistor}
// };
// export let persistor = persistStore(store);
export default store;