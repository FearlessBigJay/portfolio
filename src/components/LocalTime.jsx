import { useEffect, useState } from "react";
import { portfolioProfile } from "../data/portfolioProfile";
import { useHydrated } from "../hooks/useSiteMotion";

const format = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: portfolioProfile.timeZone,
  }).format(date);

/** Jah'swill's local time (WAT). Updates once a minute; no animation. */
const LocalTime = () => {
  const hydrated = useHydrated();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  // The pre-rendered HTML was built at deploy time, so the clock only appears once running in the browser.
  if (!hydrated) return <time>WAT</time>;
  return <time dateTime={now.toISOString()}>{format(now)} WAT</time>;
};

export default LocalTime;
