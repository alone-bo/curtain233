import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  fabrics,
  photos,
  searchableLinks,
  type DestinationGroup,
} from "../data";
import {
  ArrowRight,
  ArrowUpRight,
  BagIcon,
  Check,
  Close,
  SearchIcon,
} from "./Icons";
import { Button, Eyebrow, Logo, TextLink } from "./Ui";

export type Destination = {
  label: string;
  group?: DestinationGroup;
  image: string;
  path: string;
};

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

export function SearchOverlay({
  onClose,
  onDestination,
  onSwatches,
}: {
  onClose: () => void;
  onDestination: DestinationHandler;
  onSwatches: () => void;
}) {
  const [query, setQuery] = useState("");
  const allLinks = useMemo(() => searchableLinks(), []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return allLinks
      .filter(
        (link) =>
          link.label.toLowerCase().includes(normalized) ||
          link.group.toLowerCase().includes(normalized),
      )
      .slice(0, 8);
  }, [allLinks, query]);

  const popular = [
    "Custom Drapery",
    "Roman Shades",
    "Free Swatches",
    "Motorization",
    "New Arrival",
  ];

  const chooseLink = (label: string, group: DestinationGroup, image: string) => {
    onClose();
    onDestination(label, group, image);
  };

  const openPopular = (label: string) => {
    if (label === "Free Swatches") {
      onClose();
      onSwatches();
      return;
    }
    const match = allLinks.find((link) => link.label === label);
    if (match) {
      chooseLink(match.label, match.group, match.image);
    } else {
      chooseLink(label, "Collections", photos.drapery);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const first = results[0];
    if (first) chooseLink(first.label, first.group, first.image);
  };

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search Regal Drapes"
    >
      <div className="overlay-topbar">
        <Logo onClick={onClose} />
        <button
          type="button"
          className="round-close"
          aria-label="Close search"
          onClick={onClose}
        >
          <Close size={22} />
        </button>
      </div>

      <div className="search-content">
        <Eyebrow>Search Regal Drapes</Eyebrow>
        <form className="search-form" onSubmit={handleSubmit} role="search">
          <label htmlFor="site-search" className="sr-only">
            Search products, fabrics, and services
          </label>
          <SearchIcon size={24} className="search-form-icon" />
          <input
            id="site-search"
            type="search"
            placeholder="Search fabrics, shades, and inspiration"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            autoFocus
          />
          <button
            type="submit"
            className="search-submit"
            aria-label="Search"
            disabled={!query.trim()}
          >
            <ArrowRight size={22} />
          </button>
        </form>

        {!query.trim() ? (
          <div className="search-suggestions">
            <span className="search-label">Popular right now</span>
            <div className="search-chips">
              {popular.map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => openPopular(label)}
                >
                  {label}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="search-results" aria-live="polite">
            <div className="search-results-head">
              <span className="search-label">
                {results.length
                  ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                  : "No results"}
              </span>
              <span>for “{query.trim()}”</span>
            </div>
            {results.length ? (
              <div className="search-result-list">
                {results.map((result) => (
                  <button
                    type="button"
                    key={`${result.group}-${result.label}`}
                    onClick={() =>
                      chooseLink(result.label, result.group, result.image)
                    }
                  >
                    <span className="search-result-image">
                      <img src={result.image} alt="" loading="lazy" />
                    </span>
                    <span>
                      <small>{result.group}</small>
                      <strong>{result.label}</strong>
                    </span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <p>
                  We could not find a match. Try “drapery,” “shades,” or browse
                  the full collection.
                </p>
                <TextLink onClick={() => openPopular("Custom Drapery")}>
                  EXPLORE WINDOW TREATMENTS
                </TextLink>
              </div>
            )}
          </div>
        )}

        <p className="search-footnote">
          Not sure where to begin?{" "}
          <button
            type="button"
            onClick={() => openPopular("Custom Drapery")}
          >
            Browse the collection
          </button>{" "}
          or speak with a design consultant.
        </p>
      </div>
    </div>
  );
}

export function CartDrawer({
  onClose,
  onExplore,
}: {
  onClose: () => void;
  onExplore: () => void;
}) {
  return (
    <div className="drawer-layer drawer-layer--cart">
      <button
        type="button"
        className="drawer-scrim"
        aria-label="Close cart"
        onClick={onClose}
      />
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="drawer-topbar">
          <Eyebrow>Shopping Bag</Eyebrow>
          <button
            type="button"
            className="round-close"
            aria-label="Close cart"
            onClick={onClose}
            autoFocus
          >
            <Close size={21} />
          </button>
        </div>

        <div className="cart-empty">
          <span className="cart-empty-icon">
            <BagIcon size={30} />
          </span>
          <h2>Your cart is empty.</h2>
          <p>
            Explore made-to-measure drapery, shades, and considered soft
            furnishings for every room.
          </p>
          <Button variant="primary" onClick={onExplore}>
            EXPLORE WINDOW TREATMENTS
          </Button>
        </div>

        <div className="cart-note">
          <span>Complimentary shipping</span>
          <span>45-day perfect fit guarantee</span>
        </div>
      </aside>
    </div>
  );
}

export function DestinationDrawer({
  destination,
  onClose,
  onSwatches,
  onConsult,
}: {
  destination: Destination;
  onClose: () => void;
  onSwatches: () => void;
  onConsult: () => void;
}) {
  const isProduct =
    destination.group === "Window Treatment" ||
    destination.group === "Collections" ||
    destination.group === "Product Innovations";

  const openSwatches = () => {
    onClose();
    onSwatches();
  };

  const openConsult = () => {
    onClose();
    onConsult();
  };

  return (
    <div className="drawer-layer drawer-layer--destination">
      <button
        type="button"
        className="drawer-scrim"
        aria-label="Close page preview"
        onClick={onClose}
      />
      <aside
        className="destination-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${destination.label} preview`}
      >
        <div className="drawer-topbar drawer-topbar--over-image">
          <span className="prototype-label">PROTOTYPE DESTINATION</span>
          <button
            type="button"
            className="round-close"
            aria-label="Close page preview"
            onClick={onClose}
            autoFocus
          >
            <Close size={21} />
          </button>
        </div>

        <div className="destination-image">
          <img src={destination.image} alt="" />
        </div>

        <div className="destination-content">
          <Eyebrow>{destination.group ?? "The Regal Collection"}</Eyebrow>
          <h2>{destination.label}</h2>
          <p className="destination-intro">
            {isProduct
              ? `Explore ${destination.label} from Regal Drapes—made to your exact measurements, with a considered edit of fabrics, finishes, and details.`
              : `This is the planned ${destination.label.toLowerCase()} destination for the complete Regal Drapes experience. For immediate assistance, our team is here to help.`}
          </p>

          <div className="destination-details">
            {(isProduct
              ? [
                  "Made to your exact window measurements",
                  "Complimentary fabric swatches",
                  "Expert design guidance",
                  "Handcrafted in the USA",
                ]
              : [
                  "Thoughtfully designed for a considered experience",
                  "Personal support from our design team",
                  "Guidance before and after your order",
                  "A full page is planned for this destination",
                ]
            ).map((item) => (
              <span key={item}>
                <Check size={15} />
                {item}
              </span>
            ))}
          </div>

          <div className="destination-actions">
            {isProduct ? (
              <>
                <Button variant="primary" onClick={openSwatches}>
                  ORDER FREE SWATCHES
                </Button>
                <Button variant="secondary" onClick={openConsult}>
                  BOOK A CONSULTATION
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={openConsult}>
                TALK WITH OUR TEAM
              </Button>
            )}
          </div>

          <div className="prototype-route">
            <span>PREVIEW ROUTE</span>
            <code>{destination.path}</code>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function SwatchExperience({
  onClose,
  onConsult,
}: {
  onClose: () => void;
  onConsult: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const toggleSwatch = (name: string) => {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name].slice(0, 10),
    );
  };

  const handleDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(3);
  };

  const firstName = details.name.trim().split(" ")[0] || "there";

  return (
    <div
      className="swatch-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Order free fabric swatches"
    >
      <div className="overlay-topbar swatch-topbar">
        <Logo onClick={onClose} />
        <div className="swatch-progress" aria-label="Swatch request progress">
          <span className={step >= 1 ? "active" : ""}>01 Choose</span>
          <i />
          <span className={step >= 2 ? "active" : ""}>02 Details</span>
          <i />
          <span className={step >= 3 ? "active" : ""}>03 Complete</span>
        </div>
        <button
          type="button"
          className="round-close"
          aria-label="Close swatch ordering"
          onClick={onClose}
        >
          <Close size={22} />
        </button>
      </div>

      {step === 1 && (
        <div className="swatch-shell">
          <div className="swatch-intro">
            <Eyebrow>Fabrics &amp; Materials</Eyebrow>
            <h1>Order Free Fabric Swatches</h1>
            <p>
              Get up to 10 free fabric swatches delivered straight to your door
              to help you choose the perfect look. Select the textures and tones
              you would like to experience in your own light.
            </p>
            <div className="swatch-selection">
              <span className="swatch-count">
                <strong>{selected.length}</strong> of 10 selected
              </span>
              <button
                type="button"
                onClick={() => setSelected([])}
                disabled={!selected.length}
              >
                Clear all
              </button>
            </div>
            <Button
              variant="primary"
              onClick={() => setStep(2)}
              disabled={!selected.length}
            >
              CONTINUE TO DETAILS
            </Button>
            <span className="swatch-small-note">
              Complimentary delivery within the United States
            </span>
          </div>

          <div className="swatch-picker">
            <div className="swatch-picker-head">
              <span className="search-label">Choose your favorites</span>
              <span>{fabrics.length} fabrics</span>
            </div>
            <div className="swatch-picker-grid">
              {fabrics.map((fabric, index) => {
                const isSelected = selected.includes(fabric.name);
                return (
                  <button
                    type="button"
                    key={fabric.name + index}
                    className={`picker-swatch${isSelected ? " is-selected" : ""}`}
                    onClick={() => toggleSwatch(fabric.name)}
                    aria-pressed={isSelected}
                  >
                    <span
                      className="picker-swatch-texture"
                      style={{ backgroundImage: `url("${fabric.image}")` }}
                    >
                      <span className="picker-check">
                        {isSelected && <Check size={14} />}
                      </span>
                    </span>
                    <span className="picker-swatch-copy">
                      <strong>{fabric.name}</strong>
                      <small>
                        {fabric.color} · {fabric.opacity}
                      </small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="swatch-details">
          <button
            type="button"
            className="back-link"
            onClick={() => setStep(1)}
          >
            <ArrowRight size={15} /> Back to swatches
          </button>

          <div className="swatch-details-layout">
            <div className="swatch-details-intro">
              <Eyebrow>Almost there</Eyebrow>
              <h1>Where should we send your swatches?</h1>
              <p>
                Your selection of {selected.length} complimentary{" "}
                {selected.length === 1 ? "swatch" : "swatches"} will be prepared
                by our team and sent to your door.
              </p>
              <div className="selected-swatches" aria-label="Selected swatches">
                {selected.map((name) => {
                  const fabric = fabrics.find((item) => item.name === name);
                  return (
                    <span
                      key={name}
                      style={{
                        backgroundImage: fabric
                          ? `url("${fabric.image}")`
                          : undefined,
                      }}
                      title={name}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                className="underlined-link"
                onClick={onConsult}
              >
                Need help choosing? Book a consultation
              </button>
            </div>

            <form className="form-panel" onSubmit={handleDetails}>
              <div className="form-grid">
                <label className="field field--full">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    autoFocus
                    value={details.name}
                    onChange={(event) =>
                      setDetails({ ...details, name: event.target.value })
                    }
                  />
                </label>
                <label className="field field--full">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={details.email}
                    onChange={(event) =>
                      setDetails({ ...details, email: event.target.value })
                    }
                  />
                </label>
                <label className="field field--full">
                  <span>Street address</span>
                  <input
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    required
                    value={details.address}
                    onChange={(event) =>
                      setDetails({ ...details, address: event.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    autoComplete="address-level2"
                    required
                    value={details.city}
                    onChange={(event) =>
                      setDetails({ ...details, city: event.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>State</span>
                  <input
                    type="text"
                    name="state"
                    autoComplete="address-level1"
                    required
                    value={details.state}
                    onChange={(event) =>
                      setDetails({ ...details, state: event.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>ZIP code</span>
                  <input
                    type="text"
                    name="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="[0-9]{5}(-[0-9]{4})?"
                    required
                    value={details.zip}
                    onChange={(event) =>
                      setDetails({ ...details, zip: event.target.value })
                    }
                  />
                </label>
              </div>
              <Button type="submit" variant="primary" className="form-submit">
                REQUEST MY FREE SWATCHES
              </Button>
              <p className="form-fineprint">
                Complimentary swatches are limited to 10 per household.
              </p>
            </form>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="swatch-success">
          <span className="large-success-icon">
            <Check size={30} />
          </span>
          <Eyebrow>Request received</Eyebrow>
          <h1>Thank you, {firstName}.</h1>
          <p>
            Your complimentary swatches are reserved. A confirmation with the
            details of your selection would be sent to{" "}
            <strong>{details.email || "your email"}</strong> in the complete
            experience.
          </p>
          <div className="success-swatches" aria-label="Requested swatches">
            {selected.map((name) => {
              const fabric = fabrics.find((item) => item.name === name);
              return (
                <span
                  key={name}
                  style={{
                    backgroundImage: fabric
                      ? `url("${fabric.image}")`
                      : undefined,
                  }}
                  title={name}
                />
              );
            })}
          </div>
          <div className="success-actions">
            <Button variant="primary" onClick={onClose}>
              RETURN TO REGAL DRAPES
            </Button>
            <Button variant="secondary" onClick={onConsult}>
              BOOK A CONSULTATION
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ConsultationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-layer" role="presentation">
      <button
        type="button"
        className="modal-scrim"
        aria-label="Close consultation form"
        onClick={onClose}
      />
      <div
        className="consult-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book a design consultation"
      >
        <button
          type="button"
          className="round-close consult-close"
          aria-label="Close consultation form"
          onClick={onClose}
          autoFocus
        >
          <Close size={21} />
        </button>

        <div className="consult-visual">
          <img
            src={photos.curtains}
            alt="Elegant floor-to-ceiling curtains in a warm, refined interior"
          />
          <div>
            <span>DESIGN SERVICES</span>
            <strong>A considered window, from first measurement to final hem.</strong>
          </div>
        </div>

        <div className="consult-content">
          {submitted ? (
            <div className="consult-success">
              <span className="large-success-icon">
                <Check size={28} />
              </span>
              <Eyebrow>Request received</Eyebrow>
              <h2>Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.</h2>
              <p>
                A member of our design team would be in touch to arrange your
                complimentary consultation.
              </p>
              <Button variant="primary" onClick={onClose}>
                RETURN TO REGAL DRAPES
              </Button>
            </div>
          ) : (
            <>
              <Eyebrow>Complimentary consultation</Eyebrow>
              <h2>Schedule Your Free In-Home Design Consultation</h2>
              <p className="consult-intro">
                Meet with a professional designer to measure, choose fabrics,
                and design your dream window treatments.
              </p>
              <form className="form-panel" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label className="field field--full">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label className="field field--full">
                    <span>Email address</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>ZIP code</span>
                    <input
                      type="text"
                      name="zip"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      pattern="[0-9]{5}(-[0-9]{4})?"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Consultation type</span>
                    <select name="type" defaultValue="In-home">
                      <option>In-home</option>
                      <option>Virtual</option>
                      <option>Showroom</option>
                    </select>
                  </label>
                  <label className="field field--full">
                    <span>
                      Tell us about your project{" "}
                      <em>(optional)</em>
                    </span>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Rooms, windows, timeline..."
                    />
                  </label>
                </div>
                <Button type="submit" variant="primary" className="form-submit">
                  BOOK A DESIGN CONSULTATION
                </Button>
                <p className="form-fineprint">
                  By submitting, you agree to be contacted about your
                  consultation request.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
