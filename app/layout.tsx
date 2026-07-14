import "./globals.css";

export const metadata = {

  title: "HĀZZL SPORTS",

  description: "Premium Custom Sports Apparel"

};

export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  );

}
