import "./globals.css";
import { JobsProvider } from "@/context/JobsContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JobsProvider>
          <Navbar />
          {children}
          <Footer />
        </JobsProvider>
      </body>
    </html>
  );
}
