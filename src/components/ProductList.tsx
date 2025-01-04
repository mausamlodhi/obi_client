'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

const PRODUCT_PER_PAGE = 8;

interface productInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const [products, setProducts] = useState<productInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5050/api/product`)
        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          setError("Failed to load products.");
        }
      } catch (err) {
        setError("An error occurred while fetching products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product: productInterface) => (
        <Link
          href="" // Adjust the link to the product detail page
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.image || "/product.png"}
              alt={product.title}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.title}</span>
            <span className="font-semibold">${product.price}</span>
            {/* <span className="font-semibold">{product.description}</span> */}
          </div>
          {/* Render sanitized HTML description if necessary */}
          {/* {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )} */}
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/${product.id}`)
            }}
          >
            View product
          </button>
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* Pagination Component (optional) */}
      {/* {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={mockProducts.currentPage || 0}
          hasPrev={mockProducts.hasPrev()}
          hasNext={mockProducts.hasNext()}
        />
      ) : null} */}
    </div>
  );
};

export default ProductList;
