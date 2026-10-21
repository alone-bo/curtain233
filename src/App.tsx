import { useCallback, useEffect, useState } from "react";
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
import { photos, routeFor, type DestinationGroup } from "./data";
import { useBodyLock, useEscapeKey } from "./hooks";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [swatchesOpen, setSwatchesOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);

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
  }, []);

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

  const exploreCollection = () => {
    setCartOpen(false);
    window.setTimeout(() => {
      document
        .getElementById("collections")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <Header
        cartCount={0}
        onDestination={openDestination}
        onSearch={openSearch}
        onCart={openCart}
        onSwatches={openSwatches}
        onConsult={openConsult}
      />

      <main>
        <HomePage
          onDestination={openDestination}
          onSwatches={openSwatches}
          onConsult={openConsult}
        />
      </main>

      <RegalFooter onDestination={openDestination} />

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
