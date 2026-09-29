import { University, Researcher, Publication, Patent } from './types';

export const universities: University[] = [
  { name: 'CHARUSAT University', slug: 'charusat-university', city: 'Anand, Gujarat', country: 'India', researchers: 1284, publications: 8421, status: 'Verified' },
  { name: 'Example University', slug: 'example-university', city: 'Cambridge, Massachusetts', country: 'United States', researchers: 3920, publications: 24109, status: 'Verified' },
  { name: 'Northbridge Institute of Technology', slug: 'northbridge-institute-of-technology', city: 'London', country: 'United Kingdom', researchers: 876, publications: 4210, status: 'Verified' },
  { name: 'Pacific Research University', slug: 'pacific-research-university', city: 'Vancouver, BC', country: 'Canada', researchers: 642, publications: 3872, status: 'Pending review' },
];

export const researchers: Researcher[] = [
  { name: 'Dr. Ananya Patel', slug: 'dr-ananya-patel', role: 'Associate Professor · Artificial Intelligence', university: 'CHARUSAT University', publications: 42, pastents: 4 },
  { name: 'Prof. James Okafor', slug: 'james-okafor', role: 'Research Chair · Sustainable Systems', university: 'Example University', publications: 86, pastents: 12 },
  { name: 'Dr. Mira Chen', slug: 'mira-chen', role: 'Senior Researcher · Biomedical Engineering', university: 'Northbridge Institute of Technology', publications: 31, pastents: 2 },
];

export const publications: Publication[] = [
  { title: 'AI-Based Smart Campus: A Framework for Adaptive Learning', slug: '10.0000/smart-campus.2026', authors: 'Ananya Patel, R. Mehta', university: 'CHARUSAT University', year: 2026, doi: '10.0000/smart-campus.2026', status: 'Verified' },
  { title: 'Groundwater recovery in semi-arid basins', slug: '10.0000/groundwater.2026', authors: 'James Okafor, M. Singh', university: 'Example University', year: 2026, doi: '10.0000/groundwater.2026', status: 'Request required' },
  { title: 'Trustworthy machine learning for public infrastructure', slug: '10.0000/trust-ml.2025', authors: 'Mira Chen, D. Williams', university: 'Northbridge Institute of Technology', year: 2025, doi: '10.0000/trust-ml.2025', status: 'Verified' },
];

export const patents: Patent[] = [
  { title: 'Adaptive signal processing for smart learning environments', slug: 'US-2026-01284', number: 'US-2026-01284', inventors: 'Ananya Patel, R. Mehta', university: 'CHARUSAT University', date: '2026', techArea: 'Artificial Intelligence' },
  { title: 'Low-energy membrane for groundwater recovery', slug: 'EP-2025-88310', number: 'EP-2025-88310', inventors: 'James Okafor, M. Singh', university: 'Example University', date: '2025', techArea: 'Engineering' },
  { title: 'Privacy-preserving model training system', slug: 'GB-2025-44102', number: 'GB-2025-44102', inventors: 'Mira Chen, D. Williams', university: 'Northbridge Institute of Technology', date: '2025', techArea: 'Artificial Intelligence' },
];
