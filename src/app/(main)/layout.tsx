"use client";

import Header from "../ui/products/header";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
      <Provider store={store}>
        <Header />
        <main>
          {children}
        </main>
      </Provider>
    </>
  );
}
