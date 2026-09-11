/**
 * Faculty mentor profile — Vaibhav Nijhawan.
 *
 * Compiled from the CV and publication list he supplied. Personal details that
 * appear on a CV but do not belong on a public web page were deliberately left
 * out: date of birth, father's name, home address, personal mobile number,
 * personal email, and membership account numbers. Everything here is either a
 * professional fact or a public academic identifier meant to be looked up.
 */

export type Appointment = {
  role: string;
  place: string;
  where: string;
  from: string;
  to: string;
  current?: boolean;
};

export type Degree = {
  award: string;
  field: string;
  school: string;
  year: string;
  result: string;
  current?: boolean;
};

export type Publication = {
  year: string;
  title: string;
  authors: string;
  venue: string;
  href?: string;
};

export type Identifier = { label: string; value: string; href?: string };

export const profile = {
  name: "Vaibhav Nijhawan",
  role: "Assistant Professor (Grade-I)",
  department: "Electronics & Communication Engineering",
  institute: "Maharaja Agrasen Institute of Technology",
  university: "Guru Gobind Singh Indraprastha University",
  campus: "Sector 22, Rohini, New Delhi 110085",
  labRole: "Co-founder and Coordinator, A.T.O.M Robotics Lab",
  email: "vaibhavnijhawan@mait.ac.in",
  linktree: "https://linktr.ee/a.t.o.m_robotics_lab",

  /** Portrait, minus the size suffix and extension. See public/mentors/. */
  photo: "/mentors/vaibhav-nijhawan",
  photoAlt: "Portrait of Vaibhav Nijhawan",

  /** Two sentences for the homepage card. */
  short:
    "He has taught electronics at MAIT since 2014 and co-founded the A.T.O.M Robotics Lab. His work runs from CMOS device design and low-power ADCs up to the embedded, IoT and computer-vision systems students build in the lab.",

  /** The longer read, on the profile page. */
  about: [
    "Vaibhav Nijhawan has taught in the Electronics & Communication Engineering department at Maharaja Agrasen Institute of Technology since August 2014, and has thirteen years of teaching behind him in all. He co-founded the A.T.O.M Robotics Lab and coordinates its work.",
    "His research starts at the device and works upward. At one end sit logic CMOS design and characterisation, compact device modelling, and low-power high-speed ADC structures — the subject of his earliest papers and of his M.Tech in VLSI and embedded systems at Delhi Technological University, where he is now pursuing a PhD. At the other end sit the systems students actually build: gesture-controlled vehicles, LoRa disaster-response networks, IoT health monitors, an augmented-reality manipulator, a six-degree-of-freedom robotic arm.",
    "Fourteen papers carry his name, most of them co-authored, across IEEE conferences, Springer and the MAIT Journal of Science & Technology.",
  ],

  focus: [
    "Logic CMOS device design & characterisation",
    "Compact device modelling",
    "VLSI digital circuit design",
    "Low-power high-speed ADCs",
    "Embedded systems",
    "Internet of Things",
    "Computer vision",
    "Machine learning",
    "Robotics",
  ],

  /** Counts he states on his CV; shown next to the sections they describe. */
  counts: {
    teaching: "13 years",
    publications: 14,
    programmes: 31,
    workshops: 22,
    conferences: 17,
    seminars: 8,
    webinars: 84,
  },

  appointments: [
    {
      role: "Assistant Professor",
      place: "Maharaja Agrasen Institute of Technology",
      where: "New Delhi",
      from: "Aug 2014",
      to: "Present",
      current: true,
    },
    {
      role: "Assistant Professor",
      place: "Northern India Engineering College",
      where: "New Delhi",
      from: "Aug 2013",
      to: "Jan 2014",
    },
    {
      role: "Lecturer",
      place: "Mahaveer Swami Institute of Technology",
      where: "Sonepat, Haryana",
      from: "Jul 2010",
      to: "Jun 2011",
    },
  ] satisfies Appointment[],

  education: [
    {
      award: "PhD",
      field: "Electronics & Communication Engineering",
      school: "Delhi Technological University",
      year: "Pursuing",
      result: "9.2 SGPA in coursework",
      current: true,
    },
    {
      award: "M.Tech",
      field: "VLSI & Embedded Systems",
      school: "Delhi Technological University",
      year: "2013",
      result: "8.6 CGPA",
    },
    {
      award: "B.Tech",
      field: "Electronics & Communication Engineering",
      school: "GPMCE, Guru Gobind Singh Indraprastha University",
      year: "2010",
      result: "82.19%",
    },
  ] satisfies Degree[],

  /** Departmental responsibilities at MAIT. */
  responsibilities: [
    "Student counsellor",
    "Lab in-charge, Electronic Instrumentation & Measurement",
    "Subject coordinator — ETEC-207, ETCS-302, ECE-308T, ML-411",
    "Attendance compilation coordinator",
    "Marks compilation coordinator",
    "Internal OMR coordinator",
    "Registration chart coordinator",
    "University paper setter",
  ],

  recognition: [
    "Award of appreciation at MAIT for authoring research papers, 2021 through 2024",
    "Qualified GATE (Electronics & Communication Engineering)",
    "Meritorious student award during M.Tech, Delhi Technological University",
    "Vishesh Yogyata in the examination conducted by Bharatiya Vidya Bhavan, Mumbai",
    "Certified four times by the Akhil Bhartiya Sanskriti Gyan Pariksha, Vidya Bharati",
    "Second place, North Zone kho-kho tournament, Vidya Bharati, as captain",
  ],

  certifications: [
    "NPTEL — Embedded System Design with MSP430",
    "NPTEL — Python for Data Science",
    "E&ICT Academy, IIT Kanpur — Robotics",
    "E&ICT Academy, IIT Kanpur — MySQL: A Practical Approach",
    "E&ICT Academies — Python Programming",
    "IBM via Coursera — Introduction to Artificial Intelligence",
  ],

  skills: {
    "Design & simulation": [
      "Cadence Virtuoso",
      "Xilinx ISE",
      "PSpice",
      "Multisim",
      "MATLAB",
      "SCILAB",
    ],
    Languages: ["C", "C++", "Python", "VHDL", "Verilog", "Embedded C", "Assembly"],
    Platforms: ["8051", "8085", "8086", "MSP430"],
  } as Record<string, string[]>,

  identifiers: [
    {
      label: "ORCID",
      value: "0000-0002-1334-035X",
      href: "https://orcid.org/0000-0002-1334-035X",
    },
    {
      label: "Google Scholar",
      value: "ZpuFszMAAAAJ",
      href: "https://scholar.google.com/citations?user=ZpuFszMAAAAJ",
    },
    {
      label: "Scopus",
      value: "57224560714",
      href: "https://www.scopus.com/authid/detail.uri?authorId=57224560714",
    },
    {
      label: "Web of Science",
      value: "LIG-8236-2024",
      href: "https://www.webofscience.com/wos/author/record/LIG-8236-2024",
    },
    {
      label: "Vidwan",
      value: "684850",
      href: "https://vidwan.inflibnet.ac.in/profile/684850",
    },
  ] satisfies Identifier[],

  memberships: ["IEEE", "AICTSD", "VIBHA"],
} as const;

/** Newest first. Grouped by year on the page. */
export const publications: Publication[] = [
  {
    year: "2025",
    title: "Design and development of 6 DOF robotic arm",
    authors: "Vaibhav, Rajiv Kapoor",
    venue:
      "Modern Electronics Devices and Intelligent Communication Systems (MEDCOM), Dec 2025",
    href: "https://doi.org/10.1109/MEDCOM67532.2025.11405106",
  },
  {
    year: "2025",
    title: "Design of health monitoring system using IoT",
    authors: "Vaibhav Nijhawan, Ayush Verma, Aneesh Ahluwalia, Akshat Sharma",
    venue:
      "5th International Conference on Advancement in Electronics & Communication Engineering (AECE), Nov 2025",
    href: "https://doi.org/10.1109/AECE67531.2025.11386602",
  },
  {
    year: "2025",
    title: "Learning shape priors: a yoga posture recognition",
    authors: "Vaibhav, Rajiv Kapoor",
    venue:
      "12th International Conference on Computing for Sustainable Global Development (INDIACom)",
    href: "https://doi.org/10.23919/INDIACom66777.2025.11115840",
  },
  {
    year: "2025",
    title: "Augmented reality manipulator",
    authors: "Naman Malik, Vaibhav Nijhawan",
    venue:
      "International Conference on Innovation in Computing and Engineering (ICE), May 2025",
    href: "https://doi.org/10.1109/ICE63309.2025.10983947",
  },
  {
    year: "2025",
    title:
      "भारतीय ज्ञान परंपरा मे स्वतंत्रता के पश्चात भारत मे विज्ञान",
    authors: "वैभव निझावन",
    venue:
      "भारतीय ज्ञान परंपरा: सारगर्भित अन्वेषण, संकल्प प्रकाशन, कानपुर, जुलाई 2025. ISBN 978-93-48772-30-5",
  },
  {
    year: "2024",
    title:
      "Real-time disaster response with LoRa: a multi-sensor approach",
    authors:
      "Shubhi Agrawal, Dhruv Gupta, Vansh Sudan, Pratham Goel, Vaibhav Nijhawan",
    venue: "3rd IEEE Delhi Section Flagship Conference (DELCON), 2024",
    href: "https://doi.org/10.1109/DELCON64804.2024.10866555",
  },
  {
    year: "2024",
    title:
      "Bidirectional visitor counter using ESP32 with SpO2 screening and light automation",
    authors: "Sreejak Bhuniya, Vaibhav Nijhawan",
    venue:
      "MAIT Journal of Science & Technology, vol. 1 no. 1, Dec 2024",
    href: "https://journal.mait.ac.in/engg/images/journal/1.pdf",
  },
  {
    year: "2023",
    title:
      "Design and implementation of a gesture controlled car with Arduino Nano board",
    authors:
      "Pawan Kumar, Prabhat Kumar Singh, Vaibhav Nijhawan, Harsh Khanna",
    venue:
      "Future Learning Aspects of Mechanical Engineering (FLAME 2022), Springer Singapore, Aug 2023",
    href: "https://doi.org/10.1007/978-981-99-3033-3_39",
  },
  {
    year: "2022",
    title:
      "Design of current mode low power flash ADC structure for high speed circuits",
    authors: "Vaibhav, Davinder Miglani, Karan, Shivam Gupta",
    venue:
      "International Conference on Computing for Sustainable Global Development (INDIACom), Mar 2022",
    href: "https://ieeexplore.ieee.org/document/9763285",
  },
  {
    year: "2021",
    title: "Home environment monitoring system with an alert",
    authors:
      "Vignesh Singh, Rishika Anand, Dhruv Anand, Vaibhav Nijhawan",
    venue: "ICIERA 2021",
    href: "https://ieeexplore.ieee.org/document/9726745",
  },
  {
    year: "2021",
    title: "A fingerprint based ignition system in vehicles",
    authors:
      "Anshul Vashist, Romanch Kansal, Vaibhav Nijhawan, Zaid Zafar",
    venue:
      "International Journal of Scientific & Engineering Research, vol. 12 no. 6, Jun 2021",
    href: "https://www.ijser.org/onlineResearchPaperViewer.aspx?A-Fingerprint-Based-Ignition-System-in-Vehicles.pdf",
  },
  {
    year: "2021",
    title:
      "Design of low cost woman safety system with GPS and GSM",
    authors:
      "Deepanshu Tanwar, Vaibhav Nijhawan, Pragya Singh, Rashi Gupta",
    venue: "INDIACom 2021",
    href: "https://ieeexplore.ieee.org/document/9441364",
  },
  {
    year: "2021",
    title: "Real time RF based gesture controlled robotic vehicle",
    authors:
      "Parv Rustogi, Dhruv Agarwal, Aditya Rastogi, Vaibhav Nijhawan",
    venue: "INDIACom 2021",
    href: "https://ieeexplore.ieee.org/document/9441461",
  },
  {
    year: "2017",
    title:
      "Low power high speed current conveyor based current comparator, mirror circuit and encoder used in ADCs",
    authors: "Vaibhav, Hemant Tulsani",
    venue:
      "International Conference on Computing for Sustainable Global Development (INDIACom), Mar 2017",
    href: "http://bvicam.in/INDIACom/news/INDIACom%202017%20Proceedings/Main/papers/1287.pdf",
  },
];

/** The long tail. Recent first; the full count lives in profile.counts. */
export const programmes: string[] = [
  "Recent Innovations in Intelligent Computing Systems and IoT (RI2CSI 2025) — Vivekananda Institute of Professional Studies, Dec 2025",
  "Industry-Academia Synergy in Disaster Management and Resilient Infrastructure — Dr. Daulatrao Aher College of Engineering, Dec 2025",
  "Modern Forward Error Correction: From Classical to Practical — Bennett University with HSE University, Russia, Jun 2025",
  "NEP 2020 Orientation & Sensitization, Malaviya Mission Teacher Training — Hansraj College, University of Delhi, Mar 2025",
  "Medical Imaging in the Third Dimension: Advanced Techniques and Clinical Applications — MAIT, Dec 2024",
  "Cross-Modality Innovation: Generative AI in Language, Image Intelligence and Medical Advancements — Bharati Vidyapeeth's College of Engineering, Dec 2024",
  "Data Analysis of Cyber Attacks through ML and Deep Learning — MAIT with NITTTR, Nov 2024",
  "AI for Healthcare and Instrumentation — Dr. B. R. Ambedkar NIT Jalandhar, Nov 2024",
  "Python and Robotics STEAM Workshop — American Center New Delhi with Steam Varsity, Sep 2024",
  "Artificial Intelligence & Cybersecurity in Education & Research — Tecnia Institute of Advanced Studies, Jul 2024",
  "Machine Learning and Data Science — Bharati Vidyapeeth's College of Engineering, Mar 2024",
  "Semiconductor Materials, Devices, Design and Applications — MAIT, AICTE ATAL Academy, Dec 2023",
  "Python with Data Analytics — Ramanujan College, University of Delhi with MAIT, Aug 2023",
  "AI, ML and Interdisciplinary Approaches for Natural Language Processing — RIT Roorkee, Feb 2023",
  "Recent Trends and Challenges in Image Processing and Computer Vision — USIT, GGSIPU, AICTE ATAL Academy, Nov 2021",
  "Robotics: Advances and Application — MAIT, AICTE ATAL Academy, Aug 2021",
  "Microwave Passive Circuits and Antennas, TEQIP III — Dr. Babasaheb Ambedkar Technological University, Mar 2021",
  "Internet of Things — Electronics Service and Training Centre, AICTE ATAL Academy, Jun 2021",
  "Framework and Strategies to Sustain Autonomy — NITTTR Bhopal, Sep–Dec 2020",
  "VLSI Design and Modeling — IEEE EDS Chapter at MAIT, May 2019",
  "Machine Learning and Latest Optimization Techniques — MAIT, Jun 2018",
  "Electronic Design and Automation Tools — MAIT, Jun 2017",
  "Advanced Signal Processing and Embedded Systems — Delhi Technological University, Apr 2012",
  "Broadcast communication mechanisms — All India Radio and Doordarshan, Prasar Bharati, 2009",
];
