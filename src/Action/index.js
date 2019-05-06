//import { fetch_rentals } from './types';
import { FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_IDINIT,FETCH_RENTAL_SUCCESS } from './types';

import axios from 'axios';



const get_rentals_by_idinit = ()=>{
    
    return{
        type:FETCH_RENTAL_BY_IDINIT
    }

}

const fetchRentalsSuceess = (rental)=>{
    return{
        type: FETCH_RENTAL_SUCCESS,
        rental
    }
}

const fetchRentalsbyidSu =(rental) =>{
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
} 



export const fetchRentals = ()=>{
    return dispatch =>{
        axios.get('http://localhost:3000/api/v1/rental').then((rental)=>{
            dispatch(fetchRentalsSuceess(rental.data));
        });
    }

    
}




export const get_rentals_by_id = (rentalId)=>{ 

    return function(dispatch){

        dispatch(get_rentals_by_idinit());

        axios.get(`http://localhost:3000/api/v1/rental/${rentalId}`).then((rental)=>{
            
            dispatch(fetchRentalsbyidSu(rental.data));
        });

    }

}
