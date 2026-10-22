import { useCallback, useEffect, useState } from "react";
import type { FabricSwatch } from "./catalog";
import { SWATCH_LIMIT } from "./catalog";
import ChatWidget from "./components/ChatWidget";
import Header from "./components/Header";
import { HomePage } from "./components/HomeSections";
import {
  CartDrawer,
  ConsultationModal,
  DestinationDrawer,
  SearchOverlay,
  SwatchExperience,
  type Destination,
} from "./components/Overlays";
import RegalFooter from "./components/RegalFooter";
import FabricSwatches from "./pages/FabricSwatches";
import SoftRomanShades from "./pages/SoftRomanShades";
import { photos, routeFor, type DestinationGroup } from "./data";
import { useBodyLock, useEscapeKey } from "./hooks";
import { useRouter } from "./router";

export default function App() {
  const { path, navigate } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [swatchesOpen, setSwatchesOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [swatchCart, setSwatchCart] = useState<FabricSwatch[]>([]);

  const isProduct = path === "/soft-roman-shades";
  const isFabrics = path === "/fabric-swatches";
  const isHome = !isProduct && !isFabrics;

  const overlayOpen =
    searchOpen || cartOpen || swatchesOpen || consultOpen || Boolean(destination);

  useBodyLock(overlayOpen);

  useEscapeKey(overlayOpen, () => {
    if (destination) {
      setDestination(null);
      return;
    }
    if (consultOpen) {
      setConsultOpen(false);
      return;
    }
    if (swatchesOpen) {
      setSwatchesOpen(false);
      return;
    }
    if (cartOpen) {
      setCartOpen(false);
      return;
    }
    if (searchOpen) setSearchOpen(false);
  });

  useEffect(() => {
    document.title = isProduct
      ? "Soft Roman Shades | Regal Drapes"
      : isFabrics
        ? "Fabric Swatches | Regal Drapes"
        : "Regal Drapes | Custom Window Treatments";
  }, [isFabrics, isProduct]);

  useEffect(() => {
    setSearchOpen(false);
    setCartOpen(false);
    setSwatchesOpen(false);
    setConsultOpen(false);
    setDestination(null);
  }, [path]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  const closeOthers = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(false);
    setSwatchesOpen(false);
    setConsultOpen(false);
    setDestination(null);
  }, []);

  const openSearch = useCallback(() => {
    closeOthers();
    setSearchOpen(true);
  }, [closeOthers]);

  const openCart = useCallback(() => {
    closeOthers();
    setCartOpen(true);
  }, [closeOthers]);

  const openSwatches = useCallback(() => {
    closeOthers();
    setSwatchesOpen(true);
  }, [closeOthers]);

  const openConsult = useCallback(() => {
    closeOthers();
    setConsultOpen(true);
  }, [closeOthers]);

  const openDestination = useCallback(
    (label: string, group?: DestinationGroup, image?: string) => {
      closeOthers();
      setDestination({
        label,
        group,
        image: image ?? photos.showroom,
        path: routeFor(label, group),
      });
    },
    [closeOthers],
  );

  const toggleSwatch = useCallback((swatch: FabricSwatch) => {
    setSwatchCart((current) => {
      if (current.some((item) => item.id === swatch.id)) {
        return current.filter((item) => item.id !== swatch.id);
      }
      if (current.length >= SWATCH_LIMIT) return current;
      return [...current, swatch];
    });
  }, []);

  const removeSwatch = useCallback((id: string) => {
    setSwatchCart((current) => current.filter((item) => item.id !== id));
  }, []);

  const exploreCollection = () => {
    setCartOpen(false);
    if (!isHome) {
      navigate("/#collections");
      return;
    }
    window.setTimeout(() => {
      document
        .getElementById("collections")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <Header
        cartCount={swatchCart.length}
        solid={!isHome}
        onDestination={openDestination}
        onSearch={openSearch}
        onCart={openCart}
        onSwatches={openSwatches}
        onConsult={openConsult}
      />

      <main className={isHome ? undefined : "subpage-main"}>
        {isProduct ? (
          <SoftRomanShades
            onDestination={openDestination}
            onConsult={openConsult}
          />
        ) : isFabrics ? (
          <FabricSwatches
            selectedSwatches={swatchCart}
            onToggleSwatch={toggleSwatch}
            onOpenCart={openCart}
            onDestination={openDestination}
            onConsult={openConsult}
          />
        ) : (
          <HomePage
            onDestination={openDestination}
            onSwatches={openSwatches}
            onConsult={openConsult}
          />
        )}
      </main>

      <RegalFooter onDestination={openDestination} onHome={() => navigate("/")} />

      {!overlayOpen && <ChatWidget onConsult={openConsult} />}

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onDestination={openDestination}
          onSwatches={openSwatches}
        />
      )}

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onExplore={exploreCollection}
          swatches={swatchCart}
          onRemoveSwatch={removeSwatch}
          onBrowseFabrics={() => {
            setCartOpen(false);
            navigate("/fabric-swatches/");
          }}
        />
      )}

      {swatchesOpen && (
        <SwatchExperience
          onClose={() => setSwatchesOpen(false)}
          onConsult={openConsult}
        />
      )}

      {consultOpen && (
        <ConsultationModal onClose={() => setConsultOpen(false)} />
      )}

      {destination && (
        <DestinationDrawer
          destination={destination}
          onClose={() => setDestination(null)}
          onSwatches={openSwatches}
          onConsult={openConsult}
        />
      )}
    </>
  );
}
