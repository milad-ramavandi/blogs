"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};

export default Providers;
