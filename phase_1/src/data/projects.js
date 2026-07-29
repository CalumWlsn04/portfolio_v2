export const projects = [
  {
    slug: 'jettrack-data-pipeline',
    number: '01',
    title: 'JetTrack Data Pipeline',
    eyebrow: 'Data engineering · Automation',
    description:
      'Built and automated a Dagster pipeline that collects aircraft movement data every 30 minutes, transforms nested API responses, and prepares reliable alternative data for investment research.',
    impact: 'Automated recurring ingestion and eliminated a manual data collection workflow.',
    tech: ['Python', 'Dagster', 'SQL', 'REST APIs'],
    accent: 'pipeline',
    overview:
      'A recurring data-ingestion workflow built to turn nested aircraft movement API responses into structured, analysis-ready data.',
    challenge:
      'The source data arrived as nested API payloads and had to be collected reliably on a fixed schedule before it could support investment research.',
    approach: [
      'Scheduled collection every 30 minutes with Dagster.',
      'Transformed nested responses into consistent tabular records.',
      'Prepared the resulting data for downstream SQL analysis and research workflows.',
    ],
  },
  {
    slug: 'kubernetes-cost-intelligence',
    number: '02',
    title: 'Kubernetes Cost Intelligence',
    eyebrow: 'Cloud infrastructure · Observability',
    description:
      'Created an internal AWS Grafana dashboard powered by the Kubecost API and Infinity plugin, exposing idle cluster costs and making optimization opportunities easier to find.',
    impact: 'Turned raw Kubernetes cost data into an actionable operational view.',
    tech: ['Kubernetes', 'Grafana', 'Kubecost', 'JSONPath'],
    accent: 'cloud',
    overview:
      'An internal cloud-cost dashboard that made Kubernetes spending and idle resources easier to investigate.',
    challenge:
      'Useful cost signals existed in Kubecost, but the raw API data was not presented in a form that engineers could quickly act on.',
    approach: [
      'Queried the Kubecost API from Grafana through the Infinity plugin.',
      'Used JSONPath expressions to shape responses into dashboard-ready fields.',
      'Focused the dashboard on idle cost and optimization opportunities.',
    ],
  },
  {
    slug: 'registration-advising-system',
    number: '03',
    title: 'Registration & Advising System',
    eyebrow: 'Full-stack · Team delivery',
    description:
      'Developed a database-backed web application within an Agile team to support student registrations and advising forms across multiple user workflows.',
    impact: 'Designed to process 100+ registrations and 20+ advising forms.',
    tech: ['Python', 'SQL', 'HTML', 'CSS'],
    accent: 'product',
    overview:
      'A database-backed application supporting registration and advising workflows for multiple types of users.',
    challenge:
      'The team had to translate several connected academic workflows into a coherent application while coordinating development through an Agile process.',
    approach: [
      'Modeled registration and advising data in a relational database.',
      'Implemented server-side and interface functionality across multiple workflows.',
      'Delivered features collaboratively through iterative team development.',
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
