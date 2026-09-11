import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser("");
      }
    }
  }, []);

  return (
    <section className="w-full h-screen grid justify-items-center items-center">
      <div className="">
        <p>
          <span>Name: </span>
          {user.name}
        </p>
        <p><span>Email: </span>{user.email}</p>
      </div>
    </section>
  );
}

export default Profile;
