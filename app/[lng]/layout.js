import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import { locales } from "@/config.js";
import { Footer } from "@/app/components/Footer";
import Header from "@/app/components/Header";
export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export default async function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  );
}
