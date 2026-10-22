import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type RouteState = {
  path: string;
  hash: string;
  key: number;
};

type NavigateOptions = {
  replace?: boolean;
};

type RouterValue = {
  path: string;
  hash: string;
  navigate: (to: string, options?: NavigateOptions) => void;
  scrollToSection: (id: string, smooth?: boolean) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function readLocation(): RouteState {
  return {
    path: normalizePath(window.location.pathname),
    hash: window.location.hash.replace(/^#/, ""),
    key: 0,
  };
}

function scrollToHash(hash: string, smooth: boolean) {
  const target = document.getElementById(hash);
  if (!target) return false;
  target.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
  return true;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteState>(readLocation);

  useEffect(() => {
    const onPopState = () => {
      setRoute((current) => ({
        ...readLocation(),
        key: current.key + 1,
      }));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (route.hash) {
        scrollToHash(route.hash, false);
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 70);
    return () => window.clearTimeout(timer);
  }, [route.key]);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const url = new URL(to, window.location.href);
    const targetPath = normalizePath(url.pathname);
    const formattedPath =
      targetPath === "/" ? "/" : `${targetPath}/`;
    const nextUrl = `${formattedPath}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      if (options?.replace) {
        window.history.replaceState({}, "", nextUrl);
      } else {
        window.history.pushState({}, "", nextUrl);
      }
    }

    setRoute((current) => ({
      path: targetPath,
      hash: url.hash.replace(/^#/, ""),
      key: current.key + 1,
    }));
  }, []);

  const scrollToSection = useCallback((id: string, smooth = true) => {
    if (!scrollToHash(id, smooth)) return;
    window.history.replaceState({}, "", `${window.location.pathname}#${id}`);
    setRoute((current) => ({
      ...current,
      hash: id,
      key: current.key,
    }));
  }, []);

  const value = useMemo(
    () => ({
      path: route.path,
      hash: route.hash,
      navigate,
      scrollToSection,
    }),
    [route.path, route.hash, navigate, scrollToSection],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used inside RouterProvider");
  }
  return context;
}
