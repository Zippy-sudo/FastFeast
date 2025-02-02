function Order({id, name, restaurant, price, amount, item_id, HandleDeleteClick, HandleAddReviewClick}) {

    return (
        <>
        <tr>
            <td>{name}</td>
            <td>{restaurant}</td>
            <td>{price}</td>
            <td>{amount}</td>
            <td>{amount * price}</td>
            <td><button id={id} onClick={HandleDeleteClick}>Delete Order</button></td>
            <td><button id={id} onClick={() => HandleAddReviewClick(item_id)}>Add Review</button></td>
        </tr>
        </>
    )
}

export default Order