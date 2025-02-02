import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'

function Review({id, name, restaurant, price, content, item_id, customer_id, HandleDeleteClick, JogMe}) {

    const [editReview, setEditReview] = useState(false)

    function HandleEditSubmit() {
        setEditReview(!editReview)
    }

    const editReviewForm = useFormik({
        initialValues: {
            edit:'',
            customer_id: {customer_id},
            item_id: {item_id}
        },
        validationSchema: Yup.object({
            edit: Yup.string()
            .max(25,"Must be 25 characters or less")
            .min(4, "Must be 4 characters or longer")
            .required("Required")
        }),
        onSubmit: (values, actions) => {
            fetch(`/reviews/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "Application/JSON",
                },
            body:JSON.stringify({content:values["edit"], customer_id:values["customer_id"]["customer_id"], item_id:values["item_id"]["item_id"]}, null, 2)
        })
        .then(() => {
            alert("Patched Successfully")
            JogMe()
        })
        .catch(error => (`Failed to patch ${error}`))
        actions.resetForm()
        HandleEditSubmit()
        }
    })

    return (
        <div className="review">
            <div className="header">
                <p>Name: {name}</p>
                <p>Restaurant: {restaurant}</p>
                <p>Price: {price}</p>
            </div>
            <div className="content">
                <p>{content}</p>
            </div>
            {editReview ? 
            null
            :
            <div className="buttons">
            <button id={id} className="edit" onClick={HandleEditSubmit}>Edit</button>
            <button id={id} className="delete" onClick={HandleDeleteClick}>Delete</button>
        </div>
            }
            {editReview ? 
            <div>
                <form onSubmit={editReviewForm.handleSubmit}>
                    <label htmlFor="edit">Content: </label>
                    <input
                    id="edit"
                    name="edit"
                    type="text"
                    onChange={editReviewForm.handleChange}
                    onBlur={editReviewForm.handleBlur}
                    value={editReviewForm.values.edit}/>
                    {editReviewForm.touched.edit && editReviewForm.errors.edit ? <p style={{color: "red"}}>{editReviewForm.errors.edit}</p> : null}
                    <div className="divEditButtons">
                        <button onClick={HandleEditSubmit}>Back</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            : null}
        </div>
    )
}

export default Review