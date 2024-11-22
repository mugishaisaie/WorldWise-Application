import { createContext,useState,useEffect, useContext } from "react";

createContext
const BASE_URL ="http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({children}){
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

  return <CitiesContext.Provider value={{
    cities,isLoading
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