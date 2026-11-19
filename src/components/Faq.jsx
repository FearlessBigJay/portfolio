import SectionHeading from "./SectionHeading";
import { faqs } from "../data/faq";

const Faq = () => (
  <section id="faq" className="section" aria-labelledby="faq-heading">
    <div className="wrap grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
      <SectionHeading id="faq-heading" index="06" eyebrow="FAQ" title="Quick answers about BigJay.">
        The questions people ask most. For anything else, ask the BigJay AI assistant or send a message.
      </SectionHeading>

      <div className="faq-list" data-reveal>
        {faqs.map((item, i) => (
          <details key={item.q} className="faq-item" open={i === 0}>
            <summary>
              <h3>{item.q}</h3>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
