"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>
          Sto misurando la lunghezza del tuo pistolone per essere sicuro che non
          sia fuorilegge...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return children;
}

export default MainLayout;
