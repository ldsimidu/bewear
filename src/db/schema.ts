import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// 'npx drizzle-kit push' to send the schema to create the corresponding tables in the database (like git push)
// 'npx drizzle-kit studio' to open an ambient that we can see the tables

export const userTable = pgTable("user", {
  id: uuid().primaryKey(),
  name: text().notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull(), // slug example: shoes: The Best Black Shoes of Universe / slug: the-best-black-shoes-of-universe (it needs to be unique)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations between two tables (productTable has a foreign key from categoryTable)
export const categoryRelations = relations(categoryTable, (params) => {
  return {
    // How many products can a category have? Many
    products: params.many(productTable),
  };
});

export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id), // Foreign key
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelations = relations(productTable, (params) => {
  return {
    // How many categorys can a product have? One
    category: params.one(categoryTable, {
      fields: [productTable.categoryId], // Field categoryId from productTable references categoryTable Id
      references: [categoryTable.id],
    }),
    // How many variants can a product have? Many
    variants: params.many(productVariantTable),
  };
});

export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(), // in Cents because of programming language errors (like Node)
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantRelations = relations(
  productVariantTable,
  (params) => {
    return {
      // How many products can a variant have? One
      product: params.one(productTable, {
        fields: [productVariantTable.productId],
        references: [productTable.id],
      }),
    };
  },
);
