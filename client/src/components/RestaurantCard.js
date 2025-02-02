import React from "react"
import restaurant from "../assets/restaurant.png"
import { NavLink } from "react-router-dom"

function RestaurantCard({id, name, location, HandleViewItemsClick}) {

    return (
        <div className="restaurantDiv">
            <p>Restaurant Number: {id}</p>
            <img className="restaurantImage" src={restaurant} alt={name}/>
            <p>Restaurant Name: {name}</p>
            <p>Location: {location}</p>
            <NavLink id={id} to={`/itemsfromrestaurant/${id}`} className="nav-link"> View Items </NavLink>
        </div>
    )
}

export default RestaurantCard