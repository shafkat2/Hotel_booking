import React from 'react';
import {MapwithGeocode} from 'Component/map/GoogleMap';
import { key } from './google_api';


export class RentalMap extends React.Component{
      
  

    render(){
      const location = this.props.location

        return(
        <MapwithGeocode
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location = {location}
      />
        )
    };

}