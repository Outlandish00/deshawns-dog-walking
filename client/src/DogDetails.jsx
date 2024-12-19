import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import { getDogById } from "./apiManager";
import "./DogDetails.css"

export const DogDetails = () => {
    const [activeDog, setActiveDog] = useState({});
    const {dogId} = useParams();
    useEffect(() => {
        getDogById(dogId).then(setActiveDog);
    }, [dogId])
    return <div className = "d-flex container">
        <div className="card d-flex dog-details-card">
            <h1>{activeDog.name}</h1>
            <h4>{activeDog.city?.name || "City not available"}</h4>
            <h4>{activeDog.Walker ? `${activeDog.Walker}` : "Walker not assigned"}</h4>
        </div>
    </div>

}