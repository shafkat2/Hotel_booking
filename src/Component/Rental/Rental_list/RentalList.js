
import React from 'react';
import { Rentalcard } from './Rentalcard';




 export class RentalList extends React.Component {
    

    RenderRentals(){  

        return this.props.rentals.map((rental,index)=>{
            
            return(
                <Rentalcard key ={index} 
                            rental = {rental}  />
            )

        });
    }
    // AddRental(){
    //     const rentals = this.state.rentals;
    //     rentals.push(1);

    //     this.setState({
    //        rentals: rentals
    //     });
    // }



    render() {

        return (

            <div className='row'>
                {this.RenderRentals()}
            </div>
        )

    }
}

