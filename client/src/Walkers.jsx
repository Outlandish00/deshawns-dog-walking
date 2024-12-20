import { useContext, useEffect, useState } from "react"
import { getCities, getWalkerCities, getWalkers } from "./apiManager";
import { useOutletContext } from "react-router-dom";

export const Walkers = () => {
    const [ allWalkers, setAllWalkers] = useState([]);
    const [walkerCities, setWalkerCities] = useState([])
    const [filteredWalkers, setFilteredWalkers] = useState([])
    const [cities, setAllCities] = useState([]);
    let { selectedCityId } = useOutletContext();;
    console.log('Selected City ID:', selectedCityId);


    useEffect(() => {
        getWalkers().then((res) => {
            setAllWalkers(res);
            setFilteredWalkers(res);
        })
        
    }, [])

    useEffect(() => {
        getWalkerCities().then(setWalkerCities)
    }, [])

    useEffect(() => {
        getCities().then(setAllCities);
    }, [])

    useEffect(() => {
        const filteredCityWalkers = []
        if (selectedCityId == 0)
        {
            setFilteredWalkers(allWalkers)
        }
        else {const cityFilteredWalkerCities = walkerCities.filter((walkerCity) => walkerCity.cityId == selectedCityId)
            for (const walkerCity of cityFilteredWalkerCities) {
                const matchingWalker = allWalkers.find(
                    (walker) => walker.id == walkerCity.walkerId
                );
                        
                            filteredCityWalkers.push(matchingWalker)
                        
                }
                setFilteredWalkers(filteredCityWalkers)
            }
            

    }, [selectedCityId])


return(
    <div className="container">
<div className="d-flex container gap-5 align-items-center card-container">
    {filteredWalkers.map((walker) => {
        return <div className="card">{walker.name}</div>
    })}
</div>
</div>)

}