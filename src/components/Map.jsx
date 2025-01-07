import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from './Logo'
import AppNav from './AppNav'
import styles from './Map.module.css'
import { MapContainer, TileLayer,Marker,Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../Context/CitiesContext'

function Map() {
  
  const {cities} = useCities()
  const [mapPostion,setMapPostion] = useState([40,0])

  const [searchParams,setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat")
  const mapLng = searchParams.get("lng")

  useEffect(()=>{
   if(mapLat && mapLng) setMapPostion([mapLat,mapLng])
  },[mapLat,mapLng])
  return (
   <div className={styles.mapContainer}>
     <MapContainer 
     center={mapPostion}
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
    <ChangeCenter position={mapPostion}/>
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
    click: e=>navigate("form")
  })
}
export default Map
