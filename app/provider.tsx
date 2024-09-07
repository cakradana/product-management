"use client";

import store from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMonted] = useState(false);

  useEffect(() => {
    setMonted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
