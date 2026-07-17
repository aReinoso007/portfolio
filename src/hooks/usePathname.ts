import { useEffect, useState } from "react";
import { getAppPathname } from "../lib/routing";

export function usePathname(): string {
  const [pathname, setPathname] = useState(getAppPathname);

  useEffect(() => {
    const onChange = () => setPathname(getAppPathname());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return pathname;
}
