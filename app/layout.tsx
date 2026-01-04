import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

function SEO() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Yiheng Zhang",
            alternateName: "张怡蘅",
            url: "https://YOUR_DOMAIN_HERE",
            email: "mailto:zhang2968@wisc.edu",
            affiliation: {
              "@type": "Organization",
              name: "University of Wisconsin–Madison",
            },
            jobTitle: "PhD Applicant in Computer Science",
            sameAs: [
              "https://github.com/ELAINZ",
              "https://www.linkedin.com/in/yiheng-zhang-4a7023329/",
            ],
          }),
        }}
      />
    </Head>
  );
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yiheng Zhang's home page",
  description: "A personal home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
