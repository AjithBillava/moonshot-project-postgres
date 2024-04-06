import { type ReactNode } from "react";
// import { Footer } from "./Footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col gap-28 bg-white-700 text-slate-50 font-inter">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
