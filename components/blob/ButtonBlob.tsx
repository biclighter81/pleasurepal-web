import Image from "next/image";
import blob from "../../public/svg/blob.svg";
import Button from "../app/interaction/Button";

export default function ButtonBlob() {
  return (
    <>
      <div className="h-1/2 mt-12 ml-12 mr-12 relative w-fit">
        <Image src={blob} alt="blob" />
        <div className="absolute top-10 left-20 pt-14 right-0 pr-28">
          <h3 className="font-extrabold uppercase text-xl">
            Try our
            <br />
            Discord Bot!
          </h3>
          <div className="w-1/2 h-[3px] bg-white my-2"></div>
          <p className="mb-10">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <Button text="Add To Server" theme="light-dark" />
        </div>
      </div>
    </>
  );
}
