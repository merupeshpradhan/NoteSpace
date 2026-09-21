import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function StarNote({ className }) {
  const [star, setStar] = useState(false);
  function handleStarNote() {
    try {
    } catch (error) {}
  }

  return (
    <div className={className}>
      {star ? (
        <div onClick={() => setStar(false)}>
          <FaStar />
        </div>
      ) : (
        <div  onClick={() => setStar(true)}>
            <FaRegStar />
        </div>
      )}
    </div>
  );
}

export default StarNote;
