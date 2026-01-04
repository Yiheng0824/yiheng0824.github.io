import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. 优化 Metadata：增加学校、专业和中文名关键词
export const metadata: Metadata = {
  title: "Yiheng Zhang (张怡蘅) | UW-Madison Computer Science",
  description: "Personal website of Yiheng Zhang, a Computer Science student at University of Wisconsin-Madison focusing on LLMs and Diffusion Models.",
  keywords: ["Yiheng Zhang", "张怡蘅", "UW-Madison", "Computer Science", "Machine Learning", "LLMs"],
  authors: [{ name: "Yiheng Zhang" }],
  // 如果你有部署后的 URL，建议填上
  // metadataBase: new URL('https://your-domain.com'), 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. 结构化数据 (JSON-LD)：直接在 body 中注入脚本，这是搜索引擎最喜欢的“名片”
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yiheng Zhang",
    "alternateName": "张怡蘅",
    "url": "https://ELAINZ.github.io", // 替换为你的真实域名
    "email": "zhang2968@wisc.edu",
    "affiliation": {
      "@type": "Organization",
      "name": "University of Wisconsin–Madison",
    },
    "jobTitle": "PhD Applicant in Computer Science",
    "sameAs": [
      "https://github.com/ELAINZ",
      "https://www.linkedin.com/in/yiheng-zhang-4a7023329/",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 注入 JSON-LD 脚本 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}