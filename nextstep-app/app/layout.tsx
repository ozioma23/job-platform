import "./globals.css";
import { JobsProvider } from "@/context/JobsContext";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <UserProvider>
          <JobsProvider>

            <Navbar />

            {/* ✅ Responsive page wrapper */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>

            <Footer />

          </JobsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
