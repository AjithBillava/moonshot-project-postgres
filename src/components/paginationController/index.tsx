import React, { useState } from "react";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const noOfPagesAtTime = 7;
  const [startindex, setStartindex] = useState(0);
  const [endIndex, setEndIndex] = useState(noOfPagesAtTime);
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  //   const startIndex = (itemsPerPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const [listLength, setListLength] = useState(7);

  console.log("🚀 ~ startindex:", startindex);

  const goToPreviousPage = () => {
    // e.preventDefault();
    setStartindex(startindex <= 0 ? 0 : startindex - noOfPagesAtTime);
    setEndIndex(startindex<= 0 ?noOfPagesAtTime:startindex);
  };
  const goToForwardPage = () => {
    // e.preventDefault();
    setStartindex(endIndex);
    setEndIndex(endIndex + noOfPagesAtTime);
  };

  const goToNextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    if(currentPage>=endIndex) goToForwardPage()
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    if(currentPage<=startindex) goToPreviousPage()

  };
  return (
    <nav>
      <ul className="flex gap-2">
        <li >
          <a className="text-[#ACACAC]" href="#" onClick={goToPreviousPage}>
            {`<<`}
          </a>
        </li>
        <li >
          <a className="text-[#ACACAC]" onClick={goToPrevPage} href="#">
            {`<`}
          </a>
        </li>
        {pageNumbers.slice(startindex, endIndex).map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className={currentPage===pgNumber?'font-bold':'text-[#ACACAC]'}
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li >
            
            <span className="text-[#ACACAC] pr-1">{endIndex>=totalPages?'':'...'}</span>
            
          <a className="text-[#ACACAC]" onClick={goToNextPage} href="#">
            {`>`}
          </a>
        </li>

        <li >
          <a className="text-[#ACACAC]" href="#" onClick={goToForwardPage}>
            {`>>`}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
