import { MotionConfig } from "framer-motion";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useReveal, useSpotlight } from "./hooks/useSiteMotion";
import { resolveRoute } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignalGuide from "./components/SignalGuide";
import PortfolioAI from "./components/PortfolioAI";
import SettingsPanel from "./components/SettingsPanel";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";

const Site = ({ route }) => {
  const { reducedMotion } = useTheme();
  useReveal();
  useSpotlight();
  const onHome = route.type === "home";

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <a className="skip-link sr-only-focusable" href="#main">
        Skip to content
      </a>
      <Navbar page={route.type} />
      <main id="main" tabIndex={-1} className="outline-none">
        {onHome && <HomePage />}
        {route.type === "project" && <ProjectPage project={route.project} />}
        {route.type === "notfound" && <NotFoundPage />}
      </main>
      <Footer />
      {onHome && <SignalGuide />}
      <PortfolioAI />
      <SettingsPanel />
    </MotionConfig>
  );
};

/** `url` is the page path: window.location.pathname in the browser, the route being pre-rendered at build time. */
const App = ({ url = "/" }) => (
  <ThemeProvider>
    <Site route={resolveRoute(url)} />
  </ThemeProvider>
);

export default App;
