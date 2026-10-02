export const initialResumeData = {
  personalInfo: {
    fullName: "Karthik Verma",
    jobTitle: "Senior Full Stack Software Engineer",
    email: "karthik.verma@example.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, India",
    website: "https://karthikverma.dev",
    linkedin: "https://linkedin.com/in/karthik-verma",
    github: "https://github.com/karthik-verma",
    instagram: "https://instagram.com/karthik_tech",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    showPhoto: true,
  },
  summary: "Results-driven Software Engineer with 5+ years of experience designing and scaling high-performance web applications and cloud architectures. Proficient in React, Node.js, TypeScript, and AWS. Proven track record of reducing system latency by 35% and mentoring high-velocity engineering teams.",
  experiences: [
    {
      id: "exp-1",
      role: "Senior Software Engineer",
      company: "Microsoft / TechCorp Cloud",
      location: "Hyderabad, India",
      startDate: "2022-04",
      endDate: "",
      current: true,
      description: "• Architected micro-frontends and scalable RESTful/GraphQL APIs serving 2M+ active monthly users.\n• Improved core web vitals and client-side performance, reducing initial load time by 42%.\n• Spearheaded the migration from legacy infrastructure to AWS serverless container clusters (ECS/Fargate).\n• Mentored 8 junior and mid-level engineers through code reviews and bi-weekly architecture sessions."
    },
    {
      id: "exp-2",
      role: "Full Stack Developer",
      company: "InnovateX Solutions",
      location: "Bengaluru, India",
      startDate: "2020-01",
      endDate: "2022-03",
      current: false,
      description: "• Built resilient payment checkout flows and integrations with Stripe, Razorpay, and PayPal.\n• Developed reusable React component libraries and design systems adopted across 5 product teams.\n• Optimized PostgreSQL queries and Redis caching, cutting database response times by 30%."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "National Institute of Technology (NIT)",
      degree: "Bachelor of Technology (B.Tech)",
      fieldOfStudy: "Computer Science & Engineering",
      location: "Warangal, India",
      startDate: "2016-08",
      endDate: "2020-05",
      grade: "8.8 / 10 CGPA"
    }
  ],
  skills: [
    {
      id: "skill-1",
      category: "Frontend Development",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "HTML5/CSS3"]
    },
    {
      id: "skill-2",
      category: "Backend & Database",
      items: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      id: "skill-3",
      category: "Cloud, DevOps & Tools",
      items: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes", "Git & GitHub", "CI/CD Actions", "Jest"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "CloudPulse - Realtime Performance Monitor",
      techStack: "React, Node.js, WebSockets, Tailwind, TimescaleDB",
      liveUrl: "https://cloudpulse-demo.app",
      githubUrl: "https://github.com/karthik-verma/cloudpulse",
      description: "• Engineered an open-source observability dashboard tracking container metrics with sub-second latency.\n• Integrated alerting notifications via Slack and Discord webhooks with zero false alarms in testing."
    },
    {
      id: "proj-2",
      name: "DevCollab - Developer Workspace & Code Sharing",
      techStack: "Next.js 14, WebRTC, Tailwind, Redis, MongoDB",
      liveUrl: "https://devcollab.tech",
      githubUrl: "https://github.com/karthik-verma/devcollab",
      description: "• Built an interactive peer code-pairing application featuring collaborative Monaco editor and live video call.\n• Scaled application to 15,000+ registered developers worldwide with 99.98% uptime."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2023",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "2021",
      url: "https://coursera.org/verify"
    }
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Fluent / Professional" },
    { id: "lang-2", name: "Telugu", proficiency: "Native" },
    { id: "lang-3", name: "Hindi", proficiency: "Professional Working" }
  ],
  customSections: [
    {
      id: "custom-1",
      title: "Achievements & Awards",
      items: [
        "1st Place Winner at Smart India Hackathon (SIH) 2019 out of 1,200+ competing engineering teams.",
        "Authored tech articles on Medium with 80,000+ views on React optimization and microservices."
      ]
    }
  ]
};

export const emptyResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    instagram: "",
    photoUrl: "",
    showPhoto: false,
  },
  summary: "",
  experiences: [],
  education: [],
  skills: [
    { id: "skill-1", category: "Technical Skills", items: [] },
    { id: "skill-2", category: "Soft Skills", items: [] }
  ],
  projects: [],
  certifications: [],
  languages: [],
  customSections: []
};

export const summaryTemplates = {
  "Full Stack Developer": "Versatile Full Stack Developer with extensive expertise in developing robust end-to-end web applications using modern JavaScript/TypeScript ecosystems. Adept at database schema design, RESTful & GraphQL API integration, and crafting pixel-perfect responsive user interfaces.",
  "Frontend Engineer": "Passionate Frontend Engineer dedicated to building responsive, accessible, and high-performance web applications. Expert in React, modern state management, Tailwind CSS, and UX optimization with a strong eye for visual detail.",
  "Backend Engineer": "Backend Engineer with strong background in distributed systems, microservices architecture, and scalable database management. Experienced with Node.js, Python, PostgreSQL, and cloud deployments.",
  "Fresher / Entry Level": "Ambitious Computer Science graduate with solid foundational knowledge in data structures, algorithms, and full-stack software development. Eager to leverage problem-solving skills and hands-on project experience in a fast-paced software engineering role.",
  "Data Analyst": "Detail-oriented Data Analyst proficient in SQL, Python, and data visualization tools. Experienced in querying complex datasets, building automated reporting pipelines, and delivering actionable business insights."
};
