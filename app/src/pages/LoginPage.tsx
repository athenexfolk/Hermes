import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Brand from "../layout/Sidebar/Brand/Brand";

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
    } = useForm<Person>({ defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    // const auth = useAuth()

    const onSubmit = (data: Person) => {
        console.log(data);
        // const { username, password } = data
        // auth.login({ email, password}, () => {
        //   setError('email', {
        //     type: 'manual',
        //     message: 'Email or Password is invalid'
        //   })
        // })
    };

    return (
        <div  className="h-screen justify-center items-center flex flex-col">
            <Brand />
            <div className="h-fit flex justify-center items-center bg-gray-50">

                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white w-fit p-6 rounded-lg shadow ">
                        <div className="mb-4">
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <input
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
                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                            )}

                            {/* <input type="text" className="px-4 py-2 rounded-lg border" placeholder="Username"></input> */}
                        </div>
                        <div className="mb-4">

                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
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
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                            {/* <input type="password" className="px-4 py-2 rounded-lg border" placeholder="Password"></input> */}
                        </div>
                        <div className="mt-10 my-6 relative">
                            <button type="submit" className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold">Login</button>
                        </div>
                        {/* <button className="tex-sm">Sign up</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
