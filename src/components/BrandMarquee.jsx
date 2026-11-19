import { brand } from "../data/portfolioProfile";

const items = [
  brand.name,
  "Full-stack engineer",
  `@${brand.handle}`,
  "React · Node.js · AI",
  brand.name,
  "Fearless about shipping",
  `@${brand.handle}`,
  "Based in Nigeria · working remotely",
];

/** Scrolling brand band between the hero and the work. Decorative; pauses on hover and with reduced motion. */
const BrandMarquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <ul key={copy} className="marquee-group">
          {items.map((item, i) => (
            <li key={`${copy}-${i}`} className={item === brand.name ? "is-brand" : ""}>
              {item}
              <span className="marquee-star">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default BrandMarquee;
