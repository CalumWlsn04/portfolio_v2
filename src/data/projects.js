export const projects = [
  {
    slug: 'cancer-nuclei-classification', number: '01', title: 'Cancer Nuclei Classification',
    eyebrow: 'Computer vision · Research', accent: 'ml',
    description: 'Compared an end-to-end CNN with SimCLR contrastive pre-training for three-class nuclei classification in melanoma histopathology imagery.',
    impact: 'The supervised CNN reached 74.0% test accuracy, outperforming the 52.1% contrastive model.',
    tech: ['Python', 'TensorFlow', 'CNNs', 'SimCLR', 'scikit-learn'],
    role: 'Nuclei classification pipeline', context: 'Academic research project', year: '2026',
    overview: 'A research-driven computer vision project investigating whether contrastive pre-training could improve classification of Tumor, Histiocyte, and Lymphocyte nuclei.',
    challenge: 'Histopathology classes can differ through subtle visual features, while the test set was imbalanced and the Histiocyte class was especially difficult to separate.',
    constraint: 'The comparison had to remain fair across two very different training strategies while preserving the same downstream three-class task.',
    decision: 'Use an end-to-end CNN as the supervised baseline, then evaluate a SimCLR encoder under the same classification objective rather than presenting contrastive learning as an assumed improvement.',
    resultSummary: 'The supervised model produced the stronger representation for this dataset. The contrastive experiment still added value by revealing where the learned embedding failed to separate classes.',
    metrics: [
      { value: '74.0%', label: 'End-to-end CNN accuracy' },
      { value: '52.1%', label: 'SimCLR model accuracy' },
      { value: '0.02', label: 'SimCLR silhouette score' },
    ],
    steps: [
      { title: 'Prepare the dataset', text: 'Converted coordinate-based annotations into labeled 100 × 100 nucleus patches and created repeatable training and evaluation inputs.' },
      { title: 'Train a supervised baseline', text: 'Built an end-to-end convolutional classifier with augmentation, class weighting, early stopping, and learning-rate reduction.' },
      { title: 'Evaluate contrastive learning', text: 'Pre-trained a SimCLR-style encoder with paired augmentations and NT-Xent loss, then froze it for downstream classification.' },
      { title: 'Analyze model behavior', text: 'Compared accuracy, class-level precision and recall, confusion matrices, sample types, and latent-space separation.' },
    ],
    insight: 'Contrastive pre-training was not automatically beneficial. Freezing the encoder limited task-specific adaptation, and the learned representation did not separate the three nuclei classes well enough for the downstream classifier.',
    architecture: ['Annotated images', 'Nucleus patches', 'CNN encoder', 'Dense classifier', '3 cell classes'],
    secondaryArchitecture: ['Image pair', 'Augmentations', 'Shared encoder', 'NT-Xent loss', 'Frozen classifier'],
    paper: '/computer-vision-report.pdf',
  },
  {
    slug: 'jettrack-data-pipeline', number: '02', title: 'JetTrack Data Pipeline',
    eyebrow: 'Data engineering · Cloud', accent: 'pipeline',
    description: 'Automated aircraft movement ingestion and transformation for investment research using Dagster, PySpark, pandas, and scheduled API workflows.',
    impact: 'Improved data retrieval efficiency by 85% and replaced a recurring manual collection process.',
    tech: ['Python', 'Dagster', 'PySpark', 'pandas', 'REST APIs'],
    role: 'Data engineering intern', context: 'Freestone Grove Partners', year: '2025',
    overview: 'A recurring data pipeline that converted nested aircraft movement API responses into structured, analysis-ready alternative data.',
    challenge: 'Researchers needed dependable, frequently refreshed aircraft data, but the upstream payloads were nested and costly to prepare manually.',
    constraint: 'The workflow needed to run repeatedly, tolerate imperfect API payloads, and leave behind datasets that analysts could trust without manual cleanup.',
    decision: 'Separate orchestration from transformation: Dagster owned scheduling and observability, while PySpark and pandas handled normalization at the appropriate scale.',
    resultSummary: 'The finished pipeline replaced a recurring manual process with a documented, observable data product that refreshed throughout the day.',
    metrics: [{ value: '85%', label: 'Retrieval efficiency improvement' }, { value: '30 min', label: 'Collection cadence' }, { value: 'API → SQL', label: 'End-to-end data flow' }],
    steps: [
      { title: 'Orchestrate ingestion', text: 'Used Dagster to schedule collection and make each stage observable and repeatable.' },
      { title: 'Normalize nested payloads', text: 'Flattened and standardized aircraft movement responses into consistent records.' },
      { title: 'Scale transformations', text: 'Applied PySpark and pandas where appropriate to prepare data for downstream analysis.' },
      { title: 'Operationalize the workflow', text: 'Added monitoring and documentation so the pipeline could be maintained beyond the initial implementation.' },
    ],
    insight: 'The primary engineering value came from reliability and repeatability: orchestration, explicit transformations, and clear operational ownership mattered as much as the transformation code itself.',
    architecture: ['Movement API', 'Dagster schedule', 'PySpark transforms', 'Validated records', 'Research datasets'],
  },
  {
    slug: 'breeze-pricing-platform', number: '03', title: 'Breeze Pricing Intelligence Platform',
    eyebrow: 'Production software · Full stack', accent: 'product',
    description: 'Developed an internal platform that collects, normalizes, and reports partner airfare data to support fare compliance and distribution oversight.',
    impact: 'Processes hundreds of fare records per scheduled run across five travel distribution platforms.',
    tech: ['Python', 'React', 'Supabase', 'SQL', 'Web scraping'],
    role: 'Software engineering intern', context: 'Breeze Airways', year: '2026',
    overview: 'An internal pricing compliance platform connecting automated collection, data normalization, APIs, and a React reporting interface.',
    challenge: 'Pricing information was distributed across partner channels, making discrepancies difficult to detect and investigate consistently.',
    constraint: 'The system had to collect inconsistent third-party data, normalize it into a shared model, and remain usable by non-engineering teams.',
    decision: 'Treat collection, normalization, storage, APIs, and reporting as one product workflow rather than a collection of independent scripts.',
    resultSummary: 'The platform turned scattered partner pricing into a repeatable internal workflow with a single place to review and investigate discrepancies.',
    metrics: [{ value: '5', label: 'Distribution platforms' }, { value: '100s', label: 'Fare records per run' }, { value: 'Daily', label: 'Scheduled workflow' }],
    steps: [
      { title: 'Collect partner pricing', text: 'Built automated scraping workflows for five travel distribution platforms.' },
      { title: 'Normalize fare records', text: 'Standardized pricing data before integrating it through internal APIs and SQL-backed storage.' },
      { title: 'Create the reporting layer', text: 'Developed React tools that gave Distribution and Compliance teams visibility into discrepancies.' },
      { title: 'Improve operational reliability', text: 'Migrated locally hosted services to centralized infrastructure for easier maintenance and dependable internal access.' },
    ],
    insight: 'The project required product and engineering decisions together: data quality, scheduling, maintainability, and a clear interface all had to work as one system.',
    architecture: ['Partner sites', 'Collection jobs', 'Normalization', 'Supabase / APIs', 'React reporting'],
  },
];

export const additionalProjects = [
  { title: 'xv6 Container Manager', text: 'Docker-like process isolation, filesystem roots, resource controls, and interactive I/O implemented inside xv6.', tech: 'C · Operating systems · Kernel development' },
  { title: 'Kubernetes Cost Intelligence', text: 'Grafana and Kubecost tooling that improved cloud cost visibility and contributed to approximately $300K in operational savings.', tech: 'AWS · Kubernetes · Grafana · Kubecost' },
  { title: 'PII Evaluation Framework', text: 'Evaluation work for comparing AI-assisted redaction approaches, model behavior, and data-protection tradeoffs.', tech: 'AI evaluation · NLP · Python' },
];

export const experience = [
  { company: 'Breeze Airways', role: 'Software Engineering Intern', period: 'May 2026 — Present', text: 'Building internal pricing compliance software, automated data collection workflows, and reporting tools for fare auditing and partner oversight.' },
  { company: 'GYFR', role: 'Software Engineering Intern', period: 'Jan 2026 — Jun 2026', text: 'Designed Stripe and Firebase subscription infrastructure and supported production deployment, monitoring, and application reliability.' },
  { company: 'Freestone Grove Partners', role: 'Associate Intern', period: 'Jun 2025 — Aug 2025', text: 'Worked across cloud and data engineering on AWS infrastructure, Kubernetes cost intelligence, and automated Dagster pipelines.' },
];

export function getProjectBySlug(slug) { return projects.find((project) => project.slug === slug); }
