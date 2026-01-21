// app/layout.tsx
import { JobsProvider } from "@/context/JobsContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <JobsProvider>
          <Navbar />
          {children}
          <Footer />
        </JobsProvider>
      </body>
    </html>
  );
}
