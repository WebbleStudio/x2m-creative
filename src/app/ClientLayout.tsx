"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import PageLoader from "@/components/global/PageLoader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
} 