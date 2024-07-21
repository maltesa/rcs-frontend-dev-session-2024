import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Pokemon Story Generator",
  description: "Pick up to 5 Pokemon and get an epic story",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-2xl py-8`}
      >
        <h1 className="text-4xl font-bold">Pokemon Story Generator</h1>
        <hr className="mb-8 border-b-2 border-black" />

        {children}
      </body>
    </html>
  );
}
