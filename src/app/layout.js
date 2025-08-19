import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todo",
  description: "todo.kutluhann.net",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`bg-gray-100 h-full ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
