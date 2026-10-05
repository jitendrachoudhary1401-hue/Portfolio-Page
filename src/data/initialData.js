export const personalInfo = {
  name: 'Jitendra Choudhary',
  role: 'CSE • AI/ML Student',
  tagline: 'Building. Learning. Exploring.',
  heroIntro: 'I build software, explore AI/ML, and turn ideas into practical projects while contributing to communities around me.',
  about: `I am a Computer Science & Engineering student specializing in AI/ML, focused on developing functional software and exploring intelligent systems. I believe in hands-on building, practical problem-solving, and continuous learning. Beyond technical exploration, I am actively involved in peer communities and social impact initiatives, working to make technology useful, accessible, and community-driven.`,
  terminal: {
    user: 'JITENDRA@PORTFOLIO',
    whoami: 'CSE_AIML_STUDENT',
    currentlyLearning: 'Flutter + Dart',
    exploring: ['AI/ML', 'Cybersecurity', 'Software Development'],
    status: 'building...'
  },
  identityPillars: [
    { title: 'CSE / AIML', subtitle: 'Engineering', description: 'Rigorous computer science foundation with specialized AI/ML focus.' },
    { title: 'DEVELOPER', subtitle: 'Projects', description: 'Translating concepts into structured, usable software applications.' },
    { title: 'AI/ML', subtitle: 'Learning', description: 'Continuous exploration of intelligent algorithms and data workflows.' },
    { title: 'COMMUNITY', subtitle: 'Contribution', description: 'Active engagement in technical student forums and social impact.' }
  ],
  focusPoints: [
    {
      title: 'Building Software',
      description: 'Developing responsive web solutions and cross-platform apps with clean architectures and purposeful functionality.'
    },
    {
      title: 'Exploring AI/ML & Systems',
      description: 'Studying machine learning algorithms, computer vision pipelines, and system security fundamentals.'
    },
    {
      title: 'Community & Contribution',
      description: 'Engaging with student technical groups like Technical Vidya and social initiatives through NSS to foster collective learning.'
    }
  ],
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Computer Science & Engineering (AI/ML)',
    status: 'Currently Pursuing',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (C++/Java)',
      'Database Management Systems',
      'Machine Learning Foundations',
      'Operating Systems',
      'Computer Networks'
    ]
  },
  currentlyBuilding: {
    title: 'Cross-Platform Applications with Flutter & Dart',
    status: 'In Progress',
    description: 'Actively mastering Flutter and Dart to engineer performant cross-platform mobile applications, while refining core architectures for CampusCare and researching computer vision pipelines for Aero Vision.',
    nextMilestone: 'Deploying initial Flutter utility application and integrating Firebase real-time data layer.'
  },
  contact: {
    email: '',
    github: 'https://github.com/jitendrachoudhary1401-hue',
    linkedin: '',
    location: 'India'
  }
};

export const initialProjects = [
  {
    id: 'campus-care',
    title: 'CampusCare',
    category: 'Campus Management & Utilities',
    problem: 'College campuses often lack a unified, transparent platform for students to report infrastructure, hostel, and academic issues, resulting in unresolved complaints and delayed feedback loops.',
    contribution: 'Designed the application concept, architected user reporting flows, built responsive frontend views, and structured the ticket status tracking system.',
    outcome: 'Prototype stage; demonstrates streamlined communication between campus administrators and students.',
    technologies: ['React', 'JavaScript', 'Firebase', 'CSS3'],
    githubUrl: '',
    liveUrl: '',
    featured: true
  },
  {
    id: 'rescue-paw',
    title: 'Rescue Paw',
    category: 'Community & Animal Welfare',
    problem: 'Stray animals in distress frequently suffer due to the absence of rapid coordination between witnessing citizens, local rescue volunteers, and emergency veterinary clinics.',
    contribution: 'Conceived system architecture, designed emergency incident reporting screens, and drafted location-tagged rescue notification alerts.',
    outcome: 'Conceptual prototype aimed at reducing stray animal emergency response times through community mobilization.',
    technologies: ['JavaScript', 'Web Technologies', 'Firebase'],
    githubUrl: '',
    liveUrl: '',
    featured: true
  },
  {
    id: 'aero-vision',
    title: 'Aero Vision',
    category: 'AI / Computer Vision',
    problem: 'Processing aerial visual feeds from drones requires specialized computer vision models capable of handling varying altitudes, angles, and environmental lighting conditions.',
    contribution: 'Researched model architectures for visual detection, prepared experimental image datasets, and evaluated detection accuracy under noisy inputs.',
    outcome: 'Research & exploration project advancing hands-on knowledge in computer vision pipelines and ML model inference.',
    technologies: ['Python', 'Computer Vision', 'AI/ML', 'NumPy'],
    githubUrl: '',
    liveUrl: '',
    featured: true
  },
  {
    id: 'cloud-developer-platform',
    title: 'Cloud Developer Platform',
    category: 'Full-Stack & Cloud Architecture',
    problem: 'Modern developers need a resilient, low-latency portfolio with real-time cloud data synchronization, secure authentication, and dynamic asset management.',
    contribution: 'Engineered a reactive React + Vite platform with Firebase Firestore, custom authentication, and dynamic certificate verification.',
    outcome: 'Live cloud-connected platform allowing real-time profile updates, proof uploads, and inquiry tracking.',
    technologies: ['React', 'Firebase', 'Firestore', 'CSS3', 'Vite'],
    githubUrl: 'https://github.com/jitendrachoudhary1401-hue',
    liveUrl: '',
    featured: true
  }
];

export const experienceData = [
  {
    id: 'technical-vidya',
    organization: 'Technical Vidya',
    role: 'Technical Community Contributor',
    type: 'Student Technical Community',
    period: 'Ongoing',
    description: 'Active contributor within the Technical Vidya student developer network, supporting peer learning, collaborative coding sessions, and knowledge exchange on software development.',
    highlights: [
      'Participated in peer developer sessions discussing core programming and web development workflows.',
      'Assisted fellow learners with problem-solving in C/C++ and web engineering basics.',
      'Contributed to community discussions on emerging technologies and developer roadmaps.'
    ]
  },
  {
    id: 'nss',
    organization: 'National Service Scheme (NSS)',
    role: 'Student Volunteer & Social Impact Contributor',
    type: 'Social Service & Community Outreach',
    period: 'Ongoing',
    description: 'Participating in grassroots community development, social awareness drives, and campus initiatives as an active NSS volunteer.',
    highlights: [
      'Engaged in cleanliness, hygiene, and environmental awareness drives.',
      'Volunteered in community outreach programs and campus blood donation / health camps.',
      'Collaborated with fellow students to promote social responsibility and digital literacy.'
    ]
  }
];

export const skillsData = [
  {
    category: 'Programming Languages',
    description: 'Languages used for algorithmic problem solving, software engineering, and data scripting.',
    skills: [
      { name: 'C', level: 'Core', note: 'Procedural logic & memory management foundations' },
      { name: 'C++', level: 'Core', note: 'Data structures, algorithms & OOP concepts' },
      { name: 'Python', level: 'Core', note: 'Scripting, AI/ML exploration & data handling' },
      { name: 'JavaScript', level: 'Core', note: 'Modern ES6+, DOM manipulation & async logic' },
      { name: 'Dart', level: 'Learning', note: 'Mobile application language for Flutter' }
    ]
  },
  {
    category: 'Web Development',
    description: 'Technologies for engineering responsive, user-friendly client interfaces.',
    skills: [
      { name: 'HTML5', level: 'Core', note: 'Semantic markup, accessibility & structure' },
      { name: 'CSS3', level: 'Core', note: 'Flexbox, CSS Grid, animations & responsive styling' },
      { name: 'React', level: 'Core', note: 'Component architecture, state & hook workflows' }
    ]
  },
  {
    category: 'Mobile Development',
    description: 'Cross-platform app engineering currently under active study.',
    skills: [
      { name: 'Flutter', level: 'Learning', note: 'Cross-platform UI toolkit & reactive widgets' }
    ]
  },
  {
    category: 'Backend & Cloud',
    description: 'Services and databases utilized for application persistence and authentication.',
    skills: [
      { name: 'Firebase Auth', level: 'Core', note: 'Secure user login and token management' },
      { name: 'Cloud Firestore', level: 'Core', note: 'NoSQL document database & real-time listeners' },
      { name: 'Firebase Storage', level: 'Core', note: 'Scalable cloud object storage for assets & documents' }
    ]
  },
  {
    category: 'AI & Systems Exploration',
    description: 'Areas of technical inquiry, machine learning workflows, and security.',
    skills: [
      { name: 'AI / ML Fundamentals', level: 'Exploration', note: 'Supervised learning & model evaluation' },
      { name: 'Computer Vision', level: 'Exploration', note: 'Image processing & object detection pipelines' },
      { name: 'Cybersecurity Concepts', level: 'Exploration', note: 'Security principles & web vulnerability awareness' }
    ]
  },
  {
    category: 'Developer Tools',
    description: 'Toolchain used for development, version control, and collaboration.',
    skills: [
      { name: 'Git', level: 'Core', note: 'Distributed version control & branching' },
      { name: 'GitHub', level: 'Core', note: 'Repository management & open-source collaboration' },
      { name: 'VS Code', level: 'Core', note: 'Primary IDE & development environment' }
    ]
  }
];

export const learningJourney = [
  {
    step: '01',
    phase: 'Foundational Computing & Logic',
    focus: 'C, C++, Data Structures & Algorithmic Problem Solving',
    description: 'Developed strong computer science fundamentals, learning how computers allocate memory, execute procedures, and optimize computational complexity.',
    status: 'Completed'
  },
  {
    step: '02',
    phase: 'Modern Web Engineering & Cloud',
    focus: 'HTML5, CSS3, JavaScript (ES6+), React, Firebase',
    description: 'Transitioned from terminal algorithms to interactive user interfaces, mastering state management, API integration, and cloud-backed databases with Firebase.',
    status: 'Active'
  },
  {
    step: '03',
    phase: 'AI/ML & Vision Systems',
    focus: 'Python, Machine Learning Fundamentals, Computer Vision',
    description: 'Began exploring intelligent data models and vision algorithms, working on experimental projects like Aero Vision to study real-time object detection.',
    status: 'Exploring'
  },
  {
    step: '04',
    phase: 'Cross-Platform Mobile Engineering',
    focus: 'Flutter + Dart',
    description: 'Currently deep-diving into mobile development with Flutter to engineer fluid, cross-platform apps with seamless native performance.',
    status: 'Learning'
  }
];

export const servicesData = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build fast, scalable, and modern web apps tailored for performance, clean architecture, and real-world impact.',
    icon: 'code'
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Development',
    description: 'Create seamless experiences across web, mobile, and desktop with unified Flutter, Dart, and responsive architectures.',
    icon: 'devices'
  },
  {
    id: 'ai-ux',
    title: 'AI/ML & UI/UX Systems',
    description: 'Design intuitive, data-driven interfaces and computer vision models that users love to interact with.',
    icon: 'monitor'
  }
];

export const statsData = [
  { value: '3+', label: 'Years Tech Exploration' },
  { value: '140+', label: 'Problems & Commits' },
  { value: '500+', label: 'Community Peers' },
  { value: '100%', label: 'Engineering Dedication' }
];

export const workTimelineData = [
  { role: 'Technical Community Contributor', organization: 'Technical Vidya', year: 'Ongoing' },
  { role: 'Student Volunteer & Social Impact', organization: 'National Service Scheme (NSS)', year: 'Ongoing' },
  { role: 'B.Tech CSE (AI/ML)', organization: 'Engineering Specialization', year: 'Pursuing' }
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    description: 'Analyzing requirements, mapping user journeys, choosing the right stack, and structuring clean data models.'
  },
  {
    step: '02',
    title: 'Development & Iteration',
    description: 'Writing clean, modular code with modern component architectures, reactive state handling, and version control.'
  },
  {
    step: '03',
    title: 'Deployment & Scaling',
    description: 'Deploying with Firebase and cloud infrastructure, optimizing load performance, and testing real-world reliability.'
  }
];

// No mock client reviews — only real data
export const testimonialsData = [];

export const faqData = [
  {
    id: 'faq-1',
    question: "What kind of projects do you work on?",
    answer: "I specialize in web development, cross-platform applications with Flutter & Dart, and AI/ML solutions — from prototypes to production-ready products with robust Firebase and cloud backends."
  },
  {
    id: 'faq-2',
    question: "What is your primary technology stack?",
    answer: "My core stack includes React, modern JavaScript/TypeScript, Python for AI/ML, Flutter for cross-platform mobile apps, and Cloud Firestore / Firebase for real-time data persistence."
  },
  {
    id: 'faq-3',
    question: "Are you open to internships, projects, or collaborations?",
    answer: "Yes! I am actively looking for software engineering internships, collaborative hackathons, open-source initiatives, and high-impact developer community roles."
  },
  {
    id: 'faq-4',
    question: "How do you turn ideas into functional applications?",
    answer: "I follow a user-first, structured workflow: requirement decomposition, UI/UX wireframing, component-driven implementation, iterative testing, and seamless cloud deployment."
  },
  {
    id: 'faq-5',
    question: "How can we get in touch or book a discussion?",
    answer: "You can click the 'Book a call' or 'Let's Connect' button to send an instant message, book a meeting, or connect directly with me on LinkedIn and GitHub."
  }
];
