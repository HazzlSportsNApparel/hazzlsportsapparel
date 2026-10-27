import { preorders } from "../../data/preorders";

export default function PreordersPage() {
  const activeSchools = preorders.filter((school) => school.active);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#d6b35a",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          HĀZZL SPORTS & APPAREL
        </p>

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          School Preorders
        </h1>

        <p
          style={{
            color: "#bbb",
            marginBottom: "40px",
            maxWidth: "700px",
          }}
        >
          Support your school and order official fan, playoff, and fundraiser shirts.
        </p>

        {activeSchools.length === 0 ? (
          <div
            style={{
              background: "#111",
              border: "1px solid #333",
              padding: "30px",
            }}
          >
            <h2 style={{ color: "#d6b35a" }}>
              No active school preorders right now.
            </h2>
            <p style={{ color: "#bbb" }}>
              Check back soon for playoff shirts, fan shirts, and school fundraisers.
            </p>
          </div>
        ) : (
          activeSchools.map((school) => (
            <section
              key={school.schoolSlug}
              style={{
                marginBottom: "50px",
              }}
            >
              <h2
                style={{
                  color: "#d6b35a",
                  fontSize: "32px",
                }}
              >
                {school.school}
              </h2>

              <p style={{ color: "#ccc" }}>
                {school.fundraiserName}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {school.items
                  .filter((item) => item.active)
                  .map((item) => {
                    const schoolAmount =
                      item.salePrice - item.hazzlPrice;

                    return (
                      <article
                        key={item.id}
                        style={{
                          background: "#111",
                          border: "1px solid #333",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            aspectRatio: "4 / 5",
                            objectFit: "cover",
                            background: "#222",
                          }}
                        />

                        <div style={{ padding: "20px" }}>
                          <h3>{item.title}</h3>

                          <p
                            style={{
                              color: "#bbb",
                              lineHeight: "1.6",
                            }}
                          >
                            {item.description}
                          </p>

                          <p
                            style={{
                              fontSize: "24px",
                              color: "#d6b35a",
                              fontWeight: "bold",
                            }}
                          >
                            ${item.salePrice}
                          </p>

                          <p style={{ color: "#aaa" }}>
                            Fundraiser contribution: ${schoolAmount} per shirt
                          </p>

                          <p style={{ color: "#aaa" }}>
                            Preorder closes: {item.deadline}
                          </p>

                          <button
                            style={{
                              width: "100%",
                              padding: "14px",
                              background: "#d6b35a",
                              color: "#000",
                              border: "none",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            Order This Shirt
                          </button>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
