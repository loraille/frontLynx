import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux'
import user from '../reducers/user';

import { GoogleOAuthProvider } from '@react-oauth/google';


import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { user },
});
// const reducers = combineReducers({ user });
const persistConfig = { key: 'lynX', storage };
// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
// });
// const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="xxx">

    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <Head>
          <title>Next.js App</title>
        </Head>
        <Component {...pageProps} />

      {/* </PersistGate> */}
    </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
