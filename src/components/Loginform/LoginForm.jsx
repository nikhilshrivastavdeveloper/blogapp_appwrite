import { useState } from "react"
import { InputBox, Button, Logo, Loader } from "../index.js"
import authService from "../../appwrite/auth.js"
import { login as authLogin } from "../../../app/authSlice.js"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ToastContainer, Bounce } from 'react-toastify';
import { toastError, toastSuccess } from "../toastify.js"

function LoginForm() {
    const dispatch = useDispatch() // send data to store
    const navigate = useNavigate() // navigate user forcefully
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onChange"
    })
    const [loader, setLoader] = useState(false)

    const login = async (data) => {
        setLoader(true)
        try {
            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) dispatch(authLogin(userData))

                toastSuccess("Login Successfully")
                setTimeout(() => {
                    navigate("/")
                }, 2500)

            } else {
                toastError("Invalid credentials. Please check the email and password.")
            }
        } catch (err) {
            toastError(err.message)
        } finally {
            setLoader(false)
            reset() // form reset successfully
        }
    }

    if (loader) {
        return <Loader />
    }

    return (
        <div className='flex items-center justify-center w-full'>

            {/* here is a toast container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex-col justify-center">
                    <div className="flex justify-center w-full">
                        <Logo />
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <form className="mt-8" onSubmit={handleSubmit(login)}>
                        <div className='space-y-5'>
                            <InputBox
                                label="Email : "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                            <InputBox
                                label="Password : "
                                placeholder="Enter your password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    maxLength: {
                                        value: 14,
                                        message: "password should be contain maximum 14 character"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "password should be contain minimum 8 character"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z0-9$@_%&#]+$/,
                                        message: "Password can only contain letters, numbers, and special characters: $ @ _ % & #.",
                                    },
                                })}
                            />
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                            <Button type="submit" className="w-full rounded-full p-[5px] hover:bg-blue-700 text-white">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm