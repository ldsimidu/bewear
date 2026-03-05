import { Landmark } from "lucide-react";
import Image from "next/image";

import CateorySelector from "@/components/common/category-selector";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 p-5">
        <Image
          src="/banners/banner-01.png"
          alt="Banner, Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList products={products} title="Mais vendidos" />

      <div className="p-5">
        <CateorySelector categories={categories} />
      </div>

      <div className="space-y-6 p-5">
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
