import React, { useState } from "react"
import  { useFormik } from "formik"
import * as Yup from 'yup'
import itemIcon from "../assets/itemIcon.png"

function ItemCard({id, name, price, restaurant, customer_id }) {

    const[ordering, setOrdering] = useState(false)

    function HandleAddToCartClick(){
        setOrdering(!ordering)
    }

    const amountForm = useFormik({
        initialValues: {
            amount: 1,
            customer_id: {customer_id},
            item_id: {id}
        },
        validationSchema: Yup.object({
            amount: Yup.number()
            .max(10, "Must be less than 10")
            .min(1, "Must be greater than 1")
            .required("Required")
        }),
        onSubmit: (values, actions) => {
            fetch(`https://fastfeast-app-hma0.onrender.com/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body:JSON.stringify({"amount":values["amount"],"customer_id":parseInt(values["customer_id"]["customer_id"]), "item_id":parseInt(values["item_id"]["id"])}, null, 2)
            })
            .then(resp => resp.json())
            .then(ans => {
                alert("Item Added to Cart")})
            .catch(error => {
                alert(`Did not add Item.\n Error:${error}`)
            })
            actions.resetForm()
            HandleAddToCartClick()
        },
    })

    return (
        <div className="itemDiv">
            <img className="itemImage" src={itemIcon} alt="ItemIcon"/>
            <p>Name: {name}</p>
            <p>KES: {price}</p>
            <p>Restaurant: {restaurant}</p>
            {ordering ?
            <div>
                <form onSubmit={amountForm.handleSubmit}>
                    <label htmlFor="amount">Amount: </label>
                    <input 
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={amountForm.handleChange}
                    onBlur={amountForm.handleBlur}
                    value={amountForm.values.amount}/>
                    {amountForm.touched.amount && amountForm.errors.amount ? <div className="amountError"><p style={{color: "red"}}>{amountForm.errors.amount}</p></div>: null}
                    <div className="buttons">
                        <button onClick={HandleAddToCartClick}>Back</button>
                        <button type="submit">Submit</button>
                    </div>
                </form> 
            </div>
            :<button id={id} onClick={HandleAddToCartClick}> Add to Cart </button>
            }
        </div>
    )
}

export default ItemCard