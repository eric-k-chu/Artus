import { useState } from "react";
import { signIn, useApp } from "../lib";
import { useNavigate } from "react-router-dom";
import { ErrorNotice } from ".";
import { IoPerson } from "react-icons/io5";

type Props = {
  isMobile?: boolean;
};

export function AdminSignIn({ isMobile }: Props) {
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

  if (isMobile) {
    return (
      <button
        className="flex items-center gap-x-2 rounded-sm bg-l-p p-2 font-poppins text-xs text-white/90 shadow-sm dark:bg-d-p lg:hidden lg:text-sm"
        onClick={signInAsAdmin}
      >
        <IoPerson />
        Sign in as Admin
      </button>
    );
  }

  return (
    <button
      className="hidden items-center gap-x-2 rounded-sm bg-l-p p-2 font-poppins text-xs text-white/90 shadow-sm dark:bg-d-p md:flex lg:text-sm"
      type="button"
      onClick={signInAsAdmin}
    >
      <IoPerson />
      Sign in as Admin
    </button>
  );
}
