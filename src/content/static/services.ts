export interface ServicePillar {
  number: string;
  id: string;
  name: string;
  outcome: string;
  description: string;
  subServices: string[];
}

export const servicesData: ServicePillar[] = [
  {
    number: '01',
    id: 'research',
    name: 'Research, Strategy & Advisory',
    outcome: 'Decisions backed by evidence, not opinions.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '02',
    id: 'transformation',
    name: 'Digital Transformation',
    outcome: 'Organisations that use the technology — not reports that describe it.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '03',
    id: 'ai',
    name: 'AI Strategy & Transformation',
    outcome: 'AI that earns its keep — measured in outcomes, not demos.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '04',
    id: 'product',
    name: 'Product Discovery & Development',
    outcome: 'To market faster, with something users actually want.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '05',
    id: 'software',
    name: 'Custom Software & Business Systems',
    outcome: 'Software that does what your organisation does — and keeps working.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '06',
    id: 'automation',
    name: 'Business Process Automation',
    outcome: 'Hours back, costs down, reporting that writes itself.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '07',
    id: 'consulting',
    name: 'Technology Consulting & R&D',
    outcome: 'A technology direction you trust — and the partner to execute it.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
  {
    number: '08',
    id: 'capability',
    name: 'Digital Capacity & Capability Development',
    outcome: 'A team that owns the tools — not a dependency on the vendor.',
    description: '[APPROVED CONTENT REQUIRED — Source: Corporate Profile Pages 10–11]',
    subServices: ['[APPROVED CONTENT REQUIRED]'],
  },
];
