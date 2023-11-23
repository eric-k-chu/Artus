import { AppContext, Logo } from "../components";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, useTitle, type Action } from "../lib";
import { FormEvent, useContext, useEffect, useState } from "react";

type Props = {
  action: Action;
};

export function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  const { handleSignIn, user } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<unknown>();
  const actionPhrase = action === "sign-in" ? "Sign In" : "Register";
  useTitle(actionPhrase);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      if (action === "sign-in") {
        const auth = await signIn(username, password);
        if (auth.user && auth.token) handleSignIn(auth);
        navigate("/");
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
      className="mb-28 flex h-full w-72 flex-col items-center justify-center gap-y-4 font-poppins"
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
            error instanceof Error ? "border-red-400" : "border-silver"
          } w-full rounded-md border bg-white p-2 font-raleway dark:bg-black/30`}
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
            error instanceof Error ? "border-red-400" : "border-silver"
          } w-full rounded-md border bg-white p-2 font-raleway dark:bg-black/30`}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <button
        className="mt-2 w-full rounded-md bg-aquamarine p-2 text-black"
        type="submit"
      >
        {actionPhrase}
      </button>

      <div className="fixed bottom-0 flex items-center justify-center gap-x-2 p-6 text-sm">
        <p>{action === "sign-in" ? "Need an account?" : "Have an account?"}</p>
        <button
          onClick={handleClick}
          className="rounded-md border border-silver p-2 font-raleway font-semibold hover:border-gray"
        >
          {action === "sign-in" ? "Register" : "Sign In"}
        </button>
      </div>
    </form>
  );
}
