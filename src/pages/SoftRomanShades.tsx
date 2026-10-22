import { useState } from "react";
import { romanStyles } from "../catalog";
import { photos, type DestinationGroup } from "../data";
import CustomDrapery from "../components/CustomDrapery";
import { RomanStyleDiagram } from "../components/ProductVisuals";
import { ArrowRight, ArrowUpRight, MeasureIcon, SwatchIcon } from "../components/Icons";
import { Button, Eyebrow } from "../components/Ui";
import { useRouter } from "../router";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

type SoftRomanShadesProps = {
  onDestination: DestinationHandler;
  onConsult: () => void;
};

const optionCards = [
  {
    title: "Linings & interlinings",
    copy: "Choose a light-filtering, room-darkening or blackout lining to shape the light, privacy and drape of your shade.",
    action: "EXPLORE LINING OPTIONS",
    icon: SwatchIcon,
  },
  {
    title: "Control & motorization",
    copy: "Select a cordless control or plan for quiet motorization with app, remote or voice control.",
    action: "LEARN ABOUT MOTORIZATION",
    icon: MeasureIcon,
  },
  {
    title: "Mount & hardware",
    copy: "Inside or outside mount, with hardware details selected to suit the window and the room.",
    action: "TALK THROUGH YOUR WINDOW",
    icon: ArrowUpRight,
  },
];

export default function SoftRomanShades({
  onDestination,
  onConsult,
}: SoftRomanShadesProps) {
  const { navigate, scrollToSection } = useRouter();
  const [motorizationOpen, setMotorizationOpen] = useState(false);

  return (
    <div className="product-page">
      <div className="product-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate("/#collections")}>
          Window Treatments
        </button>
        <span aria-hidden="true">›</span>
        <button
          type="button"
          onClick={() =>
            onDestination(
              "Draperies & More",
              "Window Treatment",
              photos.drapery,
            )
          }
        >
          Draperies &amp; More
        </button>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Soft Roman Shades</span>
      </div>

      <section className="product-hero" aria-labelledby="product-title">
        <div className="product-hero-copy">
          <Eyebrow>TIMELESS &amp; TAILORED</Eyebrow>
          <h1 id="product-title">Soft Roman Shades</h1>
          <p>
            When a streamlined look is preferred or space is at a premium, Soft
            Roman Shades offer a beautifully tailored solution for your windows.
          </p>
          <button
            type="button"
            className="product-hero-link"
            onClick={() => scrollToSection("features")}
          >
            Discover the details
            <ArrowRight size={15} />
          </button>
        </div>
        <figure className="product-hero-image">
          <img
            src={photos.shade}
            alt="Soft fabric Roman shades across a bright living room window"
          />
          <figcaption>
            <span>MADE TO MEASURE</span>
            <strong>Softness, structure and light.</strong>
          </figcaption>
        </figure>
      </section>

      <nav className="product-subnav" aria-label="Soft Roman Shades sections">
        <div className="product-subnav-inner">
          <div className="product-subnav-links">
            {[
              ["FEATURES", "features"],
              ["STYLES", "styles"],
              ["OPTIONS", "options"],
            ].map(([label, id]) => (
              <button
                type="button"
                key={id}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="product-subnav-actions">
            <button
              type="button"
              className="product-subnav-fabrics"
              onClick={() => navigate("/fabric-swatches/")}
            >
              EXPLORE OUR FABRICS
              <ArrowRight size={13} />
            </button>
            <button
              type="button"
              className="product-subnav-dealer"
              onClick={() =>
                onDestination("Find a Dealer", "Support", photos.showroom)
              }
            >
              FIND A DEALER
            </button>
          </div>
        </div>
      </nav>

      <section className="product-features" id="features">
        <div className="product-section-label" data-reveal>
          <span>01</span>
          <Eyebrow>Features</Eyebrow>
        </div>

        <article className="product-feature product-feature--image-left">
          <figure data-reveal>
            <img
              src={photos.wovenShades}
              alt="Layered woven shades controlling daylight in a warmly furnished living room"
              loading="lazy"
            />
            <figcaption>Two layers, one considered window.</figcaption>
          </figure>
          <div className="product-feature-copy" data-reveal>
            <span className="feature-index">FEATURE A</span>
            <h2>The Twin Shade</h2>
            <p>
              A Roman shade and a practical roller shade work together in one
              considered system. Use the Roman face for texture and softness,
              then adjust the liner independently to fine-tune daylight, privacy
              and room darkening.
            </p>
            <p>
              The layered construction gives each window more flexibility than
              a single treatment, while the clean outer profile keeps the room
              calm and uncluttered.
            </p>
          </div>
        </article>

        <article
          className="product-feature product-feature--image-right"
          id="motorization"
        >
          <div className="product-feature-copy" data-reveal>
            <span className="feature-index">FEATURE B</span>
            <h2>Effortless Motorization</h2>
            <p>
              Raise and lower your shades with a quiet motor, a remote or a
              simple voice command. Set a schedule for the times of day when
              your room needs shade, and control individual windows or every
              shade in the room together.
            </p>
            <button
              type="button"
              className="feature-motor-button"
              aria-expanded={motorizationOpen}
              aria-controls="motorization-details"
              onClick={() => setMotorizationOpen((current) => !current)}
            >
              LEARN MORE ABOUT MOTORIZATION
              <ArrowRight size={14} />
            </button>
            {motorizationOpen && (
              <div
                className="motorization-details"
                id="motorization-details"
                role="region"
                aria-label="Motorization details"
              >
                <span>SMART CONTROL, MADE SIMPLE</span>
                <p>
                  A quiet motor can be paired with a handheld remote, a wall
                  switch or a smart-home app. Scheduling and voice control let
                  you manage light without reaching for a cord.
                </p>
                <ul>
                  <li>Cordless operation for a cleaner window line</li>
                  <li>Individual room or whole-home control</li>
                  <li>Battery and hardwired options to discuss with your designer</li>
                </ul>
              </div>
            )}
          </div>
          <figure data-reveal>
            <img
              src={photos.diningRoom}
              alt="A warm modern dining room with a Roman shade framing soft daylight"
              loading="lazy"
            />
            <figcaption>Quiet control, without losing the warmth.</figcaption>
          </figure>
        </article>
      </section>

      <section className="roman-styles" id="styles">
        <div className="roman-styles-inner">
          <header data-reveal>
            <span className="roman-styles-kicker">SIX TAILORED EXPRESSIONS</span>
            <h2>Styles</h2>
            <p>
              Each construction changes the way fabric folds, stacks and meets
              the light. Explore the silhouettes, then make the details your
              own.
            </p>
          </header>
          <div className="roman-style-grid">
            {romanStyles.map((style, index) => (
              <article className="roman-style-card" key={style.name} data-reveal>
                <div className="roman-style-visual">
                  <RomanStyleDiagram type={style.type} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{style.name}</h3>
                <p>{style.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CustomDrapery onDestination={onDestination} onConsult={onConsult} />

      <section className="product-options" id="options">
        <div className="product-options-head" data-reveal>
          <div>
            <Eyebrow>Options</Eyebrow>
            <h2>Made to your window.</h2>
          </div>
          <p>
            A few decisions shape how your shade looks, feels and performs.
            Your design expert can help you balance each one.
          </p>
        </div>
        <div className="product-option-grid">
          {optionCards.map(({ title, copy, action, icon: Icon }, index) => (
            <article className="product-option-card" key={title} data-reveal>
              <span className="option-index">0{index + 1}</span>
              <span className="option-icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <button
                type="button"
                onClick={() => {
                  if (index === 1) {
                    scrollToSection("motorization");
                    setMotorizationOpen(true);
                    return;
                  }
                  onDestination(
                    index === 0 ? "Lining Options" : "Measuring & Installation",
                    "Support",
                    photos.showroom,
                  );
                }}
              >
                {action}
                <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="additional-solutions">
        <div className="additional-head" data-reveal>
          <Eyebrow>Continue exploring</Eyebrow>
          <h2>Additional Horizons Solutions</h2>
        </div>
        <div className="additional-grid">
          {[
            {
              name: "Natural Roman Shades",
              copy: "Woven natural fibers bring texture, warmth and an easy connection to the outdoors.",
              image: photos.daylight,
              label: "Natural Roman Shades",
            },
            {
              name: "Shades of Elegance™ Roman Shades",
              copy: "Refined folds and considered detailing for a quieter, more formal expression.",
              image: photos.livingRoom,
              label: "Shades of Elegance Roman Shades",
            },
            {
              name: "Draperies & Side Panels",
              copy: "Layered panels and side returns that complete the window and soften the room.",
              image: photos.curtains,
              label: "Draperies & Side Panels",
            },
          ].map((card) => (
            <article className="additional-card" key={card.label} data-reveal>
              <button
                type="button"
                className="additional-image"
                onClick={() =>
                  onDestination(card.label, "Collections", card.image)
                }
                aria-label={`Explore ${card.name}`}
              >
                <img src={card.image} alt="" loading="lazy" />
              </button>
              <h3>
                <button
                  type="button"
                  onClick={() =>
                    onDestination(card.label, "Collections", card.image)
                  }
                >
                  {card.name}
                  <ArrowUpRight size={16} />
                </button>
              </h3>
              <p>{card.copy}</p>
              <button
                type="button"
                className="additional-link"
                onClick={() =>
                  onDestination(card.label, "Collections", card.image)
                }
              >
                EXPLORE THIS SOLUTION
                <ArrowRight size={13} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-note">
        <div data-reveal>
          <Eyebrow>PERSONAL GUIDANCE</Eyebrow>
          <h2>Not sure where to begin?</h2>
          <p>
            Bring us your window, your light and the way you want the room to
            feel. We will help you work through the details.
          </p>
          <div className="product-final-actions">
            <Button variant="primary" onClick={onConsult}>
              BOOK A DESIGN CONSULTATION
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/fabric-swatches/")}
            >
              EXPLORE OUR FABRICS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
