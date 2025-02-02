import React, { useEffect, useState} from "react";
import RestaurantCard from "../components/RestaurantCard";
import NavBar from "../components/Navbar";
import { v4 as uuidv4 } from "uuid"
import ItemsFromRestaurantPage from "./ItemsFromRestaurantsPage";
import { useFormik } from "formik";
import * as Yup from 'yup'

function RestaurantPage() {

    const [restaurants, setRestaurants] = useState([])
    const [addingRestaurant, setAddingRestaurant]  = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/restaurants`)
        .then(resp => resp.json())
        .then(list => {
            setRestaurants(list)
            const loading = () => {
                setLoading(!loading);
              };
              loading()
        })
        .catch(error => {
            alert(error)
        })
    }, [addingRestaurant])

    function HandleViewItemsClick(event) {
        fetch(`/restaurants/${event.target.id}`)
        .then(resp => resp.json())
        .then((dict) => {
            return <ItemsFromRestaurantPage />
        })
        .catch(error => {
            alert(error)
        })
    }

    function HandleAddARestaurantClick(){
        setAddingRestaurant(!addingRestaurant)
    }

    const addRestaurantForm = useFormik({
        initialValues: {
            name:"",
            location:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .max(20, "Must be less than  or equal to 20 characters long")
            .min(5, "Must be greater than or equal to 5 characters long")
            .required("Required"),
            location: Yup.string()
            .max(20, "Must be less than  or equal to 20 characters long")
            .min(5, "Must be greater than or equal to 5 characters long")
            .required("Required"),
        }),
        onSubmit: (values, actions) => {
            fetch('/restaurants', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(() => {
                alert("Successfully Posted")
                setAddingRestaurant(!addingRestaurant)
                actions.resetForm()
        })
            .catch(error => alert("Error",error))
        }
    })

    const restaurantsList = restaurants.map(object => {
        return <RestaurantCard key={uuidv4()} id={object.id} name={object.name} location={object.location} HandleViewItemsClick={HandleViewItemsClick}/>
    })

    return (
        <div className="restaurants">
            <header><NavBar/></header>
            {addingRestaurant ?
                <div className="addRestaurant"> 
            <form onSubmit={addRestaurantForm.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                id="name"
                name="name"
                type="text"
                onChange={addRestaurantForm.handleChange}
                onBlur={addRestaurantForm.handleBlur}
                value={addRestaurantForm.values.name}/>
                {addRestaurantForm.touched.name && addRestaurantForm.errors.name ? <p style={{color: "red"}}>{addRestaurantForm.errors.name}</p>: null}
                <label htmlFor="location">Location: </label>
                <input
                id="location"
                name="location"
                type="text"
                onChange={addRestaurantForm.handleChange}
                onBlur={addRestaurantForm.handleBlur}
                value={addRestaurantForm.values.location}/>
                {addRestaurantForm.touched.location && addRestaurantForm.errors.location ? <p style={{color : "red"}}>{addRestaurantForm.errors.location}</p> : null}
                <div>
                <button type="submit">Submit</button>
                <button onClick={HandleAddARestaurantClick}>Back</button>
                </div>
            </form>
            </div>
            :
            <>
            <div className="restaurantSearch">
                <div><input type="text" placeholder="Search for Restaurant..."/></div>
                <button onClick={HandleAddARestaurantClick}>Add a Restaurant</button>
            </div>
            { loading ? 
                <div className="loading"><p>Loading...</p></div>
            :
                <div className="actualRestaurants">
                {restaurantsList}
                </div>
            }
            </>
        }
        </div>
    )
}

export default RestaurantPage