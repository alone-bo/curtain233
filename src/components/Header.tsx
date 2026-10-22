import { useCallback, useEffect, useState } from "react";
import {
  menuGroups,
  photos,
  standaloneLinks,
  type DestinationGroup,
} from "../data";
import { useBodyLock, useEscapeKey, useMediaQuery } from "../hooks";
import { useRouter } from "../router";
import {
  AccountIcon,
  ArrowRight,
  ArrowUpRight,
  BagIcon,
  ChevronDown,
  Close,
  MenuIcon,
  SearchIcon,
} from "./Icons";
import { Button, Logo } from "./Ui";

type ExplorerKey = keyof typeof menuGroups;

type HeaderProps = {
  cartCount: number;
  solid?: boolean;
  onDestination: (
    label: string,
    group?: DestinationGroup,
    image?: string,
  ) => void;
  onSearch: () => void;
  onCart: () => void;
  onSwatches: () => void;
  onConsult: () => void;
};

const standaloneGroups: Record<
  (typeof standaloneLinks)[number],
  { group: DestinationGroup; image: string }
> = {
  "Become a Dealer": { group: "Company", image: photos.workshop },
  "How to Buy": { group: "Support", image: photos.showroom },
  "Fabric Gallery": { group: "Collections", image: photos.fabricOat },
  "New Arrival": { group: "Collections", image: photos.drapery },
};

export default function Header({
  cartCount,
  solid = false,
  onDestination,
  onSearch,
  onCart,
  onSwatches,
  onConsult,
}: HeaderProps) {
  const { path, navigate } = useRouter();
  const isMobile = useMediaQuery("(max-width: 1140px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeExplorer, setActiveExplorer] = useState<ExplorerKey>("window");
  const [mobileGroup, setMobileGroup] = useState<ExplorerKey | null>(null);

  const isOpen = menuOpen || mobileOpen;
  const isTransparent = !isOpen && !solid;

  useBodyLock(isOpen);
  useEscapeKey(isOpen, () => {
    setMenuOpen(false);
    setMobileOpen(false);
  });

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (mobileOpen) {
      const closeButton = document.getElementById("mobile-nav-close");
      closeButton?.focus();
    }
  }, [mobileOpen]);

  const closeNavigation = useCallback(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, []);

  const goHome = () => {
    closeNavigation();
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const toggleMenu = () => {
    if (isMobile) {
      setMobileOpen((open) => !open);
      setMenuOpen(false);
    } else {
      setMenuOpen((open) => !open);
      setMobileOpen(false);
    }
  };

  const destinationRoutes: Record<string, string> = {
    "Soft Fabric Shades": "/soft-roman-shades/",
    "Fabric Gallery": "/fabric-swatches/",
  };

  const navigateTo = (label: string, group?: DestinationGroup, image?: string) => {
    closeNavigation();
    const route = destinationRoutes[label];
    if (route) {
      navigate(route);
      return;
    }
    onDestination(label, group, image);
  };

  const openStandalone = (label: (typeof standaloneLinks)[number]) => {
    const target = standaloneGroups[label];
    navigateTo(label, target.group, target.image);
  };

  const toggleMoreMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    setActiveExplorer("window");
    setMenuOpen(true);
  };

  const openAccount = () => {
    navigateTo("My Account", "Support", photos.showroom);
  };

  const openSearch = () => {
    closeNavigation();
    onSearch();
  };

  const openCart = () => {
    closeNavigation();
    onCart();
  };

  const openSwatches = () => {
    closeNavigation();
    onSwatches();
  };

  const openConsult = () => {
    closeNavigation();
    onConsult();
  };

  const activeData = menuGroups[activeExplorer];
  const activeLinks =
    activeExplorer === "innovations"
      ? menuGroups.innovations.links
      : menuGroups.why.links;
  const activeImage =
    activeExplorer === "window"
      ? photos.drapery
      : activeExplorer === "innovations"
        ? photos.curtains
        : photos.workshop;

  return (
    <>
      <header
        className={`site-header${isTransparent ? " site-header--transparent" : ""}${solid ? " site-header--solid" : ""}${menuOpen ? " site-header--menu-open" : ""}`}
      >
        {isMobile ? (
          <div className="header-inner header-inner--compact">
            <div className="header-left">
              <button
                type="button"
                className={`menu-toggle${isOpen ? " is-open" : ""}`}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="primary-navigation"
              >
                {isOpen ? <Close size={19} /> : <MenuIcon size={20} />}
                <span>{isOpen ? "Close" : "Menu"}</span>
              </button>
            </div>

            <Logo onClick={goHome} />

            <div className="header-actions">
              <button
                type="button"
                className="header-action header-action--search"
                onClick={openSearch}
                aria-label="Search"
              >
                <SearchIcon size={19} />
                <span>Search</span>
              </button>
              <button
                type="button"
                className="header-action header-action--cart"
                onClick={openCart}
                aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              >
                <BagIcon size={20} />
                <span>Cart</span>
                <span className="cart-count" aria-hidden="true">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="header-inner header-inner--desktop">
            <div className="header-top">
              <div className="header-brand-left">
                <div
                  className="made-in-badge"
                  role="img"
                  aria-label="Made in the USA"
                >
                  <span className="made-in-stars" aria-hidden="true">
                    ★ ★ ★
                  </span>
                  <span>MADE IN</span>
                  <strong>USA</strong>
                </div>
              </div>

              <Logo onClick={goHome} showEmblem />

              <div className="header-contact">
                <a className="header-phone" href="tel:+18000000000">
                  (800) 000-0000
                </a>
                <div className="header-icon-actions">
                  <button
                    type="button"
                    className="header-icon-button"
                    onClick={openAccount}
                    aria-label="My account"
                  >
                    <AccountIcon size={21} />
                  </button>
                  <button
                    type="button"
                    className="header-icon-button header-icon-button--cart"
                    onClick={openCart}
                    aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                  >
                    <BagIcon size={21} />
                    <span className="cart-count" aria-hidden="true">
                      {cartCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="header-nav-row">
              <nav className="primary-nav" aria-label="Primary navigation">
                <button
                  type="button"
                  className="primary-nav-link"
                  onClick={() => {
                    closeNavigation();
                    navigate("/#collections");
                  }}
                >
                  Drapery
                </button>
                <button
                  type="button"
                  className={`primary-nav-link${path === "/soft-roman-shades" ? " is-active" : ""}`}
                  onClick={() => {
                    closeNavigation();
                    navigate("/soft-roman-shades/");
                  }}
                >
                  Roman Shades
                </button>
                <button
                  type="button"
                  className="primary-nav-link"
                  onClick={() =>
                    navigateTo("Valances", "Window Treatment", photos.drapery)
                  }
                >
                  Valances
                </button>
                <button
                  type="button"
                  className={`primary-nav-link${path === "/fabric-swatches" ? " is-active" : ""}`}
                  onClick={() => {
                    closeNavigation();
                    navigate("/fabric-swatches/");
                  }}
                >
                  Fabrics
                </button>
                <button
                  type="button"
                  className="primary-nav-link"
                  onClick={() =>
                    navigateTo("Design Gallery", "Collections", photos.curtains)
                  }
                >
                  Gallery
                </button>
                <button
                  type="button"
                  className="primary-nav-link"
                  onClick={openConsult}
                >
                  Design Services
                </button>
                <button
                  type="button"
                  className={`primary-nav-link primary-nav-link--more${
                    menuOpen ? " is-active" : ""
                  }`}
                  onClick={toggleMoreMenu}
                  aria-expanded={menuOpen}
                  aria-controls="primary-navigation"
                >
                  More
                  <ChevronDown size={12} />
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {menuOpen && !isMobile && (
        <div className="menu-layer" id="primary-navigation">
          <button
            type="button"
            className="menu-scrim"
            aria-label="Close menu"
            onClick={closeNavigation}
          />
          <div
            className="mega-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="mega-inner">
              <aside className="mega-rail">
                <p className="rail-label">Explore</p>
                <nav className="rail-primary" aria-label="Main menu">
                  {(Object.keys(menuGroups) as ExplorerKey[]).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={activeExplorer === key ? "active" : ""}
                      onMouseEnter={() => setActiveExplorer(key)}
                      onFocus={() => setActiveExplorer(key)}
                      onClick={() => setActiveExplorer(key)}
                      aria-expanded={activeExplorer === key}
                    >
                      <span>{menuGroups[key].label}</span>
                      <ChevronDown
                        size={17}
                        className={activeExplorer === key ? "rail-chevron is-active" : "rail-chevron"}
                      />
                    </button>
                  ))}
                </nav>

                <div className="rail-secondary">
                  <p className="rail-label">More to discover</p>
                  {standaloneLinks.map((label) => (
                    <button
                      type="button"
                      key={label}
                      onClick={() => openStandalone(label)}
                    >
                      <span>{label}</span>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                  <button type="button" onClick={openSearch}>
                    <span>Search the collection</span>
                    <SearchIcon size={14} />
                  </button>
                </div>

                <div className="rail-help">
                  <span>PERSONAL DESIGN GUIDANCE</span>
                  <button type="button" onClick={openConsult}>
                    Book a free consultation <ArrowUpRight size={15} />
                  </button>
                </div>
              </aside>

              <section className="mega-main" aria-live="polite">
                <div className="mega-heading">
                  <div>
                    <p className="mega-kicker">The Regal Drapes edit</p>
                    <h2>{activeData.label}</h2>
                  </div>
                  <button
                    type="button"
                    className="text-link text-link--muted"
                    onClick={() =>
                      navigateTo(
                        activeExplorer === "window"
                          ? "Window Treatment"
                          : activeData.label,
                        activeExplorer === "window"
                          ? "Window Treatment"
                          : activeExplorer === "innovations"
                            ? "Product Innovations"
                            : "Why Us",
                        activeImage,
                      )
                    }
                  >
                    <span>
                      {activeExplorer === "window"
                        ? "EXPLORE ALL WINDOW TREATMENTS"
                        : `EXPLORE ${activeData.label.toUpperCase()}`}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {activeExplorer === "window" ? (
                  <div className="mega-window-layout">
                    <div className="mega-columns">
                      {menuGroups.window.columns.map((column) => (
                        <div className="mega-column" key={column.title}>
                          <h3>{column.title}</h3>
                          <div>
                            {column.links.map((label) => (
                              <button
                                type="button"
                                key={label}
                                onClick={() =>
                                  navigateTo(label, "Window Treatment", photos.drapery)
                                }
                              >
                                <span>{label}</span>
                                <ArrowRight size={14} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <figure className="mega-visual">
                      <img
                        src={photos.drapery}
                        alt="Layered custom drapery in a warm, light-filled living room"
                      />
                      <figcaption>
                        <span>MADE TO MEASURE</span>
                        <strong>Considered down to the last seam.</strong>
                      </figcaption>
                    </figure>
                  </div>
                ) : (
                  <div className="mega-feature-layout">
                    <div className="mega-feature-list">
                      {activeLinks.map((link, index) => (
                        <button
                          type="button"
                          key={link.title}
                          onClick={() =>
                            navigateTo(
                              link.title,
                              activeExplorer === "innovations"
                                ? "Product Innovations"
                                : "Why Us",
                              activeImage,
                            )
                          }
                        >
                          <span className="feature-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="feature-copy">
                            <strong>{link.title}</strong>
                            <small>{link.copy}</small>
                          </span>
                          <ArrowUpRight size={17} />
                        </button>
                      ))}
                    </div>
                    <figure className="mega-visual">
                      <img
                        src={activeImage}
                        alt={
                          activeExplorer === "innovations"
                            ? "Elegant floor-to-ceiling curtains in a refined interior"
                            : "Craftsperson finishing custom drapery by hand"
                        }
                      />
                      <figcaption>
                        <span>
                          {activeExplorer === "innovations"
                            ? "THOUGHTFUL BY DESIGN"
                            : "THE REGAL STANDARD"}
                        </span>
                        <strong>
                          {activeExplorer === "innovations"
                            ? "Innovation you can feel every day."
                            : "Craftsmanship that earns its place."}
                        </strong>
                      </figcaption>
                    </figure>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && isMobile && (
        <div
          className="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          id="primary-navigation"
        >
          <div className="mobile-nav-top">
            <Logo onClick={goHome} />
            <button
              type="button"
              className="round-close"
              id="mobile-nav-close"
              aria-label="Close menu"
              onClick={closeNavigation}
            >
              <Close size={22} />
            </button>
          </div>

          <div className="mobile-nav-scroll">
            <p className="eyebrow">Explore Regal Drapes</p>

            {(Object.keys(menuGroups) as ExplorerKey[]).map((key) => {
              const open = mobileGroup === key;
              return (
                <div className={`mobile-group${open ? " is-open" : ""}`} key={key}>
                  <button
                    type="button"
                    className="mobile-group-toggle"
                    aria-expanded={open}
                    onClick={() => setMobileGroup(open ? null : key)}
                  >
                    <span>{menuGroups[key].label}</span>
                    <span className="accordion-mark" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  {open && (
                    <div className="mobile-group-body">
                      {key === "window" ? (
                        menuGroups.window.columns.map((column) => (
                          <div className="mobile-subgroup" key={column.title}>
                            <h4>{column.title}</h4>
                            {column.links.map((label) => (
                              <button
                                type="button"
                                key={label}
                                onClick={() =>
                                  navigateTo(label, "Window Treatment", photos.drapery)
                                }
                              >
                                <span>{label}</span>
                                <ArrowRight size={14} />
                              </button>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="mobile-feature-links">
                          {menuGroups[key].links.map((link) => (
                            <button
                              type="button"
                              key={link.title}
                              onClick={() =>
                                navigateTo(
                                  link.title,
                                  key === "innovations"
                                    ? "Product Innovations"
                                    : "Why Us",
                                  key === "innovations"
                                    ? photos.curtains
                                    : photos.workshop,
                                )
                              }
                            >
                              <span>
                                <strong>{link.title}</strong>
                                <small>{link.copy}</small>
                              </span>
                              <ArrowUpRight size={16} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mobile-direct-links">
              <button
                type="button"
                onClick={() => {
                  closeNavigation();
                  navigate("/soft-roman-shades/");
                }}
              >
                <span>Soft Roman Shades</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  closeNavigation();
                  navigate("/fabric-swatches/");
                }}
              >
                <span>Fabric Swatches</span>
                <ArrowRight size={16} />
              </button>
              {standaloneLinks.map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => openStandalone(label)}
                >
                  <span>{label}</span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="mobile-nav-actions">
            <Button variant="primary" onClick={openSwatches}>
              ORDER FREE SWATCHES
            </Button>
            <Button variant="secondary" onClick={openConsult}>
              BOOK A CONSULTATION
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
