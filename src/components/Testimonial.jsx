import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/testimonials";

const Testimonial = () => {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
      <div className="wrap">
        <SectionHeading id="testimonials-heading" index="05" eyebrow="Notes" title="From people I've built with.">
          Two classmates from AltSchool Africa, quoted as written.
        </SectionHeading>
        <div className="grid lg:grid-cols-2 gap-5">
          {testimonials.map((item, i) => (
            <figure
              key={item.name}
              className="panel p-6 md:p-8 m-0 flex flex-col gap-6"
              style={{ "--delay": `${i * 80}ms` }}
              data-reveal
            >
              <span
                aria-hidden="true"
                className="text-5xl leading-none"
                style={{ color: "var(--signal)", fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </span>
              <blockquote className="m-0 -mt-4 text-[1.05rem] leading-relaxed muted">{item.quote}</blockquote>
              <figcaption
                className="flex items-center gap-4 mt-auto pt-5 border-t"
                style={{ borderColor: "var(--line)" }}
              >
                <img
                  src={item.image}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold m-0">{item.name}</p>
                  <p className="text-sm faint m-0">{item.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
