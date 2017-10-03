import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';

const store = createStore(reducers, {}, compose(
    applyMiddleware(ReduxThunk),
    autoRehydrate()

    ));

// add .purge() at the end if you want to remove persist
persistStore(store, {storage: AsyncStorage, whitelist:['likeJobs']});

export default store;
