import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'


// 
const BASE_URL ="http://localhost:8000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(function(){
    async function FetchCities() {
      try{
         SetIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data)
      }catch{
        alert("Error Occur In Loading Data....");

      }finally{
      SetIsLoading(false)
      }
    }
    FetchCities()
  },[])
  return (
    
    <BrowserRouter>
    <Routes>

<Route index element={<Homepage />}/>
<Route path='Product' element={<Product />} />
<Route path='Pricing' element={<Pricing />} />
<Route path='/Login' element={<Login />} />
<Route path='app' element={<AppLayout />} >
<Route index element={<Navigate replace to="cities" />} />
<Route path='cities' element={<CityList  cities={cities} isLoading={isLoading} />} />
<Route path='cities/:id' element={<City />} />
<Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>} />
<Route path='form' element={<Form />} />

</Route>

    </Routes>
    
    
    </BrowserRouter>
   
  )
}

export default App
