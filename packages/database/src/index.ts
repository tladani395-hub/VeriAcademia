export * from './schema';

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

export interface PatentSeed {
  id: string;
  title: string;
  patentNumber: string;
  abstract: string;
  applicationDate: string;
  grantDate?: string;
  technologyArea: string;
  verificationStatus: 'VERIFIED' | 'PENDING_REVIEW' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  isProtected: boolean;
  inventors: string[];
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
    authors: ['A. Researcher', 'B. Scholar', 'Tirth Ladani'],
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
  }
];

export const INITIAL_PATENTS: PatentSeed[] = [
  {
    id: 'pat-01',
    title: 'Multi-Tenant Cryptographic Verification Protocol for Institutional Research Records',
    patentNumber: 'US-2026-0192834-A1',
    abstract: 'System and method for verifiable lineage attribution of academic publications across multi-tenant university workspaces without exposing raw research payloads.',
    applicationDate: '2025-03-15',
    grantDate: '2026-08-10',
    technologyArea: 'Software Security & Cryptography',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'CHARUSAT Patent Office',
    verifiedAt: '12 Aug 2026',
    isProtected: false,
    inventors: ['Tirth Ladani'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
  },
  {
    id: 'pat-02',
    title: 'Low-Power Hydro-Acoustic Ground Sensor Array for Sub-surface Flow Tracking',
    patentNumber: 'IN-2025-4100982-B2',
    abstract: 'An autonomous sensor array utilizing piezo-electric microgenerators for continuous deep groundwater acoustic wave sampling.',
    applicationDate: '2024-11-02',
    grantDate: '2026-01-20',
    technologyArea: 'Environmental Hardware Sensors',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'CHARUSAT Patent Office',
    verifiedAt: '25 Jan 2026',
    isProtected: true,
    inventors: ['A. Patel', 'Tirth Ladani'],
    universityName: 'Charotar University of Science and Technology',
    universitySlug: 'charusat',
  }
];
