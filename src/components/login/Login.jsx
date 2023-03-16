import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle,signInWithGithub } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <div className="w-[400px] bg-blue-500">
      <div className="flex flex-col p-10 gap-4">
        <input
          type="text"
          className="border border-slate-400 p-3 rounded-lg outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-poçt ünvanı"
        />
        <input
          type="password"
          className="border border-slate-400 p-3 rounded-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrə"
        />
        <button
          className="w-full p-4 rounded-lg border-none outline-none bg-slate-100"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Daxil ol
        </button>
        <button className="w-full p-4 rounded-lg border-none outline-none text-white bg-red-600" onClick={signInWithGoogle}>
          Google ilə daxil ol
        </button>
        <button className="w-full p-4 rounded-lg border-none outline-none text-white bg-black" onClick={signInWithGithub}>
          Github ilə daxil ol
        </button>
        <div className="text-center w-full">
          <Link to="/reset">Şifrəni unutdum</Link>
        </div>
        <div className="text-center w-full">
          Hesabın yoxdur? <Link className="text-white font-bold" to="/register">Qeydiyyatdan keç</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;