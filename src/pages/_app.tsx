import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <main className={`font-sans ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default api.withTRPC(MyApp);
