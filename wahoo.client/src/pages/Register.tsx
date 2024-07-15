import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";

function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email")
            setEmail(value);
        else if (name === "password")
            setPassword(value);
        else if (name === "confirmPassword")
            setConfirmPassword(value);
    }

    const toggleToast = () => {
        setShowToast(!showToast);
    }

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        // Validation
        if (!email || !password || !confirmPassword) {
            setToastMessage("Please fill in all fields.");
        } else if (password !== confirmPassword) {
            setToastMessage("Passwords do not match.");
            toggleToast();
        } else {
            if (showToast)
                toggleToast();
            setToastMessage("");
            axios.post("/register", {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    console.log("Register Success");
                    setToastMessage("Register Success");
                    setSuccess(true);
                } 
                else
                    setToastMessage("Registration Error");
            }).catch((error) => {
                if (error.response.data.errors) {
                    if (error.response.data.errors.DuplicateUserName) {
                        setToastMessage(`Email is already registered.`);
                    }
                }
                else
                    setToastMessage("Registration Error. Please try again.");
                setSuccess(false);
                console.log(error);
            }).finally(() => {
                toggleToast();
            });
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src=".\src\assets\wahoo_bg.svg"
                        alt="wahoo logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for a free account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} data-testid="register-form">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email *
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-opacity-100 custom-ring:focus sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password *
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    //  autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-opacity-100 custom-ring:focus sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Confirm Password *
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    //  autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-opacity-100 custom-ring:focus sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md custom-btn px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm custom-btn:hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 custom-outline"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 pb-6">
                        Already a member?{" "}
                        <Link to={"/login"}
                            className="font-semibold custom-colour text-opacity-100 custom-colour:hover"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
                <Alert
                    className="ml-10 md:ml-0 max-w-xs"
                    style={{ display: showToast ? "block" : "none" }}
                    color={success ? "success" : "failure"}
                    onDismiss={toggleToast}
                    data-testid="toast"
                >
                    {toastMessage}
                </Alert>
            </div>

        </div>
    );
}
export default Register;
