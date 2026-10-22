import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  draperyStyles,
  fabricCollections,
  fabricMaterials,
  fabricSwatches,
  type DraperyStyle,
  type FabricSwatch,
} from "../catalog";
import { photos, type DestinationGroup } from "../data";
import { useBodyLock, useEscapeKey } from "../hooks";
import { useRouter } from "../router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Close,
} from "./Icons";
import { CurtainPreview, DraperyHeaderDiagram } from "./ProductVisuals";
import { Button, Eyebrow } from "./Ui";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

type CustomDraperyProps = {
  onDestination: DestinationHandler;
  onConsult: () => void;
};

type Step = 1 | 2 | 3 | 4;

const stepLabels = ["HEADER", "FABRIC", "MEASUREMENTS", "PREVIEW & ORDER"];

const moreLinks = [
  "Design Services",
  "Trade Program",
  "Fabric Gallery",
  "Contact Us",
];

const moreGroups: Record<string, DestinationGroup> = {
  "Design Services": "Support",
  "Trade Program": "Company",
  "Fabric Gallery": "Collections",
  "Contact Us": "Support",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function SwatchChip({
  swatch,
  selected,
  onSelect,
  compact = false,
}: {
  swatch: FabricSwatch;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={`custom-fabric${selected ? " is-selected" : ""}${compact ? " custom-fabric--compact" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${swatch.code} ${swatch.colorName}, ${swatch.collection}`}
    >
      <span
        className="custom-fabric-texture"
        style={{
          backgroundImage: `linear-gradient(${swatch.tone}, ${swatch.tone}), url("${swatch.image}")`,
        }}
      >
        {selected && (
          <span className="custom-fabric-check">
            <Check size={12} />
          </span>
        )}
      </span>
      <span className="custom-fabric-copy">
        <strong>{swatch.code}</strong>
        <small>{swatch.colorName}</small>
      </span>
    </button>
  );
}

export default function CustomDrapery({
  onDestination,
  onConsult,
}: CustomDraperyProps) {
  const { scrollToSection, navigate } = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [activeCategory, setActiveCategory] = useState("DRAPERY");
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState(
    draperyStyles[0].id,
  );
  const [selectedFabricId, setSelectedFabricId] = useState(
    fabricSwatches[0].id,
  );
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [infoStyle, setInfoStyle] = useState<DraperyStyle | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [hardwareFinish, setHardwareFinish] = useState("Matte Black");
  const [motorized, setMotorized] = useState(false);
  const [measurementTouched, setMeasurementTouched] = useState(false);
  const [stepNotice, setStepNotice] = useState("");
  const [orderNotice, setOrderNotice] = useState("");
  const [filters, setFilters] = useState({
    material: "All",
    collection: "All",
    color: "All",
  });
  const infoTitleId = useId();
  const moreRef = useRef<HTMLDivElement>(null);

  useBodyLock(Boolean(infoStyle));
  useEscapeKey(Boolean(infoStyle), () => setInfoStyle(null));
  useEscapeKey(moreOpen, () => setMoreOpen(false));

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [moreOpen]);

  const selectedStyle =
    draperyStyles.find((style) => style.id === selectedStyleId) ??
    draperyStyles[0];
  const selectedFabric =
    fabricSwatches.find((swatch) => swatch.id === selectedFabricId) ??
    fabricSwatches[0];

  const visibleStyles = showAllStyles
    ? draperyStyles
    : draperyStyles.slice(0, 6);

  const colorOptions = useMemo(
    () =>
      Array.from(new Set(fabricSwatches.map((swatch) => swatch.colorName))).sort(),
    [],
  );

  const filteredFabrics = useMemo(
    () =>
      fabricSwatches.filter((swatch) => {
        const matchesMaterial =
          filters.material === "All" ||
          swatch.material === filters.material;
        const matchesCollection =
          filters.collection === "All" ||
          swatch.collectionId === filters.collection;
        const matchesColor =
          filters.color === "All" || swatch.colorName === filters.color;
        return matchesMaterial && matchesCollection && matchesColor;
      }),
    [filters],
  );

  const measurements = useMemo(() => {
    const rawWidth = Number(width);
    const rawHeight = Number(height);
    const minWidth = unit === "in" ? 12 : 30;
    const maxWidth = unit === "in" ? 300 : 760;
    const minHeight = unit === "in" ? 12 : 30;
    const maxHeight = unit === "in" ? 180 : 460;

    if (!width.trim() || !Number.isFinite(rawWidth) || rawWidth <= 0) {
      return {
        valid: false,
        message: "Enter your window width to continue.",
      };
    }
    if (!height.trim() || !Number.isFinite(rawHeight) || rawHeight <= 0) {
      return {
        valid: false,
        message: "Enter your window height to continue.",
      };
    }
    if (rawWidth < minWidth || rawWidth > maxWidth) {
      return {
        valid: false,
        message: `Enter a width between ${minWidth} and ${maxWidth} ${unit}.`,
      };
    }
    if (rawHeight < minHeight || rawHeight > maxHeight) {
      return {
        valid: false,
        message: `Enter a height between ${minHeight} and ${maxHeight} ${unit}.`,
      };
    }
    return {
      valid: true,
      message: "",
      width: rawWidth,
      height: rawHeight,
    };
  }, [height, unit, width]);

  const motorizationActive =
    motorized && selectedStyle.motorizationAvailable;

  const sizeAdjustment = useMemo(() => {
    if (!measurements.valid) return 0;
    const widthInches =
      unit === "in" ? measurements.width! : measurements.width! / 2.54;
    const heightInches =
      unit === "in" ? measurements.height! : measurements.height! / 2.54;
    const squareFeet = (widthInches * heightInches) / 144;
    return Math.round(squareFeet * 7.5);
  }, [measurements, unit]);

  const motorizationCost = motorizationActive ? 175 : 0;
  const estimate =
    selectedStyle.price + sizeAdjustment + motorizationCost;

  const goToStep = (target: Step) => {
    setStepNotice("");
    setOrderNotice("");

    if (target > 3 && !measurements.valid) {
      setMeasurementTouched(true);
      setStep(3);
      setStepNotice(measurements.message);
      return;
    }
    setStep(target);
  };

  const continueToFabrics = () => {
    setStep(2);
    setStepNotice("");
    scrollToSection("custom-drapery");
  };

  const continueForward = () => {
    if (step === 1) {
      continueToFabrics();
      return;
    }
    if (step === 2) {
      if (!selectedFabricId) {
        setStepNotice("Choose a fabric to continue.");
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      setMeasurementTouched(true);
      if (!measurements.valid) {
        setStepNotice(measurements.message);
        return;
      }
      setStep(4);
      setStepNotice("");
      return;
    }
    onConsult();
  };

  const handleMeasurementSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMeasurementTouched(true);
    if (!measurements.valid) {
      setStepNotice(measurements.message);
      return;
    }
    setStep(4);
    setStepNotice("");
  };

  const categoryAction = (label: string) => {
    setMoreOpen(false);
    setActiveCategory(label);
    if (label === "DRAPERY") {
      setStep(1);
      scrollToSection("custom-drapery");
      return;
    }
    if (label === "ROMAN SHADES") {
      scrollToSection("styles");
      return;
    }
    if (label === "FABRICS") {
      setStep(2);
      scrollToSection("custom-drapery");
      return;
    }
    if (label === "VALANCES") {
      onDestination("Custom Valances", "Collections", photos.hero);
      return;
    }
    onDestination("Design Gallery", "Collections", photos.curtains);
  };

  const stepTitle = {
    1: "CHOOSE A HEADER STYLE",
    2: "CHOOSE A FABRIC",
    3: "SET YOUR MEASUREMENTS",
    4: "PREVIEW & ORDER",
  }[step];

  const stepDescription = {
    1: "Choose a header style to preview how your drapery will look in your space.",
    2: "Compare color, texture and weight. Your selection carries through to every step.",
    3: "Enter the finished window dimensions. We will confirm the final measurements with you before production.",
    4: "Review your header, fabric and window size, then request a quote or add the configuration to your cart.",
  }[step];

  const nextLabel = {
    1: "CONTINUE TO FABRICS",
    2: "CONTINUE TO MEASUREMENTS",
    3: "PREVIEW & ORDER",
    4: "REQUEST A QUOTE",
  }[step];

  return (
    <section className="custom-drapery" id="custom-drapery">
      {/* <div className="drapery-category-nav" aria-label="Custom product categories">
        {["DRAPERY", "ROMAN SHADES", "VALANCES", "FABRICS", "GALLERY"].map(
          (label) => (
            <button
              type="button"
              key={label}
              className={activeCategory === label ? "is-active" : ""}
              onClick={() => categoryAction(label)}
            >
              {label}
            </button>
          ),
        )}
        <div className="drapery-more" ref={moreRef}>
          <button
            type="button"
            className="drapery-more-toggle"
            aria-expanded={moreOpen}
            aria-controls="drapery-more-menu"
            onClick={() => setMoreOpen((current) => !current)}
          >
            MORE
            <ChevronDown size={12} />
          </button>
          {moreOpen && (
            <div className="drapery-more-menu" id="drapery-more-menu">
              {moreLinks.map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => {
                    setMoreOpen(false);
                    onDestination(label, moreGroups[label], photos.showroom);
                  }}
                >
                  {label}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="customizer-steps-card">
        <div className="step-tabs" role="tablist" aria-label="Customization steps">
          {stepLabels.map((label, index) => {
            const stepNumber = (index + 1) as Step;
            return (
              <button
                type="button"
                role="tab"
                key={label}
                aria-selected={step === stepNumber}
                className={step === stepNumber ? "is-active" : ""}
                onClick={() => goToStep(stepNumber)}
              >
                <span>0{stepNumber}</span>
                {label}
              </button>
            );
          })}
        </div>

        <div className="step-intro">
          <div className="step-intro-copy">
            <span className="step-count">STEP {step} OF 4</span>
            <h2>{stepTitle}</h2>
            <p>{stepDescription}</p>
            {step === 1 && (
              <>
                <div className="step-notice">
                  <span aria-hidden="true">i</span>
                  Hardware and motorization options can be configured in the
                  final step.
                </div>
                <button
                  type="button"
                  className="step-inspiration-link"
                  onClick={() =>
                    onDestination(
                      "Curated Drapery Collections",
                      "Collections",
                      photos.drapery,
                    )
                  }
                >
                  Browse curated drapery collections
                  <ArrowRight size={14} />
                </button>
              </>
            )}
            {stepNotice && (
              <p className="step-error" role="alert">
                {stepNotice}
              </p>
            )}
          </div>
          <button
            type="button"
            className="step-continue"
            onClick={continueForward}
          >
            {nextLabel}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="customizer-layout">
        <aside className="customizer-preview">
          <div className="preview-stage">
            <img
              src={photos.romanRoom}
              alt="Sunlit living room with full-height windows, a grey sofa and a low coffee table"
              loading="lazy"
            />
            <div className="preview-curtains">
              <CurtainPreview type={selectedStyle.type} fabric={selectedFabric} />
            </div>
            <span className="preview-hint">PREVIEW YOUR SELECTED STYLE</span>
            <div className="preview-selection" aria-live="polite">
              <span>{selectedStyle.name}</span>
              <span>
                {selectedFabric.code} · {selectedFabric.colorName}
              </span>
            </div>
          </div>
          <div className="preview-trust">
            <span>
              <Check size={14} />
              Handcrafted in the USA
            </span>
            <span>
              <Check size={14} />
              Free Shipping Within 7 Business Days
            </span>
            <small>Service details are confirmed before checkout.</small>
          </div>
        </aside>

        <div className="customizer-panel">
          {step === 1 && (
            <>
              <div className="customizer-section-head">
                <div>
                  <Eyebrow>Step one</Eyebrow>
                  <h3>HEADER STYLES</h3>
                </div>
                <span>{showAllStyles ? "12 styles" : "6 of 12 styles"}</span>
              </div>

              <div className="style-grid">
                {visibleStyles.map((style) => {
                  const selected = style.id === selectedStyleId;
                  return (
                    <article
                      className={`style-card${selected ? " is-selected" : ""}`}
                      key={style.id}
                    >
                      <button
                        type="button"
                        className="style-card-select"
                        onClick={() => {
                          setSelectedStyleId(style.id);
                          setOrderNotice("");
                        }}
                        aria-pressed={selected}
                      >
                        <span className="style-card-visual">
                          <DraperyHeaderDiagram
                            type={style.type}
                            tone={selectedFabric.tone}
                          />
                          {selected && (
                            <span className="style-selected-mark">
                              <Check size={12} /> SELECTED
                            </span>
                          )}
                        </span>
                        <span className="style-card-copy">
                          <strong>{style.name}</strong>
                          <small>STARTING AT {formatPrice(style.price)}</small>
                          <span className="style-tags">
                            {style.hardwareIncluded && (
                              <em>HARDWARE INCLUDED</em>
                            )}
                            {style.motorizationAvailable && (
                              <em>MOTORIZATION AVAILABLE</em>
                            )}
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="style-more"
                        onClick={() => setInfoStyle(style)}
                      >
                        MORE INFO
                      </button>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                className="show-all-styles"
                onClick={() => setShowAllStyles((current) => !current)}
              >
                {showAllStyles ? "SHOW FEWER STYLES" : "SHOW ALL 12 STYLES"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="customizer-section-head">
                <div>
                  <Eyebrow>Step two</Eyebrow>
                  <h3>CHOOSE A FABRIC</h3>
                </div>
                <span>
                  {filteredFabrics.length} of {fabricSwatches.length} swatches
                </span>
              </div>

              <div className="custom-fabric-filters">
                <label>
                  <span>Material</span>
                  <select
                    value={filters.material}
                    onChange={(event) =>
                      setFilters({ ...filters, material: event.target.value })
                    }
                  >
                    <option>All</option>
                    {fabricMaterials.map((material) => (
                      <option key={material}>{material}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Collection</span>
                  <select
                    value={filters.collection}
                    onChange={(event) =>
                      setFilters({ ...filters, collection: event.target.value })
                    }
                  >
                    <option value="All">All</option>
                    {fabricCollections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Color</span>
                  <select
                    value={filters.color}
                    onChange={(event) =>
                      setFilters({ ...filters, color: event.target.value })
                    }
                  >
                    <option value="All">All</option>
                    {colorOptions.map((color) => (
                      <option key={color}>{color}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="custom-filter-clear"
                  onClick={() =>
                    setFilters({ material: "All", collection: "All", color: "All" })
                  }
                >
                  Clear
                </button>
              </div>

              <div className="custom-fabric-grid">
                {filteredFabrics.map((swatch) => (
                  <SwatchChip
                    key={swatch.id}
                    swatch={swatch}
                    selected={selectedFabric.id === swatch.id}
                    onSelect={() => {
                      setSelectedFabricId(swatch.id);
                      setOrderNotice("");
                    }}
                  />
                ))}
              </div>

              {!filteredFabrics.length && (
                <div className="custom-empty">
                  <p>No fabrics match these filters.</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        material: "All",
                        collection: "All",
                        color: "All",
                      })
                    }
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              )}

              <div className="custom-step-actions">
                <button
                  type="button"
                  className="step-back"
                  onClick={() => setStep(1)}
                >
                  BACK TO HEADER
                </button>
                <Button variant="primary" onClick={() => goToStep(3)}>
                  CONTINUE TO MEASUREMENTS
                  <ArrowRight size={14} />
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="customizer-section-head">
                <div>
                  <Eyebrow>Step three</Eyebrow>
                  <h3>MEASUREMENTS</h3>
                </div>
                <span>Finished window size</span>
              </div>

              <form
                className="measurement-form"
                onSubmit={handleMeasurementSubmit}
                noValidate
              >
                <div className="measurement-units">
                  <span>Unit</span>
                  <div role="group" aria-label="Measurement unit">
                    {(["in", "cm"] as const).map((value) => (
                      <button
                        type="button"
                        key={value}
                        className={unit === value ? "is-active" : ""}
                        onClick={() => {
                          setUnit(value);
                          setMeasurementTouched(false);
                          setStepNotice("");
                        }}
                        aria-pressed={unit === value}
                      >
                        {value === "in" ? "Inches" : "Centimeters"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="measurement-fields">
                  <label>
                    <span>Window width</span>
                    <div>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.25"
                        placeholder={unit === "in" ? "e.g. 72" : "e.g. 183"}
                        value={width}
                        onChange={(event) => {
                          setWidth(event.target.value);
                          setStepNotice("");
                        }}
                        onBlur={() => setMeasurementTouched(true)}
                        aria-invalid={
                          measurementTouched && !measurements.valid
                        }
                        required
                      />
                      <em>{unit}</em>
                    </div>
                  </label>
                  <label>
                    <span>Window height</span>
                    <div>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.25"
                        placeholder={unit === "in" ? "e.g. 96" : "e.g. 244"}
                        value={height}
                        onChange={(event) => {
                          setHeight(event.target.value);
                          setStepNotice("");
                        }}
                        onBlur={() => setMeasurementTouched(true)}
                        aria-invalid={
                          measurementTouched && !measurements.valid
                        }
                        required
                      />
                      <em>{unit}</em>
                    </div>
                  </label>
                </div>

                <div className="measurement-guidance">
                  <p>
                    Measure the finished window opening, including the frame.
                    We recommend reviewing your numbers with a design expert
                    before ordering.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onDestination(
                        "Measuring & Installation Guide",
                        "Support",
                        photos.showroom,
                      )
                    }
                  >
                    VIEW MEASURING GUIDE
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="measurement-sketch" aria-hidden="true">
                  <div className="sketch-window">
                    <span className="sketch-width">W</span>
                    <span className="sketch-height">H</span>
                  </div>
                  <p>
                    Measure the overall width and height at the window opening.
                  </p>
                </div>

                {measurementTouched && !measurements.valid && (
                  <p className="measurement-error" role="alert">
                    {measurements.message}
                  </p>
                )}

                <div className="custom-step-actions">
                  <button
                    type="button"
                    className="step-back"
                    onClick={() => setStep(2)}
                  >
                    BACK TO FABRIC
                  </button>
                  <Button type="submit" variant="primary">
                    PREVIEW &amp; ORDER
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 4 && (
            <>
              <div className="customizer-section-head">
                <div>
                  <Eyebrow>Step four</Eyebrow>
                  <h3>PREVIEW &amp; ORDER</h3>
                </div>
                <span>Configuration summary</span>
              </div>

              <div className="order-summary">
                <div className="order-summary-row">
                  <div>
                    <span>HEADER STYLE</span>
                    <strong>{selectedStyle.name}</strong>
                    <small>Starting at {formatPrice(selectedStyle.price)}</small>
                  </div>
                  <button type="button" onClick={() => setStep(1)}>
                    Edit
                  </button>
                </div>
                <div className="order-summary-row">
                  <div>
                    <span>FABRIC</span>
                    <strong>
                      {selectedFabric.code} {selectedFabric.colorName}
                    </strong>
                    <small>{selectedFabric.collection}</small>
                  </div>
                  <button type="button" onClick={() => setStep(2)}>
                    Edit
                  </button>
                </div>
                <div className="order-summary-row">
                  <div>
                    <span>WINDOW SIZE</span>
                    <strong>
                      {width} × {height} {unit}
                    </strong>
                    <small>
                      {selectedStyle.hardwareIncluded
                        ? "Hardware included"
                        : "Hardware configured separately"}
                      {" · "}
                      {hardwareFinish}
                      {" · "}
                      {motorizationActive ? "Motorized" : "Manual operation"}
                    </small>
                  </div>
                  <button type="button" onClick={() => setStep(3)}>
                    Edit
                  </button>
                </div>
              </div>

              <div className="order-options">
                <div className="order-options-head">
                  <span>FINAL DETAILS</span>
                  <small>Configurable options</small>
                </div>
                <label className="order-select">
                  <span>Hardware finish</span>
                  <select
                    value={hardwareFinish}
                    onChange={(event) =>
                      setHardwareFinish(event.target.value)
                    }
                  >
                    <option>Matte Black</option>
                    <option>Warm Brass</option>
                    <option>Brushed Nickel</option>
                    <option>Soft White</option>
                  </select>
                </label>
                <label
                  className={`order-switch${!selectedStyle.motorizationAvailable ? " is-disabled" : ""}`}
                >
                  <span>
                    <strong>Motorization</strong>
                    <small>
                      {selectedStyle.motorizationAvailable
                        ? "Quiet motor and remote. Adds $175 to the example."
                        : "Not available for this header style."}
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={motorizationActive}
                    disabled={!selectedStyle.motorizationAvailable}
                    onChange={(event) => setMotorized(event.target.checked)}
                  />
                  <i aria-hidden="true" />
                </label>
              </div>

              <div className="order-estimate">
                <div>
                  <span>EXAMPLE ESTIMATE*</span>
                  <strong>{formatPrice(estimate)}</strong>
                </div>
                <div className="order-estimate-lines">
                  <span>
                    Header style <em>{formatPrice(selectedStyle.price)}</em>
                  </span>
                  <span>
                    Size adjustment <em>{formatPrice(sizeAdjustment)}</em>
                  </span>
                  <span>
                    Motorization{" "}
                    <em>
                      {motorizationActive
                        ? formatPrice(motorizationCost)
                        : "—"}
                    </em>
                  </span>
                </div>
                <p>
                  *Illustrative only. This prototype does not calculate a live
                  product price. Final pricing is confirmed in your quote.
                </p>
              </div>

              {orderNotice && (
                <p className="order-notice" role="status">
                  {orderNotice}
                </p>
              )}

              <div className="order-actions">
                <Button
                  variant="primary"
                  onClick={() => {
                    setOrderNotice(
                      "Configuration added to this prototype cart. No order or payment has been placed.",
                    );
                  }}
                >
                  ADD TO CART
                </Button>
                <Button variant="outline" onClick={onConsult}>
                  REQUEST A QUOTE
                </Button>
              </div>

              <button
                type="button"
                className="order-fabrics-link"
                onClick={() => navigate("/fabric-swatches/")}
              >
                EXPLORE OUR FABRICS
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {infoStyle && (
        <div className="style-info-layer">
          <button
            type="button"
            className="style-info-scrim"
            aria-label="Close style information"
            onClick={() => setInfoStyle(null)}
          />
          <div
            className="style-info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={infoTitleId}
          >
            <div className="style-info-top">
              <span>HEADER STYLE</span>
              <button
                type="button"
                aria-label="Close style information"
                onClick={() => setInfoStyle(null)}
                autoFocus
              >
                <Close size={18} />
              </button>
            </div>
            <div className="style-info-diagram">
              <DraperyHeaderDiagram type={infoStyle.type} />
            </div>
            <h3 id={infoTitleId}>{infoStyle.name}</h3>
            <p>{infoStyle.info}</p>
            <dl>
              <div>
                <dt>Starting price</dt>
                <dd>{formatPrice(infoStyle.price)}</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{infoStyle.bestFor}</dd>
              </div>
              <div>
                <dt>Hardware</dt>
                <dd>
                  {infoStyle.hardwareIncluded
                    ? "Included"
                    : "Available separately"}
                </dd>
              </div>
              <div>
                <dt>Motorization</dt>
                <dd>
                  {infoStyle.motorizationAvailable
                    ? "Available"
                    : "Not available for this header"}
                </dd>
              </div>
            </dl>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedStyleId(infoStyle.id);
                setInfoStyle(null);
              }}
            >
              CHOOSE THIS STYLE
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
