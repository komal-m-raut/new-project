"use client";

import { useAuth } from "@/hooks/useTenantAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const nonAuthRoutes = ["/store/login", "/store/register"];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    if (user) {
      if (nonAuthRoutes.includes(pathname)) {
        router.push("/store/dashboard");
      }
      setIsPending(false);
    } else {
      if (!nonAuthRoutes.includes(pathname)) {
        router.push("/store/login");
      }
      setIsPending(false);
    }
  }, [pathname]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthLayout;
