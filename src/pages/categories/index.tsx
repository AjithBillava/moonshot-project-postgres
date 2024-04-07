/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FormInputTextbox from "~/components/formInput";
import Pagination from "~/components/paginationController";
import { api } from "~/utils/api";
// import { getCategories } from '../api/categories'

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const {
    isLoading,
    error,
    data: categoriesArray,
    refetch,
  } = api.category.getCategories.useQuery({ skip: (currentPage - 1) * 6, take: 6 });

  const totalCount = api.category.getTotalCount.useQuery().data
  const totalNumberOfPages = totalCount? parseInt( `${totalCount/6}`):1;
  const pageNumberArray = Array.from({ length: 100 }, (_, i) => i + 1);
  //   const categoriesArray = data;
  console.log("🚀 ~ Home ~ categories:", categoriesArray,totalCount,totalNumberOfPages);
  return (
    <div className="flex justify-center  ">
      <form
        method="post"
        className="mt-10  flex  w-[36rem] flex-col   rounded-[20px] border border-[#C1C1C1] px-[3.75rem] py-10"
      >
       <div className="flex justify-center flex-col items-center">
       <h1 className="text-3xl  font-semibold ">Please mark your interests!</h1>

<h4 className="mb-6">We will keep you notified.</h4>

       </div>
        <div className="flex flex-col gap-6 mb-14">
          <h2 className="mt-8 text-2xl font-medium">My Saved Interests</h2>

          {categoriesArray?.map((category) => (
            <div className="flex gap-4 " key={category.id} >
              <input className="bg-[#CCCCCC]" type="checkbox" id={`${category.id}`} name={category.name} value={category.name} />
              <label htmlFor={`${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
           
      </form>
    </div>
  );
};

export default CategoryPage;
