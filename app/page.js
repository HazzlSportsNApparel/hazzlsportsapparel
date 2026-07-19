"use client";

import { useState } from "react";

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
  
  ["featured-03.jpeg", "Corporate Apparel"],
  ["featured-04.jpeg", "Corporate Shirts"],
  ["featured-05.jpeg", "Team apparel design"],
  ["featured-06.jpeg", "Custom Oilfield To Softball/Baseball Field apparel"],
  ["featured-07.jpeg", "Custom branded shirt"]
];

const QUOTE_FORM_URL =
  "https://script.google.com/macros/s/AKfycbxhAQ7l3aqLlZmskIKfPCLMiBGURFGs9KuhVOAkSqjWdNnqZTKOOjsnN08W_478wzXr/exec";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleQuoteSubmit(event) {
    const form = event.currentTarget;

    setSubmitted(true);

    setTimeout(() => {
      form.reset();
    }, 500);

    setTimeout(() => {
      setSubmitted(false);
    }, 8000);
  }

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

        <a className="smallButton" href="#uniform-builder">
          Request a Quote
        </a>
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
            <a className="primaryButton" href="#collections">
              Explore Collections
            </a>

            <a className="secondaryButton" href="#uniform-builder">
              Build Your Uniform
            </a>
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
              <a href="#uniform-builder">Get a quote →</a>
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
              <img
                src={`/images/${image}`}
                alt={label}
                loading="lazy"
              />

              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="builderSection" id="uniform-builder">
        <div>
          <p className="eyebrow">Custom quote request</p>

          <h2>Bring your team vision to life.</h2>

          <p>
            Enter your project details below. Your request will be sent
            directly to HĀZZL Sports & Apparel for review and pricing.
          </p>
        </div>

        <iframe
          name="quote-submit-frame"
          title="Quote submission"
          style={{ display: "none" }}
        />

        <form
          className="quoteForm"
          action={QUOTE_FORM_URL}
          method="POST"
          target="quote-submit-frame"
          encType="application/x-www-form-urlencoded"
          onSubmit={handleQuoteSubmit}
        >
          <label>
            Name
            <input
              name="customerName"
              autoComplete="name"
              required
            />
          </label>

          <label>
            Team or company
            <input
              name="teamCompany"
              required
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>
<label className="wide">
  Discount code
  <input
    name="discountCode"
    placeholder="Enter code if you have one"
    autoCapitalize="characters"
  />
</label>
          
<div className="wide">
  <h3>Products Requested</h3>
</div>

<label>
  Product 1
  <select name="product1">
    <option value="">Select Item</option>
    <option>Full Button Jersey</option>
    <option>2 Button Jersey</option>
    <option>V-Neck Jersey</option>
    <option>Crew Neck Jersey</option>
    <option>Knicker Pants</option>
    <option>Full Length Pants</option>
    <option>Full Uniform</option>
    <option>DriFit Shirt</option>
    <option>Polo Shirt</option>
    <option>Hoodie</option>
    <option>Hat</option>
    <option>Arm Sleeve</option>
  </select>
</label>

<label>
  Quantity
  <input
    name="quantity1"
    type="number"
    min="1"
  />
</label>
          <label>
            Needed by
            <input
              name="neededBy"
              type="date"
            />
          </label>

          <label className="wide">
            Colors
            <input
              name="colors"
              placeholder="Example: black, gold and white"
            />
          </label>

          <label className="wide">
            Sizes
            <input
              name="sizes"
              placeholder="Example: 2 Small, 5 Medium, 5 Large"
            />
          </label>

          <label className="wide">
            Project details
            <textarea
              name="notes"
              rows="5"
              placeholder="Uniform style, player names, numbers, logo information and design ideas"
              required
            />
          </label>

          <button className="primaryButton wide" type="submit">
            Send Quote Request
          </button>

          {submitted && (
            <p className="wide" role="status">
              Thank you! Your quote request has been received. HĀZZL Sports
              & Apparel will contact you soon.
            </p>
          )}
        </form>
      </section>

      <section className="contactSection" id="contact">
        <div>
          <p className="eyebrow">HĀZZL SPORTS & APPAREL</p>
          <h2>Ready to elevate your game?</h2>
        </div>

        <div className="contactDetails">
          <a href="tel:+14322901910">(432) 290-1910</a>
          <a href="mailto:hazzlsports@yahoo.com">
            hazzlsports@yahoo.com
          </a>
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
