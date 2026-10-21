import { useEffect, useState } from "react";
import { ChatIcon, Close } from "./Icons";
import { Button, Eyebrow } from "./Ui";

export default function ChatWidget({ onConsult }: { onConsult: () => void }) {
  const [open, setOpen] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll(".final-cta, .affirm-bar, .regal-footer"),
    );
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setSuppressed(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (suppressed) setOpen(false);
  }, [suppressed]);

  if (suppressed) return null;

  const startConsultation = () => {
    setOpen(false);
    onConsult();
  };

  return (
    <div className="chat-widget">
      {open && (
        <div
          className="chat-popover"
          id="design-help-panel"
          role="dialog"
          aria-label="Design help"
        >
          <div className="chat-popover-top">
            <Eyebrow>Design help</Eyebrow>
            <button
              type="button"
              className="chat-close"
              aria-label="Close design help"
              onClick={() => setOpen(false)}
            >
              <Close size={17} />
            </button>
          </div>
          <h3>Questions about your windows?</h3>
          <p>
            Our Design Experts can help with fabrics, measurements and the
            finishing details.
          </p>
          <Button variant="primary" onClick={startConsultation}>
            BOOK A CONSULTATION
          </Button>
        </div>
      )}

      <button
        type="button"
        className="chat-bubble"
        aria-label={open ? "Close design help" : "Open design help chat"}
        aria-expanded={open}
        aria-controls="design-help-panel"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <Close size={21} /> : <ChatIcon size={22} />}
      </button>
    </div>
  );
}
