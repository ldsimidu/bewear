import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6 px-6 py-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vm"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl"
        />

        <VariantSelector
          variantSelectedSlug={productVariant.slug}
          variants={productVariant.product.variants}
        />

        <div>
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="mt-2 text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <QuantitySelector />

        <div className="flex flex-col space-y-4">
          <Button
            className="h-[50px] rounded-full border-gray-500"
            size="lg"
            variant="outline"
          >
            Adicionar a sacola
          </Button>
          <Button className="h-[50px] rounded-full">Comprar agora</Button>
        </div>

        <div>
          <p>{productVariant.product.description}</p>
        </div>

        <ProductList
          title="You might also like"
          products={likelyProducts}
          componentSpace="mt-5"
        />
      </div>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
