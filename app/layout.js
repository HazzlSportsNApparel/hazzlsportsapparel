import "./globals.css";

export const metadata = {
  title: "HĀZZL SPORTS & APPAREL",
  description:
    "Premium custom uniforms, team apparel, corporate apparel and sports gear.",
  metadataBase: new URL("https://hazzlsportsapparel.com"),
  openGraph: {
    title: "HĀZZL SPORTS & APPAREL",
    description: "Precision. Power. Prestige.",
    url: "https://hazzlsportsapparel.com",
    siteName: "HĀZZL SPORTS",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
