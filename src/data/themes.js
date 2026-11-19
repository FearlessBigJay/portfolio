// Colour themes. Brand yellow stays the accent in every theme so BigJay is
// recognisable everywhere; a theme changes the backgrounds, text tints and
// supporting accents. `scheme` drives light/dark rules and the browser UI.
// Palettes live in src/index.css under [data-palette="<id>"].
// Keep the id → scheme map in index.html's pre-paint script in sync.

export const THEMES = [
  {
    id: "dark",
    label: "BigJay Dark",
    note: "Default",
    scheme: "dark",
    swatch: ["#0a0a0c", "#15161a", "#ffc629", "#a597ff"],
    metaColor: "#0a0a0c",
  },
  {
    id: "light",
    label: "BigJay Light",
    note: "Warm paper",
    scheme: "light",
    swatch: ["#f7f4ec", "#fffdf8", "#ffc629", "#8a5d00"],
    metaColor: "#f7f4ec",
  },
  {
    id: "forest",
    label: "Forest",
    note: "Deep green",
    scheme: "dark",
    swatch: ["#0b1510", "#13231a", "#ffc629", "#86dbab"],
    metaColor: "#0b1510",
  },
  {
    id: "ocean",
    label: "Ocean",
    note: "Midnight blue",
    scheme: "dark",
    swatch: ["#07111d", "#0f1f30", "#ffc629", "#72c8ff"],
    metaColor: "#07111d",
  },
  {
    id: "dusk",
    label: "Dusk",
    note: "Soft violet",
    scheme: "dark",
    swatch: ["#120e19", "#1d1729", "#ffc629", "#b9a4ff"],
    metaColor: "#120e19",
  },
  {
    id: "sepia",
    label: "Sepia",
    note: "Easy reading",
    scheme: "light",
    swatch: ["#f3ead8", "#fbf5e9", "#ffc629", "#7a5200"],
    metaColor: "#f3ead8",
  },
];

export const findTheme = (id) => THEMES.find((theme) => theme.id === id);
