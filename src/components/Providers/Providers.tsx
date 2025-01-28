"use client";
import { Provider } from "react-redux";
import { store } from "@/Redux/store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "@/Redux/store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>;
}
