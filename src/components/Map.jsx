import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from './Logo'
import AppNav from './AppNav'
import styles from './Map.module.css'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import { useCities } from '../Context/CitiesContext'

function Map() {
  const navigate = useNavigate();
  const {cities} = useCities()
  const [mapPostion,setMapPostion] = useState([40,0])

  const [searchParams,setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  return (
   <div className={styles.mapContainer} onClick={()=>navigate("form")}>
    <MapContainer center={mapPostion} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=><Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
  </MapContainer>
    
   
   </div>
  )
}

export default Map
