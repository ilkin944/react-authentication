import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { signOut } from "firebase/auth";


function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };


  const logout = () => {
    signOut(auth);
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div className="w-[400px]">
      <div className="w-full flex flex-col items-center gap-4">
        Giriş etdi
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="w-full border-none outline-none text-white bg-red-700" onClick={logout}>
          Çıxış
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
