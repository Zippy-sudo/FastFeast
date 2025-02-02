import { useCallback, useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"
import NavBar from "../components/Navbar";
import Review from "../components/Review";

function ReviewsPage() {

    const customer_id = 1

    const [reviewsList, setReviewsList] = useState([])
    const [refreshReviewPage, setRefreshReviewPage] = useState(false)
    const [loading, setLoading] = useState(true)

    const JogMe = useCallback(() => {
        setRefreshReviewPage(!refreshReviewPage)
    }, [refreshReviewPage])

    const HandleDeleteClick= useCallback((event) => {
        fetch(`https://fastfeast-app-hma0.onrender.com/reviews/${parseInt(event.target.id)}`, {
            method: "DELETE",
        })
        .then(alert("Review deleted Succesfully"))
        .then(setRefreshReviewPage(!refreshReviewPage))
        .catch(error => alert("Error", error))
    }, [refreshReviewPage])

    useEffect(() => {
        fetch(`https://fastfeast-app-hma0.onrender.com/customers/${customer_id}`)
        .then((resp) => resp.json())
        .then(customer => {
            const loading = () => {
                setLoading(!loading);
              };
              loading()
            setReviewsList(customer["reviews"].map(object => {
                return <Review key={uuidv4()} id={object["id"]} name={object["item"]["name"]} restaurant={object["item"]["restaurant"]["name"]} price={object["item"]["price"]} content={object["content"]} item_id={object["item"]["id"]} HandleDeleteClick={HandleDeleteClick} customer_id={customer_id} JogMe={JogMe}/>
            }))
        })
    }, [refreshReviewPage, HandleDeleteClick, JogMe])
    return (
        <div className="reviewsPage">
            <header>
                <NavBar/>
            </header>
            {loading ? 
            <div className="loading"><p>Loading...</p></div>
            :
            <div className="actualReviews">
            {reviewsList}
            </div>
            }
        </div>
    )
}

export default ReviewsPage