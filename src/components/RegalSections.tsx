import { photos, type DestinationGroup } from "../data";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { Button, Eyebrow, TextLink } from "./Ui";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

type SectionProps = {
  onDestination: DestinationHandler;
};

type MaterialsProps = SectionProps & {
  onSwatches: () => void;
  onConsult: () => void;
};

const craftFeatures = [
  {
    title: "A beautifully tailored finish",
    copy: "Blind stitching keeps the face clean. Careful pattern placement brings the design together.",
  },
  {
    title: "Structure and a beautiful fall",
    copy: "5-inch buckram supports pleated headers; weighted hems help the fabric hang beautifully.",
  },
  {
    title: "Finished with care",
    copy: "Premium linings and adjustable hooks on applicable styles, with attention to every finishing detail.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Find your fabric.",
    copy: "See your favorites at home with complimentary samples.",
    link: "Choose your samples",
  },
  {
    number: "02",
    title: "Make it your own.",
    copy: "Choose your style and lining. Confirm the measurements and price before ordering.",
    link: "Measuring & installation",
  },
  {
    number: "03",
    title: "Made here, for you.",
    copy: "Our artisans craft and inspect your order. Most orders ship in 7 business days.",
    link: "Shipping details & transit times",
  },
];

const journalArticles = [
  {
    category: "FABRICS & FINISHING",
    title: "Drapery Linings: Drape, Comfort, Warmth and Better Sleep",
    summary:
      "See how linings and interlining change the fall of a drape, control light and help make a room more comfortable.",
    link: "Explore lining choices",
  },
  {
    category: "MEASURING & HARDWARE",
    title: "Curtain Rod Placement: How High and Wide to Hang It",
    summary:
      "The right height, width and support can give your window a beautifully balanced, more expansive look.",
    link: "Read the placement guide",
  },
  {
    category: "FOR DESIGN PROFESSIONALS",
    title: "For Designers: The Regal Drapes Trade Partner Program",
    summary:
      "Discover the people, tools and workroom support behind a more confident client project.",
    link: "Explore the Trade guide",
  },
];

export function AtelierSection({ onDestination }: SectionProps) {
  return (
    <section className="section regal-atelier" id="craftsmanship">
      <div className="atelier-intro" data-reveal>
        <div>
          <Eyebrow>OUR OWN WORKROOM. OUR OWN ARTISANS.</Eyebrow>
          <h2>
            Not just made to order.
            <br />
            Made by us.
          </h2>
        </div>
        <div className="atelier-intro-copy">
          <p>
            Our custom drapes, Roman shades, valances and pillows are
            handcrafted by our own artisans in Morristown, New Jersey. From
            fabric selection to finishing and final inspection, the details stay
            close to the people making your window treatments.
          </p>
          <p>
            Made here since 2012. For homeowners and interior designers
            nationwide.
          </p>
        </div>
      </div>

      <div className="atelier-photo-grid">
        <figure data-reveal>
          <div className="atelier-photo">
            <img
              src={photos.headquarters}
              alt="Modern exterior of a design and manufacturing building"
              loading="lazy"
            />
          </div>
          <figcaption>
            Regal Drapes headquarters &amp; workroom - Morristown, New Jersey
          </figcaption>
        </figure>
        <figure data-reveal>
          <div className="atelier-photo">
            <img
              src={photos.workshop}
              alt="Artisan measuring and cutting fabric in the workroom"
              loading="lazy"
            />
          </div>
          <figcaption>
            Our own team. Design, fabrication, finishing and inspection under
            one roof.
          </figcaption>
        </figure>
      </div>

      <div className="craft-features" data-reveal>
        {craftFeatures.map((feature) => (
          <article key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </article>
        ))}
      </div>

      <div className="atelier-actions" data-reveal>
        <div className="atelier-actions-left">
          <Button
            variant="outline"
            onClick={() =>
              onDestination("Our Craftsmanship", "Company", photos.workshop)
            }
          >
            EXPLORE OUR CRAFTSMANSHIP
          </Button>
          <button
            type="button"
            className="inline-arrow-link"
            onClick={() =>
              onDestination("Inside Our Workroom", "Company", photos.workshop)
            }
          >
            Watch Inside our workroom
            <ArrowRight size={15} />
          </button>
        </div>
        <button
          type="button"
          className="inline-arrow-link"
          onClick={() =>
            onDestination("Visit Our Workroom", "Company", photos.headquarters)
          }
        >
          Visit our New Jersey workroom
        </button>
      </div>

      <nav className="atelier-tabs" aria-label="More about Regal Drapes">
        {["Our story", "Customer reviews", "In the press"].map(
          (label, index) => (
            <span key={label}>
              {index > 0 && <i aria-hidden="true">|</i>}
              <button
                type="button"
                onClick={() => onDestination(label, "Company", photos.showroom)}
              >
                {label}
              </button>
            </span>
          ),
        )}
      </nav>
    </section>
  );
}

export function CollectionSection({ onDestination }: SectionProps) {
  return (
    <section className="section regal-collection" id="collections">
      <div className="collection-intro" data-reveal>
        <div>
          <Eyebrow>THE MADE-TO-MEASURE COLLECTION</Eyebrow>
          <h2>
            Custom drapes &amp; Roman shades.
            <br />
            Made for your room.
          </h2>
        </div>
        <p>
          Choose the fabric, proportions and finishing details that make the
          room your own. Complete your custom window treatments with
          coordinating valances and pillows.
        </p>
      </div>

      <div className="collection-hero" data-reveal>
        <img
          src={photos.drapery}
          alt="Furnished living room with full-length custom drapes, coordinated sofa and decorative pillows"
          loading="lazy"
        />
      </div>

      <div className="collection-row" data-reveal>
        <div className="collection-row-heading">
          <Eyebrow>THE ART OF A BEAUTIFUL DRAPE</Eyebrow>
          <h3>Custom Drapes</h3>
        </div>
        <div className="collection-row-copy">
          <p>
            From tailored pleats to flowing ripplefold, choose your fabric,
            fullness and lining. Handcrafted curtains, finished for a beautiful
            fall.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              onDestination("Custom Drapes", "Collections", photos.drapery)
            }
          >
            DESIGN YOUR DRAPES
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* <div className="finishing-touches">
        <div className="finishing-heading" data-reveal>
          <Eyebrow>COMPLETE THE ROOM</Eyebrow>
          <h2>The finishing touches.</h2>
        </div>

        <div className="finishing-grid">
          <article className="finishing-card" data-reveal>
            <button
              type="button"
              className="finishing-card-image"
              onClick={() =>
                onDestination("Custom Valances", "Collections", photos.hero)
              }
              aria-label="Explore Custom Valances"
            >
              <img
                src={photos.hero}
                alt="Tailored fabric window treatment in a warm, sunlit interior"
                loading="lazy"
              />
            </button>
            <h3>
              <button
                type="button"
                onClick={() =>
                  onDestination("Custom Valances", "Collections", photos.hero)
                }
              >
                Custom Valances
                <ArrowUpRight size={18} />
              </button>
            </h3>
            <p>An architectural finishing touch, tailored to your windows.</p>
            <button
              type="button"
              className="finishing-card-link"
              onClick={() =>
                onDestination("Custom Valances", "Collections", photos.hero)
              }
            >
              EXPLORE VALANCES
            </button>
          </article>

          <article className="finishing-card" data-reveal>
            <button
              type="button"
              className="finishing-card-image"
              onClick={() =>
                onDestination(
                  "Custom Pillows",
                  "Collections",
                  photos.customPillows,
                )
              }
              aria-label="Explore Custom Pillows"
            >
              <img
                src={photos.customPillows}
                alt="Coordinated solid and patterned decorative pillows"
                loading="lazy"
              />
            </button>
            <h3>
              <button
                type="button"
                onClick={() =>
                  onDestination(
                    "Custom Pillows",
                    "Collections",
                    photos.customPillows,
                  )
                }
              >
                Custom Pillows
                <ArrowUpRight size={18} />
              </button>
            </h3>
            <p>
              Coordinating texture, pattern and the same attention to tailoring.
            </p>
            <button
              type="button"
              className="finishing-card-link"
              onClick={() =>
                onDestination(
                  "Custom Pillows",
                  "Collections",
                  photos.customPillows,
                )
              }
            >
              EXPLORE CUSTOM PILLOWS
            </button>
          </article>
        </div>
      </div>

      <div className="collection-bottom-links" data-reveal>
        <button
          type="button"
          onClick={() =>
            onDestination("Room Inspiration", "Collections", photos.drapery)
          }
        >
          Explore room inspiration
        </button>
        <button
          type="button"
          onClick={() =>
            onDestination("Customer's Own Material (COM)", "Collections", photos.fabricOat)
          }
        >
          Have your own fabric? Explore COM
        </button>
      </div> */}
    </section>
  );
}

export function MaterialsSection({
  onSwatches,
  onConsult,
  onDestination,
}: MaterialsProps) {
  return (
    <section className="materials-redesign" id="fabrics">
      <div className="section materials-top">
        <div className="materials-heading" data-reveal>
          <Eyebrow>A MORE PERSONAL WAY TO CREATE</Eyebrow>
          <h2>
            A fabric you love.
            <br />
            An expert by your side.
          </h2>
        </div>

        <div className="materials-services">
          <article className="materials-card" data-reveal>
            <div className="materials-card-image materials-card-image--samples">
              <img
                src={photos.fabricFold}
                alt="Layered neutral fabrics showing soft texture and drape"
                loading="lazy"
              />
              <div className="sample-swatches" aria-hidden="true">
                {[photos.fabricLinen, photos.fabricOat, photos.fabricFawn].map(
                  (image, index) => (
                    <span
                      key={image + index}
                      style={{ backgroundImage: `url("${image}")` }}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="materials-card-copy">
              <Eyebrow>COMPLIMENTARY FABRIC SAMPLES</Eyebrow>
              <h3>The right fabric. In your own light.</h3>
              <p>
                See the color in your own light. Feel the texture and compare
                patterns alongside your furnishings. Begin with complimentary
                samples before choosing your custom drapes or Roman shades.
              </p>
              <p>
                Samples ship the next business day and typically arrive in 1–3
                days. Complimentary, with no obligation.
              </p>
              <Button variant="primary" onClick={onSwatches}>
                ORDER COMPLIMENTARY SAMPLES
              </Button>
            </div>
          </article>

          <article className="materials-card" data-reveal>
            <div className="materials-card-image materials-card-image--guidance">
              <img
                src={photos.designGuidance}
                alt="Designer sketching, with fabric selections nearby"
                loading="lazy"
              />
              <div className="design-swatches" aria-hidden="true">
                {[photos.fabricSlate, photos.fabricLinen, photos.fabricFawn].map(
                  (image, index) => (
                    <span
                      key={image + index}
                      style={{ backgroundImage: `url("${image}")` }}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="materials-card-copy">
              <Eyebrow>COMPLIMENTARY DESIGN GUIDANCE</Eyebrow>
              <h3>Your own Design Expert.</h3>
              <p>
                You do not need to have every detail figured out. Work
                one-to-one with a Regal Drapes Design Expert on fabrics, styles,
                lining, measurements and a quote for your project.
              </p>
              <p>
                Virtual consultations, personal recommendations and measuring
                guidance. Motorization options are available.
              </p>
              <div className="materials-card-actions">
                <Button variant="primary" onClick={onConsult}>
                  BOOK A CONSULTATION
                </Button>
                <button
                  type="button"
                  className="underlined-link"
                  onClick={() =>
                    onDestination(
                      "Design Services",
                      "Support",
                      photos.designGuidance,
                    )
                  }
                >
                  About the service
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="custom-process">
        <div className="custom-process-inner">
          <div className="custom-process-intro" data-reveal>
            <Eyebrow>FROM INSPIRATION TO INSTALLATION</Eyebrow>
            <h2>Custom, without the guesswork.</h2>
          </div>
          <div className="custom-process-steps">
            {processSteps.map((step) => (
              <article key={step.number} data-reveal>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <button
                  type="button"
                  className="process-link"
                  onClick={() => {
                    if (step.number === "01") {
                      onSwatches();
                    } else if (step.number === "02") {
                      onDestination(
                        "Measuring & Installation",
                        "Support",
                        photos.showroom,
                      );
                    } else {
                      onDestination(
                        "Shipping Information",
                        "Support",
                        photos.showroom,
                      );
                    }
                  }}
                >
                  {step.link}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="trade-band">
        <div className="trade-inner">
          <div data-reveal>
            <Eyebrow>FOR INTERIOR DESIGNERS &amp; INDUSTRY PROFESSIONALS</Eyebrow>
            <h2>Your vision. Our workroom behind it.</h2>
          </div>
          <div className="trade-copy" data-reveal>
            <p>
              Every Trade Partner is paired with a dedicated Regal Drapes Design
              Expert for designs, quotes and project questions. Access private
              Trade pricing, branded samples and tools to manage your clients
              and projects.
            </p>
            <p>
              Our Dealer Program also supports installers and other businesses
              that bring clients to Regal Drapes—a showroom is not required.
            </p>
            <div className="trade-actions">
              <Button
                variant="primary"
                onClick={() =>
                  onDestination(
                    "Trade & Dealer Programs",
                    "Company",
                    photos.workshop,
                  )
                }
              >
                EXPLORE TRADE &amp; DEALER PROGRAMS
              </Button>
              <TextLink
                className="text-link--sentence"
                onClick={() =>
                  onDestination(
                    "Working with your own fabric?",
                    "Collections",
                    photos.fabricOat,
                  )
                }
              >
                Working with your own fabric?
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JournalSection({ onDestination }: SectionProps) {
  return (
    <section className="section journal-section" id="journal">
      <div className="journal-header" data-reveal>
        <div>
          <Eyebrow>THE REGAL JOURNAL</Eyebrow>
          <h2>Insights from our workroom.</h2>
          <p>
            Considered advice on fabrics, hardware and custom details, from the
            people who design and make your window treatments.
          </p>
        </div>
        <TextLink
          className="text-link--sentence"
          onClick={() =>
            onDestination("Design Journal", "Journal", photos.workshop)
          }
        >
          Explore the Design Journal
        </TextLink>
      </div>

      <div className="journal-grid">
        {journalArticles.map((article) => (
          <article className="journal-card" key={article.title} data-reveal>
            <span className="journal-category">{article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <button
              type="button"
              className="journal-link"
              onClick={() =>
                onDestination(article.link, "Journal", photos.workshop)
              }
            >
              {article.link}
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AffirmBar({ onDestination }: SectionProps) {
  return (
    <section className="affirm-bar" aria-label="Affirm financing options">
      <div className="affirm-inner">
        <span className="affirm-wordmark">affirm</span>
        <div className="affirm-copy">
          <p>
            Flexible payment options. Pay over time with Affirm. Eligibility and
            terms apply.
          </p>
          <button
            type="button"
            className="affirm-link"
            onClick={() =>
              onDestination("Financing Options", "Support", photos.showroom)
            }
          >
            Explore financing options
          </button>
        </div>
      </div>
    </section>
  );
}
