import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NoteLeftHeader() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
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
    <section className="h-screen w-65 fixed left-0 top-0 bg-white border-green-700 border-r-2 shadow shadow-cyan-500/50 z-50">
      <div className="p-2 mt-3 text-center">NoteSpace</div>
      <div className="h-3/6 p-2 mt-5 border-b-2 grid gap-2">
        <div className="grid gap-4">
          <button>Study Times</button>
          <button>Marketing Dates</button>
          <button>Movie Watching Dates</button>
        </div>
      </div>
      <div className="h-3/12 grid items-center justify-items-center">
        <h3>User Data</h3>
        <div className="">Profile</div>
        <button
          type="button"
          disabled={loading}
          onClick={handleLogout}
          className="w-44 border-0 rounded-2xl py-1.5 font-bold bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
        >
          {loading ? "Logout..." : "Logout"}
        </button>
      </div>
    </section>
  );
}

export default NoteLeftHeader;
