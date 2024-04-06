import React from "react";
import NavBar, { type linkType } from "../navbar";
import OfferCarousel from "../offer";

function Header() {
  const links: linkType[] = [
    {
      title: "Help",
      path: "/categories",
    },
    {
      title: "Orders & Returns",
      path: "/sale",
    },
    {
      title: "Hi, John",
      path: "/clearance",
    },
  ];
  return (
    <div>
      <ul className="flex text-sm text-[#333333] justify-end gap-3 pr-10" >
        {links.map((route) => (
          <li key={route.title} >{route.title}</li>
        ))}
      </ul>

      <NavBar />
      <OfferCarousel/>
    </div>
  );
}

export default Header;
