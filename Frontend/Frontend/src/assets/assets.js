// assets/assets.js
export const dummyResumeData = [
  {
    _id: "sample_1",
    title: "Senior Software Engineer Resume",
    professional_info: {
      full_name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      profession: "Senior Software Engineer",
      linkedin: "https://linkedin.com/in/johnsmith",
      website: "https://johnsmith.dev",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
    },
    professional_summary:
      "Results-driven Senior Software Engineer with 8+ years of experience in full-stack development. Specialized in building scalable web applications using modern technologies like React, Node.js, and AWS.",
    experience: [
      {
        company: "Google",
        position: "Senior Software Engineer",
        start_date: "2020-01",
        end_date: "2023-12",
        description:
          "Led a team of 5 engineers to develop Google's internal dashboard system. Improved performance by 40%.",
        is_current: false
      }
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        graduation_date: "2017-05",
        gpa: "3.8/4.0"
      }
    ],
    skills: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
    project: [
      {
        name: "E-commerce Platform",
        type: "Full-stack App",
        description: "Built scalable e-commerce platform for 50k+ users."
      }
    ],
    achievements: [
      {
        title: "Google Excellence Award",
        organization: "Google",
        date: "2022-12",
        description: "Outstanding contribution to internal tools"
      }
    ],
    template: "classic",
    accent_color: "#3B82F6",
    public: false
  },

  {
    _id: "sample_2",
    title: "UI/UX Designer Resume",
    professional_info: {
      full_name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 987-6543",
      location: "New York, USA",
      profession: "UI/UX Designer",
      linkedin: "https://linkedin.com/in/emilyjohnson",
      website: "https://emilydesigns.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
    },
    professional_summary:
      "Creative UI/UX Designer with 6+ years of experience designing intuitive digital products and brand identities.",
    experience: [
      {
        company: "Adobe",
        position: "Senior UI Designer",
        start_date: "2019-03",
        end_date: "2024-01",
        description:
          "Designed enterprise dashboards and mobile apps. Improved user engagement by 35%.",
        is_current: false
      }
    ],
    education: [
      {
        institution: "Parsons School of Design",
        degree: "Bachelor of Design",
        field: "Graphic & UI Design",
        graduation_date: "2018-06",
        gpa: "3.7/4.0"
      }
    ],
    skills: ["Figma", "Adobe XD", "Photoshop", "User Research", "Prototyping"],
    project: [
      {
        name: "Finance App Redesign",
        type: "UI/UX Case Study",
        description: "Redesigned fintech app used by 1M+ users."
      }
    ],
    achievements: [],
    template: "modern",
    accent_color: "#EC4899",
    public: true
  },

  {
    _id: "sample_3",
    title: "Digital Marketing Manager Resume",
    professional_info: {
      full_name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+44 7700 900123",
      location: "London, UK",
      profession: "Digital Marketing Manager",
      linkedin: "https://linkedin.com/in/michaelbrown",
      website: "",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60"
    },
    professional_summary:
      "Performance-driven Digital Marketing Manager with expertise in SEO, paid advertising, and brand growth.",
    experience: [
      {
        company: "Spotify",
        position: "Marketing Manager",
        start_date: "2021-02",
        end_date: "2025-01",
        description:
          "Managed multi-channel campaigns increasing user acquisition by 60%.",
        is_current: true
      }
    ],
    education: [
      {
        institution: "University of Manchester",
        degree: "MBA",
        field: "Marketing",
        graduation_date: "2020-07",
        gpa: "3.6/4.0"
      }
    ],
    skills: ["SEO", "Google Ads", "Meta Ads", "Content Strategy", "Analytics"],
    project: [],
    achievements: [],
    template: "minimal",
    accent_color: "#10B981",
    public: false
  },

  {
    _id: "sample_4",
    title: "Data Scientist Resume",
    professional_info: {
      full_name: "Sophia Lee",
      email: "sophia.lee@example.com",
      phone: "+82 10-2345-6789",
      location: "Seoul, South Korea",
      profession: "Data Scientist",
      linkedin: "https://linkedin.com/in/sophialee",
      website: "",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=400&auto=format&fit=crop&q=60"
    },
    professional_summary:
      "Data Scientist with strong background in machine learning, big data, and business intelligence.",
    experience: [
      {
        company: "Samsung",
        position: "Data Scientist",
        start_date: "2020-05",
        end_date: "2024-12",
        description:
          "Built predictive models improving sales forecasting accuracy by 28%.",
        is_current: false
      }
    ],
    education: [
      {
        institution: "Seoul National University",
        degree: "Master's",
        field: "Data Science",
        graduation_date: "2020-02",
        gpa: "3.9/4.0"
      }
    ],
    skills: ["Python", "TensorFlow", "SQL", "Power BI", "Machine Learning"],
    project: [],
    achievements: [],
    template: "classic",
    accent_color: "#6366F1",
    public: true
  },

  {
    _id: "sample_5",
    title: "Business Analyst Resume",
    professional_info: {
      full_name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      phone: "+1 (222) 456-7890",
      location: "Toronto, Canada",
      profession: "Business Analyst",
      linkedin: "https://linkedin.com/in/danielwilson",
      website: "",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop&q=60"
    },
    professional_summary:
      "Business Analyst with 7+ years experience translating business needs into data-driven solutions.",
    experience: [
      {
        company: "Deloitte",
        position: "Senior Business Analyst",
        start_date: "2019-01",
        end_date: "2024-06",
        description:
          "Led business process optimization projects for enterprise clients.",
        is_current: false
      }
    ],
    education: [
      {
        institution: "University of Toronto",
        degree: "BBA",
        field: "Business Analytics",
        graduation_date: "2016-05",
        gpa: "3.5/4.0"
      }
    ],
    skills: ["Excel", "SQL", "Power BI", "Stakeholder Management", "Agile"],
    project: [],
    achievements: [],
    template: "minimal",
    accent_color: "#F59E0B",
    public: false
  }
];
