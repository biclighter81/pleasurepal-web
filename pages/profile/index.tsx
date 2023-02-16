import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  const identified = useSearchParams().get("identified");

  useEffect(() => {
    if (identified) {
      router.replace("/profile");
      reloadSession();
    }
  }, [identified]);

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (!session && sessionStatus === "unauthenticated") {
    router.push("/");
  }

  if (sessionStatus === "loading") return <p>Loading...</p>;

  async function unlinkDiscord() {
    const res = await fetch("/api/discord/unlink", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    reloadSession();
  }

  return (
    <>
      <h1>Profile</h1>
      <Link href={process.env.NEXT_PUBLIC_DISCORD_IDENTIFICATION_URL!}>
        <button disabled={session?.discord_uid ? true : false}>
          Discord auth
        </button>
      </Link>
      {session?.discord_uid && (
        <button
          onClick={() => {
            unlinkDiscord();
          }}
        >
          Unlink discord account
        </button>
      )}
      <Link
        href={
          "https://discord.com/api/oauth2/authorize?client_id=1073750713928257538&permissions=2048&scope=bot"
        }
        passHref
        legacyBehavior
      >
        <a target="_blank" rel="noreferrer">
          <button disabled={session?.discord_uid ? false : true}>
            Add bot to server
          </button>
        </a>
      </Link>
    </>
  );
}
