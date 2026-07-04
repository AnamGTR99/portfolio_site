"use client";

import { useEffect, useState } from "react";

/**
 * Living-data clock — local time in Melbourne, ticking every second.
 */
export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-AU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Australia/Melbourne",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
      {time || "--:--:--"} AEST
    </span>
  );
}
