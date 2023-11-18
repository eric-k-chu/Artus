// import { Logo } from "../components/Logo";
import { AppContext } from "../components/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useLayoutEffect, useState } from "react";
import { type Action, signIn, signUp } from "../lib/api";

type Props = {
  action: Action;
};

export function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  const { handleSignIn } = useContext(AppContext);
  const [error, setError] = useState<unknown>();
  const actionPhrase = action === "sign-in" ? "Sign In" : "Register";

  useLayoutEffect(() => {
    document.title = actionPhrase + " - Artus";
  }, [actionPhrase]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(e.currentTarget);
    const { username, password } = Object.fromEntries(formData.entries());

    try {
      if (action === "sign-in") {
        const auth = await signIn(username as string, password as string);
        if (auth.user && auth.token) handleSignIn(auth);
        navigate("/");
      } else {
        await signUp(username as string, password as string);
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    <form
      className="flex h-full w-72 flex-col items-center justify-center gap-y-4 font-poppins"
      onSubmit={handleSubmit}
    >
      <img src="/images/artus-dark.png" alt="artus" />
      <span className="mt-2 text-xs text-red-500">
        {error instanceof Error && error.message}
      </span>
      <label>
        <span className="text-sm font-semibold leading-10">Username</span>
        <input
          required
          autoFocus
          type="text"
          name="username"
          className="w-full rounded-md border-thin border-silver bg-white p-2 font-raleway dark:bg-black/30"
        />
      </label>
      <label>
        <span className="text-sm font-semibold leading-10">Password</span>
        <input
          required
          autoFocus
          type="password"
          name="password"
          className="w-full rounded-md border-thin border-silver bg-white p-2 dark:bg-black/30"
        />
      </label>
      <button
        className="rounded-md bg-aquamarine px-2 text-black"
        type="submit"
      >
        {actionPhrase}
      </button>

      <div className="mt-2 flex w-full items-center justify-end gap-x-2">
        <Link
          to={action === "sign-in" ? "/register" : "/sign-in"}
          className="font-raleway"
        >
          {action === "sign-in" ? "need an account?" : "sign in"}
        </Link>
        <button
          className="rounded-md bg-aquamarine px-2 text-black"
          type="submit"
        >
          {actionPhrase}
        </button>
      </div>
    </form>
  );
}
