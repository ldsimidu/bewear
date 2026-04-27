import { desc } from "drizzle-orm";
import { Landmark } from "lucide-react";
import Image from "next/image";

import BrandSelector from "@/components/common/brand-selector";
import CateorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  const nearlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 4,
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="space-y-6">
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

        <BrandSelector />
        <ProductList products={products} title="Mais vendidos" />

        <div className="p-5">
          <CateorySelector categories={categories} />
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

        <ProductList products={nearlyCreatedProducts} title="Novos produtos" />

        <Footer />
      </div>
    </>
  );
}
