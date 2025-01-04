import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const cats = {
    items: [
      {
        _id: "1",
        slug: "electronics",
        media: {
          mainMedia: {
            image: { url: "https://via.placeholder.com/400x400" },
          },
        },
        name: "Electronics",
      },
      {
        _id: "2",
        slug: "fashion",
        media: {
          mainMedia: {
            image: { url: "https://via.placeholder.com/400x400" },
          },
        },
        name: "Fashion",
      },
      {
        _id: "3",
        slug: "home-decor",
        media: {
          mainMedia: {
            image: { url: "https://via.placeholder.com/400x400" },
          },
        },
        name: "Home Decor",
      },
      {
        _id: "4",
        slug: "toys",
        media: {
          mainMedia: {
            image: { url: "https://via.placeholder.com/400x400" },
          },
        },
        name: "Toys",
      },
    ],
  };

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.media?.mainMedia?.image?.url || "cat.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
