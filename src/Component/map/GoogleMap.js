import React from 'react';
import {Casher} from '../../Services/Casher';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow,

} from "react-google-maps";
import { resolve } from 'path';

export const MapwithGeocode = withScriptjs(withGoogleMap(withGeocode(props =>{
  const {coordinates,isError,isLocationLoadaed}= props;
  return(
    <GoogleMap defaultZoom={13} defaultCenter={coordinates} center = {coordinates} options= {{disableDefaultUI: isError? true : false}} >
        
      { !isError && isLocationLoadaed  && <Circle  center={coordinates} radius = {500}/>}
      {isError && isLocationLoadaed  &&  <InfoWindow position={coordinates} options = {{maxWidth:300}}>
        <div>
            upps, there is a problem to find location on the map, we are trying to resolve the issue
            as fast as possible.
        </div>
      </InfoWindow>}

    </GoogleMap>

  );

})));

function withGeocode(WrappedComponent){
  return class extends React.Component{

    constructor(props){
      super(props);
    
      this.cacher = new Casher();
    }

    state={

      isError: false,
      isLocationLoadaed : false,
      coordinates:{
        lat:0,
        lng:0,
      }
    }
  
  
    componentWillMount(){
      this.getGeocodeLocation();
  
    }

    updateCoordinates(coordinates){
      this.setState({
        coordinates,
        isLocationLoadaed: true,
      })
    }
    geocodeLocation(location){
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolce,reject)=>{
        geocoder.geocode({address: location},(result,status)=>{
          console.log(status)
          if(status === 'ok'){
            
            const geometry = result[0].geometry.location;
            
            const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
            
          
            this.cacher.cacheValue(location,coordinates);
  
            resolve(coordinates);
          }else{
           reject('Error!!!!'); 
          }
      
        });
      });
    }
    getGeocodeLocation(){
      const location = this.props.location;
 

      //if location is cached return cached value
      if(this.cacher.isValueCached(location)){
        this.updateCoordinates(this.cacher.getCachedValue(location));
          
      }
      else{
        this.geocodeLocation(location).then((coordinates)=>{
          this.updateCoordinates(coordinates);
        },
        (error)=>{
              this.setState({isError: true,isLocationLoadaed : true})
        });
    }
    }
  
    render(){
      
      return(
        <WrappedComponent {...this.state}/>
      )
    }

  }
}


