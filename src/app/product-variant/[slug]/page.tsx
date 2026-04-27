import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/components/common/header";
import { db } from "@/db";
import { productVariantTable } from "@/db/schema";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: { product: true },
  });
  if (!productVariant) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div>
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl"
        />
      </div>
    </>
  );
};

export default ProductVariantPage;
