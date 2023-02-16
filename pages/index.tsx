import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {JSON.stringify(session)}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
