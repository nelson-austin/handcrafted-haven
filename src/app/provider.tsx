"use client";

import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Source_Sans_3 } from "next/font/google";
import { Provider } from "react-redux";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <body className={`${source_sans_3.className} antialiased`}>
        {children}
      </body>
    </Provider>
  );
}

export function NextAuthProvider({ session, children }: {
  session: any,
  children: React.ReactNode,
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
