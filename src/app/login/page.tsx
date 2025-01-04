"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import modalNotification from "@/utility/notification";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/features/auth.slice";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mode, setMode] = useState(MODE.LOGIN);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  // Handle Login
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post("http://localhost:5050/api/customer/login", {
        email,
        password,
      });
      if (response.data?.status === 200) {
        modalNotification({
          type: "success",
          message: "Login success",
        });
        dispatch(loginSuccess(response.data.data));
        router.push('/');
      } else {
        modalNotification({
          type: "warning",
          message: response.data?.message,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      modalNotification({
        type: "error",
        message: "Invalid credentials",
      });
      setError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post("http://localhost:5050/api/customer/signup", {
        name,
        email,
        password,
        phonNumber,
        gender,
      });
      if (response.data?.status === 201) {
        modalNotification({
          type: "success",
          message: "Registration success",
        });
        setMessage("Registration successful. Please log in.");
        setMode(MODE.LOGIN);
      } else {
        modalNotification({
          type: "warning",
          message: response.data?.message,
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
      modalNotification({
        type: "error",
        message: "Registration failed",
      });
      setError("Failed to register. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {mode !== MODE.EMAIL_VERIFICATION && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.REGISTER && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                className="ring-2 ring-gray-300 rounded-md p-4"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                className="ring-2 ring-gray-300 rounded-md p-4"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}
        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
          type="button"
          onClick={() => (mode === MODE.LOGIN ? handleLogin() : handleRegister())}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
