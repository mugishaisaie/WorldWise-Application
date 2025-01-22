import { createContext,useState,useEffect, useContext } from "react";

createContext
const BASE_URL ="http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [currentCity,setCurrentCity] = useState({})

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

  async function GetCity(id) {
    try{
       SetIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data)
    }catch{
      alert("Error Occur In Loading Data....");

    }finally{
    SetIsLoading(false)
    }
  }
  async function createCity(newCity) {
    try{
      SetIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`,{
        method:"POST",
        body: JSON.stringify(newCity),
        headers:{
         "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setCurrentCity(data)
      setCities((cities)=>[...cities,data])
    }catch{
      alert("Error Occur In Creating City....");

    }finally{
    SetIsLoading(false)
    }
  }
  async function deleteCity(id) {
    try{
      SetIsLoading(true)
     await fetch(`${BASE_URL}/cities/${id}`,{
        method:"DELETE",
      });
      
      setCities(cities.filter((city)=> city.id !== id));
    }catch{
      alert("Error Occur In Deleting City....");

    }finally{
    SetIsLoading(false)
    }
  }

  return <CitiesContext.Provider value={{
    cities,isLoading,currentCity,
    GetCity,createCity,deleteCity
  }}>
    {children}
  </CitiesContext.Provider>
}

function useCities(){
  const context = useContext(CitiesContext);
  if(context === undefined)throw new Error("CitiesContext was used outside of CitiesProvider")

    return context;
}

export {CitiesProvider,useCities};