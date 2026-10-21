import { photos, type DestinationGroup } from "../data";

type DestinationHandler = (
  label: string,
  group?: DestinationGroup,
  image?: string,
) => void;

const footerColumns: {
  title: string;
  group: DestinationGroup;
  links: string[];
}[] = [
  {
    title: "EXPLORE",
    group: "Collections",
    links: [
      "Custom Drapes",
      "Custom Roman Shades",
      "Custom Valances",
      "Custom Pillows",
    ],
  },
  {
    title: "BEGIN YOUR PROJECT",
    group: "Support",
    links: [
      "Complimentary Samples",
      "Design Services",
      "Room Inspiration",
      "Your Own Fabric (COM)",
      "All Custom Products",
    ],
  },
  {
    title: "CARE & SUPPORT",
    group: "Support",
    links: [
      "Measuring & Installation",
      "Our Guarantees",
      "Shipping Information",
      "Contact Us",
    ],
  },
  {
    title: "OUR WORK",
    group: "Company",
    links: [
      "The Regal Difference",
      "Our Story",
      "Customer Reviews",
      "In the Press",
      "Design Journal",
      "Trade & Dealer Programs",
    ],
  },
];

export default function RegalFooter({
  onDestination,
}: {
  onDestination: DestinationHandler;
}) {
  return (
    <footer className="regal-footer">
      <div className="regal-footer-top">
        <div className="regal-footer-brand">
          <button
            type="button"
            className="regal-footer-wordmark"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            REGAL DRAPES
          </button>
          <p>
            <span>Our own workroom. Our own artisans.</span>
            <span>Custom made for your home.</span>
          </p>
        </div>

        <div className="regal-footer-visit">
          <button
            type="button"
            className="regal-footer-visit-label"
            onClick={() =>
              onDestination("Visit Our Workroom", "Company", photos.headquarters)
            }
          >
            Visit our Morristown workroom
          </button>
          <address>1 Cory Road, Morristown, NJ 07960</address>
          <p>Handcrafted in New Jersey since 2012.</p>
        </div>
      </div>

      <div className="regal-footer-nav">
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <div>
              {column.links.map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() =>
                    onDestination(
                      link,
                      link === "Design Journal"
                        ? "Journal"
                        : link === "Room Inspiration" ||
                            link === "Your Own Fabric (COM)" ||
                            link === "All Custom Products"
                          ? "Collections"
                          : column.group,
                      column.group === "Collections"
                        ? photos.drapery
                        : photos.showroom,
                    )
                  }
                >
                  {link}
                </button>
              ))}
            </div>
          </nav>
        ))}
      </div>

      <div className="regal-footer-disclaimer">
        <p>
          Custom drapes, Roman shades, valances and pillows, handcrafted in our
          own U.S. workroom. Most custom orders ship in 7 business days;{" "}
          <button
            type="button"
            onClick={() =>
              onDestination("Shipping Information", "Support", photos.showroom)
            }
          >
            transit time
          </button>{" "}
          is additional. Backed by our{" "}
          <button
            type="button"
            onClick={() =>
              onDestination("Our Guarantees", "Support", photos.showroom)
            }
          >
            money-back and measurement guarantees
          </button>
          .{" "}
          <button
            type="button"
            onClick={() =>
              onDestination("Terms & Conditions", "Support", photos.showroom)
            }
          >
            Terms and exclusions apply
          </button>
          .
        </p>
      </div>

      <div className="regal-footer-bottom">
        <span>© 2026 Regal Drapes LLC. All rights reserved.</span>
        <div>
          <button
            type="button"
            onClick={() =>
              onDestination("Privacy", "Support", photos.showroom)
            }
          >
            Privacy
          </button>
          <i aria-hidden="true">|</i>
          <button
            type="button"
            onClick={() =>
              onDestination("Terms & Conditions", "Support", photos.showroom)
            }
          >
            Terms &amp; Conditions
          </button>
          <i aria-hidden="true">|</i>
          <button
            type="button"
            onClick={() =>
              onDestination("Site Map", "Support", photos.showroom)
            }
          >
            Site Map
          </button>
        </div>
      </div>
    </footer>
  );
}
