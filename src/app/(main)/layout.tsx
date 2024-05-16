"use client";
// import type { Metadata } from "next";
import Header from "../ui/products/header";
import store from "../../redux/store";
import { Provider } from "react-redux";
import styles from "../page.module.css";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login into Handcrafted Haven or Sign Up",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <div
          className={`${styles.fixedHeader} sticky top h-25 bg-green-900 rounded-lg m-3 md:h-28 `}
        >
          <Header />
        </div>
        <main>{children}</main>
      </Provider>
    </>
  );
}
