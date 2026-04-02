export interface StackItem {
  badge: string
  name: string
  description: string
}

export const stack: StackItem[] = [
  { badge: 'AI',  name: 'Claude Code + Claude AI', description: 'Ecosistema principal de desarrollo' },
  { badge: 'n8n', name: 'n8n',                    description: 'Automatización y flujos de trabajo' },
  { badge: 'FB',  name: 'Firebase',               description: 'Base de datos y backend' },
  { badge: 'BI',  name: 'Power BI · Looker Studio',description: 'Análisis y visualización de datos' },
  { badge: 'SQL', name: 'SQL',                    description: 'Gestión y consulta de bases de datos' },
  { badge: 'PA',  name: 'Power Apps',             description: 'Apps empresariales low-code' },
  { badge: 'GH',  name: 'GitHub',                 description: 'Control de versiones y colaboración' },
  { badge: 'API', name: 'Webhooks · APIs REST',   description: 'Integraciones y conectividad' },
]
