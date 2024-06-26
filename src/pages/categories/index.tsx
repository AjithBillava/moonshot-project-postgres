import React, { useContext, useEffect, useState } from "react";
import Pagination from "~/components/paginationController";
import { api } from "~/utils/api";
import { AppContext } from "../AppContext";
import withAuth from "~/utils/withAuth";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const userRouteAddCategories = api.user.addCategories.useMutation();
  const userRouteRemoveCategories = api.user.removeCategories.useMutation();

  const { user ,token} = useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetcheduser = api.user.getUser.useQuery({token:token!},{enabled:!!token});

  useEffect(() => {
   
    if (user) {
      const userCategories: string[] | undefined = user?.categories?.map(
        (item) => item?.name,
      );

      userCategories && setSelectedCategories(userCategories);
    } else{
      const categories = fetcheduser.data?.data?.categories.map(
        (item) => item?.name,
      );
      categories && setSelectedCategories(categories)
    }
  }, [fetcheduser.data?.data?.categories, setSelectedCategories, user]);

  const { data: categoriesArray, isLoading } =
    api.category.getCategories.useQuery({
      skip: (currentPage - 1) * 6,
      take: 6,
    });

  const totalCount = api.category.getTotalCount.useQuery().data;
  const totalNumberOfPages = totalCount ? parseInt(`${totalCount / 6}`) : 1;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const newSelectedValues = [...selectedCategories]; // Copy to avoid mutation
    const fetcheduserId = fetcheduser.data?.data?.id;
 
    if (isChecked) {
      newSelectedValues.push(value);
      userRouteAddCategories.mutate({
          userId: fetcheduserId!,
          categoryId: parseInt(e.target.id),
        });
    } else {
      newSelectedValues.splice(newSelectedValues.indexOf(value), 1);
      userRouteRemoveCategories.mutate({
          userId: fetcheduserId!,
          categoryId: parseInt(e.target.id),
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSelectedCategories(newSelectedValues);
    // debugger;
  };

  return (
    <div className="flex justify-center  ">
      <form
        method="post"
        className="mt-10  flex  w-[36rem] flex-col   rounded-[20px] border border-[#C1C1C1] px-[3.75rem] py-10"
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl  font-semibold ">
            Please mark your interests!
          </h1>

          <h4 className="mt-4">We will keep you notified.</h4>
        </div>
        <div className="mb-14 flex flex-col gap-6">
          <h2 className="mt-8 text-2xl font-medium">My Saved Interests</h2>

          {!isLoading &&
            categoriesArray?.map((category) => (
              <div className="flex gap-4 " key={category.id}>
                <input
                  checked={selectedCategories?.includes(`${category.name}`)}
                  onChange={(e) => handleCheckboxClick(e)}
                  className="bg-[#CCCCCC]"
                  type="checkbox"
                  id={`${category.id}`}
                  name={category.name}
                  value={category.name}
                />
                <label htmlFor={`${category.id}`}>{category.name}</label>
              </div>
            ))}

          {isLoading && <div className=" h-60 text-2xl">Loading....</div>}
        </div>

        <Pagination
          totalPages={totalNumberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </form>
    </div>
  );
};

export default withAuth(CategoryPage);
