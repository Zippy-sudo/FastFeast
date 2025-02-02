import React, {useEffect, useState} from "react";
import NavBar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { v4 as uuidv4 } from "uuid"

function ItemPage() {

const customer_id = 1 

const [itemsList, setItemsList] = useState([])
const [addingItem, setAddingItem] = useState(false)

function HandleAddAnItemClick(){
    setAddingItem(!addingItem)
}

useEffect(() => {
    fetch(`/items`)
    .then((resp) => resp.json())
    .then((list) => {
        setItemsList(list)
    })
}, [addingItem])

    const addItemForm = useFormik({
        initialValues: {
            name:"",
            price:"",
            restaurant_number:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .max(20, "Must be less than  or equal to 20 characters long")
            .min(5, "Must be greater than or equal to 5 characters long")
            .required("Required"),
            price: Yup.number()
            .max(100, "Must be less than  or equal to 100")
            .min(1, "Must be greater than or equal to 1")
            .required("Required"),
            restaurant_number: Yup.number()
            .max(30, "Must be less than  or equal to 30")
            .min(1, "Must be greater than or equal to 1")
            .required("Required"),
        }),
        onSubmit: (values, actions) => {
            fetch('/items', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body:JSON.stringify({name:values["name"], price:values["price"], restaurant_id:values["restaurant_number"]}, null, 2)
            })
            .then(() => {
                alert("Successfully Posted")
                setAddingItem(!addingItem)
                actions.resetForm()
        })
            .catch(error => alert("Error",error))
        console.log(JSON.stringify({name:values["name"], price:values["price"], restaurant_number:values["restaurant_number"]}, null, 2))
}
    })

const itemsListDisplay = itemsList.map(object => {
    return <ItemCard key={uuidv4()} id={parseInt(object.id)} name={object.name} price={object.price} restaurant={object["restaurant"]["name"]} customer_id={customer_id}/>
})

    return (
        <div className="itemPage">
            <header>
                <NavBar />
            </header>
            {addingItem ?
                <div className="addItem"> 
                <form onSubmit={addItemForm.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={addItemForm.handleChange}
                    onBlur={addItemForm.handleBlur}
                    value={addItemForm.values.name}/>
                    {addItemForm.touched.name && addItemForm.errors.name ? <p style={{color: "red"}}>{addItemForm.errors.name}</p>: null}
                    <label htmlFor="price">Price: </label>
                    <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={addItemForm.handleChange}
                    onBlur={addItemForm.handleBlur}
                    value={addItemForm.values.price}/>
                    {addItemForm.touched.price && addItemForm.errors.price ? <p style={{color : "red"}}>{addItemForm.errors.price}</p> : null}
                    <label htmlFor="restaurant_number">Restaurant Number: </label>
                    <input
                    id="restaurant_number"
                    name="restaurant_number"
                    type="number"
                    onChange={addItemForm.handleChange}
                    onBlur={addItemForm.handleBlur}
                    value={addItemForm.values.restaurant_number}/>
                    {addItemForm.touched.restaurant_number && addItemForm.errors.restaurant_number ? <p style={{color : "red"}}>{addItemForm.errors.restaurant_number}</p> : null}
                    <div>
                    <button type="submit">Submit</button>
                    <button onClick={HandleAddAnItemClick}>Back</button>
                    </div>
                </form>
                </div>
            : 
            <>
            <div className="itemSearch">
                <div>
                    <input type="text" placeholder="Search for Item"/>
                </div>
                <button onClick={HandleAddAnItemClick}>Add an item</button>
            </div>
            <div className="actualItems">
            {itemsListDisplay}
            </div>
            </>
            }
        </div>
    )
}

export default ItemPage