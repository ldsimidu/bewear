import Image from "next/image";

type Brand = {
  title: string;
  url: string;
};

const brands: Record<string, Brand> = {
  adidas: { title: "Adidas", url: "/brands/simple-icon_adidas.png" },
  nike: { title: "Nike", url: "/brands/simple-icon_nike.png" },
  newbalance: {
    title: "New Balance",
    url: "/brands/simple-icon_newbalance.png",
  },
  puma: { title: "Puma", url: "/brands/simple-icon_puma.png" },
  fila: { title: "Fila", url: "/brands/simple-icon_fila.png" },
  vans: { title: "Vans", url: "/brands/simple-icon_vans.png" },
};

const BrandSelector = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-5 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {Object.entries(brands).map(([key, brand]) => (
          <div
            key={brand.title}
            className="flex w-[110px] shrink-0 flex-col items-center"
          >
            <div className="flex h-[105px] w-[105px] items-center justify-center rounded-[26px] border border-gray-300">
              <Image
                src={brand.url}
                alt={brand.title}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <h3 className="pt-2 text-center font-semibold">{brand.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSelector;
