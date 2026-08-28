import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignOut() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    setLoading(true);
    const toastId = toast.loading("Logout...");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/logout",
        {},
        { withCredentials: true },
      );

      setLoading(false);
      const successMsg = res.data?.message || "Logout successfully!";
      toast.update(toastId, {
        render: successMsg,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);

      setLoading(false);
      const errorMsg = error?.response?.data?.message || "somting went wrong!";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <section>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="w-44 border-0 rounded-2xl py-1.5 font-bold bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
      >
        {loading ? "Logout..." : "Logout"}
      </button>
    </section>
  );
}

export default SignOut;
