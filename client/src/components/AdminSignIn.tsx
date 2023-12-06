import { useState } from "react";
import { signIn, useApp } from "../lib";
import { useNavigate } from "react-router-dom";
import { ErrorNotice } from ".";

export function AdminSignIn() {
  const { handleSignIn } = useApp();
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  async function signInAsAdmin() {
    try {
      const auth = await signIn("admin", "password1");
      if (auth.user && auth.token) handleSignIn(auth);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  }

  if (error) {
    return (
      <div className="-mt-60">
        <ErrorNotice error={error} />
      </div>
    );
  }

  return (
    <button
      className="rounded-sm bg-l-p p-2 font-poppins text-xs shadow-sm dark:bg-d-p lg:text-sm"
      type="button"
      onClick={signInAsAdmin}
    >
      Sign in as Admin
    </button>
  );
}
