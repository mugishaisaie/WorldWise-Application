import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from './Logo'
import AppNav from './AppNav'
import styles from './Map.module.css'
import { MapContainer, TileLayer,Marker,Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../Context/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { latLng } from 'leaflet'

function Map() {
  
  const [mapPosition,setMapPosition] = useState([40,0])
  const {cities} = useCities()

  const {isLoading:isLoadingPosition, position:geoLocationPosition,getPosition}= useGeolocation();
  const [ mapLat,mapLng] = useUrlPosition();
  console.log(mapLat, mapLng)

  useEffect(()=>{
    if(geoLocationPosition){
      setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
    }
  },[geoLocationPosition])
  // 

  useEffect(()=>{
   if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])

  return (
   <div className={styles.mapContainer}>
  { !geoLocationPosition && <Button type="position" onClick={getPosition}>
   {isLoadingPosition?'Loading...': 'Use your Position'}
   </Button>}
     <MapContainer 
     center={mapPosition}
    //  center={[mapLat,mapLng]} 

     zoom={5} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(
      <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangeCenter position={mapPosition}/>
    <DetectClick />
  </MapContainer>

   </div>
  )
}


function ChangeCenter({position}){
  const map = useMap();
  map.setView(position)
  return null;

}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click: e=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
export default Map
