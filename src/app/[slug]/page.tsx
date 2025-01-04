import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {

  const product = {
    _id: "1234567890",
    name: "Elegant Chair",
    description:
      "A beautifully crafted wooden chair that combines style and comfort for any living space.",
    media: {
      items: [
        { image: { url: "https://via.placeholder.com/500x500" } },
        { image: { url: "https://via.placeholder.com/500x500" } },
        { image: { url: "https://via.placeholder.com/500x500" } },
      ],
    },
    price: {
      price: 299.99,
      discountedPrice: 249.99,
    },
    stock: {
      quantity: 10,
    },
    productOptions: [
      {
        id: "color",
        name: "Color",
        options: ["Black", "White", "Gray"],
      },
      {
        id: "size",
        name: "Size",
        options: ["Small", "Medium", "Large"],
      },
    ],
    variants: [
      {
        id: 1,
        name: "Black - Medium",
        stockNumber: 5,
      },
      {
        id: 2,
        name: "White - Large",
        stockNumber: 3,
      },
    ],
    additionalInfoSections: [
      {
        title: "Specifications",
        description: "Made of premium quality wood with a polished finish.",
      },
      {
        title: "Care Instructions",
        description: "Wipe with a dry cloth. Avoid using abrasive cleaners.",
      },
    ],
  };
  

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        {/* <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default SinglePage;
