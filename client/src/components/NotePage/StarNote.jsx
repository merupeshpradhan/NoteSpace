import { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api.js";

function StarNote({ className }) {
  const [star, setStar] = useState(false);
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) return;
    hasFetched.current = true;

    async function fetchStars() {
      try {
        const res = await api.post("/note");
        console.log(res.data.notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStars();
  }, [navigate]);

  async function handleStarNote() {
    try {
      const res = await api.post(`/note/star/${noteId}`);
    } catch (error) {}
  }

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
