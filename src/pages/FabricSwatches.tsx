import { useMemo, useState } from "react";
import type { FabricCategory, FabricSwatch } from "../catalog";
import {
  SWATCH_LIMIT,
  fabricBenefits,
  fabricCollections,
  fabricMaterials,
  fabricSwatches,
  fabricWeights,
} from "../catalog";
import { photos, type DestinationGroup } from "../data";
import {
  ArrowRight,
  BagIcon,
  Check,
  ChevronDown,
  Close,
  SearchIcon,
} from "../components/Icons";
import { Button, Eyebrow } from "../components/Ui";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

type FabricSwatchesProps = {
  selectedSwatches: FabricSwatch[];
  onToggleSwatch: (swatch: FabricSwatch) => void;
  onOpenCart: () => void;
  onDestination: DestinationHandler;
  onConsult: () => void;
};

type SortOption = "Featured" | "Name" | "Color";
type ViewOption = "dense" | "relaxed";

function GridViewIcon({ relaxed = false }: { relaxed?: boolean }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {relaxed ? (
        <>
          <rect x="2" y="2" width="6" height="6" />
          <rect x="10" y="2" width="6" height="6" />
          <rect x="2" y="10" width="6" height="6" />
          <rect x="10" y="10" width="6" height="6" />
        </>
      ) : (
        <>
          <path d="M2 2h2v2H2zM7 2h2v2H7zM12 2h2v2h-2zM2 7h2v2H2zM7 7h2v2H7zM12 7h2v2h-2zM2 12h2v2H2zM7 12h2v2H7zM12 12h2v2h-2z" />
        </>
      )}
    </svg>
  );
}

function SwatchCard({
  swatch,
  selected,
  onAdd,
}: {
  swatch: FabricSwatch;
  selected: boolean;
  onAdd: () => void;
}) {
  return (
    <article className={`fabric-swatch-card${selected ? " is-selected" : ""}`}>
      <div
        className="fabric-swatch-visual"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(${swatch.tone}, ${swatch.tone}), url("${swatch.image}")`,
        }}
      >
        <span
          className="swatch-room-peek"
          style={{
            backgroundImage: `linear-gradient(${swatch.tone}cc, ${swatch.tone}cc), url("${photos.drapery}")`,
          }}
        >
          <span>IN THE ROOM</span>
        </span>
      </div>
      <div className="fabric-swatch-copy">
        <strong>{swatch.code}</strong>
        <span>{swatch.colorName}</span>
        <small>{swatch.collection}</small>
      </div>
      <button
        type="button"
        className={`add-swatch${selected ? " is-added" : ""}`}
        onClick={onAdd}
        aria-pressed={selected}
        aria-label={
          selected
            ? `Remove ${swatch.code} ${swatch.colorName} from swatch bag`
            : `Add ${swatch.code} ${swatch.colorName} to swatch bag`
        }
      >
        {selected ? (
          <>
            <Check size={12} />
            ADDED
          </>
        ) : (
          "ADD SWATCH"
        )}
      </button>
    </article>
  );
}

export default function FabricSwatches({
  selectedSwatches,
  onToggleSwatch,
  onOpenCart,
  onDestination,
  onConsult,
}: FabricSwatchesProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [material, setMaterial] = useState("All");
  const [collection, setCollection] = useState("All");
  const [category, setCategory] = useState<FabricCategory | null>(null);
  const [weights, setWeights] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("Featured");
  const [view, setView] = useState<ViewOption>("dense");
  const [visibleCollections, setVisibleCollections] = useState(2);
  const [notice, setNotice] = useState("");

  const filtersActive =
    material !== "All" ||
    collection !== "All" ||
    Boolean(category) ||
    weights.length > 0 ||
    Boolean(query.trim());

  const activeFilterCount =
    (material !== "All" ? 1 : 0) +
    (collection !== "All" ? 1 : 0) +
    (category ? 1 : 0) +
    weights.length;

  const filteredSwatches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = fabricSwatches.filter((swatch) => {
      const matchesQuery =
        !normalized ||
        [
          swatch.code,
          swatch.colorName,
          swatch.collection,
          swatch.material,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesMaterial =
        material === "All" || swatch.material === material;
      const matchesCollection =
        collection === "All" || swatch.collectionId === collection;
      const matchesCategory =
        !category || swatch.categories.includes(category);
      const matchesWeight =
        !weights.length || weights.includes(swatch.weight);
      return (
        matchesQuery &&
        matchesMaterial &&
        matchesCollection &&
        matchesCategory &&
        matchesWeight
      );
    });

    return result.sort((a, b) => {
      if (sort === "Name") return a.code.localeCompare(b.code);
      if (sort === "Color") return a.colorName.localeCompare(b.colorName);
      return 0;
    });
  }, [category, collection, material, query, sort, weights]);

  const filteredCollections = fabricCollections
    .map((group) => ({
      ...group,
      swatches: filteredSwatches.filter(
        (swatch) => swatch.collectionId === group.id,
      ),
    }))
    .filter((group) => group.swatches.length > 0);

  const shownCollections = filtersActive
    ? filteredCollections
    : filteredCollections.slice(0, visibleCollections);

  const hasMore =
    !filtersActive && visibleCollections < filteredCollections.length;

  const selectedIds = new Set(selectedSwatches.map((swatch) => swatch.id));

  const clearAll = () => {
    setMaterial("All");
    setCollection("All");
    setCategory(null);
    setWeights([]);
    setQuery("");
    setSearchOpen(false);
    setVisibleCollections(2);
    setNotice("");
  };

  const toggleWeight = (weight: string) => {
    setWeights((current) =>
      current.includes(weight)
        ? current.filter((item) => item !== weight)
        : [...current, weight],
    );
  };

  const addSwatch = (swatch: FabricSwatch) => {
    if (selectedIds.has(swatch.id)) {
      onToggleSwatch(swatch);
      setNotice(`${swatch.code} ${swatch.colorName} removed from your swatch bag.`);
      return;
    }
    if (selectedSwatches.length >= SWATCH_LIMIT) {
      setNotice(
        `Your complimentary swatch selection is full (${SWATCH_LIMIT} swatches). Remove one to add another.`,
      );
      return;
    }
    onToggleSwatch(swatch);
    setNotice(`${swatch.code} ${swatch.colorName} added to your swatch bag.`);
  };

  return (
    <div className="fabric-page">
      <section className="fabric-banner" aria-labelledby="fabric-title">
        <div className="fabric-banner-inner">
          <div className="fabric-banner-copy">
            <Eyebrow>The Regal fabric library</Eyebrow>
            <h1 id="fabric-title">Fabric Swatches</h1>
            <div className="fabric-benefits">
              {fabricBenefits.map((benefit) => (
                <span key={benefit}>
                  <Check size={12} />
                  {benefit}
                </span>
              ))}
            </div>
            <p className="fabric-banner-note">
              Explore the weave, color and hand of each fabric before choosing
              your window treatment.
            </p>
          </div>

          <div className="fabric-banner-collage" aria-hidden="true">
            <img src={photos.fabricFold} alt="" />
            {fabricSwatches.slice(0, 6).map((swatch, index) => (
              <span
                key={swatch.id}
                className={`banner-swatch banner-swatch--${index + 1}`}
                style={{
                  backgroundImage: `linear-gradient(${swatch.tone}, ${swatch.tone}), url("${swatch.image}")`,
                }}
              />
            ))}
            <span className="banner-collage-caption">
              LINEN / WEAVE / COTTON
            </span>
          </div>
        </div>
      </section>

      <div className="fabric-filterbar">
        <div className="fabric-filterbar-inner">
          <button
            type="button"
            className={`filter-toggle${filtersOpen ? " is-open" : ""}`}
            aria-expanded={filtersOpen}
            aria-controls="fabric-filter-panel"
            onClick={() => setFiltersOpen((current) => !current)}
          >
            FILTERS
            {activeFilterCount > 0 && (
              <span className="filter-count">{activeFilterCount}</span>
            )}
          </button>

          <label className="filter-select">
            <span className="sr-only">Filter by material</span>
            <select
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            >
              <option value="All">Material</option>
              {fabricMaterials.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={12} />
          </label>

          <label className="filter-select">
            <span className="sr-only">Filter by collection</span>
            <select
              value={collection}
              onChange={(event) => setCollection(event.target.value)}
            >
              <option value="All">Collection</option>
              {fabricCollections.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <ChevronDown size={12} />
          </label>

          <div className="filter-categories" aria-label="Filter by use">
            {(["Curtain", "Fabric", "Roman"] as FabricCategory[]).map(
              (option) => (
                <button
                  type="button"
                  key={option}
                  className={category === option ? "is-active" : ""}
                  aria-pressed={category === option}
                  onClick={() =>
                    setCategory((current) =>
                      current === option ? null : option,
                    )
                  }
                >
                  {option}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            className={`filter-icon-button${searchOpen ? " is-active" : ""}`}
            aria-label="Search fabrics"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((current) => !current)}
          >
            {searchOpen ? <Close size={16} /> : <SearchIcon size={17} />}
          </button>

          <label className="filter-select filter-select--sort">
            <span className="sr-only">Sort fabrics</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
            >
              <option value="Featured">Featured</option>
              <option value="Name">Name</option>
              <option value="Color">Color</option>
            </select>
            <ChevronDown size={12} />
          </label>

          <div className="view-toggle" aria-label="Choose grid size">
            <button
              type="button"
              className={view === "dense" ? "is-active" : ""}
              onClick={() => setView("dense")}
              aria-label="Dense grid view"
              aria-pressed={view === "dense"}
            >
              <GridViewIcon />
            </button>
            <button
              type="button"
              className={view === "relaxed" ? "is-active" : ""}
              onClick={() => setView("relaxed")}
              aria-label="Relaxed grid view"
              aria-pressed={view === "relaxed"}
            >
              <GridViewIcon relaxed />
            </button>
          </div>

          <button
            type="button"
            className="swatch-bag-button"
            onClick={onOpenCart}
            aria-label={`Open swatch bag, ${selectedSwatches.length} selected`}
          >
            <BagIcon size={17} />
            <span>SWATCH BAG</span>
            <strong>{selectedSwatches.length}</strong>
          </button>
        </div>

        {filtersOpen && (
          <div className="fabric-filter-panel" id="fabric-filter-panel">
            <div>
              <span className="filter-panel-label">Weight</span>
              <div className="filter-checkboxes">
                {fabricWeights.map((weight) => (
                  <label key={weight}>
                    <input
                      type="checkbox"
                      checked={weights.includes(weight)}
                      onChange={() => toggleWeight(weight)}
                    />
                    <span>{weight}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className="filter-panel-label">Free swatch program</span>
              <p className="filter-panel-copy">
                Choose up to {SWATCH_LIMIT} complimentary swatches per
                household. Additional swatches may incur shipping.
              </p>
            </div>
            <button type="button" className="filter-clear" onClick={clearAll}>
              CLEAR ALL FILTERS
            </button>
          </div>
        )}

        {searchOpen && (
          <div className="fabric-search-row">
            <SearchIcon size={17} />
            <label className="sr-only" htmlFor="fabric-search">
              Search by fabric name, color name or number
            </label>
            <input
              id="fabric-search"
              type="search"
              placeholder="Search by color, name or number"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <Close size={15} />
              </button>
            )}
          </div>
        )}

        <div className="fabric-filter-meta" aria-live="polite">
          <span>
            {filteredSwatches.length} {filteredSwatches.length === 1 ? "swatch" : "swatches"}
          </span>
          {filtersActive && (
            <button type="button" onClick={clearAll}>
              Clear filters
            </button>
          )}
          {notice && <span className="swatch-notice">{notice}</span>}
        </div>
      </div>

      <section className="fabric-collections" aria-label="Fabric collections">
        {shownCollections.map((group) => (
          <article className="fabric-collection" key={group.id}>
            <header className="fabric-collection-head" data-reveal>
              <div>
                <span className="collection-kicker">FABRIC COLLECTION</span>
                <h2>{group.name}</h2>
                <p>{group.intro}</p>
                <div className="collection-tags">
                  {group.categories.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                  <span>{group.colorCount} colors</span>
                  <span>{group.weight}</span>
                  <span>{group.certification}</span>
                </div>
              </div>
              <button
                type="button"
                className="collection-shop-link"
                onClick={() =>
                  onDestination(
                    `${group.name} Collection`,
                    "Collections",
                    group.image,
                  )
                }
              >
                Shop {group.name.split("-").pop()} Collection
                <ArrowRight size={14} />
              </button>
            </header>

            <div
              className={`swatch-grid${view === "relaxed" ? " swatch-grid--relaxed" : ""}`}
            >
              {group.swatches.map((swatch) => (
                <SwatchCard
                  key={swatch.id}
                  swatch={swatch}
                  selected={selectedIds.has(swatch.id)}
                  onAdd={() => addSwatch(swatch)}
                />
              ))}
            </div>
          </article>
        ))}

        {!shownCollections.length && (
          <div className="fabric-empty">
            <span>NO SWATCHES MATCH</span>
            <h2>Try a different filter.</h2>
            <p>
              Clear the current filters or explore the complete fabric library
              to find the right color and texture.
            </p>
            <Button variant="primary" onClick={clearAll}>
              CLEAR ALL FILTERS
            </Button>
          </div>
        )}

        {hasMore && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="load-more"
              onClick={() =>
                setVisibleCollections((current) =>
                  Math.min(current + 1, filteredCollections.length),
                )
              }
            >
              LOAD MORE
            </button>
            <span>
              Showing {shownCollections.length} of {filteredCollections.length}{" "}
              collections
            </span>
          </div>
        )}
      </section>

      <section className="fabric-help">
        <div data-reveal>
          <Eyebrow>Need a second opinion?</Eyebrow>
          <h2>Let us help you narrow it down.</h2>
          <p>
            Order a few swatches to see them in your own light, or speak with a
            Design Expert about the fabric that suits your room.
          </p>
          <div className="fabric-help-actions">
            <Button variant="primary" onClick={onConsult}>
              BOOK A CONSULTATION
            </Button>
            <button type="button" className="underlined-link" onClick={onOpenCart}>
              View your swatch bag
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
