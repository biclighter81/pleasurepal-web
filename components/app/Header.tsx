import Image from "next/image";
import logo from "../../public/logo.svg";
import Navbar from "./Navbar";
import HeaderInteraction from "./HeaderInteraction";

export default function Header() {
  return (
    <>
      <div className="bg-dark w-full h-20 flex items-center px-8 py-4">
        <div className="relative h-12 w-32">
          <Image src={logo} alt="logo" fill />
        </div>
        <div className="ml-16">
          <Navbar />
        </div>
        <div className="flex-grow flex items-center justify-end">
          <HeaderInteraction />
        </div>
      </div>
    </>
  );
}
