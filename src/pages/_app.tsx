import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import AppProvider from "./AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Layout>
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </AppProvider>
  );
};

export default api.withTRPC(MyApp);
