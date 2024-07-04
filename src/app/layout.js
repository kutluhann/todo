import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "todo.kutluhann.net",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="en">
      <body className={`bg-gray-100 h-full ${inter.className}`}>{children}</body>
    </html>
  );
}
