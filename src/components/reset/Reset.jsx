import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
function ResetPassword() {

  const [email, setEmail] = useState('')
  const auth = getAuth();

  const parolSifirlama = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
  }

  return (
    <div className="w-[400px] bg-blue-500 p-10">
      <div className=" flex flex-col items-center gap-4">
        <input className="w-full p-4 rounded-lg border-none outline-none" type="email" placeholder="e-poçt ünvanınız" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full p-4 bg-blue-400 text-white rounded-lg border-none outline-none" type="button" onClick={parolSifirlama}>Sıfırla</button>

      </div>
      <div className="mt-4 text-white text-center">
        Hesabınız yoxdur? <Link className="font-bold" to="/register">Qeydiyyatdan keçin</Link>
      </div>
    </div>
  )
}

export default ResetPassword;