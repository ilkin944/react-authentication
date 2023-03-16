import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub
} from "../../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("E-poçtunuzu daxil edin");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="w-[400px] bg-blue-700 p-10 rounded-2xl">
      <div className="w-full flex flex-col items-center gap-4">
        <input
          type="text"
          className="w-full p-4 rounded-lg border-none outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tam ad"
        />
        <input
          type="text"
          className="w-full p-4 rounded-lg border-none outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e-poçt ünvanı"
        />
        <input
          type="password"
          className="w-full p-4 rounded-lg border-none outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrə"
        />
        <button className="w-full p-4 rounded-lg border-none outline-none bg-slate-300" onClick={register}>
          Qeydiyyatdan keç
        </button>
        <button
          className="w-full p-4 rounded-lg border-none outline-none text-white bg-red-600"
          onClick={signInWithGoogle}
        >
          Google ilə qeydiyyatdan keç
        </button>
        <button
          className="w-full p-4 rounded-lg border-none outline-none text-white bg-black"
          onClick={signInWithGithub}
        >
          Github ilə qeydiyyatdan keç
        </button>

        <div>
          Hesabınız var? <Link className="text-white font-bold" to="/">Daxil ol</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
