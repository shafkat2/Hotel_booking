import React from 'react';
import { connect } from 'react-redux';
import * as action from 'Action';
import {RentalDetailInfo} from './RentalDetailInfo';
import {RentalMap} from'./RentalMap';

class RentalDetail extends React.Component {
    
    componentWillMount(){
  
        const rentalid = this.props.match.params.id;  
        this.props.dispatch(action.get_rentals_by_id(rentalid));
    }
    
    
    
    render(){

        const rental = this.props.rentals;

        
        if (rental._id){
            return(
                <section id='rentalDetails'>
                <div className='upper-section'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <img src={rental.image} alt=''></img>
                    </div>
                    <div className='col-md-6'>
                      <RentalMap location ={`${rental.city},${rental.street}`}/> 
                    </div>
                  </div>
                </div>
              
                <div className='details-section'>
                  <div className='row'>
                    <div className='col-md-8'>
                        <RentalDetailInfo rental={rental}/>
                    </div>
                    <div className='col-md-4'> BOOKING</div>
                  </div>
                </div>
              </section>
                  
            )
        }else{
            return(
                <h1>Loading....</h1>
            )
        }
           
        
    }

}



function mapStateToProps(state){

    return{
        rentals: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail)