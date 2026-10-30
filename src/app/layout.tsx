import "./globals.css";

export const metadata = {
  title: "Smile Dental | Modern Dental Care",
  description:
    "Discover comfortable dental care, cosmetic dentistry, teeth cleaning, orthodontics, and appointment assistance at Smile Dental.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}