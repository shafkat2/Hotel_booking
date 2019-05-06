import { FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_IDINIT,FETCH_RENTAL_SUCCESS  } from '../Action/types';
const Initial_state = {

    rentals: {
        data :[]
    },
    rental: {
        data :{}
    }
}

export const rentalReducer = (state = Initial_state.rentals,action) => {

    switch(action.type){
        case FETCH_RENTAL_SUCCESS:
            return {...state, data: action.rental};

        default:
            return state;
    }



}
export const rentalIDReducer = (state =  Initial_state.rental,action) => {
    switch(action.type){
        case FETCH_RENTAL_BY_IDINIT :
            return {...state,data: {}}; 
        case FETCH_RENTAL_BY_ID_SUCCESS:
            return {...state, data: action.rental};
        
           
        default:
            return state;
    }
}