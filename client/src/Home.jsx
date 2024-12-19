import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import "./Home.css"
import { Link } from "react-router-dom";
export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
getDogs().then(setDogs);
  }, []);

  return <div className="d-flex container gap-5 align-items-center card-container">
      {dogs.map((dog) => {
        return <div className="card"><Link to ={`dogs/${dog.id}`}>{dog.name}</Link></div>
      })}
  </div>
}
