import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth-service";

function SignupPage() {
    const [loginStatus] = useState(!!isLoggedIn());
    const navigate = useNavigate();

    useEffect(() => {
        if (loginStatus) navigate("/");
    }, [loginStatus, navigate]);
    return (
        <div className="h-screen flex justify-center items-center relative">
            <div className="h-screen w-screen overlay-background absolute top-0 left-0 -z-10"></div>

            <div className="bg-white/90 px-16 py-10 rounded-lg shadow flex flex-col">
                <div className="flex flex-col justify-center items-center gap-2 mb-8">
                    <img src={"logo/logo-900.svg"} className="w-16 h-16"></img>
                    <div className="font-bold text-xl">HermesCS</div>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="px-4 py-2 rounded-lg border"
                        placeholder="Username"
                    ></input>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="px-4 py-2 rounded-lg border"
                        placeholder="Password"
                    ></input>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="px-4 py-2 rounded-lg border"
                        placeholder="Confirm Password"
                    ></input>
                </div>
                <div className="my-6 relative">
                    <button
                        type="button"
                        className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
                    >
                        Sign up
                    </button>
                </div>
                <Link to={"/login"} className="flex justify-center">
                    <button className="tex-sm">Back to Login</button>
                </Link>
            </div>
        </div>
    );
}

export default SignupPage;
