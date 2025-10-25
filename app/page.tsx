"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, GraduationCap, Mail, Github, Linkedin, Twitter, Globe, Calendar, Copy, CheckCircle2, Sun, Moon, Users, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 使用说明
// 1. 全局替换 profile 与内容占位
// 2. 将简历 PDF 放到 /public/cv.pdf 然后更新 cvUrl
// 3. Reading Group 与 Publications 写入下方数据
// 4. 发布到 GitHub Pages 或 Netlify 即可

const profile = {
  nameZh: "你的中文名",
  nameEn: "Your Name",
  title: "PhD Applicant in Computer Science",
  affiliation: "Your University, Department",
  email: "your.name@university.edu",
  location: "City, Country",
  avatar: "", // 可放头像链接 可留空
  socials: {
    github: "https://github.com/yourname",
    scholar: "https://scholar.google.com/citations?user=xxxxx",
    linkedin: "https://www.linkedin.com/in/yourname/",
    twitter: "https://twitter.com/yourname",
    website: "https://yourdomain.com"
  },
  cvUrl: "/cv.pdf"
};

const highlights = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    text: "研究方向 例如 LLM 安全 强化学习 可解释性"
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    text: "目标 2026 秋季博士入学，专注 XXX 方向"
  },
  {
    icon: <Globe className="h-5 w-5" />,
    text: "开源项目与数据集 欢迎合作"
  }
];

const projects = [
  {
    title: "Project Alpha",
    role: "First Author",
    period: "2024",
    desc: "一句话概述 项目成果与影响",
    tags: ["LLM", "Alignment"],
    links: [{ label: "Paper", href: "#" }, { label: "Code", href: "#" }]
  },
  {
    title: "Project Beta",
    role: "Co-author",
    period: "2023",
    desc: "一句话概述",
    tags: ["Vision", "Robotics"],
    links: [{ label: "Website", href: "#" }]
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
  desc: "面向博士申请与研究新生的长期阅读小组",
  schedule: "每周三 19:00 CST 线上 Zoom",
  organizers: ["Your Name", "Teammate"],
  contact: "your.name@university.edu",
  joinForm: "#",
  sessions: [
    {
      date: "2025-11-05",
      title: "RLHF 综述快速入门",
      speaker: "Your Name",
      material: "#"
    },
    {
      date: "2025-11-12",
      title: "Constitutional AI 论文精读",
      speaker: "Alice",
      material: "#"
    }
  ]
};

const awards = [
  { year: "2024", text: "National Scholarship" },
  { year: "2023", text: "Best Undergraduate Thesis" }
];

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
          <NavLink href="#home" label="主页" />
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#reading" label="Reading Group" />
          <NavLink href="#pubs" label="Publications" />
          <NavLink href="#teaching" label="Teaching" />
          <NavLink href="#awards" label="Awards" />
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
            {profile.nameZh} {profile.nameEn}
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
            {profile.socials.twitter && (
              <a className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border" href={profile.socials.twitter} target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" /> X
              </a>
            )}
          </div>
          <ul className="mt-6 grid gap-2">
            {highlights.map((h, i)=> (
              <li key={i} className="flex items-start gap-2 text-sm"><span className="mt-0.5">{h.icon}</span><span>{h.text}</span></li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-64">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">快速入口</CardTitle>
              <CardDescription>常用链接</CardDescription>
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
                  <a key={k} className="text-sm underline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
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
      <div className="mb-4 text-sm">时间 {readingGroup.schedule}</div>
      <div className="mb-6 text-sm">组织者 {readingGroup.organizers.join("、")} 联系 {readingGroup.contact} <a className="underline" href={readingGroup.joinForm}>报名</a></div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900">
              <th className="p-2 text-left">日期</th>
              <th className="p-2 text-left">主题</th>
              <th className="p-2 text-left">主讲</th>
              <th className="p-2 text-left">材料</th>
            </tr>
          </thead>
          <tbody>
            {readingGroup.sessions.map((s, i)=> (
              <tr key={i} className="border-t">
                <td className="p-2 align-top">{s.date}</td>
                <td className="p-2 align-top">{s.title}</td>
                <td className="p-2 align-top">{s.speaker}</td>
                <td className="p-2 align-top"><a className="underline" href={s.material}>链接</a></td>
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

function Awards(){
  if (!awards.length) return null;
  return (
    <Section id="awards" title="Awards" icon={<Calendar className="h-6 w-6" /> }>
      <ul className="text-sm space-y-2">
        {awards.map((a, i)=>(
          <li key={i}>{a.year} · {a.text}</li>
        ))}
      </ul>
    </Section>
  );
}

function CV(){
  return (
    <Section id="cv" title="CV" icon={<FileText className="h-6 w-6" /> }>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href={profile.cvUrl} target="_blank" rel="noreferrer">下载 PDF</a>
        </Button>
        <a className="underline text-sm" href={profile.cvUrl} target="_blank" rel="noreferrer">在线预览</a>
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
          {profile.socials.scholar && <a className="underline" href={profile.socials.scholar}>Scholar</a>}
          {profile.socials.website && <a className="underline" href={profile.socials.website}>Website</a>}
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

export default function PersonalHomepage(){
  return (
    <div className="relative min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <TopNav />
      <AuroraBackground />
      <main>
        <Hero />
        <Projects />
        <ReadingGroup />
        <Publications />
        <Teaching />
        <Awards />
        <CV />
      </main>
      <Footer />
    </div>
  );
}
