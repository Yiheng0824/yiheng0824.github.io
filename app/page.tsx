"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, GraduationCap, Mail, Github, Linkedin, Twitter, Globe, Calendar, Copy, CheckCircle2, Sun, Moon, Users, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NovatrixBackground from "@/components/ui/novatrix-background"
import VantaGlobe from "@/components/ui/VantaGlobe";
// 使用说明
// 1. 全局替换 profile 与内容占位
// 2. 将简历 PDF 放到 /public/cv.pdf 然后更新 cvUrl
// 3. Reading Group 与 Publications 写入下方数据
// 4. 发布到 GitHub Pages 或 Netlify 即可

const profile = {
  nameEn: "Yiheng Zhang",
  nameZh: "(张怡蘅)",
  title: "PhD Applicant in Computer Science",
  affiliation: "University of Wisconsin-Madison, Computer Science",
  email: "zhang2968@wisc.edu",
  location: "Madison, Wisconsin, United States",
  avatar: "./avator.png", // 可放头像链接 可留空
  socials: {
    github: "https://github.com/ELAINZ",
    // scholar: "https://scholar.google.com/citations?user=xxxxx",
    linkedin: "https://www.linkedin.com/in/yiheng-zhang-4a7023329/",
    // twitter: "https://twitter.com/yourname",
    // website: "https://yourdomain.com"
  },
  cvUrl: "./Yiheng_ZHANG_s_Resume.pdf"
};

const highlights = [
  
  {
    text: `I am Yiheng Zhang, a senior student at University of Wisconsin-Madison studying computer science, advised by <a href="https://grigoris.ece.wisc.edu/group.html" target="_blank" rel="noopener noreferrer" class="font-semibold text-blue-600 hover:underline">Prof. Grigoris Chrysos</a>.  My GPA during the study in University of Wisconsin-Madison was 3.95/4.0.`
  },
  {
    text:"My research interests are machine learning and natural language processing, with a focus on large language models (LLMs), diffusion language models (DLLMs), and trustworthy AI. In particular, my projects focused on teaching small arithmetic tasks to transformer, and remasking skills in diffusion language models."
  },
  {
    text: "I am currently applying to Ph.D. programs for Fall 2026 and internships for Summer 2026. Please feel free to contact me if you think I would be a good fit. Thank you."
  },
  // {
  //   icon: <Sparkles className="h-5 w-5" />,
  //   text: "Architecture design, Trustworthy Machine Learning"
  // },
  // // {
  // //   icon: <Globe className="h-5 w-5" />,
  // //   text: "Currently focusing on diffusion language models"
  // // },
  // {
  //   icon: <GraduationCap className="h-5 w-5" />,
  //   text: "Open for 2026 Phd! Please contact me if you are interested, thank you."
  // },
];

const projects = [
  {
    title: "Large Language Models for Arithmetic Reasoning",
    role: "Machine Learning",
    period: "Feb. 2025 - Jun. 2025",
    desc: "Designed and experimented over arithmetic tasks on Large Language Models, resulted in better generalization length",
    tags: ["LLM", "Machine Learning"],
    links: []
  },
  {
    title: "Diffusion Language Models and Remasking",
    role: "Machine Learning",
    period: "May. 2025 - Today",
    desc: "Implemented the code base for diffusion training, currently working on remasking tasks.",
    tags: ["Diffusion Language Models", "Deep Learning"],
    links: []
  }
];

const publications = [
  {
    title: "Title of the Paper",
    authors: "Your Name*, Collaborator Name, Advisor Name",
    venue: "ICML 2025 under review",
    links: [{ label: "PDF", href: "#" }, { label: "Code", href: "#" }],
    bibtex: `@inproceedings{your2025paper,\n  title={Title of the Paper},\n  author={Your Name and Collaborator and Advisor},\n  booktitle={ICML},\n  year={2025}\n}`
  }
];

const readingGroup = {
  name: "Reading Group on Trustworthy ML",
  desc: "Internal reading group for sharing SoTA papers and new ideas.",
  schedule: "Every Wednesday and Friday",
  organizers: ["Grigoris Chrysos", "Professor"],
  contact: "your.name@university.edu",
  joinForm: "#",
  sessions: [
    {
      date: "2025-05-30",
      title: "Understanding Diffusion Models: A Unified Perspective",
      // speaker: "Your Name",
      material: "https://drive.google.com/file/d/1Yt_c1p8qyv3DihARld6MgfAeNe4aM71U/view?usp=sharing"
    },
    {
      date: "2025-06-10",
      title: "DDPM, DDIM and Guidance",
      // speaker: "Alice",
      material: "https://drive.google.com/file/d/17d3So4415Uq-Usl0jDVcEZhDcFy7HObk/view"
    },
    {
      date: "2025-06-19",
      title: "Large Language Diffusion Models",
      // speaker: "Alice",
      material: "https://arxiv.org/abs/2502.099922"
    },
    {
      date: "2025-09-10",
      title: "Demystifying Foreground-Background Memorization in Diffusion Models",
      // speaker: "Alice",
      material: "https://arxiv.org/abs/2502.099922"
    },
    {
      date: "2025-09-26",
      title: "Persona Features Control Emergent Misalignment",
      // speaker: "Alice",
      material: "https://arxiv.org/abs/2506.19823"
    },
    {
      date: "2025-10-10",
      title: "TraceDet: Hallucination Detection from the Decoding Trace of Diffusion Large Language Models",
      // speaker: "Alice",
      material: "https://drive.google.com/file/d/1PRdDfhbDMTmIuYEqG2gyFb1cTGQPZd4h/view?usp=sharing"
    }
  ]
};

// const awards = [
//   { year: "2024", text: "National Scholarship" },
//   { year: "2023", text: "Best Undergraduate Thesis" }
// ];

const teaching = [
  { term: "Fall 2024", course: "CS XXX Machine Learning", role: "TA" }
];

function useClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return { copied, copy };
}

function Section({ id, title, icon, children }:{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }){
  return (
    <section id={id} className="relative z-10 scroll-mt-24 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          {icon}
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function TopNav(){
  const [dark, setDark] = useState(false);
  React.useEffect(()=>{
    document.documentElement.classList.toggle("dark", dark);
  },[dark]);
  const NavLink = ({ href, label }:{ href: string; label: string }) => (
    <a href={href} className="text-sm hover:underline">
      {label}
    </a>
  );
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 border-b">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold">{profile.nameEn}</a>
        <nav className="flex items-center gap-4">
          <NavLink href="#home" label="HomePage" />
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#reading" label="Reading Group" />
          {/* <NavLink href="#pubs" label="Publications" />
          <NavLink href="#teaching" label="Teaching" />
          <NavLink href="#awards" label="Awards" /> */}
          <NavLink href="#cv" label="CV" />
          <button aria-label="Dark mode" className="p-2 rounded-xl border" onClick={()=>setDark(v=>!v)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <Section id="home" title="" icon={<></>}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-3xl md:text-4xl font-bold">
            {profile.nameEn} {profile.nameZh}
          </motion.h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">{profile.title} · {profile.affiliation}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border">
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            {profile.socials.github && (
              <a className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border" href={profile.socials.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {profile.socials.linkedin && (
              <a className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}
            {/* {profile.socials.twitter && (
              <a className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border" href={profile.socials.twitter} target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" /> X
              </a>
            )} */}
          </div>
          <ul className="mt-6 grid gap-4">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="text-sm whitespace-pre-line leading-relaxed"
                dangerouslySetInnerHTML={{ __html: h.text }}
              />
            ))}
          </ul>
        </div>
        <div className="w-full md:w-64 flex flex-col gap-4">
          {profile.avatar && (
            <div className="w-full">
              <img
                src={profile.avatar}
                alt={profile.nameEn}
                className="w-50 h-55 object-cover rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800"
              />
            </div>
          )}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <a className="underline" href="#projects">Projects</a>
              <a className="underline" href="#reading">Reading Group</a>
              <a className="underline" href="#pubs">Publications</a>
              <a className="underline" href="#cv">CV</a>
            </CardContent>
          </Card>
        </div>

      </div>
    </Section>
  );
}

function Projects(){
  return (
    <Section id="projects" title="Projects" icon={<BookOpen className="h-6 w-6" /> }>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i)=> (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <CardDescription>{p.role} · {p.period}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map((t, idx)=>(
                  <span key={idx} className="text-xs px-2 py-1 rounded-full border">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {p.links.map((l, k)=>(
                  <a key={k} className="text-sm underline" target="_blank" rel="noreferrer"></a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Publications(){
  const { copied, copy } = useClipboard();
  return (
    <Section id="pubs" title="Publications" icon={<FileText className="h-6 w-6" /> }>
      <div className="space-y-4">
        {publications.map((pub, idx)=> (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-base">{pub.title}</CardTitle>
              <CardDescription>{pub.authors} · {pub.venue}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-3">
                {pub.links.map((l, k)=>(
                  <a key={k} className="text-sm underline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={()=>copy(pub.bibtex)}>
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />} 复制 BibTeX
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ReadingGroup(){
  return (
    <Section id="reading" title="Reading Group" icon={<Users className="h-6 w-6" /> }>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">{readingGroup.desc}</p>
      <div className="mb-4 text-sm">Time {readingGroup.schedule}</div>
      <div className="mb-6 text-sm"> {} 
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Theme</th>
              {/* <th className="p-2 text-left"></th> */}
              <th className="p-2 text-left">Material</th>
            </tr>
          </thead>
          <tbody>
            {readingGroup.sessions.map((s, i)=> (
              <tr key={i} className="border-t">
                <td className="p-2 align-top">{s.date}</td>
                <td className="p-2 align-top">{s.title}</td>
                {/* <td className="p-2 align-top">{s.speaker}</td> */}
                <td className="p-2 align-top"><a className="underline" href={s.material}>Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Teaching(){
  if (!teaching.length) return null;
  return (
    <Section id="teaching" title="Teaching" icon={<GraduationCap className="h-6 w-6" /> }>
      <ul className="text-sm space-y-2">
        {teaching.map((t, i)=>(
          <li key={i}>{t.term} · {t.course} · {t.role}</li>
        ))}
      </ul>
    </Section>
  );
}

// function Awards(){
//   if (!awards.length) return null;
//   return (
//     <Section id="awards" title="Awards" icon={<Calendar className="h-6 w-6" /> }>
//       <ul className="text-sm space-y-2">
//         {awards.map((a, i)=>(
//           <li key={i}>{a.year} · {a.text}</li>
//         ))}
//       </ul>
//     </Section>
//   );
// }

function CV(){
  return (
    <Section id="cv" title="CV" icon={<FileText className="h-6 w-6" /> }>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href={profile.cvUrl} target="_blank" rel="noreferrer">Download PDF</a>
        </Button>
        <a className="underline text-sm" href={profile.cvUrl} target="_blank" rel="noreferrer">Online View</a>
      </div>
    </Section>
  );
}

function Footer(){
  return (
    <footer className="py-10 border-t">
      <div className="max-w-5xl mx-auto px-4 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} {profile.nameEn}</div>
        <div className="flex gap-3">
          {profile.socials.github && <a className="underline" href={profile.socials.github}>GitHub</a>}
          {/* {profile.socials.scholar && <a className="underline" href={profile.socials.scholar}>Scholar</a>}
          {profile.socials.website && <a className="underline" href={profile.socials.website}>Website</a>} */}
        </div>
      </div>
    </footer>
  );
}

function AuroraBackground(){
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <style>{`
        @keyframes drift { 0% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(10vw,-5vh,0) scale(1.1) } 100% { transform: translate3d(0,0,0) scale(1) } }
        .aurora-blur { filter: blur(60px); opacity: .55 }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 to-indigo-100/20 dark:from-indigo-900/30 dark:to-slate-900/30"></div>
      <div className="aurora-blur">
        <div className="absolute -top-32 -left-10 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6),transparent_60%)] animate-[drift_14s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 -right-24 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.5),transparent_60%)] animate-[drift_18s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-1/4 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.45),transparent_60%)] animate-[drift_22s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}
export default function PersonalHomepage() {
  return (
    <div className="relative min-h-screen text-neutral-900 dark:text-neutral-50">
      {/* === 最底层：灰白流动背景 === */}
      <div className="fixed inset-0 -z-20">
        <NovatrixBackground
          color={[0.7, 0.7, 0.7]}
          speed={0.8}
          amplitude={0.05}
          mouseReact
        />
      </div>

      {/* === 白色主层（内容） === */}
      <div className="relative z-20 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm min-h-screen shadow-lg overflow-hidden">
        <TopNav />
        <main>
          <Hero />
          <Projects />
          <ReadingGroup />
          <CV />
          
          {/* === 球体层：在 CV 下方,作为页面内容 === */}
          <div className="relative w-full h-[400px] overflow-hidden">
            <VantaGlobe />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}