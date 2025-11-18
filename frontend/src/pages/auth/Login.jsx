import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Login() {
 const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const role = await login(email, password); 
      if (role === "patient") navigate("/patient");
      else if (role === "doctor") navigate("/doctor");
      else navigate("/");

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <>
      <Header />

      <section className="bg-gray-200 min-h-screen flex flex-col items-center ">
        <div className="w-full max-w-xl px-4 pt-25 ">
          <Breadcrumbs />
        </div>

        <div className="bg-white rounded-lg shadow-md w-full max-w-md px-8 py-6  ">
          <h1 className="text-3xl text-[#4F46E5] font-semibold text-center">
            Welcome Back
          </h1>

          <h3 className="text-2xl py-4 font-medium text-center ">
            Sign in to your account
          </h3>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-md font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-2xl"
                required
              />
            </div>

            <div className="flex justify-end">
              <a
                className="text-blue-500 hover:underline"
                href="/forgotpassword"
              >
                Forgot Password?
              </a>
            </div>

            <div className="text-center">
              <button className="w-full rounded-lg p-1 text-2xl text-white bg-blue-400 hover:bg-blue-600 cursor-pointer">
                Submit
              </button>
            </div>

            <div>
              <p>
                Don't have an account ?
                <a
                  className="text-blue-800 hover:underline px-1"
                  href="/signup"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
