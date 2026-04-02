export interface ExperienceItem {
  period: string
  type: string
  role: string
  company: string
  location: string
  description: string
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    period: 'AGO 2025',
    type: 'INDEPENDIENTE',
    role: 'Desarrollador de Software & Automatización',
    company: 'Centro Coworking',
    location: 'Riohacha, La Guajira',
    description: 'Sistema digital completo de gestión de clientes, servicios y caja — reemplazando flujos manuales en Excel. Dashboards financieros y operativos en Looker Studio. Construido íntegramente con Claude Code + Firebase.',
    tags: ['Claude Code', 'Firebase', 'Looker Studio', 'React'],
  },
  {
    period: 'FEB 2024 – AGO 2024',
    type: 'PRÁCTICAS',
    role: 'Practicante – Coordinación de Contratos',
    company: 'Cerrejón (Glencore)',
    location: 'Albania, La Guajira',
    description: 'Digitalización y gestión estructurada de información contractual bajo estándares estrictos. Desarrollo de aplicación en Power Apps para automatizar solicitudes internas.',
    tags: ['Power Apps', 'Digitalización', 'Contratos'],
  },
  {
    period: 'FEB 2022 – NOV 2024',
    type: 'TIEMPO COMPLETO',
    role: 'Analista Junior de Datos',
    company: 'ALVITEK S.A.S',
    location: 'Fonseca, La Guajira',
    description: 'Extracción, transformación y análisis de datos para decisiones estratégicas. Reportes interactivos en Power BI que redujeron tiempos de análisis. Evaluación de costos y rentabilidad de proyectos.',
    tags: ['Power BI', 'SQL', 'Análisis de datos', 'ETL'],
  },
]
