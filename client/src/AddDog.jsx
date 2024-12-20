import { useEffect, useState } from "react"
import "./AddDog.css"
import { addDog, getCities, getDogs } from "./apiManager"
import { useNavigate} from "react-router-dom";

export const AddDog = ({setDogs}) => {
    const navigate = useNavigate();
    const [cities, setCities] = useState([])
    useEffect(() => {
        getCities().then(setCities)
    }, [])
    const [newDog, setNewDog] = useState({
        id : 0,
        name : "",
        walkerId : null,
        walker : null,
        cityId : 0,
        city : null
    })
    const handleNameChange = (event) => {
        const copy = {...newDog};
        copy[event.target.name] = event.target.value
        setNewDog(copy)
    }
    const handleCityChange = (event) => {
        const copy = {...newDog};
        copy.cityId = parseInt(event.target.value);
        setNewDog(copy);
    }
    const handleSubmit = () => {
        addDog(newDog).then(() => getDogs()).then((updatedDogs) => {setDogs(updatedDogs);}).then(navigate("/"))
    }
    return (
    <div className="container d-flex">
    <form onSubmit={handleSubmit}>
        <div className="form-group row d-flex add-dog-form">
            <div className="info-group">
            <label for= "name-input" className="col-sm-2 col-form-label label">Name:</label>
            <input type="text" name = "name" onChange={handleNameChange} className="form-control name-input" id="name-input" />
            </div>
            <div className="info-group">
            <label for="city-select" className="col-sm-2 col-form-label label">City:</label>
            <select class="form-control city-select" onChange={handleCityChange}>
                <option value = "0">Select a city..</option>
                {cities.map((city) => {
                    return <option key = {city.id} value = {city.id}>{city.name}</option>
                })}
            </select>
            </div>
            <button type="submit" className="btn btn-outline-secondary submit-time">Submit Dog</button>
            </div>
    </form>
    </div>
    )
}