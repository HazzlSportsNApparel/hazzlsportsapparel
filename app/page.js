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
  ["featured-07.jpeg", "Custom Logos and designs made just for you"]
];


const shoutouts = [
  ["mala-mana.jpg", "Mala Mana", "Custom baseball jerseys"],
  ["torta-lovers-team.jpg", "Torta Lovers", "Custom team jerseys"],
  ["social-pour.jpg", "The Social Pour", "Corporate polos"],
  ["mound-pounders-team.jpg", "Mound Pounders", "Custom softball jerseys"],
  ["weekend-warriors.jpg", "Weekend Warriors", "Custom softball jerseys"],
  ["misfitz.jpg", "MisFitz", "Custom baseball jerseys"],
  ["dnow-corporate-shirts.jpg", "DNOW", "Corporate shirts"],
  ["mike-denise-morales.jpg", "Mike and Denise Morales", "Custom team apparel"],
  ["darkwing-ducks.jpg", "Darkwing Ducks", "Custom baseball jerseys"],
  [
    "unbridled-oilfield-services.jpg",
    "Unbridled Oilfield Services",
    "Corporate performance apparel"
  ],
];

const preorderProducts = [
  {
    id: "panthers-black-vertical",
    name: "Black Panthers Vertical Shirt",
    image: "panthers-black-vertical.jpg",
    shirtColor: "Black",
  },
  {
    id: "prowlers-btbagb",
    name: "Prowlers BTBAGB 1% Shirt",
    image: "prowlers-btbagb.jpg",
    shirtColor: "White",
  },
  {
    id: "prowlers-fight",
    name: "Prowlers Fight Shirt",
    image: "prowlers-fight.jpg",
    shirtColor: "White",
  },
  {
    id: "prowlers-white-vertical",
    name: "White Prowlers Vertical Shirt",
    image: "prowlers-white-vertical.jpg",
    shirtColor: "White",
  },
  {
    id: "class-2027-black-senior",
    name: "Black Class of 2027 Senior Shirt",
    image: "class-2027-black-senior.jpg",
    shirtColor: "Black",
  },
  {
    id: "panthers-white-vertical",
    name: "White Panthers Vertical Shirt",
    image: "panthers-white-vertical.jpg",
    shirtColor: "White",
  },
  {
    id: "panthers-white-retro",
    name: "White Retro Panthers Shirt",
    image: "panthers-white-retro.jpg",
    shirtColor: "White",
  },
  {
    id: "panthers-white-paw",
    name: "White Panthers Paw Shirt",
    image: "panthers-white-paw.jpg",
    shirtColor: "White",
  },
  {
    id: "class-2027-white-senior",
    name: "White Class of 2027 Senior Shirt",
    image: "class-2027-white-senior.jpg",
    shirtColor: "White",
  },
];

const preorderMaterials = [
  {
    name: "Interlock DriFit",
    price: 25,
  },
  {
    name: "3 Tuck Mesh",
    price: 25,
  },
  {
    name: "50/50 Shirt",
    price: 25,
  },
];
const preorderSleeves = [
  {
    name: "Short Sleeve",
    price: 0,
  },
  {
    name: "Long Sleeve",
    price: 3,
  },
];
const preorderCustomizations = [
  {
    name: "No Customization",
    price: 0,
  },
  {
    name: "Name and/or Number on Back",
    price: 2,
  },
];
const preorderSizes = [
  "Youth XS",
  "Youth S",
  "Youth M",
  "Youth L",
  "Youth XL",
  "Adult S",
  "Adult M",
  "Adult L",
  "Adult XL",
  "Adult 2XL",
  "Adult 3XL",
  "Adult 4XL",
];
const productOptions = [
  "Crew Neck Jersey",
  "V-Neck Jersey",
  "Full Button Jersey",
  "2-Button Jersey",
  "Full Length Pants",
  "Knicker Pants",
  "Complete Uniform Package",
  "Long Sleeve Jersey",
  "Hoodie",
  "Batting Jacket",
  "Quarter Zip Pullover",
  "Cap",
  "Arm Sleeves (Pair)",
  "Headband",
  "Backpack",
  "Duffle Bag",
  "Corporate Polo",
  "Corporate T-Shirt Cotton or 50/50",
  "Custom Rolling Bat Bag",
  "Bat Pack",
  "Flag Football Jersey",
  "Tackle Jersey With Pads",
  "Customized Flag/7V7 Helmets",
  "Soccer Jersey",
  "Basketball Jersey",
  "Volleyball Sleeveless",
  "DriFit Shirt",
  "Other",
];

const QUOTE_FORM_URL =
  "https://script.google.com/macros/s/AKfycbxhAQ7l3aqLlZmskIKfPCLMiBGURFGs9KuhVOAkSqjWdNnqZTKOOjsnN08W_478wzXr/exec";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([
  { product: "", quantity: "" },
  { product: "", quantity: "" },
]);
const [selectedPreorderProduct, setSelectedPreorderProduct] =
  useState(null);
  const [isPreorderLoading, setIsPreorderLoading] = useState(false);

const [preorderForm, setPreorderForm] = useState({
  material: "Interlock DriFit",
  sleeve: "Short Sleeve",
  customization: "No Customization",
backName: "",
backNumber: "",
  size: "Adult M",
  quantity: 1,
  fulfillment: "Customer Pickup",
  customerName: "",
  phone: "",
  email: "",
  shippingAddress: "",
  notes: "",
});
function addProduct() {
  setProducts((currentProducts) => [
    ...currentProducts,
    { product: "", quantity: "" },
  ]);
}

function removeProduct(indexToRemove) {
  setProducts((currentProducts) =>
    currentProducts.filter((_, index) => index !== indexToRemove)
  );
}

function updateProduct(indexToUpdate, field, value) {
  setProducts((currentProducts) =>
    currentProducts.map((item, index) =>
      index === indexToUpdate
        ? { ...item, [field]: value }
        : item
    )
  );
}

 async function handleQuoteSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  setSubmitted(true);

  try {
    await fetch(QUOTE_FORM_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    form.reset();

    setProducts([
      { product: "", quantity: "" },
      { product: "", quantity: "" },
    ]);

    setTimeout(() => {
      setSubmitted(false);
    }, 8000);
  } catch (error) {
    console.error("Quote submission failed:", error);
    setSubmitted(false);
  }
}
  async function handlePreorderSubmit(event) {
  event.preventDefault();
      if (isPreorderLoading) {
    return;
  }

  if (!selectedPreorderProduct) {
    alert("Please select a shirt first.");
    return;
  }
      
      setIsPreorderLoading(true);

  try {
    const checkoutResponse = await fetch(
      "/api/create-preorder-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: selectedPreorderProduct.name,
          shirtColor:
            selectedPreorderProduct.shirtColor,
          material: preorderForm.material,
          sleeve: preorderForm.sleeve,
          customization: preorderForm.customization,
backName: preorderForm.backName,
backNumber: preorderForm.backNumber,
          size: preorderForm.size,
          quantity: Number(preorderForm.quantity),
          fulfillment: preorderForm.fulfillment,
          customerName: preorderForm.customerName,
          phone: preorderForm.phone,
          email: preorderForm.email,
        }),
      }
    );

    const checkoutData =
      await checkoutResponse.json();

    if (
      !checkoutResponse.ok ||
      !checkoutData.success ||
      !checkoutData.checkoutUrl
    ) {
      throw new Error(
        checkoutData.message ||
          "Square checkout could not be created."
      );
    }

    const formData = new FormData();

    formData.append("formType", "preorder");
    formData.append(
  "squareOrderId",
  checkoutData.squareOrderId
);
    formData.append(
      "preorderCustomerName",
      preorderForm.customerName
    );
    formData.append(
      "preorderPhone",
      preorderForm.phone
    );
    formData.append(
      "preorderEmail",
      preorderForm.email
    );
    formData.append(
      "preorderProductName",
      selectedPreorderProduct.name
    );
    formData.append(
      "preorderShirtColor",
      selectedPreorderProduct.shirtColor
    );
    formData.append(
      "preorderMaterial",
      preorderForm.material
    );
    formData.append(
  "preorderSleeve",
  preorderForm.sleeve
);
    formData.append(
  "preorderCustomization",
  preorderForm.customization
);

formData.append(
  "preorderBackName",
  preorderForm.backName
);

formData.append(
  "preorderBackNumber",
  preorderForm.backNumber
);
    formData.append(
      "preorderSize",
      preorderForm.size
    );
    formData.append(
      "preorderQuantity",
      preorderForm.quantity
    );
    formData.append(
      "preorderFulfillment",
      preorderForm.fulfillment
    );
    formData.append(
      "preorderShippingAddress",
      preorderForm.shippingAddress
    );
    formData.append(
      "preorderNotes",
      preorderForm.notes
    );

    await fetch(QUOTE_FORM_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    window.location.href =
      checkoutData.checkoutUrl;
  } catch (error) {
    console.error(
      "Preorder checkout failed:",
      error
    );

    alert(
      error.message ||
        "The preorder checkout could not be started."
    );
    setIsPreorderLoading(false);
  }
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
     <section className="shoutoutSection" id="team-shoutouts">
  <div className="sectionHeading">
    <p className="eyebrow">Customer shout-outs</p>
    <h2>Teams and businesses we’re proud to outfit.</h2>
    <p>
      Thank you to the teams, companies, and customers who trusted
      HĀZZL Sports & Apparel with their custom uniforms and apparel.
    </p>
  </div>

  <div className="shoutoutGrid">
    {shoutouts.map(([image, name, description]) => (
      <article className="shoutoutCard" key={image}>
        <img
          src={`/images/${image}`}
          alt={`${name} custom apparel`}
          loading="lazy"
        />

        <div className="shoutoutCardText">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </article>
    ))}
  </div>
</section>
<section className="preorderSection" id="preorder-store">
  <div className="sectionHeading">
    <p className="eyebrow">Limited-time preorder</p>
    <h2>Panther and Prowler Fan Shirts</h2>
    <p>
      Orders open July 27, 2026 and close August 5, 2026.
      Expected pickup or delivery is August 14, 2026.
    </p>
  </div>

  <div className="preorderNotice">
    <strong>Order deadline:</strong> August 5, 2026
    <span>
      Sizes Youth XS through Adult 4XL. Pickup and shipping
      are available.
    </span>
  </div>

  <div className="preorderGrid">
    {preorderProducts.map((product) => (
      <article className="preorderCard" key={product.id}>
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          loading="lazy"
        />

        <div className="preorderCardText">
          <h3>{product.name}</h3>

          <p className="preorderColor">
            Shirt color: {product.shirtColor}
          </p>

          <div className="preorderPrices">
            <span>Interlock DriFit — $25</span>
            <span>3 Tuck Mesh — $25</span>
            <span>50/50 Shirt — $24</span>
          </div>

    <button
  type="button"
  className="button preorderButton"
  onClick={() => {
    setSelectedPreorderProduct(product);

    setTimeout(() => {
      document
        .getElementById("preorder-order-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }}
>
 
   
            Select This Shirt
          </button>
        </div>
      </article>
    ))}
  </div>
{selectedPreorderProduct && (
  <div
    className="preorderOrderForm"
    id="preorder-order-form"
  >
    <div className="preorderSelectedProduct">
      <img
        src={`/images/${selectedPreorderProduct.image}`}
        alt={selectedPreorderProduct.name}
      />

      <div>
        <p className="eyebrow">Selected shirt</p>
        <h3>{selectedPreorderProduct.name}</h3>
        <p>
          Shirt color:{" "}
          {selectedPreorderProduct.shirtColor}
        </p>
      </div>
    </div>

    <form onSubmit={handlePreorderSubmit}>
      <label>
        Material
        <select
          value={preorderForm.material}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              material: event.target.value,
            })
          }
        >
          {preorderMaterials.map((material) => (
            <option
              key={material.name}
              value={material.name}
            >
              {material.name} — ${material.price}
            </option>
          ))}
        </select>
      </label>
<label>
  Sleeve Length
  <select
    value={preorderForm.sleeve}
    onChange={(event) =>
      setPreorderForm({
        ...preorderForm,
        sleeve: event.target.value,
      })
    }
  >
    {preorderSleeves.map((sleeve) => (
      <option
        key={sleeve.name}
        value={sleeve.name}
      >
        {sleeve.name}
        {sleeve.price > 0
          ? ` +$${sleeve.price}`
          : ""}
      </option>
    ))}
  </select>
</label>
    <label>
  Back Customization
  <select
    value={preorderForm.customization}
    onChange={(event) =>
      setPreorderForm({
        ...preorderForm,
        customization: event.target.value,
        backName:
          event.target.value === "No Customization"
            ? ""
            : preorderForm.backName,
        backNumber:
          event.target.value === "No Customization"
            ? ""
            : preorderForm.backNumber,
      })
    }
  >
    {preorderCustomizations.map((option) => (
      <option
        key={option.name}
        value={option.name}
      >
        {option.name}
        {option.price > 0
          ? ` +$${option.price} per shirt`
          : ""}
      </option>
    ))}
  </select>
</label>

{preorderForm.customization !==
  "No Customization" && (
  <>
    <label>
      Name on Back
      <input
        type="text"
        value={preorderForm.backName}
        onChange={(event) =>
          setPreorderForm({
            ...preorderForm,
            backName: event.target.value,
          })
        }
        placeholder="Enter name, if wanted"
      />
    </label>

    <label>
      Number on Back
      <input
        type="text"
        value={preorderForm.backNumber}
        onChange={(event) =>
          setPreorderForm({
            ...preorderForm,
            backNumber: event.target.value,
          })
        }
        placeholder="Enter number, if wanted"
      />
    </label>
  </>
)}
      <label>
        Size
        <select
          value={preorderForm.size}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              size: event.target.value,
            })
          }
        >
          {preorderSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <label>
        Quantity
        <input
          type="number"
          min="1"
          max="25"
          value={preorderForm.quantity}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              quantity: event.target.value,
            })
          }
        />
      </label>

      <label>
        Pickup or Shipping
        <select
          value={preorderForm.fulfillment}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              fulfillment: event.target.value,
            })
          }
        >
          <option value="Customer Pickup">
            Customer Pickup
          </option>
          <option value="Shipping">
            Shipping
          </option>
        </select>
      </label>

      <label>
        Customer Name
        <input
          type="text"
          required
          value={preorderForm.customerName}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              customerName: event.target.value,
            })
          }
        />
      </label>

      <label>
        Phone Number
        <input
          type="tel"
          required
          value={preorderForm.phone}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              phone: event.target.value,
            })
          }
        />
      </label>

      <label>
        Email
        <input
          type="email"
          required
          value={preorderForm.email}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              email: event.target.value,
            })
          }
        />
      </label>

      {preorderForm.fulfillment === "Shipping" && (
        <label className="preorderFullWidth">
          Shipping Address
          <textarea
            required
            value={preorderForm.shippingAddress}
            onChange={(event) =>
              setPreorderForm({
                ...preorderForm,
                shippingAddress: event.target.value,
              })
            }
          />
        </label>
      )}

      <label className="preorderFullWidth">
        Order Notes
        <textarea
          value={preorderForm.notes}
          onChange={(event) =>
            setPreorderForm({
              ...preorderForm,
              notes: event.target.value,
            })
          }
          placeholder="Add any important information here."
        />
      </label>

      <button
  type="submit"
  className="button preorderSubmitButton"
  disabled={isPreorderLoading}
>
  {isPreorderLoading
    ? "Opening Secure Checkout..."
    : "Continue to Secure Payment"}
</button>
    </form>
  </div>
)}
  <p className="preorderFinePrint">
    Product images are mockups. Final colors, sizing, and print
    placement may vary slightly. Orders are produced after the
    preorder closes.
  </p>
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

        

        <form
  className="quoteForm"
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

{products.map((item, index) => (
  <div className="productRequestRow" key={index}>
    <label>
      Product {index + 1}
      <select
        name={`product${index + 1}`}
        value={item.product}
        onChange={(event) =>
          updateProduct(index, "product", event.target.value)
        }
        required={index === 0}
      >
        <option value="">Select Item</option>

        {productOptions.map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
    </label>

    <label>
      Quantity
      <input
        name={`quantity${index + 1}`}
        type="number"
        min="1"
        value={item.quantity}
        onChange={(event) =>
          updateProduct(index, "quantity", event.target.value)
        }
        required={index === 0}
      />
    </label>

    {products.length > 1 && (
      <button
        type="button"
        className="smallButton"
        onClick={() => removeProduct(index)}
      >
        Remove Product
      </button>
    )}
  </div>
))}

<button
  type="button"
  className="smallButton"
  onClick={addProduct}
>
  + Add Another Product
</button>
      
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
