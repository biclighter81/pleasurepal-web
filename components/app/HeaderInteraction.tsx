import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./interaction/Button";

export default function HeaderInteraction() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <div className="flex space-x-6">
          <Button
            text="Sign Up"
            theme="primary-gradient"
            onClick={() => signIn("keycloak")}
          />
          <Button
            text="Login"
            theme="light-dark"
            onClick={() => signIn("keycloak")}
          />
        </div>
      ) : (
        <Button text="Logout" theme="light-dark" onClick={() => signOut()} />
      )}
    </>
  );
}
