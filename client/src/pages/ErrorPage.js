import { useRouteError } from "react-router-dom";
import NavBar from "../components/Navbar";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
        <div>
            <NavBar/>
            <h1>Mr. Stark I don't feel so good...</h1>
        </div>
        </>
    )
}

export default ErrorPage