export interface SignatureProject {
  id: string;
  name: string;
  sectorTags: string[];
  description: string;
}

export interface IndustryCluster {
  name: string;
  sectors: string[];
}

export const signatureProjectsData: SignatureProject[] = [
  {
    id: 'lingua-roots',
    name: 'LinguaRoots',
    sectorTags: ['Language Preservation', 'AI'],
    description:
      'An AI-powered platform for the preservation, teaching and revitalisation of indigenous African languages. It gives communities the tools to document their languages, teach them to the next generation, and keep them alive in daily use. Technology in service of heritage.',
  },
  {
    id: 'church-flow',
    name: 'ChurchFlow / IFMRS',
    sectorTags: ['Church Administration', 'Financial Management'],
    description:
      'An integrated digital administration and financial management ecosystem for church and ministry networks. Administration and finances work from one trusted system, giving leadership the order and accountability that stewardship demands.',
  },
  {
    id: 'crowdfunding',
    name: 'Crowdfunding Platform',
    sectorTags: ['Donor Trust', 'International'],
    description:
      'A crowdfunding platform for an international faith-based organisation, built around global donor and beneficiary workflows. Giving and disbursement through one controlled system, engineered for the accountability that donor trust depends on.',
  },
  {
    id: 'enterprise-transformation',
    name: 'Enterprise Transformation',
    sectorTags: ['Education', 'Enterprise'],
    description:
      'Digital transformation and consulting for academic institutions and enterprise organisations across Nigeria — diagnosing how each organisation actually worked before digitising what mattered most.',
  },
  {
    id: 'msme-intelligence',
    name: 'MSME Opportunity Intelligence',
    sectorTags: ['Research', 'Africa'],
    description:
      'Consultant-grade AI and MSME opportunity intelligence for Nigeria and Africa. Research that maps where real market opportunity sits for small businesses, structured for decision-makers who need evidence, not opinions.',
  },
];

export const industryClustersData: IndustryCluster[] = [
  {
    name: 'Public Institutions & Development',
    sectors: ['Government', 'Development Partners', 'NGOs'],
  },
  {
    name: 'Enterprise & Commerce',
    sectors: ['Financial Services', 'MSMEs', 'Manufacturing', 'Startups'],
  },
  {
    name: 'Institutions & Communities',
    sectors: ['Education', 'Healthcare', 'Religious Organisations', 'Cooperatives'],
  },
];
