import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "./Head";
import { ToastContainer } from "react-toastify";
import { GDPRProvider } from "./components/GDPRConsent";
import { getCars } from "./api/controllers/CarController";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


import { getBrandTitle, getBrandDescription } from './common/domainUtils';

// Dynamic metadata generation based on host
export async function generateMetadata(): Promise<Metadata> {
  // Get the host from request headers (works with EC2 domain mapping)
  const headersList = await headers();
  const host = headersList.get('host') || process.env.HOST || process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';
  
  console.log('Detected host:', host); // Debug log for EC2 deployment
  
  const title = getBrandTitle(host);
  const description = getBrandDescription(host);
  const baseUrl = `https://${host}`;
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      type: 'website',
      url: baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

// Function to generate dynamic itemListSchema from cars data
async function generateItemListSchema() {
  try {
    const cars = await getCars();
    const itemListElement = cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: car.name,
        image: car.mainImage ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${car.mainImage}` : "https://via.placeholder.com/150",
        description: car.description ? JSON.stringify(car.description) : `Luxury car: ${car.name}`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/car/${car.name}`
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement
    };
  } catch (error) {
    console.error("Error generating itemListSchema:", error);
    // Fallback schema
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: []
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const itemListSchema = await generateItemListSchema();
  const metadata = await generateMetadata();
  
  return (
    <html lang="en">
      <Head
        title={metadata.title as string}
        description={metadata.description ?? ""}
        itemListSchema={itemListSchema}
      />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <GDPRProvider>
          {children}
          <ToastContainer />
        </GDPRProvider>
      </body>
    </html>
  );
}
