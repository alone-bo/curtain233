import { useState } from "react";
import { faqs, photos, type DestinationGroup } from "../data";
import {
  ChatIcon,
  ClockIcon,
  ConciergeIcon,
  DesignIcon,
  FlagIcon,
  MeasureIcon,
  SatisfactionIcon,
  ShieldIcon,
  SwatchIcon,
  TruckIcon,
} from "./Icons";
import {
  AffirmBar,
  AtelierSection,
  CollectionSection,
  FinalCtaSection,
  JournalSection,
  MaterialsSection,
} from "./RegalSections";
import { Button, Eyebrow } from "./Ui";

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
      <Hero onDestination={onDestination} onSwatches={onSwatches} />
      <ValueBar />
      <AtelierSection onDestination={onDestination} />
      <CollectionSection onDestination={onDestination} />
      <MaterialsSection
        onDestination={onDestination}
        onSwatches={onSwatches}
        onConsult={onConsult}
      />
      {/* <TrustBar /> */}
      <ConsultationBanner
        onConsult={onConsult}
        onDestination={onDestination}
      />
      <FaqSection onDestination={onDestination} />
      {/* <WhySection /> */}
      <JournalSection onDestination={onDestination} />
      <FinalCtaSection
        onDestination={onDestination}
        onSwatches={onSwatches}
        onConsult={onConsult}
      />
      <AffirmBar onDestination={onDestination} />
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
              <div
                className={`faq-item${open ? " is-open" : ""}`}
                key={faq.question}
              >
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
