import { useState } from "react";
import type { FormEvent } from "react";
import {
  faqs,
  footerColumns,
  newArrivals,
  photos,
  type DestinationGroup,
} from "../data";
import {
  ArrowRight,
  ArrowUpRight,
  ChatIcon,
  Check,
  ClockIcon,
  ConciergeIcon,
  DesignIcon,
  FacebookIcon,
  FlagIcon,
  InstagramIcon,
  MeasureIcon,
  PinterestIcon,
  SatisfactionIcon,
  ShieldIcon,
  SwatchIcon,
  TruckIcon,
} from "./Icons";
import { Button, Eyebrow, Logo, TextLink } from "./Ui";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

type HomeSectionsProps = {
  onDestination: DestinationHandler;
  onSwatches: () => void;
  onConsult: () => void;
};

const valueItems = [
  { label: "Free Swatches", icon: SwatchIcon },
  { label: "Handcrafted in the USA", icon: FlagIcon },
  { label: "Expert Design Help", icon: DesignIcon },
  { label: "Free Shipping", icon: TruckIcon },
];

const trustItems = [
  { label: "45-Day Perfect Fit Guarantee", icon: ShieldIcon },
  { label: "Free Design Services", icon: DesignIcon },
  { label: "Fast 10-Day Production", icon: ClockIcon },
  { label: "100% Satisfaction Guaranteed", icon: SatisfactionIcon },
];

export function HomePage({
  onDestination,
  onSwatches,
  onConsult,
}: HomeSectionsProps) {
  return (
    <>
      <Hero
        onDestination={onDestination}
        onSwatches={onSwatches}
      />
      <ValueBar />
      <AtelierSection onDestination={onDestination} />
      <ProductShowcase onDestination={onDestination} />
      <EditorialSection onDestination={onDestination} />
      <FabricSection
        onSwatches={onSwatches}
        onDestination={onDestination}
      />
      <TrustBar />
      <ConsultationBanner
        onConsult={onConsult}
        onDestination={onDestination}
      />
      <FaqSection onDestination={onDestination} />
      <WhySection />
      <NewArrivalsSection onDestination={onDestination} />
      <Newsletter />
    </>
  );
}

function Hero({
  onDestination,
  onSwatches,
}: {
  onDestination: DestinationHandler;
  onSwatches: () => void;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img
          src={photos.hero}
          alt="Sunlit living room with floor-to-ceiling windows framed by custom beige drapery"
          loading="eager"
        />
      </div>

      <div className="hero-card">
        <Eyebrow>Custom Window Treatments</Eyebrow>
        <h1 id="hero-title">
          THE ART OF
          <br />
          CUSTOM WINDOW
          <br />
          TREATMENTS
        </h1>
        <p className="hero-description">
          Elevate your home with bespoke drapes, shades, and custom window
          coverings handcrafted in the USA.
        </p>
        <div className="hero-actions">
          <Button
            variant="primary"
            onClick={() =>
              onDestination(
                "Draperies & Side Panels",
                "Window Treatment",
                photos.drapery,
              )
            }
          >
            SHOP DRAPERY
          </Button>
          <Button variant="secondary" onClick={onSwatches}>
            FREE SWATCHES
          </Button>
        </div>
        <div className="hero-card-foot">
          <span>MADE TO ORDER</span>
          <span className="hero-card-rule" aria-hidden="true" />
          <span>HANDCRAFTED IN THE USA</span>
        </div>
      </div>

      <div className="hero-aside" aria-hidden="true">
        <span>Custom made for the way you live</span>
        <i />
      </div>
    </section>
  );
}

function ValueBar() {
  return (
    <section className="value-bar" aria-label="Why order with Regal Drapes">
      <div className="value-grid">
        {valueItems.map(({ label, icon: Icon }) => (
          <div className="value-item" key={label}>
            <Icon size={23} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AtelierSection({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return (
    <section className="section atelier" id="craftsmanship">
      <div className="section-intro" data-reveal>
        <div className="section-intro-main">
          <Eyebrow>The Regal Atelier</Eyebrow>
          <h2>
            Handcrafted in the USA,
            <br />
            Made to Order
          </h2>
          <p>
            Every Regal Drapes window treatment begins with your window—and
            ends with a piece made expressly for it.
          </p>
        </div>
        <div className="section-intro-copy">
          <p>
            Our workroom brings together time-honored sewing techniques,
            precision measurement, and a considered edit of fabrics. From the
            first sketch to the final hand-finished hem, each order is crafted
            to order in the United States.
          </p>
          <TextLink
            onClick={() =>
              onDestination("Our Craftsmanship", "Company", photos.workshop)
            }
          >
            DISCOVER OUR CRAFT
          </TextLink>
        </div>
      </div>

      <div className="atelier-cards">
        <article className="atelier-card" data-reveal>
          <div className="media-frame">
            <img
              src={photos.showroom}
              alt="A light-filled Regal Drapes showroom interior with soft white window shades"
              loading="lazy"
            />
          </div>
          <div className="atelier-card-row">
            <div>
              <span className="card-index">01 / SHOWROOM</span>
              <h3>Visit Our Showroom</h3>
            </div>
            <Button
              variant="secondary"
              onClick={() =>
                onDestination("Showroom Visits", "Company", photos.showroom)
              }
            >
              GET DIRECTIONS
            </Button>
          </div>
        </article>

        <article className="atelier-card" data-reveal>
          <div className="media-frame">
            <img
              src={photos.workshop}
              alt="A craftsperson measuring and cutting premium fabric by hand"
              loading="lazy"
            />
          </div>
          <div className="atelier-card-row">
            <div>
              <span className="card-index">02 / THE WORKROOM</span>
              <h3>Our Craftsmanship</h3>
            </div>
            <Button
              variant="secondary"
              onClick={() =>
                onDestination("Craftsmanship", "Company", photos.workshop)
              }
            >
              LEARN MORE
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProductShowcase({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return (
    <section className="section product-showcase" id="collections">
      <div className="showcase-heading" data-reveal>
        <div>
          <Eyebrow>The Regal Collection</Eyebrow>
          <h2>
            Custom Drapes &amp; Roman Shades
            <br />
            Tailored For Your Home
          </h2>
        </div>
        <p>
          The difference is in the details: generous hems, considered
          proportions, and fabrics selected to fall beautifully. Explore
          made-to-measure drapery and shades designed to bring softness and
          structure to every room.
        </p>
      </div>

      <button
        type="button"
        className="showcase-main"
        onClick={() =>
          onDestination("Custom Drapery", "Collections", photos.drapery)
        }
        data-reveal
      >
        <span className="showcase-main-media">
          <img
            src={photos.drapery}
            alt="Neutral living room with bespoke beige drapery and layered cushions"
            loading="lazy"
          />
        </span>
        <span className="showcase-caption">
          <span>
            <small>THE SIGNATURE COLLECTION</small>
            <strong>Custom Drapery</strong>
          </span>
          <span className="text-link text-link--static">
            EXPLORE DRAPERY <ArrowRight size={15} />
          </span>
        </span>
      </button>

      <div className="showcase-pair">
        <article className="showcase-card" data-reveal>
          <button
            type="button"
            className="showcase-card-media"
            onClick={() =>
              onDestination("Roman Shades", "Collections", photos.shade)
            }
            aria-label="Explore Roman Shades"
          >
            <img
              src={photos.shade}
              alt="Soft white Roman shades in a calm, light-filled living room"
              loading="lazy"
            />
          </button>
          <div className="showcase-card-copy">
            <div>
              <span className="card-index">WINDOW TREATMENTS</span>
              <h3>Roman Shades</h3>
            </div>
            <TextLink
              onClick={() =>
                onDestination("Roman Shades", "Collections", photos.shade)
              }
            >
              EXPLORE SHADES
            </TextLink>
          </div>
        </article>

        <article className="showcase-card" data-reveal>
          <button
            type="button"
            className="showcase-card-media"
            onClick={() =>
              onDestination("Pillows & Cushions", "Collections", photos.pillows)
            }
            aria-label="Explore Pillows and Cushions"
          >
            <img
              src={photos.pillows}
              alt="Warm modern living room finished with layered decorative cushions"
              loading="lazy"
            />
          </button>
          <div className="showcase-card-copy">
            <div>
              <span className="card-index">SOFT FURNISHINGS</span>
              <h3>Pillows &amp; Cushions</h3>
            </div>
            <TextLink
              onClick={() =>
                onDestination("Pillows & Cushions", "Collections", photos.pillows)
              }
            >
              SHOP PILLOWS
            </TextLink>
          </div>
        </article>
      </div>
    </section>
  );
}

function EditorialSection({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return (
    <section className="section editorial-section">
      <div className="editorial-heading" data-reveal>
        <div>
          <Eyebrow>The considered layer</Eyebrow>
          <h2>Details make the room.</h2>
        </div>
        <p>
          From the weight of a hem to the quiet contrast of a textured cushion,
          it is the finishing layer that gives a room its sense of ease.
        </p>
      </div>

      <div className="editorial-grid">
        <article className="editorial-large" data-reveal>
          <div className="editorial-large-media">
            <img
              src={photos.curtains}
              alt="Floor-to-ceiling curtains with dramatic folds in a refined living room"
              loading="lazy"
            />
          </div>
          <div className="editorial-large-caption">
            <span>
              <small>WINDOW DETAILS</small>
              <h3>Curtains, considered from every angle.</h3>
            </span>
            <TextLink
              onClick={() =>
                onDestination("Draperies & Side Panels", "Window Treatment", photos.drapery)
              }
            >
              EXPLORE DRAPERY
            </TextLink>
          </div>
        </article>

        <div className="editorial-side">
          <article className="editorial-pillows" data-reveal>
            <div className="editorial-pillows-media">
              <img
                src={photos.pillows}
                alt="Quietly luxurious sofa detail with decorative pillows"
                loading="lazy"
              />
            </div>
            <div className="editorial-pillows-copy">
              <div>
                <small>THE FINISHING TOUCH</small>
                <h3>Pillows &amp; Cushions</h3>
              </div>
              <TextLink
                onClick={() =>
                  onDestination(
                    "Pillows & Cushions",
                    "Collections",
                    photos.pillows,
                  )
                }
              >
                SHOP PILLOWS
              </TextLink>
            </div>
          </article>

          <div className="editorial-note" data-reveal>
            <Eyebrow>Fabric accessories</Eyebrow>
            <p>
              A considered edit of natural textures and quiet colour, made to
              bring depth to the rooms you live in.
            </p>
            <div className="fabric-fragments" aria-hidden="true">
              {[photos.fabricLinen, photos.fabricFawn, photos.fabricSlate].map(
                (image, index) => (
                  <span key={image + index}>
                    <img src={image} alt="" loading="lazy" />
                  </span>
                ),
              )}
            </div>
            <TextLink
              onClick={() =>
                onDestination("Fabric Gallery", "Collections", photos.fabricOat)
              }
            >
              EXPLORE FABRIC ACCESSORIES
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function FabricSection({
  onSwatches,
  onDestination,
}: {
  onSwatches: () => void;
  onDestination: DestinationHandler;
}) {
  return (
    <section className="section fabric-section" id="fabrics">
      <div className="fabric-heading" data-reveal>
        <Eyebrow>Fabrics &amp; Materials</Eyebrow>
        <h2>Explore Our Custom Fabric Collection</h2>
        <p>
          Order complimentary samples to experience the color, texture, and
          weight of our fabrics in the light of your own home.
        </p>
      </div>

      <div className="fabric-cards">
        <article className="fabric-card" data-reveal>
          <div className="fabric-card-media fabric-card-media--swatches">
            <img
              src={photos.fabricFold}
              alt="Layered folds of premium fabric in a soft blue-grey tone"
              loading="lazy"
            />
            <span className="media-badge">UP TO 10 COMPLIMENTARY SWATCHES</span>
            <div className="swatch-fan" aria-hidden="true">
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
          <div className="fabric-card-copy">
            <span className="card-index">01 / SWATCHES</span>
            <h3>Order Free Fabric Swatches</h3>
            <p>
              Get up to 10 free fabric swatches delivered straight to your door
              to help you choose the perfect look.
            </p>
            <Button variant="primary" onClick={onSwatches}>
              ORDER FREE SWATCHES
            </Button>
          </div>
        </article>

        <article className="fabric-card" data-reveal>
          <div className="fabric-card-media fabric-card-media--book">
            <img
              src={photos.fabricOat}
              alt="A fine woven fabric texture in a warm neutral tone"
              loading="lazy"
            />
            <div className="swatch-book" aria-hidden="true">
              <div className="swatch-book-cover">
                <span>REGAL DRAPES</span>
                <small>FABRIC LIBRARY</small>
              </div>
              <div className="swatch-book-pages">
                {[
                  photos.fabricLinen,
                  photos.fabricFawn,
                  photos.fabricSlate,
                  photos.fabricOat,
                ].map((image, index) => (
                  <span
                    key={image + index}
                    style={{ backgroundImage: `url("${image}")` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="fabric-card-copy">
            <span className="card-index">02 / THE LIBRARY</span>
            <h3>Free Swatch Book</h3>
            <p>
              Browse our complete collection of luxury fabrics, textures, and
              custom options.
            </p>
            <Button
              variant="secondary"
              onClick={() =>
                onDestination("Fabric Gallery", "Collections", photos.fabricOat)
              }
            >
              ORDER A SWATCH BOOK
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="The Regal Drapes promise">
      <div className="trust-grid">
        {trustItems.map(({ label, icon: Icon }) => (
          <div className="trust-item" key={label}>
            <Icon size={26} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConsultationBanner({
  onConsult,
  onDestination,
}: {
  onConsult: () => void;
  onDestination: DestinationHandler;
}) {
  return (
    <section className="consultation-banner" id="consultation">
      <div className="consultation-inner" data-reveal>
        <div className="consultation-copy">
          <Eyebrow>Design Services</Eyebrow>
          <h2>Schedule Your Free In-Home Design Consultation</h2>
          <p>
            Meet with a professional designer to measure, choose fabrics, and
            design your dream window treatments.
          </p>
        </div>
        <div className="consultation-actions">
          <Button variant="primary" onClick={onConsult}>
            BOOK A DESIGN CONSULTATION
          </Button>
          <button
            type="button"
            className="underlined-link"
            onClick={() =>
              onDestination("Showrooms", "Company", photos.showroom)
            }
          >
            Find a showroom near you
          </button>
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="faq-layout">
        <div className="faq-intro" data-reveal>
          <Eyebrow>Need to know</Eyebrow>
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          <p>
            Find answers about custom window treatments, our made-to-order
            process, ordering, and installation. If you need something more
            personal, our design team is here to help.
          </p>
          <button
            type="button"
            className="underlined-link"
            onClick={() =>
              onDestination("Contact Us", "Support", photos.showroom)
            }
          >
            Speak with a design consultant
          </button>
        </div>

        <div className="faq-list" data-reveal>
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div className={`faq-item${open ? " is-open" : ""}`} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                  >
                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-mark" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {open && (
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    {
      title: "Expert Advice",
      copy: "Personalized guidance from your first measurement to the final reveal, with a designer who understands your space, your light, and your style.",
      icon: ChatIcon,
    },
    {
      title: "Tailored to Perfection",
      copy: "Every drape, shade, and blind is cut and sewn to your exact window dimensions—never sized to the nearest standard.",
      icon: MeasureIcon,
    },
    {
      title: "White-Glove Service",
      copy: "Thoughtful support, careful delivery, and professional installation options for a seamless experience from start to finish.",
      icon: ConciergeIcon,
    },
  ];

  return (
    <section className="section why-section">
      <div className="why-heading" data-reveal>
        <Eyebrow>The Regal Difference</Eyebrow>
        <h2>Why Choose Regal Drapes?</h2>
      </div>
      <div className="why-grid">
        {reasons.map(({ title, copy, icon: Icon }, index) => (
          <article className="why-card" key={title} data-reveal>
            <div className="why-card-top">
              <span className="why-icon">
                <Icon size={25} />
              </span>
              <span className="why-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewArrivalsSection({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return (
    <section className="section new-arrivals" id="new-arrivals">
      <div className="section-heading-row" data-reveal>
        <div>
          <Eyebrow>New in the atelier</Eyebrow>
          <h2>New Arrivals</h2>
        </div>
        <TextLink
          onClick={() =>
            onDestination("New Arrival", "Collections", photos.drapery)
          }
        >
          SHOP NEW ARRIVALS
        </TextLink>
      </div>

      <div className="arrival-grid">
        {newArrivals.map((item, index) => (
          <article className="arrival-card" key={item.title} data-reveal>
            <button
              type="button"
              className="arrival-media"
              onClick={() =>
                onDestination(item.title, "Collections", item.image)
              }
              aria-label={`Explore ${item.title}`}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="arrival-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="arrival-hover" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </button>
            <div className="arrival-copy">
              <span>{item.label}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-inner" data-reveal>
        <Eyebrow>From the atelier</Eyebrow>
        <h2>Get Inspired &amp; Stay Connected</h2>
        <p>
          Sign up for design tips, exclusive offers, and $50 off your first
          order.
        </p>

        <div aria-live="polite">
          {subscribed ? (
            <div className="newsletter-success">
              <span className="success-icon">
                <Check size={18} />
              </span>
              <div>
                <strong>You&apos;re on the list.</strong>
                <span>Your $50 welcome offer is on its way to {email}.</span>
              </div>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
              />
              <Button type="submit" variant="primary">
                JOIN
              </Button>
            </form>
          )}
          {error && (
            <p className="form-error" id="newsletter-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <span className="newsletter-note">
          By joining, you agree to receive design notes and offers from Regal
          Drapes. Unsubscribe anytime.
        </span>
      </div>
    </section>
  );
}

export function SiteFooter({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return <FooterContent onDestination={onDestination} />;
}

function FooterContent({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  const openSocial = (label: string) =>
    onDestination(label, "Company", photos.curtains);

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} light />
          <p>
            Custom drapes, shades, and window treatments made to measure and
            handcrafted in the USA.
          </p>
          <div className="footer-contact">
            <a href="tel:+18000000000">1 (800) 000-0000</a>
            <a href="mailto:hello@regaldrapes.com">hello@regaldrapes.com</a>
          </div>
          <div className="footer-social" aria-label="Social media">
            <button
              type="button"
              aria-label="Instagram"
              onClick={() => openSocial("Instagram")}
            >
              <InstagramIcon size={17} />
            </button>
            <button
              type="button"
              aria-label="Pinterest"
              onClick={() => openSocial("Pinterest")}
            >
              <PinterestIcon size={17} />
            </button>
            <button
              type="button"
              aria-label="Facebook"
              onClick={() => openSocial("Facebook")}
            >
              <FacebookIcon size={17} />
            </button>
          </div>
        </div>

        {footerColumns.map((group) => (
          <nav className="footer-column" key={group.title} aria-label={group.title}>
            <h3>{group.title}</h3>
            <div>
              {group.links.map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() =>
                    onDestination(
                      label,
                      group.title === "SHOP"
                        ? "Collections"
                        : group.title === "SUPPORT"
                          ? "Support"
                          : "Company",
                      group.title === "SHOP" ? photos.drapery : photos.showroom,
                    )
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© 2026 Regal Drapes. All Rights Reserved.</span>
        <span className="footer-separator" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          onClick={() => onDestination("Privacy Policy", "Support", photos.showroom)}
        >
          Privacy Policy
        </button>
        <span className="footer-separator" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          onClick={() =>
            onDestination("Terms of Service", "Support", photos.showroom)
          }
        >
          Terms of Service
        </button>
      </div>
    </footer>
  );
}
