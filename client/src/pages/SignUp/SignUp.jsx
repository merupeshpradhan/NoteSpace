import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function userSignUp(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Provide your all detials.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sign up for Note space...");

    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        {
          name,
          email,
          password,
        },
      );

      console.log(data);

      toast.update(toastId, {
        render: "Signup Successfully.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");

      navigate("/signin");
    } catch (error) {
      console.log(error);

      const errorMsg =
        error.response?.data?.message || "Sign up faild. Somthing wen wrong.";
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
        Sign Up
        <form onSubmit={userSignUp} className="grid gap-5 place-items-center">
          <input
            type="text"
            placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1"
          />
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
            Sign Up
          </button>
        </form>
        <Link to="/signIn">Sign In</Link>
      </div>
    </section>
  );
}

export default SignUp;
