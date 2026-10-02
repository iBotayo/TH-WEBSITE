export interface MethodStep {
  step: string;
  name: string;
  description: string;
  deliverable: string;
}

export const methodData: MethodStep[] = [
  {
    step: '01',
    name: 'Discover',
    description:
      'We sit with your people and listen. Stakeholders, users, front-line staff, decision-makers — we map how the organisation actually works today, and where it hurts.',
    deliverable:
      'An honest, shared framing of the problem — agreed by everyone who will live with the result.',
  },
  {
    step: '02',
    name: 'Research',
    description:
      'We gather the evidence. Market data, user interviews, comparable cases, regulatory and technical constraints. Nothing is assumed; everything is checked.',
    deliverable:
      'An evidence base your decisions can stand on — and that you can cite later.',
  },
  {
    step: '03',
    name: 'Analyse',
    description:
      'We turn evidence into insight. Systems analysis, opportunity modelling, cost and risk. We test each option against your reality.',
    deliverable:
      'A clear diagnosis and a shortlist of defensible options, with trade-offs stated plainly.',
  },
  {
    step: '04',
    name: 'Design',
    description:
      'We decide, then blueprint. Architecture, product design, roadmap, phasing, budgets — specific enough to build from, simple enough to explain to a board.',
    deliverable:
      'A build plan you can approve with confidence.',
  },
  {
    step: '05',
    name: 'Build',
    description:
      'We ship in working increments, not one big reveal. You see the system take shape, test it as it grows.',
    deliverable:
      'Working software you have already touched, tested and approved.',
  },
  {
    step: '06',
    name: 'Deploy',
    description:
      'We take it live properly — migration, rollout, training, support.',
    deliverable:
      'A live system running in your environment, with your people trained on it.',
  },
  {
    step: '07',
    name: 'Measure',
    description:
      'We agreed success criteria in step one. Now we report against them.',
    deliverable:
      'Evidence of what changed, and a clear view of what’s left.',
  },
  {
    step: '08',
    name: 'Scale',
    description:
      'We grow what works. More users, more locations, more automation — and capability transferred to your team.',
    deliverable:
      'A system you can run, extend and own.',
  },
];
