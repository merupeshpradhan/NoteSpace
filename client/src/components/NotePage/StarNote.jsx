import { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api.js";

function StarNote({ className }) {
  const [star, setStar] = useState(false);
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  async function fetchStars() {
    try {
      const res = await api.post("/note");
      console.log(res.data.notes);
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Please signIn again to access your notes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      console.log(error);
      navigate("/");
    }
  }

  useEffect(() => {
    if (!hasFetched.current) return;
    hasFetched.current = true;

    fetchStars();
  }, [navigate]);

  return (
    <div className={className}>
      {star ? (
        <div onClick={() => setStar(false)}>
          <FaStar />
        </div>
      ) : (
        <div onClick={() => setStar(true)}>
          <FaRegStar />
        </div>
      )}
    </div>
  );
}

export default StarNote;
