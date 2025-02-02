import { useEffect, useState } from "react"
import NavBar from "../components/Navbar"
import ItemCard from "../components/ItemCard"
import { v4 as uuidv4 } from "uuid"

function ItemsFromRestaurantPage() {

    const customer_id = 1

    const rId = window.location.href

    const [itemsFromRestaurantlist, setItemsFromRestaurantlist] = useState([])
    
    useEffect(() => {
        fetch(`/restaurants/${rId.slice(42)}`)
        .then(resp => resp.json())
        .then(restaurant => {
            const resName = restaurant["name"]
            setItemsFromRestaurantlist(restaurant["items"].map(object => {
                return <ItemCard key={uuidv4()} id={object.id} name={object.name} price={object.price} restaurant={resName} customer_id={customer_id}/>
            }))
        })
    }, [])

    return (
        <div className="itemsFromRestaurant">
            <header>
                <NavBar/>
            </header>
            <div className="actualItems">
                {itemsFromRestaurantlist}
            </div>
        </div>
    )
}

export default ItemsFromRestaurantPage