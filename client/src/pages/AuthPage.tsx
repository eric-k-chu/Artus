import { Logo } from "../components/Logo";
import { AppContext } from "../components/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { type Action, signIn, signUp } from "../lib/api";

type Props = {
  action: Action;
};

export function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  const { handleSignIn } = useContext(AppContext);
  const [error, setError] = useState<unknown>();
  const actionPhrase = action === "sign-in" ? "Sign In" : "Register";

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
      className="mt-20 flex h-full w-64 flex-col items-center gap-y-2 font-poppins"
      onSubmit={handleSubmit}
    >
      <Logo />
      <h1 className="my-4 text-xl">{actionPhrase}</h1>
      <span className="ml-2 text-xs text-red-500">
        {error instanceof Error && error.message}
      </span>
      <div className="flex h-36 w-64 flex-col justify-around rounded-md bg-white p-4 shadow-2xl dark:bg-void">
        <label className="font-raleway">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="w-full rounded-md bg-silver px-2 dark:bg-black/30"
          />
        </label>
        <label className="font-raleway">
          Password:
          <input
            required
            autoFocus
            type="password"
            name="password"
            className="w-full rounded-md bg-silver px-2 dark:bg-black/30"
          />
        </label>
      </div>
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
