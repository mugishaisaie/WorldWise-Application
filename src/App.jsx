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
import { CitiesProvider } from './Context/CitiesContext';


// 

function App() {
  
  return (
    <CitiesProvider>
    <BrowserRouter>
    <Routes>

<Route index element={<Homepage />}/>
<Route path='Product' element={<Product />} />
<Route path='Pricing' element={<Pricing />} />
<Route path='/Login' element={<Login />} />
<Route path='app' element={<AppLayout />} >
<Route index element={<Navigate replace to="cities" />} />
<Route path='cities' element={<CityList />} />
<Route path='cities/:id' element={<City />} />
<Route path='countries' element={<CountryList/>} />
<Route path='form' element={<Form />} />

</Route>

    </Routes>
    
    
    </BrowserRouter>
    </CitiesProvider>
   
  )
}

export default App
