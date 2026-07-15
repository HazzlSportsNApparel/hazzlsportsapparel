const categories = [
  ["Baseball", "Custom jerseys, pants and complete uniform packages."],
  ["Softball", "Bold team designs built for league and tournament play."],
  ["Football", "Tackle and flag football uniforms with custom branding."],
  ["Basketball", "Performance jerseys, shorts and complete team sets."],
  ["Soccer", "Custom kits designed around your club colors and identity."],
  ["Corporate Apparel", "Branded shirts and apparel for companies and crews."]
];

const gallery = [
  ["featured-01.jpeg", "Custom baseball jersey"],
  ["featured-02.jpeg", "Weekend Warriors apparel"],
  ["featured-03.jpeg", "Custom team uniform"],
  ["featured-04.jpeg", "Mound Pounders jersey"],
  ["featured-05.jpeg", "Team apparel design"],
  ["featured-06.jpeg", "Corporate apparel"],
  ["featured-07.jpeg", "Custom branded shirt"]
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        Custom uniforms • Corporate apparel • Team stores • Nationwide shipping
      </div>

      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="HĀZZL Sports home">
          <img src="/images/hazzl-logo.jpeg" alt="HĀZZL Sports logo" />
          <span>HĀZZL SPORTS</span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#collections">Collections</a>
          <a href="#work">Our Work</a>
          <a href="#uniform-builder">Custom Uniforms</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="smallButton" href="#contact">Request a Quote</a>
      </header>

      <section className="hero" id="top">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Precision. Power. Prestige.</p>
          <h1>Custom sports uniforms built to stand out.</h1>
          <p className="heroText">
            Premium custom uniforms, team apparel and corporate gear designed
            for athletes, organizations and businesses.
          </p>
          <div className="buttonRow">
            <a className="primaryButton" href="#collections">Explore Collections</a>
            <a className="secondaryButton" href="#uniform-builder">Build Your Uniform</a>
          </div>
        </div>
      </section>

      <section className="section" id="collections">
        <div className="sectionHeading">
          <p className="eyebrow">Shop by category</p>
          <h2>Made for every team.</h2>
          <p>
            Start with a sport or apparel category, then contact HĀZZL SPORTS
            for custom colors, artwork, sizes and pricing.
          </p>
        </div>

        <div className="categoryGrid">
          {categories.map(([name, description]) => (
            <article className="categoryCard" key={name}>
              <span className="categoryNumber">HĀZZL</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <a href="#contact">Get a quote →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="darkSection" id="work">
        <div className="sectionHeading">
          <p className="eyebrow">Featured work</p>
          <h2>Designed for real teams and businesses.</h2>
        </div>

        <div className="gallery">
          {gallery.map(([image, label]) => (
            <figure className="galleryCard" key={image}>
              <img src={`/images/${image}`} alt={label} loading="lazy" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="builderSection" id="uniform-builder">
        <div>
          <p className="eyebrow">Custom uniform builder</p>
          <h2>Bring your team vision to life.</h2>
          <p>
            Choose your sport, uniform style, colors, sizes and quantity.
            Upload your logo or describe your idea, and we will create a custom quote.
          </p>
        </div>

        <form
          className="quoteForm"
          action="mailto:hazzlsports@yahoo.com"
          method="post"
          encType="text/plain"
        >
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Team or company
            <input name="team" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label className="wide">
            Sport or product
            <select name="product" defaultValue="Baseball">
              <option>Baseball</option>
              <option>Softball</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Soccer</option>
              <option>Corporate Apparel</option>
              <option>Hats or Accessories</option>
            </select>
          </label>
          <label className="wide">
            Project details
            <textarea
              name="details"
              rows="5"
              placeholder="Colors, quantity, sizes, deadline and design ideas"
              required
            />
          </label>
          <button className="primaryButton wide" type="submit">
            Send Quote Request
          </button>
        </form>
      </section>

      <section className="contactSection" id="contact">
        <div>
          <p className="eyebrow">HĀZZL SPORTS & APPAREL</p>
          <h2>Ready to elevate your game?</h2>
        </div>
        <div className="contactDetails">
          <a href="tel:+14322901910">(432) 290-1910</a>
          <a href="mailto:hazzlsports@yahoo.com">hazzlsports@yahoo.com</a>
          <p>Fort Stockton, Texas</p>
          <p>Facebook: HĀZZL Sports & Apparel</p>
        </div>
      </section>

      <footer>
        <img src="/images/hazzl-logo.jpeg" alt="" />
        <p>© 2026 HĀZZL SPORTS & APPAREL. All rights reserved.</p>
        <p>Elevate Your Game.</p>
      </footer>
    </main>
  );
}
