import {NavLink} from "react-router-dom"
import pizza from "../assets/pizza.png"
import dip from "../assets/dip.png"
import footlong from "../assets/footlong.png"
import taco from "../assets/taco.png"

function App() {

    return (
        <div className="home">
        <div className="welcome">
            <h1 className="welcome"> Welcome to FastFeast</h1>
        </div>
        <div className="fastFoodFacts">
            <h2 className="dYK">Did you know ?</h2>
            <div className="fFHist 0">
                <div className="wP"><img className="pizza" src={pizza} alt="pizza"/></div>
                <div className="wL">
                <p>The first modern restaurant, as we know it today, was opened in Paris in 1765 by a man named Boulanger. Before that, public eating establishments were mostly taverns or inns that served basic meals, often with no menu or specific focus on food quality. Boulanger's restaurant was the first to offer a menu of dishes specifically designed to "restore" (the word "restaurant" comes from the French verb restaurer, meaning "to restore") the body, with a focus on high-quality, gourmet meals. His restaurant's success led to the rise of a whole new kind of dining establishment, shaping the modern restaurant industry as we know it today.
                </p>
                <div className="wB">
                <NavLink to="/restaurants" className="nav-link"> To Restaurants </NavLink>
                </div>
                </div>
            </div>
            <div className="fFHist 1">
                <div className="wP"><img className="dip" src={dip} alt="dip"/></div>
                <div className="wL">
                <p>Interestingly, fast food is designed for efficiency-mass production of food allows chains to keep prices low while maintaining a consistent product across locations. Fast food has also became a symbol of the American lifestyle and is now globally pervasive.In the 1990s, the average size of a fast food meal was significantly smaller than it is today, and the trend of "supersizing" meals helped increase calorie counts dramatically.
                </p>
                <div className="wB">
                <NavLink to="/items" className="nav-link"> To Items </NavLink>
                </div>
                </div>
            </div>
            <div className="fFHist 2">
                <div className="wP"><img className="footlong" src={footlong} alt="footlong"/></div>
                <div className="wL">
                    <p> The practice of ordering food to be delivered to your home actually dates back to the early 19th century! In 1791, the first documented "delivery" service was introduced in Paris. A restaurant called "Boulanger" (not to be confused with the restaurant mentioned earlier) began offering meals delivered directly to homes. This was a luxury service, only available to the upper class who could afford it.
                    </p>
                    <div className="wB">
                    <NavLink to="/myCart" className="nav-link"> To Cart </NavLink>
                    </div>
                </div>
            </div>
            <div className="fFHist 3">
                <div className="wP"><img className="taco" src={taco} alt="taco"/></div>
                <div className="wL">
                    <p>The first recorded use of customer reviews dates back to the 18th century! In 1747, the French author and philosopher Voltaire published a satirical work where he humorously described a "reviewer" of products and services. Fast forward to the early 20th century, and the concept of reviews began to gain momentum with the rise of consumer culture and magazines that started publishing reviews of books, films, and products. But it wasn't until the internet boom in the late 1990s and early 2000s that online reviews truly exploded in popularity. 
                    </p>
                    <div className="wB">
                    <NavLink to="/myReviews" className="nav-link"> To Reviews </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default App
