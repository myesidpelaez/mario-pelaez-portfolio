export interface IAService {
  icon: string
  title: string
  description: string
}

export const iaServices: IAService[] = [
  { icon: '>_',  title: 'Automatización de procesos',    description: 'Flujos n8n, webhooks y APIs que reemplazan tareas manuales repetitivas con precisión quirúrgica.' },
  { icon: '</>',  title: 'Desarrollo sin código manual',  description: 'Aplicaciones web completas construidas con Claude Code + Claude AI como ecosistema de ingeniería.' },
  { icon: '◈',   title: 'Análisis e inteligencia de datos', description: 'Dashboards en Power BI y Looker Studio. Decisiones basadas en datos, no en intuición.' },
  { icon: '⬡',   title: 'Digitalización empresarial',   description: 'Transformo flujos manuales en Excel en sistemas digitales con Firebase y bases de datos estructuradas.' },
  { icon: '◎',   title: 'Formación en IA para PYMEs',   description: 'Programas prácticos de entrenamiento para que equipos adopten IA en su operación diaria.' },
  { icon: '⟡',   title: 'Arquitectura de soluciones',   description: 'Diseño de sistemas multi-agente y flujos complejos con herramientas de última generación.' },
]
