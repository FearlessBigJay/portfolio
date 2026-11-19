import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    quote:
      "One of the things I admire most about Jah'swill is his unwavering commitment to growth and excellence. No matter the complexity or how new a task might be, he never backs down. Instead, he dives into research, asks the right questions, and delivers every project with quality and precision. His dedication to learning, not just independently but also by absorbing knowledge from those around him — including myself — is truly inspiring. Working with him has been a rewarding experience, and I have no doubt he'll continue to do great things wherever he goes.",
    name: "Samuel Abraham",
    title: "Front-End Engineering student, AltSchool Africa",
    image: "/Samuel Abraham.jpeg",
  },
  {
    quote:
      "Working with Jah'swill on our frontend project was a great experience. His attention to detail, clean code, and problem-solving mindset really stood out. He's not just a great developer, but also an awesome team player who's always open to collaboration and new ideas.",
    name: "Samson Moradeyo",
    title: "Front-End Engineering student, AltSchool Africa",
    image: "/Psalmotee.jpg",
  },
];

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
