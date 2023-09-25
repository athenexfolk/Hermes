import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, login } from "../services/auth-service";
import { ErrorResponse } from "../models/response";
import { useEffect, useState } from "react";
function LoginPage() {
    type Person = {
        username: string;
        password: string;
    };

    const schema: yup.ObjectSchema<Person> = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const defaultValues: Person = {
        username: "",
        password: "",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Person>({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    // const auth = useAuth()

    const onSubmit = (data: Person) => {
        console.log(data);
        const { username, password } = data;
        login(username, password)
            .then(() => {
                console.log("success");
                navigate("/");
            })
            .catch((e: ErrorResponse) => {
                // TODO: ECHO ERROR TO FRONT OF PAGE
                console.log(e.msg);
                console.log(e.error);
            });
    };
const [loginStatus] = useState(!!isLoggedIn())
    const navigate = useNavigate()

    useEffect(() => {
        if(loginStatus) navigate('/')
    }, [loginStatus, navigate])


    return (
        <div className="h-screen flex justify-center items-center relative">
            <div className="h-screen w-screen overlay-background absolute top-0 left-0 -z-10"></div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="bg-white/90 px-16 py-10 rounded-lg shadow flex flex-col">
                    <div className="flex flex-col justify-center items-center gap-2 mb-8">
                        <img src={"logo/logo-900.svg"} className="w-16 h-16"></img>
                        <div className="font-bold text-xl">HermesCS</div>
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <input
                                    type="text"
                                    className="px-4 py-2 rounded-lg border"
                                    id="login-username"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    placeholder="Username"
                                />
                            )}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">
                                {errors.username.message}
                            </p>
                        )}

                        {/* <input type="text" className="px-4 py-2 rounded-lg border" placeholder="Username"></input> */}
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <input
                                    className="px-4 py-2 rounded-lg border"
                                    id="login-password"
                                    type="password"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    placeholder="Password"
                                />
                            )}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                        {/* <input type="password" className="px-4 py-2 rounded-lg border" placeholder="Password"></input> */}
                    </div>
                    <div className="my-6 relative">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
                        >
                            Login
                        </button>
                    </div>
                    <Link to={"/signup"} className="flex justify-center">
                        <button className="tex-sm">Sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
