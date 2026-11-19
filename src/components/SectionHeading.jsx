const SectionHeading = ({ id, index, eyebrow, title, children, className = "" }) => {
  return (
    <div className={`max-w-2xl mb-10 md:mb-14 ${className}`} data-reveal>
      {eyebrow && (
        <p className="kicker">
          {index && <span className="idx">{index} /</span>}
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {children && <p className="lede">{children}</p>}
    </div>
  );
};

export default SectionHeading;
