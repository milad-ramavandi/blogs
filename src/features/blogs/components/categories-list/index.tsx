import Link from "next/link";
import ChevronRightIcon from "../icons/chevron-right";
import { ICategory } from "../../types";
import { getBlogsList } from "../../apis/controllers";

const CategoriesList = async ({
  categoriesList,
}: {
  categoriesList: ICategory[];
}) => {
  const blogListResponse = await getBlogsList({ page: 1 });

  return (
    <section className="bg-white/15 backdrop-blur-3xl border border-white/15 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow space-y-6 px-3 py-6 font-light">
      <h2 className="text-[20px] font-normal">All Category</h2>
      <hr className="border-[1px] w-2/5 border-[rgb(207,277,17)]" />
      <div className={"space-y-3"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronRightIcon
              isChevronRight
              className="!text-[rgb(207,255,17)]"
            />
            <Link
              href={"/#tab-search"}
              // scroll={false}
              className="hover:translate-x-4 transition duration-300 text-[14px]"
            >
              All
            </Link>
          </div>
          <span className="text-[14px]">
            ({blogListResponse?.pagination?.total_posts})
          </span>
        </div>
        {categoriesList
          ?.filter((item) => item?.id !== 1)
          .map((category) => {
            return (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ChevronRightIcon
                    isChevronRight
                    className="!text-[rgb(207,255,17)]"
                  />
                  <Link
                    href={{
                      pathname: "/",
                      query: {
                        category: category?.name
                          ?.toLowerCase()
                          .replace(" ", "-"),
                      },
                      hash: "tab-search",
                    }}
                    // scroll={false}
                    className="hover:translate-x-4 transition duration-300 text-[14px]"
                  >
                    {category?.name}
                  </Link>
                </div>
                <span className="text-[14px]">({category?.count})</span>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default CategoriesList;
