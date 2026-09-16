// ===================================================================
// PORTFOLIO DATA - SIVA SARAVANA KUMAR M
// ===================================================================
// EDIT YOUR INFORMATION HERE
// All content across the portfolio is dynamically loaded from this file.
// You can edit personal information, add new projects, or modify skills
// directly here without altering React components.
// ===================================================================

export const portfolioData = {
  // -----------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // -----------------------------------------------------------------
  personal: {
    name: "SIVA SARAVANA KUMAR M",
    shortName: "Siva",
    logoText: "SIVA.DEV",
    role: "Software Developer",
    degreeTag: "B.Tech IT | Kongu Engineering College",
    tagline: "Software Developer & IT Engineer",
    description:
      "Enthusiastic IT graduate with strong technical skills and a passion for problem-solving. Seeking an entry-level IT role to contribute to innovative projects, enhance system efficiency, and deliver user-focused solutions.",
    email: "sivasaravanakumarm@gmail.com",
    phone: "+91 77088 57133",
    location: "Tiruppur, Kangayam, Tamil Nadu, India",
    resumeUrl: "/resume.pdf",
    statusBadge: "Available for Software Engineering Roles",
  },

  // -----------------------------------------------------------------
  // 2. SOCIAL PROFILES & LINKS
  // -----------------------------------------------------------------
  social: {
    github: "https://github.com/sivzz-22",
    linkedin: "https://www.linkedin.com/in/siva-saravana-kumar-m-b684b8377/",
    email: "mailto:sivasaravanakumarm@gmail.com",
  },

  // -----------------------------------------------------------------
  // 3. ABOUT SECTION DETAILS
  // -----------------------------------------------------------------
  about: {
    headline: "Transforming Ideas Into High-Performance Code",
    bio: [
      "I am an enthusiastic Information Technology graduate currently pursuing my B.Tech at Kongu Engineering College. Driven by curiosity and a relentless commitment to problem-solving, I specialize in crafting robust web and mobile applications, assistive desktop tools, and streamlined backend architectures.",
      "With a strong foundation in Java, Python, React, and Node.js, I bridge user-centric frontend experiences with clean, efficient data layers. I enjoy taking on challenging engineering problems, collaborating in agile teams, and building software that creates tangible real-world value."
    ],
    quickFacts: [
      { label: "Degree", value: "B.Tech in Information Technology" },
      { label: "Institution", value: "Kongu Engineering College" },
      { label: "Graduation", value: "Year 2027 (CGPA: 7.39)" },
      { label: "Location", value: "Tiruppur, Kangayam" },
      { label: "Focus Areas", value: "Full Stack Development & System Design" }
    ],
    areasOfInterest: [
      "Object-Oriented Programming (OOPS)",
      "Database Management Systems (DBMS)",
      "Figma Design & Modern Frontend Development"
    ],
    hobbies: [
      "Exploring Emerging Technologies & Fitness",
      "Digital Editing & Creative Content Design"
    ]
  },

  // -----------------------------------------------------------------
  // 4. SKILLS SECTION
  // Organized into logical categories derived strictly from resume.
  // -----------------------------------------------------------------
  skills: {
    programming: [
      { name: "Java", level: "Core / Certified SE 17", badge: "Primary" },
      { name: "Python", level: "Scripting & ML Logic", badge: "Primary" },
      { name: "JavaScript", level: "ES6+ Modern JS", badge: "Core" }
    ],
    frontend: [
      { name: "React.js", level: "Single Page Apps" },
      { name: "React Native", level: "Cross-Platform Mobile" },
      { name: "HTML5", level: "Semantic Markup" },
      { name: "CSS3", level: "Flexbox, Grid, 3D Transforms" },
      { name: "Bootstrap", level: "Responsive Layouts" },
      { name: "Electron.js", level: "Desktop Applications" }
    ],
    backend: [
      { name: "Node.js", level: "Runtime Engine" },
      { name: "Express.js", level: "Microservices & APIs" },
      { name: "REST APIs", level: "Endpoint Architecture" },
      { name: "JWT", level: "Secure Authentication" }
    ],
    database: [
      { name: "MongoDB", level: "NoSQL & Mongoose" },
      { name: "Oracle DB", level: "Relational Queries" },
      { name: "DBMS", level: "Schema Design & OOPS" }
    ],
    tools: [
      { name: "Git / GitHub", level: "Version Control" },
      { name: "VS Code", level: "Development Environment" },
      { name: "IntelliJ IDEA", level: "Java Enterprise IDE" },
      { name: "Expo", level: "Mobile Deployment" },
      { name: "OpenCV", level: "Computer Vision" },
      { name: "MediaPipe", level: "Head & Eye Tracking" },
      { name: "Machine Learning", level: "Predictive Models" }
    ],
    softSkills: [
      "Problem-Solving",
      "Teamwork",
      "Communication",
      "Adaptability",
      "Time Management"
    ],
    languages: [
      { language: "Tamil", proficiency: "Native" },
      { language: "English", proficiency: "Professional" },
      { language: "Hindi", proficiency: "Working Knowledge" },
      { language: "German", proficiency: "Beginner" }
    ]
  },

  // -----------------------------------------------------------------
  // 5. PROJECTS SECTION
  // Add, remove, or edit project objects easily.
  // -----------------------------------------------------------------
  projects: [
    {
      id: "gymlog",
      title: "GymLog: Fitness Tracker & Gym Management",
      period: "2026 Jan - Mar",
      type: "Mobile Application",
      badge: "Featured Mobile App",
      description:
        "Developed a comprehensive mobile fitness application with workout tracking, member management, subscription monitoring, real-time analytics dashboard, and secure user authentication.",
      technologies: ["React Native", "Expo", "Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/sivzz-22/Big_Buddy_Admin",
      highlight: "Real-time member subscription tracking & workout logs",
      graphicType: "fitnessPulse"
    },
    {
      id: "moviepric",
      title: "MoviePric – Movie Success Prediction",
      period: "2026 Mar - May",
      type: "Full Stack Web App",
      badge: "Predictive System",
      description:
        "Built a donor registration and search system with comprehensive form validation and integrated movie dataset analysis logic.",
      technologies: ["Bootstrap", "Node.js", "Oracle DB", "JavaScript"],
      github: "https://github.com/sivzz-22/Movie_Predicition",
      highlight: "Robust form validation & relational Oracle DB pipeline",
      graphicType: "cinemaAnalytics"
    },
    {
      id: "handsfree-pc",
      title: "Hands-Free PC Navigation System",
      period: "2025 Jul - Aug",
      type: "Assistive Desktop Application",
      badge: "Computer Vision & AI",
      description:
        "Developed an assistive technology system enabling hands-free PC navigation using eye and head movement with click detection, integrated voice commands for enhanced accessibility, and packaged as a desktop app.",
      technologies: ["HTML", "CSS", "JavaScript", "OpenCV", "MediaPipe", "Electron.js"],
      github: "https://github.com/sivzz-22/Handfree-Navigator.git",
      highlight: "AI-driven head movement, eye gaze tracking & voice controls",
      graphicType: "eyeNavigation"
    }
  ],

  // -----------------------------------------------------------------
  // 6. EDUCATION TIMELINE
  // -----------------------------------------------------------------
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Kongu Engineering College",
      period: "2023 - 2027",
      yearLabel: "Year of Graduation: 2027",
      score: "CGPA: 7.39",
      scoreType: "CGPA",
      status: "Currently Pursuing",
      description:
        "Engaged in core computing disciplines including Data Structures, Object-Oriented System Design, Database Engineering, and Modern Full-Stack Technologies."
    },
    {
      degree: "Higher Secondary (HSC - Class XII)",
      institution: "Bharathi Vidya Bhavan Matriculation Higher Secondary School",
      period: "2021 - 2023",
      yearLabel: "Year of Completion: 2023",
      score: "80%",
      scoreType: "Percentage",
      status: "Completed",
      description:
        "Rigorous foundation in Higher Mathematics, Physics, Chemistry, and Computer Science."
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC - Class X)",
      institution: "Bharathi Vidya Bhavan Matriculation Higher Secondary School",
      period: "2020 - 2021",
      yearLabel: "Year of Completion: 2021",
      score: "Pass with Distinction",
      scoreType: "Result",
      status: "Completed",
      description:
        "Completed foundational secondary schooling with focus on sciences and quantitative reasoning."
    }
  ],

  // -----------------------------------------------------------------
  // 7. CERTIFICATIONS & ACHIEVEMENTS
  // -----------------------------------------------------------------
  certifications: [
    {
      title: "Oracle Certified Professional Java SE 17 Developer",
      issuer: "Oracle",
      date: "May 2025",
      credentialId: "OCP-JAVA-17",
      category: "Professional Certification",
      description:
        "Certified in deep Java SE 17 engineering including functional streams, memory model, concurrency, and OOP architecture."
    }
  ],

  achievements: [
    {
      title: "2nd Prize – Ideathon Competition",
      event: "Ideathon Hackathon",
      category: "Award",
      badge: "2nd Place",
      description:
        "Secured 2nd Prize in Ideathon competition for innovative problem-solving and rapid project development."
    },
    {
      title: "Top 4 Finalist – Techno Cultural Fest",
      event: "Techno Cultural Fest",
      category: "Competition",
      badge: "Top 4 Teams",
      description:
        "Selected for the top 4 teams in the competitive Techno Cultural Fest among hundreds of participants."
    },
    {
      title: "Member – MADC Club",
      event: "Mobile Application Development Club",
      category: "Club Leadership & Events",
      badge: "Active Member",
      description:
        "Actively participated in mobile development workshops, technical coding challenges, and hackathons."
    },
    {
      title: "Member – ISTE Club",
      event: "Indian Society for Technical Education",
      category: "Technical Society",
      badge: "Active Member",
      description:
        "Contributed to student technical sessions, knowledge-sharing seminars, and developmental programs."
    }
  ],

  // -----------------------------------------------------------------
  // 8. CONTACT & FOOTER INFO
  // -----------------------------------------------------------------
  contact: {
    heading: "GET IN TOUCH",
    subheading: "Let's Build Something Exceptional Together",
    note: "Whether you have a job opportunity, project inquiry, or just want to connect, feel free to reach out directly or send a message below.",
    email: "sivasaravanakumarm@gmail.com",
    phone: "+91 77088 57133",
    location: "Tiruppur, Kangayam, Tamil Nadu"
  },

  footer: {
    brand: "SIVA.DEV",
    tagline: "Building ideas into interactive experiences.",
    copyright: `© ${new Date().getFullYear()} Siva Saravana Kumar M. All rights reserved.`,
    note: "Crafted with original Spider-Man aesthetic, React & Three.js."
  }
};

export default portfolioData;
