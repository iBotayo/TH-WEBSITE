export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  headshotAsset: string;
}

export const leadershipData: LeaderProfile[] = [
  {
    id: 'ben-shekari',
    name: 'Benjamin I. Shekari',
    role: 'Founder & Chief Executive Officer',
    bio:
      'Ben brings almost a decade of frontier product and technology experience from Marco Focus Nigeria Limited — one of Northern Nigeria’s pioneering software development companies — where he led the design and delivery of enterprise systems across multiple sectors. At ThinkingHead he leads strategy, AI product direction, executive research and client engagement. His practice combines systems thinking, deep research and AI engineering — helping clients move from ambition to defensible, working systems. He leads client engagement personally, from first question to final handover.',
    headshotAsset: '[APPROVED ASSET REQUIRED — Professional headshot to be provided]',
  },
  {
    id: 'ayodeji-olaniyan',
    name: 'Ayodeji Olaniyan',
    role: 'Chief Technology Officer',
    bio:
      'Ayo brings 15+ years of enterprise technology leadership from three of Nigeria’s tier-one financial institutions — Zenith Bank, UBA and Wema Bank — where he delivered mission-critical systems at national scale. At ThinkingHead he leads the engineering practice across enterprise architecture, cloud, cybersecurity, DevOps and digital transformation. His standard is the one regulated industries demand: reliability, security and governance, built in from the start.',
    headshotAsset: '[APPROVED ASSET REQUIRED — Professional headshot to be provided]',
  },
];
