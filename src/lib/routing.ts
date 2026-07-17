const RESUME_ROUTE = "/view-resume";

function stripTrailingSlash(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/** Build an href that respects Vite's BASE_URL. */
export function appHref(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}

/** App-relative pathname (base stripped), always starts with `/`. */
export function getAppPathname(): string {
  const base = stripTrailingSlash(import.meta.env.BASE_URL) || "";
  let path = window.location.pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return stripTrailingSlash(path) || "/";
}

export function isResumeRoute(pathname = getAppPathname()): boolean {
  return pathname === RESUME_ROUTE;
}

export function navigate(path: string, options?: { replace?: boolean }): void {
  const href = appHref(path);
  const nextPath = new URL(href, window.location.origin).pathname;
  if (window.location.pathname === nextPath) return;

  if (options?.replace) {
    window.history.replaceState(null, "", href);
  } else {
    window.history.pushState(null, "", href);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export { RESUME_ROUTE };
