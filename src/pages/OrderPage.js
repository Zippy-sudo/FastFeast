import { useCallback, useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { v4 as uuidv4 } from "uuid"
import Navbar from "../components/Navbar"
import Order from "../components/Order"

function OrderPage(){

    const customer_id = 1

    const [refreshPage, setRefreshPage] = useState(false)
    const [ordersList, setOrdersList] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)
    const [addReview, setAddReview] = useState(false)
    const [item_id, setItem_id] = useState(0)
    const [loading, setLoading] = useState(true)

    const HandleAddReviewClick = useCallback((a) => {
        setAddReview(!addReview)
        setItem_id(a)
    }, [addReview])

    const HandleDeleteClick = useCallback((event) => {
        fetch(`/orders/${parseInt(event.target.id)}`, {
            method: "DELETE",
        })
        .then(() => {
            setRefreshPage(!refreshPage)
            alert("Delete Successful")
    })
        .catch(error => {
            alert("Delete Failed")
            console.log(error)
        })
    }, [refreshPage])

    useEffect(() => {
        fetch(`/customers/${customer_id}`)
        .then(resp => resp.json())
        .then(customer => {
            const loading = () => {
                setLoading(!loading)
              };
            loading()
            setOrdersList(customer["orders"].map(object => {
                return <Order key={uuidv4()} id={object["id"]} name={object["item"]["name"]} restaurant={object["item"]["restaurant"]["name"]} price={object["item"]["price"]} amount={object["amount"]} item_id={object["item_id"]} HandleDeleteClick={HandleDeleteClick} HandleAddReviewClick={HandleAddReviewClick}/>
            }))
            let a = 0
            for (let orders = 0; orders < (customer["orders"]).length ; orders++) {
                a += (parseInt(customer["orders"][orders]["item"]["price"]) * parseInt(customer["orders"][orders]["amount"]))
            }
            setGrandTotal(a)
        })
        .catch(error => alert("Error", error))
    }, [refreshPage, HandleAddReviewClick, HandleDeleteClick])

    const addReviewForm = useFormik({
        initialValues: {
            content:'',
            customer_id: {customer_id},
            item_id: {item_id}
        },
        validationSchema: Yup.object({
            content: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(4, 'Must be 4 characters or longer')
            .required('Required')
        }),
        onSubmit: (values, actions) => {
            fetch('/reviews', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body: JSON.stringify({content:values["content"], customer_id:parseInt({customer_id}["customer_id"]), item_id:parseInt({item_id}["item_id"])}, null, 2)
            })
            .then(resp => resp.json())
            .then(ans => {
                alert("Review Added")
                actions.resetForm()
            })
            .catch(error => alert("Error", error))
            console.log()
        }
    })

    return(
        <div className="orderPage">
            <header>
                <Navbar/>
            </header>
            <div className="actualOrders">
                {loading ?
                <div className="loading"><p>Loading...</p></div>
                : 
                <>
                <table className="orders">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Restaurant</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {ordersList}
                    </tbody>
                </table>
                <div className="ordersTotal">
                    <div>
                    <p>Grand Total:</p>
                    </div>
                    <div className="actualTotal">
                        <p>{grandTotal} (KES)</p>
                    </div>
                    <button>Pay</button>
                    </div>
                    </>
                }
                {addReview ?
                    <div className="addReview">
                            <form onSubmit={addReviewForm.handleSubmit}>
                                <label htmlFor="content">Content: </label>
                                <input
                                id="content"
                                name="content"
                                type="text"
                                onChange={addReviewForm.handleChange}
                                onBlur={addReviewForm.handleBlur}
                                value={addReviewForm.values.content}/>
                                {addReviewForm.touched.content && addReviewForm.errors.content ? <p style={{color: "red"}}>{addReviewForm.errors.content}</p> :null}
                                <div className="reviewButtons">
                                    <button onClick={HandleAddReviewClick}>Back</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                    </div> 
                : null}
            </div>
        </div>
    )
}

export default OrderPage