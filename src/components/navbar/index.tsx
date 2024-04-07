import Image from "next/image";
import React from "react";

export type linkType = {
  title: string;
  path: string;
};

const NavBar = () => {
  const links: linkType[] = [
    {
      title: "Categories",
      path: "/categories",
    },
    {
      title: "Sale",
      path: "/sale",
    },
    {
      title: "Clearance",
      path: "/clearance",
    },
    {
      title: "New stock",
      path: "/new-stock",
    },
    {
      title: "Trending",
      path: "/trending",
    },
  ];
  return (
    <nav className="flex items-baseline justify-between ">
      <div className="text-3xl font-bold pl-10">ECOMMERCE</div>
      <ul className="flex gap-10 pr-36" >
        {links.map(({  title }: linkType) => (
          <li role="button" className="font-semibold" key={title} >
            {" "}
            {title}
          </li>
        ))}
      </ul>
      <div className="relative flex gap-4 pr-10">
      <Image role="button" alt="search-button" src={'/Search.png'} width={30} height={30} />
        <Image role="button" alt="cart-button" src={'/Cart.png'} width={30} height={30} />
      </div>
    </nav>
  );
};

export default NavBar;
