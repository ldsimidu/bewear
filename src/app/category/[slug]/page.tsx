import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Header from "@/components/common/header";
import ProductItem from "@/components/common/product-items";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug), //slug from search should be equal to categoryTable slug
  });
  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div>
        <h2 className="justify-center text-center text-2xl font-medium">
          {category.name}
        </h2>
        <div className="grid grid-cols-2 items-center justify-center gap-3 p-5">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
