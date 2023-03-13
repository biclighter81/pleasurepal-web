import ButtonBlob from "@/components/blob/ButtonBlob";
import { signIn, useSession, signOut } from "next-auth/react";
import Button from "../components/app/interaction/Button";

export default function Home() {
  return (
    <>
      <div className="flex">
        <ButtonBlob />
        <div className="flex items-center">
          <div className="h-2/3 flex space-x-4 max-w-2xl">
            <div className="bg-white w-[2px] h-full"></div>
            <div>
              <h2 className="uppercase font-bold text-4xl">Our Philosophy</h2>
              <span className="uppercase font-semibold">What we think!</span>
              <div className="w-1/3 h-[3px] bg-white mt-1"></div>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>
              <div></div>
              <Button theme="white" text="More About" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
