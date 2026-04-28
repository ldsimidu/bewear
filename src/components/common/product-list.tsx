import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import ProductItem from "./product-items";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  componentSpace: string;
}

const ProductList = ({ title, products, componentSpace }: ProductListProps) => {
  return (
    <div className={cn("space-y-6", componentSpace)}>
      <h3 className="font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
