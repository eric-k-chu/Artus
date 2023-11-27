import { AppContext, Logo } from "../components";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, useTitle, type Action } from "../lib";
import { FormEvent, useContext, useState } from "react";

type Props = {
  action: Action;
};

export function AuthPage({ action }: Props) {
  const { handleSignIn } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useTitle(action === "sign-in" ? "Sign In" : "Register");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      if (action === "sign-in") {
        const auth = await signIn(username, password);
        if (auth.user && auth.token) handleSignIn(auth);
        navigate("/home");
      } else {
        await signUp(username, password);
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err);
    }
  }

  function handleClick(): void {
    setError(undefined);
    setUsername("");
    setPassword("");
    navigate(action === "sign-in" ? "/register" : "/sign-in");
  }

  return (
    <form
      className="mt-20 flex w-72 flex-col items-center gap-y-4 font-poppins"
      onSubmit={handleSubmit}
    >
      <Logo />
      <span className="mt-2 text-xs text-red-500">
        {error instanceof Error && error.message}
      </span>
      <label>
        <span className="text-sm font-semibold leading-10">Username</span>
        <input
          required
          autoFocus
          value={username}
          type="text"
          name="username"
          className={`${
            error instanceof Error ? "border border-red-400" : "border-hidden"
          } w-full rounded-md border border-l-brdr bg-l-bg-1 p-2 font-raleway shadow-md shadow-l-shdw dark:bg-d-bg-03dp`}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </label>
      <label>
        <span className="text-sm font-semibold leading-10">Password</span>
        <input
          required
          value={password}
          type="password"
          name="password"
          className={`${
            error instanceof Error ? "border border-red-400" : "border-hidden"
          } w-full rounded-md border-l-brdr bg-l-bg-1 p-2 font-raleway shadow-md shadow-l-shdw dark:bg-d-bg-03dp`}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <button
        className="mt-2 w-full rounded-md bg-l-p p-2 text-white/90 shadow-md dark:bg-d-p dark:text-black"
        type="submit"
      >
        {action === "sign-in" ? "Sign In" : "Register"}
      </button>

      <footer className="fixed bottom-0 flex items-center justify-center gap-x-2 p-6 text-sm">
        <p>{action === "sign-in" ? "Need an account?" : "Have an account?"}</p>
        <button
          onClick={handleClick}
          className="rounded-md bg-l-s p-2 font-raleway font-semibold text-black dark:bg-d-s"
        >
          {action === "sign-in" ? "Register" : "Sign In"}
        </button>
      </footer>
    </form>
  );
}
