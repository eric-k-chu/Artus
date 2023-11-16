import { Logo } from "../components/Logo";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { type Action, signIn, signUp } from "../lib/api";

type Props = {
  action: Action;
};

export function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  const { handleSignIn } = useContext(AppContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
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
      console.error(err);
    }
  }

  return (
    <div className="container mt-20 flex h-full flex-col items-center gap-y-8 font-poppins">
      <Logo />
      <h1 className="text-2xl">
        {action === "sign-in" ? "Sign In" : "Register"}
      </h1>
      <form
        className="flex h-52 w-64 flex-col justify-around rounded-md bg-white p-4 shadow-2xl dark:bg-void"
        onSubmit={handleSubmit}
      >
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
        <button
          className="mt-2 rounded-md bg-aquamarine text-black"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
