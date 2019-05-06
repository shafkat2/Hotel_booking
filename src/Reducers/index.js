import { rentalReducer,rentalIDReducer } from './Rental-Reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';


export const init = () =>{
    const reducer = combineReducers({
        rentals: rentalReducer,
        rental:  rentalIDReducer,
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
    return store;
}