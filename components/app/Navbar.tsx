import { link } from "fs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { NavbarItem } from "../../lib/types/app";

export default function Navbar() {
  const items: NavbarItem[] = [
    {
      name: "Home",
      href: "/",
      active: true,
    },
    {
      name: "Matchmaking",
      href: "/matchmaking",
      active: false,
    },
    {
      name: "Profile",
      href: "/profile",
      active: false,
    },
  ];
  const router = useRouter();

  return (
    <>
      <div className="flex items-center space-x-8">
        {items.map((item) => (
          <div key={item.href}>
            <Link href={item.href}>
              <span
                className={`uppercase font-bold text-sm ${
                  item.href == router.pathname ? "text-primary-500" : null
                } hover:text-primary-500 transition duration-300 ease-in-out cursor-pointer`}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
