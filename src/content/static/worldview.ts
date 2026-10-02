export interface WorldviewItem {
  id: string;
  topic: string;
  statement: string;
}

export const worldviewData: WorldviewItem[] = [
  {
    id: 'systems',
    topic: 'On systems',
    statement:
      'Every organisation is a system. When something isn’t working, the cause is almost never where the symptom appears. We trace problems to their roots — across processes, people, incentives and technology — before we touch a single line of code.',
  },
  {
    id: 'technology',
    topic: 'On technology',
    statement:
      'Technology is a tool, not a strategy. The right system, deployed into the right process, with the right people trained on it, changes outcomes. Technology deployed into chaos just digitises the chaos.',
  },
  {
    id: 'ai',
    topic: 'On AI',
    statement:
      'AI is engineering, not magic. We use it where it changes outcomes — and skip where it doesn’t. When you hear a number from us, it comes from analysis you can check.',
  },
  {
    id: 'africa',
    topic: 'On Africa',
    statement:
      'The operating conditions here — variable power, evolving regulation, cash and mobile money side by side, users on three-year-old phones — are not limitations. They are the design constraints that make our systems more resilient, more practical, and more honest than systems designed for ideal conditions.',
  },
  {
    id: 'accountability',
    topic: 'On accountability',
    statement:
      'We do not write reports that sit on shelves. We do not hand off to strangers mid-project. The person who scopes the work is the person who owns the outcome. That is the only model that keeps everyone honest.',
  },
];
