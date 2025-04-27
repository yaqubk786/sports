"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store/index";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
