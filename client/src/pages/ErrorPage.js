import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
        <div>
            <h1>Mr. Stark I don't feel so good...</h1>
        </div>
        </>
    )
}

export default ErrorPage