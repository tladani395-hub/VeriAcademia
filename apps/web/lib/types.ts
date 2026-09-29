export interface University {
  name: string;
  slug: string;
  city: string;
  country: string;
  researchers: number;
  publications: number;
  status: 'Verified' | 'Pending review';
}

export interface Researcher {
  name: string;
  slug: string;
  role: string;
  university: string;
  publications: number;
  patents: number;
}

export interface Publication {
  title: string;
  slug: string;
  authors: string;
  university: string;
  year: number;
  doi: string;
  status: 'Verified' | 'Request required';
}

export interface Patent {
  title: string;
  slug: string;
  number: string;
  inventors: string;
  university: string;
  date: string;
  techArea: 'Artificial Intelligence' | 'Engineering';
  status: 'GRANTED' | 'APPLICATION' | 'EXPIRED';
}
