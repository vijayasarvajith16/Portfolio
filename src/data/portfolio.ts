export const profile = {
  name: "Vijaya Sarvajith K",
  title: "Software Developer in the making",
  summary:
    "A motivated Computer Science student building full-stack, RAG and microservices systems.",
  college: "College of Engineering, Guindy (Anna University)",
  department: "Computer Science and Engineering",
  cgpa: "9.78",
  email: "vijayasarvajith72@gmail.com",
  phone: "+91-9361359424",
  github: "https://github.com/vijayasarvajith16",
  linkedin: "https://l1nk.dev/itcypjm",
  resume: "/resume.pdf",
};

export const education = [
  {
    degree: "B.E. Computer Science and Engineering",
    school: "College of Engineering, Guindy (Anna University)",
    period: "Aug 2024 - Present",
    score: "CGPA 9.78",
  },
  {
    degree: "Grade 12",
    school: "C.E.O.A Matriculation Hr. Sec. School, Madurai",
    period: "Jun 2023 - Mar 2024",
    score: "98.16%",
  },
  {
    degree: "Grade 10",
    school: "C.E.O.A Matriculation Hr. Sec. School, Madurai",
    period: "Jun 2021 - May 2022",
    score: "97.8%",
  },
];

export const skillGroups = [
  { category: "Languages", items: ["C++", "C", "Java", "JavaScript", "Python (basics)"] },
  { category: "Web Development", items: ["HTML", "CSS", "Bootstrap", "React", "Node.js", "Express.js"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "Oracle", "Redis"] },
  { category: "Tools & DevOps", items: ["Git", "GitHub", "Docker", "Postman", "RabbitMQ"] },
];

export const projects = [
  {
    name: "Schedulix",
    period: "Jan - Feb 2026",
    status: "Complete",
    stack: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
    highlights: [
      "Full-stack timetable system that automates scheduling and removes conflicts.",
      "JWT auth with role-based access, protect and authorize middleware, Morgan logging.",
    ],
    link: "https://github.com/vijayasarvajith16/Schedulix",
  },
  {
    name: "Docx RAG Pipeline",
    period: "Jun - Jul 2026",
    status: "Complete",
    stack: ["React", "Groq API", "Node.js", "Express", "ChromaDB"],
    highlights: [
      "Document Q&A backend with PDF extraction, batching and semantic chunking.",
      "Local embeddings via Hugging Face and ChromaDB, with Llama 3 on Groq for grounded answers.",
    ],
    link: "https://github.com/vijayasarvajith16/Docx",
  },
  {
    name: "NearMart",
    period: "Jun - Jul 2026",
    status: "Complete",
    stack: ["React", "Express", "MongoDB", "Redis", "RabbitMQ"],
    highlights: [
      "Hyperlocal marketplace with 8 independently deployable microservices.",
      "Geospatial vendor discovery (2dsphere), Redis caching, Razorpay with webhook verification.",
    ],
    link: "https://github.com/vijayasarvajith16/NearMart",
  },
  {
    name: "SplitEase",
    period: "May - Jun 2026",
    status: "Complete",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    highlights: [
      "Group expense splitter with a greedy debt-simplification algorithm.",
      "Reduces settlements to the minimum number of payments.",
    ],
    link: "https://github.com/vijayasarvajith16/Split_Ease",
  },
  {
    name: "HR Task Forge",
    period: "Jul - Aug 2026",
    status: "Web complete, Android in progress",
    stack: ["Node.js", "Express", "MongoDB", "Socket.io", "React"],
    highlights: [
      "Real-time Kanban board for the HR team with live multi-user sync.",
      "Activity logs, comments, polls, workload dashboard. Android app 'H&H' in progress.",
    ],
    link: "https://github.com/vijayasarvajith16/TaskForge",
  },
  {
    name: "FraudGuard",
    period: "Aug - Oct 2026",
    status: "In progress",
    stack: ["FastAPI", "Isolation Forest", "XGBoost", "Docker", "Kubernetes"],
    highlights: [
      "Fintech fraud detection with two-level scanning and four risk tiers.",
      "Full DevOps lifecycle: Helm, Terraform, GitHub Actions, ArgoCD, Prometheus, MLflow.",
    ],
    link: "https://github.com/vijayasarvajith16/FraudGuard",
  },
  {
    name: "Smart Farming Agent",
    period: "Sep - Oct 2026",
    status: "Hackathon",
    stack: ["Multi-agent AI", "RAG", "Multimodal input"],
    highlights: [
      "Four cooperating agents: crops, weather and irrigation, pest detection, market insights.",
      "Built for Problem Statement #14 on AI-driven agricultural advice.",
    ],
    link: "https://github.com/vijayasarvajith16/FarmEase",
  },
];

export const leadership = [
  {
    role: "Official Representative",
    org: "Computer Science and Engineering, CEG",
    period: "Jul 2026 - Present",
    description:
      "Coordinate cross-functional communication between faculty and students, streamlining academic planning and event execution.",
  },
  {
    role: "Joint Secretary, HR & Hospitality",
    org: "Computer Science & Engineering Association, CEG",
    period: "Aug 2026 - Present",
    description:
      "Manage HR operations, member coordination and volunteer engagement, running events with student teams.",
  },
  {
    role: "General Secretary, National Service Scheme",
    org: "NSS",
    period: "Sep 2024 - Present",
    description:
      "Community service in a village. Recognized with the 'Best Volunteer' award.",
  },
];

export const softSkills = [
  "Communication",
  "Team Coordination",
  "Event Execution",
  "Volunteer Engagement",
  "Academic Planning",
];
