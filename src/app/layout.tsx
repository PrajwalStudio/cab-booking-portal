import './globals.css';
import Link from 'next/link';
import { Home, Users, ClipboardList } from 'lucide-react';
import GoogleMapsProvider from '@/components/GoogleMapsProvider'; // ✅ Important

export const metadata = {
  title: 'Cab Booking Portal',
  description: 'Vendor Dashboard for managing cab bookings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <GoogleMapsProvider>
          <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-6xl mx-auto flex justify-center gap-10 py-4 px-4 sm:px-6">
              <Link href="/" className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium transition">
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link href="/drivers" className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium transition">
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">Drivers</span>
              </Link>
              <Link href="/bookings" className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium transition">
                <ClipboardList className="w-5 h-5" />
                <span className="hidden sm:inline">Bookings</span>
              </Link>
              
            </nav>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
