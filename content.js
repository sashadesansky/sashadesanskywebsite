/*
  =========================================================================
  YOUR CONTENT — this is the only file you need to touch to update the site.
  =========================================================================

  Everything on sashadesansky.com — your bio, jobs, education, projects,
  travel — lives in this one file. There is no code to write. You are just
  editing text between quote marks.

  RULES OF THE ROAD (read this once):
    1. Keep every piece of text wrapped in "double quotes".
    2. Keep every comma between items in a list. The last item in a list
       (right before a closing bracket "]" or brace "}") does NOT get a
       comma after it.
    3. To add a new Project or a new Travel entry, copy an existing block
       (from the { to the matching }), paste it above or below, then edit
       the text inside. Don't forget the comma after the closing } if it's
       not the last one in the list.
    4. To remove something, delete its whole { ... } block, including the
       comma that follows it (or precedes it, if it was last).
    5. If the site stops loading after an edit, you likely deleted a comma,
       quote, or bracket by accident. Undo your last change and try again.
    6. Photos: drop image files into the /images/projects or /images/travel
       folder, then set "image" below to the filename, e.g. "seoul.jpg".
       If you leave "image" as "" (empty), a simple emoji icon is shown
       instead — totally fine to launch with.

  For a full walkthrough (including how to edit this on GitHub from your
  phone or browser, no software install needed), see CONTENT_GUIDE.md.
  =========================================================================
*/

window.SITE_CONTENT = {

  // ---- Masthead / global site info -------------------------------------
  site: {
    name: "Sasha Desansky",
    // Short line shown in the browser tab and search results.
    tagline: "Technology strategy, AI transformation, and a running log of what I'm building and exploring.",
    email: "sashadesansky@gmail.com",
    linkedin: "https://www.linkedin.com/in/aleksandradesansky/",
    location: "Washington, D.C.",
    // Initials shown in the round avatar mark if you don't add a photo.
    initials: "AD",
    // Optional: put a photo file in /images (e.g. "headshot.jpg") and set
    // it here to use a real photo instead of the initials mark. Leave ""
    // to keep the initials mark.
    photo: ""
  },

  // ---- Hero (top of homepage) --------------------------------------------
  hero: {
    eyebrow: "Technology Strategy · AI Transformation · Trusted Advisor",
    headline: "Aleksandra “Sasha” Desansky",
    subhead: "Principal at Boston Consulting Group, where I help C-suite leaders turn AI and technology strategy into results. This site is my running record of the AI projects I'm building, the places I'm visiting, and everything else worth showcasing along the way."
  },

  // ---- About ---------------------------------------------------------
  about: {
    heading: "About",
    paragraphs: [
      "I'm a Principal-level technology and AI strategy consultant, advising C-suite executives and senior technology leaders on AI strategy, enterprise architecture, and organization design — across consumer, technology, and federal sectors."
      "Day to day, I lead delivery teams of 70+ consultants and engineers across product development, data, architecture, change management, and operations, and I write and lead proposals for large-scale AI and technology transformation engagements. I also build AI agents that help teams of 150+ people work faster and better, which is a big part of why this site exists — I like keeping a public record of what I'm learning and building."
      "Earlier in my career, I worked as a systems engineer modernizing legacy applications for public sector clients. I hold a B.S. and M.S. in Engineering, and I'm always looking for the next interesting problem — technical or otherwise."
    ]
  },

  // ---- Experience --------------------------------------------------------
  // One block per company. Each company can have multiple "roles" (for
  // promotions within the same company), newest first.
  experience: [
    {
      company: "Boston Consulting Group (BCG)",
      totalTenure: "4 yrs 11 mos",
      roles: [
        {
          title: "Principal",
          employmentType: "Full-time",
          dates: "Jul 2025 – Present",
          duration: "1 yr 3 mos",
          location: "",
          bullets: [
            "Advise C-suite executives and senior technology leaders on technology strategy and transformation efforts (AI, enterprise architecture, organization design, etc.) for clients across consumer, technology, and federal sectors",
            "Oversee 70+ consultants and engineers across product development, requirements, PMO, data, architecture, change management, operations, release management, service desk, and strategic communications to achieve business or critical mission objectives",
            "Develop AI agents that improve efficiency and effectiveness for teams of 150+ people across application development and business process operations, ultimately elevating output quality across client deliverables, communications, coordination, and achieving client outcomes",
            "Own senior client relationships with C-suite and VP-level stakeholders, serving as trusted advisor translating technical AI/transformation work into business decisions",
            "Write and lead proposals for $100M+ in AI and technology transformation work, owning solutioning, resourcing, and pricing to win new client engagements",
            "Mentor junior teammates on both technical and client-facing skills"
          ]
        },
        {
          title: "Manager",
          employmentType: "Full-time",
          dates: "Jul 2023 – Jul 2025",
          duration: "2 yrs 1 mo",
          location: "Washington, District of Columbia, United States",
          bullets: [
            "Advised executive stakeholders on how AI, cloud architecture, and Digital Twin investments scale business problems, shaping technology strategy for 12 enterprise clients"
          ]
        },
        {
          title: "Senior Consultant",
          employmentType: "Full-time",
          dates: "Nov 2021 – Jul 2023",
          duration: "1 yr 9 mos",
          location: "",
          bullets: [
            "Developed strategic roadmaps, complex financial models, vendor comparisons, enterprise technology architectures, and organizational designs for executive-level audiences to support high-stakes decisions"
          ]
        }
      ]
    },
    {
      company: "Deloitte",
      totalTenure: "2 yrs 5 mos",
      roles: [
        {
          title: "Senior Consultant",
          employmentType: "Full-time",
          dates: "Jan 2021 – Nov 2021",
          duration: "11 mos",
          location: "",
          bullets: [
            "Led systems engineering teams to modernize legacy applications for public sector clients",
            "Built and deployed custom Java/Spring Framework applications for public sector clients"
          ]
        },
        {
          title: "Consultant",
          employmentType: "Full-time",
          dates: "Jul 2019 – Jan 2021",
          duration: "1 yr 7 mos",
          location: "",
          bullets: []
        }
      ]
    }
  ],

  // ---- Education -----------------------------------------------------
  education: [
    {
      school: "The George Washington University — School of Engineering & Applied Science",
      degree: "Master of Science (M.S.), Systems Engineering",
      activities: "Academic focus on engineering management."
    },
    {
      school: "The George Washington University — School of Engineering & Applied Science",
      degree: "Bachelor of Science (B.S.), Biomedical/Medical Engineering",
      activities: "Biomedical Engineering Society"
    },
    {
      school: "Korea University",
      degree: "Engineering Exchange Student, Biomedical/Medical Engineering",
      activities: "Engineering Exchange Student"
    }
  ],

  // ---- Licenses & Certifications ---------------------------------------
  certifications: [
    {
      name: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      issued: "Issued Sep 2026",
      credentialId: "546DBM-B01C5F"
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      issued: "Issued May 2024",
      credentialId: "COMP001021839947"
    }
  ],

  // ---- AI Projects ------------------------------------------------------
  // Add a new block any time you try something worth showcasing. Newest
  // entries should go at the top of the list.
  projects: [
    {
      title: "AI Agents for Delivery Teams",
      date: "2025",
      tags: ["AI Agents", "Enterprise", "BCG"],
      description: "Designed and rolled out AI agents that support 150+ person application-development and business-process teams — speeding up delivery and raising the quality of client-facing work across communications, coordination, and documentation.",
      link: "",
      linkLabel: "",
      emoji: "🤖",
      image: ""
    },
    {
      title: "Example project — replace me",
      date: "2026",
      tags: ["Tag one", "Tag two"],
      description: "This is a placeholder so you can see the shape of a project entry. Replace this title, description, and tags with your own project, or delete this whole block once you've added a real one.",
      link: "",
      linkLabel: "View project",
      emoji: "✨",
      image: ""
    }
  ],

  // ---- Places / Travel ---------------------------------------------------
  // Same idea as projects — one block per place, newest at the top.
  travel: [
    {
      place: "Seoul, South Korea",
      date: "",
      note: "Studied as an engineering exchange student at Korea University — where a lot of my curiosity about how systems (and cities) fit together started.",
      emoji: "🇰🇷",
      image: ""
    },
    {
      place: "Example trip — replace me",
      date: "2026",
      note: "This is a placeholder so you can see the shape of a travel entry. Replace it with a real place you've visited, or delete this block.",
      emoji: "📍",
      image: ""
    }
  ],

  // ---- Footer ---------------------------------------------------------
  footer: {
    note: "Built as a living portfolio — updated whenever something new is worth sharing."
  }

};
