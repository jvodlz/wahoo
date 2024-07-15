import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { useState } from "react";
import { Alert } from "flowbite-react";

import { useAuth } from "../components/AuthProvider";

function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email")
      setEmail(value);
    if (name === "password")
      setPassword(value);
    if (name === "rememberMe")
      setRememberMe(e.target.checked);
  }

  const { setIsAuthorized } = useAuth();
  const handleLogin = () => {
    setIsAuthorized(true);
    navigate("/wahoo");
  };

  const toggleToast = () => {
    setShowToast(!showToast);
  }

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setToastMessage("Please fill in all fields.");
    }

    else {
      setToastMessage("");

      let loginUrl = "/login?useSessionCookies=true";
      if (rememberMe)
        loginUrl = "/login?useCookies=true";

      axios.post(loginUrl, {
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((data) => {
        console.log(data);
        if (data.status === 200) {
          console.log("Login Success");
          setToastMessage("Login Success");
          setSuccess(true);
          handleLogin();
        }
        else
          setToastMessage("Invalid Credentials");
      }).catch((error) => {
        setToastMessage("Login failed. Please Try again.");
        setSuccess(false);
        console.log(error);
      }).finally(() => {
        toggleToast();
      });

    }
  };


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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"
            method="POST" onSubmit={handleSubmit}
            data-testid="login-form"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
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
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-semibold custom-colour text-opacity-100 custom-colour:hover"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-opacity-100 custom-ring:focus sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex items-center justify-between mb-4 mt-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 rounded border-gray-300 custom-colour ring-opacity-100 custom-ring:focus focus:outline-none"
                    id="rememberMe"
                    name="rememberMe"
                    onChange={handleChange}
                    type="checkbox"
                    checked={rememberMe}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-xs font-semibold text-slate-700"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md custom-btn px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm custom-btn:hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 custom-outline"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 pb-6">
            Not a member?{" "}
            <Link to={"/register"}
              className="font-semibold leading-6 text-opacity-100 custom-colour custom-colour:hover"
            >
              Create an account
            </Link>
          </p>
        </div>

          <Alert
          className="ml-10 md:ml-0 max-w-sm"
            style={{ display: showToast ? "block" : "none" }}
            // color="failure"
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
export default Login;
