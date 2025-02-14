"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
