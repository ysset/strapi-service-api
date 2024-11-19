    // Store.js
    
    import {legacy_createStore as createStore} from 'redux';
    import {persistStore, persistReducer} from 'redux-persist';
    import AsyncStorage from '@react-native-community/async-storage';
    
    import rootReducer from './UserReducer.js';
    
    const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
    };
    
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    
    // Create a Redux store holding the state of your app.
    // Its API is { subscribe, dispatch, getState }.
    const createdStore = createStore(persistedReducer);
    const createdPersistor = persistStore(createdStore);
    
    export const store = createdStore;
    export const persistor = createdPersistor;