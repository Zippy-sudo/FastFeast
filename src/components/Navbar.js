import { NavLink } from "react-router-dom"
import navIcon from "../assets/navIcon.png"

function NavBar() {
    return (
        <nav className="navBar">
            <div className="logo">
                <img className="navIcon" src={navIcon} alt="navIcon"/>
            <p> FastFeast </p>
            </div>
            <div className="links">
            <NavLink
                 to="/"
                 className="nav-link"
            > Home </NavLink>
            <NavLink
            to="/restaurants"
            className="nav-link"
            > Restaurants </NavLink>
            <NavLink
            to="/items"
            className="nav-link"
            > Items </NavLink>
            <NavLink
            to="/myCart"
            className="nav-link"
            > My Cart </NavLink>
            <NavLink
            to="/myReviews"
            className="nav-link"
            > My Reviews </NavLink>
            </div>
        </nav>
    )
}

export default NavBar