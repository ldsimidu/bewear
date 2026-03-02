import Image from "next/image";

import Header from "@/components/common/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <Image
          src="/banners/banner-01.png"
          alt="Banner, Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="p-5">
        <Image
          src="/banners/banner-02.png"
          alt="Banner, Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </>
  );
}
