import { useState } from "react";
import { photos } from "../data";
import { useRouter } from "../router";
import { ArrowRight } from "./Icons";
import { Button } from "./Ui";

const rooms = [
  { id: "family", label: "Family room" },
  { id: "main", label: "Main bed room" },
  { id: "dining", label: "Dining room" },
] as const;

type RoomId = (typeof rooms)[number]["id"];

export default function SmartBanner() {
  const { navigate } = useRouter();
  const [openRooms, setOpenRooms] = useState<Record<RoomId, boolean>>({
    family: true,
    main: false,
    dining: true,
  });

  const toggleRoom = (room: RoomId) => {
    setOpenRooms((current) => ({ ...current, [room]: !current[room] }));
  };

  return (
    <section className="smart-banner" aria-labelledby="smart-banner-title">
      <div className="smart-banner-copy">
        <span className="smart-banner-kicker">SMART WINDOW CONTROL</span>
        <h2 id="smart-banner-title">Design simplified..</h2>
        <p>
          Effortlessly control your shades at home or on the go with a simple
          touch or voice command.
        </p>
        <div className="smart-banner-foot" aria-hidden="true">
          <span>Touch</span>
          <i />
          <span>Voice</span>
          <i />
          <span>Schedule</span>
        </div>
      </div>

      <div className="smart-banner-visual">
        <img
          className="smart-banner-room"
          src={photos.daylight}
          alt="Bright living room with a large window, white sofa, plants and a floor lamp"
        />
        <span className="smart-banner-scrim" aria-hidden="true" />
        <div className="smart-phone">
          <img
            src={photos.smartPhone}
            alt="A hand holding a smartphone with a smart shade control app"
          />
          <div className="smart-phone-screen" aria-label="Regal smart shade app">
            <div className="phone-status" aria-hidden="true">
              <span>9:41</span>
              <span className="phone-status-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="phone-app-head">
              <span>REGAL HOME</span>
              <strong>Good morning</strong>
            </div>
            <p className="phone-app-title">Shades</p>
            <div className="phone-room-list">
              {rooms.map((room) => {
                const open = openRooms[room.id];
                return (
                  <button
                    type="button"
                    key={room.id}
                    className={`phone-room${open ? " is-open" : ""}`}
                    onClick={() => toggleRoom(room.id)}
                    aria-pressed={open}
                    aria-label={`${room.label} shades ${open ? "open" : "closed"}. Tap to ${open ? "close" : "open"}.`}
                  >
                    <span>
                      <strong>{room.label}</strong>
                      <small>{open ? "Open · 100%" : "Closed"}</small>
                    </span>
                    <i aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className="phone-app-foot" aria-hidden="true">
              <span>All shades</span>
              <i />
            </div>
          </div>
        </div>
        <span className="smart-visual-label">SMART SHADES · QUIET MOTORIZATION</span>
      </div>
    </section>
  );
}
