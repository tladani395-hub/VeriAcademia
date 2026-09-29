export interface UniversitySeed {
  id: string;
  name: string;
  slug: string;
  abbreviation: string;
  website: string;
  country: string;
  state: string;
  city: string;
  status: 'VERIFIED' | 'PENDING' | 'UNDER_REVIEW';
  logoUrl?: string;
  researchersCount: number;
  publicationsCount: number;
  patentsCount: number;
  institutesCount: number;
  departmentsCount: number;
}

export interface PublicationSeed {
  id: string;
  title: string;
  abstract: string;
  doi: string;
  publicationYear: number;
  journalOrVenue: string;
  researchArea: string;
  verificationStatus: 'VERIFIED' | 'PENDING_REVIEW' | 'RETURNED' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  isProtected: boolean;
  authors: string[];
  universityName: string;
  universitySlug: string;
}

export interface ResearcherSeed {
  id: string;
  name: string;
  title: string;
  bio: string;
  universityName: string;
  universitySlug: string;
  department: string;
  interests: string[];
  orcid: string;
  googleScholar?: string;
  researchGate?: string;
  isVerified: boolean;
  publicationsCount: number;
  patentsCount: number;
}

export interface PatentSeed {
  id: string;
  title: string;
  slug: string;
  number: string;
  inventors: string[];
  universityName: string;
  universitySlug: string;
  issueDate: string;
  techArea: string;
  status: 'GRANTED' | 'APPLICATION' | 'EXPIRED';
}

export const INITIAL_UNIVERSITIES: UniversitySeed[] = [
  {
    id: 'uni-charusat-01',
    name: 'Charotar University of Science and Technology',
    slug: 'charusat',
    abbreviation: 'CHARUSAT',
    website: 'https://charusat.ac.in',
    country: 'India',
    state: 'Gujarat',
    city: 'Anand',
    status: 'VERIFIED',
    logoUrl: '/logos/charusat.png',
    researchersCount: 1284,
    publicationsCount: 8421,
    patentsCount: 346,
    institutesCount: 9,
    departmentsCount: 24,
  },
  {
    id: 'uni-mit-02',
    name: 'Massachusetts Institute of Technology',
    slug: 'mit',
    abbreviation: 'MIT',
    website: 'https://mit.edu',
    country: 'United States',
    state: 'Massachusetts',
    city: 'Cambridge',
    status: 'VERIFIED',
    researchersCount: 3450,
    publicationsCount: 42100,
    patentsCount: 1890,
    institutesCount: 12,
    departmentsCount: 32,
  },
  {
    id: 'uni-stanford-03',
    name: 'Stanford University',
    slug: 'stanford',
    abbreviation: 'Stanford',
    website: 'https://stanford.edu',
    country: 'United States',
    state: 'California',
    city: 'Stanford',
    status: 'VERIFIED',
    researchersCount: 2890,
    publicationsCount: 38400,
    patentsCount: 1420,
    institutesCount: 10,
    departmentsCount: 28,
  },
  {
    id: 'uni-oxford-04',
    name: 'University of Oxford',
    slug: 'oxford',
    abbreviation: 'Oxford',
    website: 'https://ox.ac.uk',
    country: 'United Kingdom',
    state: 'Oxfordshire',
    city: 'Oxford',
    status: 'VERIFIED',
    researchersCount: 3100,
    publicationsCount: 39500,
    patentsCount: 980,
    institutesCount: 14,
    departmentsCount: 40,
  },
  {
    id: 'uni-eth-05',
    name: 'ETH Zurich',
    slug: 'eth-zurich',
    abbreviation: 'ETH Zurich',
    website: 'https://ethz.ch',
    country: 'Switzerland',
    state: 'Zurich',
    city: 'Zurich',
    status: 'VERIFIED',
    researchersCount: 2150,
    publicationsCount: 28900,
    patentsCount: 820,
    institutesCount: 8,
    departmentsCount: 16,
  },
  {
    id: 'uni-nus-06',
    name: 'National University of Singapore',
    slug: 'nus',
    abbreviation: 'NUS',
    website: 'https://nus.edu.sg',
    country: 'Singapore',
    state: 'Singapore',
    city: 'Kent Ridge',
    status: 'VERIFIED',
    researchersCount: 2600,
    publicationsCount: 31200,
    patentsCount: 750,
    institutesCount: 11,
    departmentsCount: 30,
  },
  {
    id: 'uni-iitb-07',
    name: 'Indian Institute of Technology Bombay',
    slug: 'iit-bombay',
    abbreviation: 'IIT Bombay',
    website: 'https://iitb.ac.in',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    status: 'VERIFIED',
    researchersCount: 1850,
    publicationsCount: 21400,
    patentsCount: 640,
    institutesCount: 7,
    departmentsCount: 18,
  },
  {
    id: 'uni-tokyo-08',
    name: 'University of Tokyo',
    slug: 'utokyo',
    abbreviation: 'UTokyo',
    website: 'https://u-tokyo.ac.jp',
    country: 'Japan',
    state: 'Tokyo',
    city: 'Bunkyo',
    status: 'PENDING',
    researchersCount: 2980,
    publicationsCount: 34100,
    patentsCount: 910,
    institutesCount: 13,
    departmentsCount: 35,
  }
];

export const INITIAL_RESEARCHERS: ResearcherSeed[] = [
  {
    id: 'res-tirth-01',
    name: 'Dr. Tirth Ladani',
    title: 'Professor & Lead AI Researcher',
    bio: 'Pioneering verified neural architectures, privacy-preserving machine learning, and multi-tenant academic database security.',
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
    department: 'Department of Computer Engineering',
    interests: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Distributed Systems'],
    orcid: '0000-0002-1825-0097',
    googleScholar: 'https://scholar.google.com/citations?user=tirth',
    researchGate: 'https://researchgate.net/profile/Tirth-Ladani',
    isVerified: true,
    publicationsCount: 12,
    patentsCount: 2,
  },
  {
    id: 'res-patel-02',
    name: 'Prof. A. Patel',
    title: 'Senior Fellow in Renewable Energy Systems',
    bio: 'Researching groundwater basin recovery, sustainable hydrological modeling, and autonomous eco-sensing systems.',
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
    department: 'Department of Civil Engineering',
    interests: ['Hydrology', 'Environmental Sensing', 'Groundwater Management'],
    orcid: '0000-0003-4412-9811',
    isVerified: true,
    publicationsCount: 18,
    patentsCount: 4,
  },
  {
    id: 'res-johnsmith-03',
    name: 'Dr. John Smith',
    title: 'Associate Professor of Quantum Information',
    bio: 'Quantum key distribution protocols, fault-tolerant quantum computing, and hardware verification.',
    universityName: 'Massachusetts Institute of Technology',
    universitySlug: 'mit',
    department: 'Department of Physics & EECS',
    interests: ['Quantum Computing', 'Cryptography', 'Nanophotonics'],
    orcid: '0000-0001-9012-3341',
    isVerified: true,
    publicationsCount: 27,
    patentsCount: 6,
  },
  {
    id: 'res-fei-04',
    name: 'Dr. Fei-Fei Zhang',
    title: 'Professor of Computer Science & Vision',
    bio: 'Spatial computing, embodied robotics vision, and zero-knowledge model verification.',
    universityName: 'Stanford University',
    universitySlug: 'stanford',
    department: 'Computer Science Department',
    interests: ['Computer Vision', 'Robotics', 'Spatial AI'],
    orcid: '0000-0002-4410-1192',
    isVerified: true,
    publicationsCount: 54,
    patentsCount: 11,
  },
  {
    id: 'res-oxford-05',
    name: 'Prof. Alistair Finch',
    title: 'Director of Genomic Medicine',
    bio: 'CRISPR base editing precision, single-cell transcriptomics, and computational immunology.',
    universityName: 'University of Oxford',
    universitySlug: 'oxford',
    department: 'Nuffield Department of Medicine',
    interests: ['Genomics', 'Bioinformatics', 'Molecular Biology'],
    orcid: '0000-0004-9918-2041',
    isVerified: true,
    publicationsCount: 41,
    patentsCount: 5,
  }
];

export const INITIAL_PUBLICATIONS: PublicationSeed[] = [
  {
    id: 'pub-01',
    title: 'AI-Based Smart Campus Infrastructure & Multi-Tenant Access Verification',
    abstract: 'This paper proposes a decentralized framework for campus IoT management with cryptographic affiliation proof and role-based access delegation.',
    doi: '10.1016/j.smartsys.2026.04.012',
    publicationYear: 2026,
    journalOrVenue: 'IEEE Transactions on Smart Grid and Computing',
    researchArea: 'Artificial Intelligence',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'CHARUSAT Research Administrator',
    verifiedAt: '28 Sep 2026',
    isProtected: false,
    authors: ['Tirth Ladani', 'A. Patel'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
  },
  {
    id: 'pub-02',
    title: 'Groundwater Recovery and Eco-Sensing Networks in Semi-Arid Basins',
    abstract: 'Empirical assessment of multi-source satellite radar and localized sensor nodes for predicting water table regeneration in semi-arid zones.',
    doi: '10.1000/groundwater.2026.11',
    publicationYear: 2026,
    journalOrVenue: 'Journal of Environmental Hydrology & Remote Sensing',
    researchArea: 'Environmental Sensing',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'CHARUSAT Research Administrator',
    verifiedAt: '21 Sep 2026',
    isProtected: true,
    authors: ['A. Patel', 'M. Singh', 'Tirth Ladani'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
  },
  {
    id: 'pub-03',
    title: 'Fault-Tolerant Superconducting Quantum Logic Circuits',
    abstract: 'Demonstrating 99.9% gate fidelity using active error tracking and adaptive pulse control in 64-qubit superconducting chips.',
    doi: '10.1038/s41586-026-0091-z',
    publicationYear: 2025,
    journalOrVenue: 'Nature Quantum Information',
    researchArea: 'Quantum Computing',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'MIT Office of Sponsored Research',
    verifiedAt: '14 Jan 2026',
    isProtected: true,
    authors: ['John Smith', 'Elena Rostova'],
    universityName: 'Massachusetts Institute of Technology',
    universitySlug: 'mit',
  },
  {
    id: 'pub-04',
    title: 'Zero-Knowledge Machine Learning Proofs for Medical Diagnostics',
    abstract: 'Ensuring model integrity and privacy preservation across distributed healthcare hospital nodes without revealing raw patient parameters.',
    doi: '10.1109/TDSC.2025.339182',
    publicationYear: 2025,
    journalOrVenue: 'IEEE Transactions on Dependable and Secure Computing',
    researchArea: 'Artificial Intelligence',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Stanford Academic Review Board',
    verifiedAt: '03 Dec 2025',
    isProtected: false,
    authors: ['Fei-Fei Zhang', 'Marcus Vance'],
    universityName: 'Stanford University',
    universitySlug: 'stanford',
  }
];

export const INITIAL_PATENTS: PatentSeed[] = [
  {
    id: 'pat-01',
    title: 'Adaptive signal processing for smart learning environments',
    slug: 'US-2026-01284',
    number: 'US-2026-01284',
    inventors: ['Tirth Ladani', 'A. Patel'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
    issueDate: '2026',
    techArea: 'Artificial Intelligence',
    status: 'GRANTED',
  },
  {
    id: 'pat-02',
    title: 'Low-energy membrane for groundwater recovery and micro-filtration',
    slug: 'EP-2025-88310',
    number: 'EP-2025-88310',
    inventors: ['A. Patel', 'M. Singh'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
    issueDate: '2025',
    techArea: 'Engineering',
    status: 'GRANTED',
  },
  {
    id: 'pat-03',
    title: 'Privacy-preserving model training system for federated healthcare nodes',
    slug: 'GB-2025-44102',
    number: 'GB-2025-44102',
    inventors: ['Fei-Fei Zhang', 'John Smith'],
    universityName: 'Stanford University',
    universitySlug: 'stanford',
    issueDate: '2025',
    techArea: 'Artificial Intelligence',
    status: 'APPLICATION',
  }
];

// Compatibility exports for components importing legacy simple structures:
export const universities = INITIAL_UNIVERSITIES.map((u) => ({
  name: u.name,
  slug: u.slug,
  city: `${u.city}, ${u.state}`,
  country: u.country,
  researchers: u.researchersCount,
  publications: u.publicationsCount,
  status: (u.status === 'VERIFIED' ? 'Verified' : 'Pending review') as 'Verified' | 'Pending review',
}));

export const researchers = INITIAL_RESEARCHERS.map((r) => ({
  name: r.name,
  slug: r.id,
  role: `${r.title} · ${r.department}`,
  university: r.universityName,
  publications: r.publicationsCount,
  patents: r.patentsCount,
}));

export const publications = INITIAL_PUBLICATIONS.map((p) => ({
  title: p.title,
  slug: p.doi.replace(/\//g, '-'),
  authors: p.authors.join(', '),
  university: p.universityName,
  year: p.publicationYear,
  doi: p.doi,
  status: (p.verificationStatus === 'VERIFIED' ? 'Verified' : 'Request required') as 'Verified' | 'Request required',
}));

export const patents = INITIAL_PATENTS.map((pt) => ({
  title: pt.title,
  slug: pt.slug,
  number: pt.number,
  inventors: pt.inventors.join(', '),
  university: pt.universityName,
  date: pt.issueDate,
  techArea: (pt.techArea === 'Artificial Intelligence' ? 'Artificial Intelligence' : 'Engineering') as 'Artificial Intelligence' | 'Engineering',
  status: pt.status,
}));
