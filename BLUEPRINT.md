# BLUEPRINT — Portafolio Profesional Mario Peláez
## Documento Maestro para Agentes de IA · Antigravity + Claude Code

---

> **Propósito de este documento:**
> Este blueprint es el contexto completo que un agente de IA necesita para construir, mantener, extender o depurar este portafolio web. Contiene la identidad del propietario, el stack técnico, la arquitectura visual, el sistema de diseño completo, la estructura de secciones, la lógica de componentes, y las instrucciones de implementación. Un agente que lea este documento debe poder reproducir el proyecto desde cero sin necesidad de contexto adicional.

---

## 1. IDENTIDAD DEL PROPIETARIO

**Nombre completo:** Mario Yesid Peláez Sánchez
**Profesión:** Ingeniero de Sistemas — egresado 2025, Universidad de La Guajira
**Posicionamiento:** AI Systems Engineer · Automatización Inteligente · Fundador de MeJorÍA Agency
**Ubicación:** Medellín, Antioquia, Colombia
**Filosofía de trabajo:** Mario no escribe código de forma tradicional. Usa Inteligencia Artificial (Claude Code, Claude AI) como ecosistema completo de ingeniería. Él es el arquitecto — la IA es su equipo de desarrollo. Esto es transparente y es su principal diferenciador.

**Contacto:**
- WhatsApp: +57 300 670 7219 → `https://wa.me/573006707219`
- Email: myesidpelaez@gmail.com
- LinkedIn: https://linkedin.com/in/mario-yesid-pelaez-sanchez-111b16242
- GitHub: https://github.com/myesidpelaez

**Empresa fundada:** MeJorÍA Agency — agencia de entrenamiento en IA y automatización para PYMEs colombianas. Stack: n8n, Claude, Firebase, workflows inteligentes.

---

## 2. PROPÓSITO DEL PORTAFOLIO

Este sitio web es un portafolio profesional orientado a:
1. **Reclutadores de talento humano** que evalúan el perfil técnico de Mario
2. **Clientes potenciales** interesados en servicios de automatización e IA
3. **Aliados y contactos** del ecosistema tech colombiano

El portafolio debe comunicar con claridad:
- Que Mario construye soluciones reales usando IA como herramienta de ingeniería
- Que no escribir código manualmente no es una limitación — es una ventaja competitiva
- Que tiene experiencia real en empresas reales (Cerrejón, ALVITEK, Centro Coworking)
- Que está en constante formación (12+ certificados)
- Que es fácil contactarlo

---

## 3. STACK TÉCNICO DEL PROYECTO

Este portafolio es intencionalmente **100% estático y sin dependencias**:

```
Tecnología:     HTML5 semántico + CSS3 custom + JavaScript vanilla
Fuentes:        Google Fonts (cargadas via CDN)
Dependencias:   NINGUNA — sin npm, sin frameworks, sin build tools
Deploy:         GitHub Pages (gratis, automático desde rama main)
Archivo único:  index.html contiene todo — HTML + CSS + JS en un solo archivo
```

**¿Por qué un solo archivo?**
- Máxima portabilidad — funciona con doble clic desde cualquier carpeta
- Sin configuración de entorno — cualquier agente puede modificarlo directamente
- Deploy instantáneo en GitHub Pages sin pipelines
- Carga ultrarrápida — sin JavaScript frameworks que parsear

**Fuentes Google (importadas en `<head>`):**
```
DM Serif Display — tipografía serif editorial para nombres y títulos grandes
DM Mono        — tipografía monoespaciada para elementos de código/terminal
DM Sans        — tipografía sans-serif limpia para cuerpo de texto
```

---

## 4. SISTEMA DE DISEÑO — GUÍA COMPLETA

### 4.1 Concepto Visual

El portafolio tiene una estética **dark terminal elegante**, inspirada en:
- **Claude Code** — la herramienta principal de Mario (guiño visual deliberado)
- **Filosofía Apple** — minimalismo, precisión, nada exagerado
- **Estética de código** — uso de fuentes mono, colores de terminal, elementos como `>_` y `mp@portfolio ~`

El color de acento es el **ámbar/dorado** (`#EF9F27`). Representa calidez, inteligencia y el concepto "da Vinci del código" que Mario usa para describirse.

### 4.2 Variables CSS (Design Tokens)

Estas son las únicas variables que definen TODO el sistema de color. Un agente NUNCA debe usar colores hardcodeados fuera de estas variables:

```css
:root {
  /* Fondo principal — negro casi puro con tinte cálido */
  --dark:         #0D0D0B;

  /* Fondos alternativos — para secciones con contraste sutil */
  --dark2:        #141412;   /* Fondo de secciones "wide" (IA, Contacto) */
  --dark3:        #1C1C19;   /* Fondo de cards y elementos elevados */
  --dark4:        #242420;   /* Fondo de inputs y elementos más profundos */

  /* Texto */
  --text:         #E8E6DF;   /* Texto principal — blanco cálido, NO blanco puro */
  --text-dim:     #8A8880;   /* Texto secundario / descripciones */
  --text-dimmer:  #555450;   /* Texto terciario / metadatos / labels */

  /* Color de acento — ámbar/dorado — ÚNICO color de marca */
  --amber:        #EF9F27;   /* Acento principal */
  --amber-dim:    #BA7517;   /* Acento oscurecido — para subtítulos de acento */
  --amber-glow:   rgba(239,159,39,0.12);  /* Fondo de cards con acento */
  --amber-border: rgba(239,159,39,0.3);   /* Bordes con acento */

  /* Bordes generales */
  --border:       rgba(255,255,255,0.07); /* Borde sutil — casi invisible */
  --border-amber: rgba(239,159,39,0.2);   /* Borde con tinte ámbar */

  /* Color de estado — verde para indicador "disponible" */
  --green:        #22c55e;

  /* Familias tipográficas */
  --mono:   'DM Mono', monospace;
  --sans:   'DM Sans', sans-serif;
  --serif:  'DM Serif Display', serif;
}
```

### 4.3 Reglas Tipográficas

| Elemento | Fuente | Tamaño | Uso |
|---|---|---|---|
| Nombre hero | `--serif` | `clamp(2.8rem, 7vw, 5rem)` | Solo el nombre Mario Peláez en hero |
| Títulos de sección | `--serif` | `2rem` | H2 de cada sección |
| Tags de sección | `--mono` | `11px` | "01 / sobre mí", uppercase |
| Título profesional | `--mono` | `14px` | Subtítulo en hero, uppercase |
| Cuerpo de texto | `--sans` | `15-16px` | Párrafos de contenido |
| Labels de nav | `--mono` | `12px` | Links de navegación |
| Tags/chips | `--mono` | `11px` | Tags de tecnologías |
| Metadatos | `--mono` | `11px` | Fechas, instituciones |
| Estadísticas | `--serif` | `2rem` | Números grandes en hero stats |

### 4.4 Patrones de Componentes

#### Card estándar (dark3)
```css
background: var(--dark3);
border: 1px solid var(--border);
border-radius: 8px;
padding: 1.25rem;
transition: border-color 0.2s;
/* hover */ border-color: var(--amber-border);
```

#### Card con acento ámbar (filosofía, notas)
```css
background: var(--dark3);
border: 1px solid var(--border-amber);
border-radius: 8px;
padding: 1.5rem;
border-left: 3px solid var(--amber); /* El borde izquierdo es el diferenciador */
```

#### Badge / chip de tecnología
```css
font-family: var(--mono);
font-size: 11px;
color: var(--amber);
background: var(--amber-glow);
border: 1px solid var(--amber-border);
padding: 4px 8px;
border-radius: 3px;
letter-spacing: 0.04em;
```

#### Tag pequeño (timeline)
```css
font-family: var(--mono);
font-size: 11px;
color: var(--text-dimmer);
background: var(--dark4);
border: 1px solid var(--border);
padding: 3px 8px;
border-radius: 3px;
```

#### Botón primario (ámbar sólido)
```css
background: var(--amber);
color: var(--dark);
border: none;
padding: 12px 24px;
border-radius: 4px;
font-family: var(--mono);
font-size: 13px;
font-weight: 500;
letter-spacing: 0.03em;
/* hover */ opacity: 0.88; transform: translateY(-1px);
```

#### Botón outline
```css
background: transparent;
color: var(--text-dim);
border: 1px solid var(--border);
padding: 12px 24px;
border-radius: 4px;
font-family: var(--mono);
font-size: 13px;
/* hover */ border-color: var(--amber-border); color: var(--amber);
```

### 4.5 Layout y Espaciado

```
Ancho máximo de contenido: 900px centrado con margin: 0 auto
Padding horizontal de secciones: 2rem (32px)
Padding vertical de secciones: 5rem (80px)
Gap entre grids: 16px (cards) / 2rem (secciones)
Border-radius estándar: 8px para cards, 4px para botones/tags, 6px para stack items
```

**Secciones "wide" (fondo alternativo dark2):**
Las secciones de IA en Acción y Contacto tienen `background: var(--dark2)` y se extienden full-width. El contenido interno se limita a 900px con `.inner { max-width: 900px; margin: 0 auto; }`.

### 4.6 Responsive / Mobile

```css
@media (max-width: 640px) {
  .about-grid     { grid-template-columns: 1fr; }  /* 2 col → 1 col */
  .contact-grid   { grid-template-columns: 1fr; }
  .stack-grid     { grid-template-columns: 1fr; }
  .ia-cards       { grid-template-columns: 1fr; }  /* 3 col → 1 col */
  .nav-links      { display: none; }               /* Nav links ocultos en mobile */
}
```

---

## 5. ESTRUCTURA DEL SITIO — SECCIÓN POR SECCIÓN

### SECCIÓN 0: Navegación (sticky)

**Comportamiento:** `position: sticky; top: 0; z-index: 100`
**Fondo:** `rgba(13,13,11,0.92)` + `backdrop-filter: blur(12px)` — efecto glassmorphism oscuro
**Alto:** 56px fijo

**Elementos:**
- **Logo izquierda:** `mp@portfolio ~` — fuente mono, "mp" en ámbar, "@portfolio" en text-dim, "~" en verde (efecto terminal)
- **Links centro:** inicio · sobre mí · IA · stack · experiencia · certificados — fuente mono 12px, hover con underline ámbar
- **CTA derecha:** botón primario "contacto →" — fondo ámbar, texto oscuro

**Anchors de navegación:**
```
inicio       → #hero
sobre mí     → #sobre
IA           → #ia
stack        → #stack
experiencia  → #experiencia
certificados → #certificados
contacto     → #contacto (en el botón CTA)
```

---

### SECCIÓN 1: Hero (`#hero`)

**Layout:** `max-width: 900px; margin: 0 auto; padding: 4rem 2rem`
**Contenido en orden vertical:**

1. **Terminal tag** — indicador de disponibilidad
   ```html
   <div class="terminal-tag">disponible para proyectos · Medellín, Colombia</div>
   ```
   - Punto verde animado (parpadeante, 2s loop, `@keyframes blink`)
   - Fuente mono, 12px, color verde `#22c55e`

2. **Nombre** — tipografía serif grande
   ```html
   <h1 class="hero-name">Mario<br><em>Peláez</em></h1>
   ```
   - "Mario" en texto normal, "Peláez" en `<em>` con `color: var(--amber); font-style: italic`
   - `font-size: clamp(2.8rem, 7vw, 5rem)` — fluido y responsive

3. **Título profesional**
   ```
   AI Systems Engineer · Automatización Inteligente · Fundador MeJorÍA
   ```
   - Fuente mono, 14px, color `--amber-dim`, uppercase, `letter-spacing: 0.08em`

4. **Descripción**
   ```
   Ingeniero de Sistemas con enfoque en la aplicación práctica de Inteligencia
   Artificial para digitalizar procesos, automatizar flujos y crear soluciones de
   software reales — sin escribir una sola línea de código tradicional.
   ```
   - Fuente sans, 16px, color `--text-dim`, max-width 600px

5. **Botones de acción**
   - Primario: "Hablemos ↗" → `href="#contacto"`
   - Outline: "Ver experiencia →" → `href="#experiencia"`

6. **Estadísticas** (separadas con border-top ámbar)
   ```
   3+    años de experiencia
   10+   certificaciones
   100%  AI-powered workflow
   ∞     posibilidades con IA
   ```
   - Números en `--serif` 2rem color ámbar
   - Labels en mono 11px uppercase `--text-dimmer`

---

### SECCIÓN 2: Sobre Mí (`#sobre`)

**Layout:** Grid 2 columnas (1fr 1fr) en desktop, 1fr en mobile

**Columna izquierda:**
- 2 párrafos de texto sobre el perfil y filosofía de trabajo
- Lista de educación con puntos ámbar:
  - Ingeniería de Sistemas · Universidad de La Guajira · 2025
  - Diplomado Inteligencia de Negocios y Minería de Datos · Uniguajira · 2025 · 150 horas
  - IA para la Eficiencia Competitiva · SENA · 2025 · 40 horas

**Columna derecha:**
- **Philosophy card** (borde izquierdo ámbar 3px):
  ```
  "No toco código — lo pienso. La IA es mi equipo de desarrollo,
  y yo soy el arquitecto de las soluciones."
  — Mario Peláez · filosofía de trabajo
  ```
  - Cita en serif itálica, atribución en mono 11px `--text-dimmer`

- **MeJorÍA card** (card estándar dark3):
  - Label "MeJorÍA Agency" en mono uppercase
  - Descripción de la agencia

---

### SECCIÓN 3: IA en Acción (`#ia`)

**Layout:** Sección wide (fondo dark2, full-width)

**Intro text:** Párrafo sobre la democratización de la IA

**Grid de 6 cards** (3 columnas desktop, 1 columna mobile):

| Icono | Título | Descripción |
|---|---|---|
| `>_` | Automatización de procesos | Flujos n8n, webhooks y APIs |
| `</>` | Desarrollo sin código manual | Apps con Claude Code + Claude AI |
| `◈` | Análisis e inteligencia de datos | Power BI y Looker Studio |
| `⬡` | Digitalización empresarial | De Excel a Firebase |
| `◎` | Formación en IA para PYMEs | Programas de entrenamiento |
| `⟡` | Arquitectura de soluciones | Sistemas multi-agente |

- Iconos: caracteres Unicode en fuente mono, color ámbar, 18px
- Cards: fondo dark3, borde sutil, hover con borde ámbar

**Nota Claude (card especial):**
```
◆ Claude
Este portafolio fue construido íntegramente con Claude Code + Claude AI.
No hay una sola línea de código escrita manualmente — todo fue orquestado
con IA. Eso es exactamente lo que ofrezco a mis clientes.
```
- Fondo: `var(--amber-glow)` con borde `var(--amber-border)`
- Esta nota es un diferenciador estratégico — NO eliminar

---

### SECCIÓN 4: Stack (`#stack`)

**Layout:** Grid 2 columnas, 8 items

| Badge | Herramienta | Descripción |
|---|---|---|
| AI | Claude Code + Claude AI | Ecosistema principal de desarrollo |
| n8n | n8n | Automatización y flujos de trabajo |
| FB | Firebase | Base de datos y backend |
| BI | Power BI · Looker Studio | Análisis y visualización de datos |
| SQL | SQL | Gestión y consulta de bases de datos |
| PA | Power Apps | Apps empresariales low-code |
| GH | GitHub | Control de versiones y colaboración |
| API | Webhooks · APIs REST | Integraciones y conectividad |

**Estructura de cada stack-item:**
```html
<div class="stack-item">
  <div class="stack-icon">BADGE</div>
  <div>
    <div class="stack-name">Nombre</div>
    <div class="stack-desc">Descripción</div>
  </div>
</div>
```

---

### SECCIÓN 5: Experiencia (`#experiencia`)

**Layout:** Timeline vertical con línea izquierda y puntos ámbar

**3 entradas en orden cronológico inverso:**

#### Entrada 1 — Centro Coworking
```
AGO 2025 · INDEPENDIENTE
Desarrollador de Software & Automatización
Centro Coworking – Riohacha, La Guajira

Sistema digital completo de gestión de clientes, servicios y caja —
reemplazando flujos manuales en Excel. Dashboards financieros y
operativos en Looker Studio. Construido íntegramente con Claude Code + Firebase.

Tags: Claude Code · Firebase · Looker Studio · React
```

#### Entrada 2 — Cerrejón
```
FEB 2024 – AGO 2024 · PRÁCTICAS
Practicante – Coordinación de Contratos
Cerrejón (Glencore) – Albania, La Guajira

Digitalización y gestión estructurada de información contractual bajo
estándares estrictos. Desarrollo de aplicación en Power Apps para
automatizar solicitudes internas.

Tags: Power Apps · Digitalización · Contratos
```

#### Entrada 3 — ALVITEK
```
FEB 2022 – NOV 2024
Analista Junior de Datos
ALVITEK S.A.S – Fonseca, La Guajira

Extracción, transformación y análisis de datos para decisiones
estratégicas. Reportes interactivos en Power BI que redujeron
tiempos de análisis. Evaluación de costos y rentabilidad de proyectos.

Tags: Power BI · SQL · Análisis de datos · ETL
```

**Anatomía del timeline-item:**
```
[punto ámbar] [meta: fecha · tipo]
              [role: cargo]
              [company: empresa]
              [desc: descripción]
              [tags: chip · chip · chip]
```

---

### SECCIÓN 6: Certificados (`#certificados`)

**Componente:** Slider horizontal infinito con CSS animation

**Comportamiento:**
- Auto-scroll continuo de izquierda a derecha
- Velocidad: `animation: scrollLeft 28s linear infinite`
- Se pausa con hover: `animation-play-state: paused`
- Se duplican los certificados para crear loop infinito (técnica: 2 copias del array)
- Fades laterales para entrada/salida suave

**Animación CSS:**
```css
@keyframes scrollLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }  /* -50% porque el track tiene 2x el contenido */
}
```

**Lista completa de certificados (12 total):**

```javascript
const certs = [
  { name: 'Implementación de IA para Eficiencia Competitiva Empresarial', issuer: 'SENA', year: '2025' },
  { name: 'Inteligencia de Negocios y Minería de Datos', issuer: 'Uniguajira · Diplomado 150h', year: '2025' },
  { name: 'Servicio al Cliente: Un Reto Personal', issuer: 'SENA', year: '2025' },
  { name: 'Formación en Criptomonedas y Blockchain', issuer: 'Bit2Me Academy', year: '2023' },
  { name: 'Video Assist', issuer: 'Congo Films School', year: '2023' },
  { name: 'Sandbox Audiovisual Colombia', issuer: 'BID · Netflix · Min. Culturas', year: '2024' },
  { name: 'Certificación Subsistema Horizontal de Cableado Estructurado', issuer: 'SENA', year: '2021' },
  { name: 'Diseño de Cableado de Redes de Datos para Telecomunicaciones', issuer: 'SENA', year: '2021' },
  { name: 'Diseño de Redes Inalámbricas', issuer: 'SENA', year: '2021' },
  { name: 'Fundamentos de Redes de Datos', issuer: 'SENA', year: '2021' },
  { name: 'Proponer Alternativas de Solución de Conflictos y Liderazgo', issuer: 'SENA', year: '2016' },
  { name: 'Ciencias Básicas en Matemáticas y Física', issuer: 'SENA', year: '2017' },
];
```

**Generación dinámica (JavaScript):**
```javascript
const track = document.getElementById('sliderTrack');
[...certs, ...certs].forEach(c => {  // Se duplican para el loop infinito
  const card = document.createElement('div');
  card.className = 'cert-card';
  card.innerHTML = `
    <div class="cert-issuer">${c.issuer}</div>
    <div class="cert-name">${c.name}</div>
    <div class="cert-year">${c.year}</div>
  `;
  track.appendChild(card);
});
```

---

### SECCIÓN 7: Contacto (`#contacto`)

**Layout:** Sección wide (dark2) + Grid 2 columnas

**Columna izquierda — Links sociales:**
```
[WA] WhatsApp          → https://wa.me/573006707219
     +57 300 670 7219

[LI] LinkedIn          → https://linkedin.com/in/mario-yesid-pelaez-sanchez-111b16242
     mario-yesid-pelaez-sanchez

[ML] Email             → mailto:myesidpelaez@gmail.com
     myesidpelaez@gmail.com
```
- Cada link es un `<a>` con hover que traslada 4px a la derecha (`transform: translateX(4px)`)
- El badge (WA/LI/ML) es el `.social-icon` con fondo amber-glow y borde amber-border

**Columna derecha — Formulario de contacto:**
```
// enviar mensaje    ← header en mono uppercase con //

nombre    [input text]
email     [input email]
mensaje   [textarea 4 rows]

[enviar mensaje →]  ← botón primario full-width
```
- Inputs con fondo dark4, borde sutil, focus con borde ámbar
- El formulario es visual/estático — no tiene backend aún (pendiente integración n8n)

---

### ELEMENTO FLOTANTE: WhatsApp Button

**Posición:** `position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999`
**Forma:** círculo 52px, fondo `#25d366` (verde WhatsApp oficial)
**Icono:** SVG del logo de WhatsApp en blanco
**Hover:** `transform: scale(1.1)`
**Acción:** `window.open('https://wa.me/573006707219', '_blank')`

Este botón es SIEMPRE visible en todas las secciones y dispositivos.

---

### FOOTER

```
Diseñado y construido con [Claude Code + Claude AI] · Mario Peláez © 2025 · Medellín, Colombia
```
- Texto en mono 11px, `--text-dimmer`
- "Claude Code + Claude AI" en color `--amber`
- `border-top: 1px solid var(--border)`

---

## 6. INSTRUCCIONES PARA AGENTES DE IA

### 6.1 Reglas de modificación

Cuando un agente modifique este proyecto:

1. **NUNCA romper el sistema de variables CSS** — todos los colores van con variables `var(--nombre)`, nunca hex hardcodeados en reglas CSS nuevas
2. **NUNCA cambiar las fuentes** — DM Serif Display, DM Mono, DM Sans son parte de la identidad visual
3. **NUNCA agregar frameworks** — el proyecto es vanilla HTML/CSS/JS por diseño
4. **SIEMPRE mantener el único archivo** — todo va en `index.html`. Si el proyecto crece significativamente, consultar antes de separar archivos
5. **NUNCA eliminar la "Nota Claude"** en la sección IA — es un elemento estratégico de posicionamiento
6. **SIEMPRE actualizar la lista de certificados** cuando Mario agregue nuevos
7. **El formulario de contacto** está pendiente de backend — cuando se integre, usar n8n como webhook receptor

### 6.2 Extensiones planeadas

Estas son las funcionalidades que se agregarán en futuras sesiones:

| Feature | Prioridad | Descripción |
|---|---|---|
| Formulario funcional | Alta | Integrar formulario con n8n webhook → notificación WhatsApp/email |
| Sección Proyectos | Alta | Cards de proyectos con imágenes, descripción y links (Centro Coworking, MeJorÍA, etc.) |
| Modo claro | Media | Toggle dark/light mode respetando el sistema de variables |
| Foto de perfil | Media | Agregar foto o avatar en hero y sección sobre mí |
| Animaciones de entrada | Media | Scroll-triggered fade-in para cada sección |
| Blog/Artículos | Baja | Sección de reflexiones sobre IA y automatización |
| Multiidioma | Baja | Versión en inglés para reclutadores internacionales |
| Analytics | Baja | Google Analytics o Plausible para tracking de visitas |

### 6.3 Cómo agregar un nuevo certificado

1. Abrir `index.html`
2. Localizar el array `const certs = [...]` en el `<script>` al final del body
3. Agregar un nuevo objeto al inicio del array (más reciente primero):
```javascript
{ name: 'Nombre del certificado o curso', issuer: 'Institución que lo emite', year: '2025' },
```
4. Guardar y hacer commit. El slider lo muestra automáticamente.

### 6.4 Cómo agregar una nueva entrada de experiencia

1. Abrir `index.html`
2. Localizar la sección `<div id="experiencia">`
3. Agregar un nuevo `<div class="timeline-item">` al inicio del timeline (más reciente primero)
4. Seguir la estructura exacta de los items existentes:
```html
<div class="timeline-item">
  <div class="timeline-dot"></div>
  <div class="timeline-meta">MES AÑO · TIPO DE CONTRATO</div>
  <div class="timeline-role">Cargo / Rol</div>
  <div class="timeline-company">Empresa – Ciudad, Departamento</div>
  <div class="timeline-desc">Descripción de responsabilidades y logros.</div>
  <div class="timeline-tags">
    <span class="tag">Tecnología 1</span>
    <span class="tag">Tecnología 2</span>
  </div>
</div>
```

### 6.5 Cómo cambiar información de contacto

Hay múltiples lugares donde aparece la información de contacto. Un agente debe actualizarlos TODOS de forma consistente:

- WhatsApp URL: buscar `wa.me/573006707219` — aparece 2 veces (social-btn + wa-float)
- WhatsApp display: buscar `+57 300 670 7219`
- LinkedIn URL: buscar `linkedin.com/in/mario-yesid-pelaez-sanchez`
- Email: buscar `myesidpelaez@gmail.com` — aparece 2 veces (social-btn + mailto)

---

## 7. DEPLOY Y PUBLICACIÓN

### GitHub Pages (configuración actual)

El sitio se despliega automáticamente desde la rama `main`:
- URL del repo: `https://github.com/myesidpelaez/mario-pelaez-portfolio`
- URL pública: `https://myesidpelaez.github.io/mario-pelaez-portfolio/`

**Para activar GitHub Pages:**
1. Settings → Pages
2. Source: Deploy from branch
3. Branch: main / (root)
4. Save

Cada commit a `main` actualiza el sitio en ~2 minutos.

### Dominio personalizado (futuro)

Cuando Mario adquiera un dominio (sugerencia: `mariopelaez.dev` o `mariopelaez.co`):
1. Agregar archivo `CNAME` en raíz con el dominio
2. Configurar DNS del proveedor con registros A de GitHub Pages
3. Activar HTTPS forzado en Settings → Pages

---

## 8. CONTEXTO DEL ECOSISTEMA DE MARIO

Para que los agentes entiendan el mundo completo de Mario (otros proyectos relacionados):

**Antigravity:** Entorno de desarrollo de Mario — donde se ejecutan los agentes de IA (Claude Code como arquitecto, Antigravity como ejecutor CLI). Este portafolio fue diseñado para ser compatible con ese workflow.

**Centro de Comando:** Proyecto principal en Claude.ai de Mario. Configurado con CLAUDE.md y CONTEXTO.md para instrucciones persistentes.

**Centro Coworking Riohacha:** Principal proyecto cliente activo. Next.js 15 + Firebase + TypeScript + Tailwind. El portafolio hace referencia a este proyecto en la sección de experiencia.

**MeJorÍA Agency:** Empresa fundada por Mario. El portafolio sirve también como vitrina de los servicios de la agencia para PYMEs.

---

## 9. REFERENCIAS VISUALES Y TONO

### Tono del copy (texto)

- **Directo y seguro** — Mario sabe lo que hace
- **Transparente** — admite que no escribe código manualmente (su diferenciador)
- **Técnico pero accesible** — términos técnicos pero explicados
- **Primera persona** — "construí", "transformo", "diseño"
- **Sin exceso de adjetivos** — los hechos hablan solos

### Lo que NO va en este portafolio

- Frases genéricas como "apasionado por la tecnología" o "trabajo en equipo"
- Listas de habilidades con barras de progreso (anticuado y poco confiable)
- Colores brillantes, gradientes de colores múltiples, o fondos blancos
- Animaciones excesivas que distraigan del contenido
- Stock photos o ilustraciones de banco de imágenes

### Inspiraciones visuales de referencia

- **Claude Code terminal** — el ambiente donde Mario trabaja todo el día
- **Vercel.com** — dark, elegante, tipografía fuerte
- **Linear.app** — minimalismo oscuro con acentos precisos
- **GitHub dark mode** — familiar para el ecosistema tech

---

*Blueprint generado por Claude AI · Sesión de trabajo con Mario Peláez · 2025*
*Versión 1.0 — portafolio inicial*
