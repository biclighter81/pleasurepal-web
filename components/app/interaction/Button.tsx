import { useRouter } from "next/router";

export default function Button({
  text,
  onClick,
  theme,
  href,
}: {
  text: string;
  onClick?: () => void;
  href?: string;
  theme?: "primary" | "primary-gradient" | "light-dark" | "white";
}) {
  const router = useRouter();
  const color =
    theme === "primary"
      ? "bg-primary-500"
      : theme === "primary-gradient"
      ? "bg-gradient-to-br from-primary-500 to-secondary-500"
      : theme === "white"
      ? "bg-white text-black"
      : "bg-light-dark";

  return (
    <button
      className={`px-12 py-3 text-sm rounded-full uppercase font-semibold hover:scale-105 transition duration-300 ease-in-out ${color}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (href) {
          router.push(href);
        }
      }}
    >
      {text}
    </button>
  );
}
