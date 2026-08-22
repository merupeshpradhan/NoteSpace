import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function userSignIn(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Provide email and password.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sign in for note space...");

    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", {
        email,
        password,
      });

      console.log(res);

      toast.update(toastId, {
        render: "Wellcome to Notes Space.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      setEmail("");
      setPassword("");

      navigate("/notes");
    } catch (error) {
      console.log(error);
      const errorMsg = error?.responese?.data?.message || "Somthing wen wrong.";
      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }
  return (
    <section className="w-full h-screen p-5 grid place-items-center place-content-center">
      <div className="bg-pink-300 grid place-items-center p-5 gap-5">
        <h3>Sign In</h3>
        <form onSubmit={userSignIn} className="grid gap-5 place-items-center">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-0.5"
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-0.5"
          />
          <button type="submit" className="border w-32 px-1 py-0.5">
            Sign In
          </button>
        </form>
        <Link to="/Signup">Sign Up</Link>
      </div>
    </section>
  );
}

export default SignIn;
