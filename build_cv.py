"""
Generador de CV — Mario Yesid Peláez Sánchez
Narrativa: MejorIA Product Lab · Software a medida · IA Aplicada
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Fuentes ──────────────────────────────────────────────────────────────────
FONT_DIR = r'C:\Windows\Fonts'
pdfmetrics.registerFont(TTFont('Cal',  os.path.join(FONT_DIR, 'calibri.ttf')))
pdfmetrics.registerFont(TTFont('CalB', os.path.join(FONT_DIR, 'calibrib.ttf')))
pdfmetrics.registerFont(TTFont('CalI', os.path.join(FONT_DIR, 'calibrii.ttf')))
pdfmetrics.registerFont(TTFont('Seg',  os.path.join(FONT_DIR, 'segoeui.ttf')))
pdfmetrics.registerFont(TTFont('SegB', os.path.join(FONT_DIR, 'segoeuib.ttf')))

# ── Colores ───────────────────────────────────────────────────────────────────
C_DARK    = colors.HexColor('#0B0F1C')   # Header background
C_ACCENT  = colors.HexColor('#4F46E5')   # Accent (indigo, coherente con portfolio)
C_DARK2   = colors.HexColor('#1E2235')   # Subtítulo header
C_MID     = colors.HexColor('#374151')   # Texto secundario
C_GRAY    = colors.HexColor('#6B7280')   # Etiquetas / fechas
C_LGRAY   = colors.HexColor('#E5E7EB')   # Línea divisoria
C_CHIP    = colors.HexColor('#EEF2FF')   # Fondo chips stack
C_CHIP_T  = colors.HexColor('#3730A3')   # Texto chips stack
C_PROJ    = colors.HexColor('#F0FDF4')   # Fondo bloque proyecto
C_PROJ_B  = colors.HexColor('#16A34A')   # Borde proyecto activo
C_WARN    = colors.HexColor('#FFF7ED')   # Fondo proyecto en desarrollo
C_WARN_B  = colors.HexColor('#EA580C')   # Borde proyecto en desarrollo
WHITE     = colors.white
BLACK     = colors.HexColor('#111827')

# ── Página ────────────────────────────────────────────────────────────────────
W, H = A4
ML = 18*mm; MR = 18*mm; MT = 0; MB = 16*mm
CONTENT_W = W - ML - MR

OUTPUT = r'C:\Users\Myesi\Proyectos\Portafolio\assets\cv-mario-pelaez.pdf'

# ── Estilos ───────────────────────────────────────────────────────────────────
def s(name, **kw):
    return ParagraphStyle(name, **kw)

STYLES = {
    'name':        s('name',        fontName='CalB', fontSize=26, textColor=WHITE,    leading=30, spaceAfter=1*mm),
    'title_h':     s('title_h',     fontName='Seg',  fontSize=10.5, textColor=colors.HexColor('#C7D2FE'), leading=14, spaceAfter=0),
    'contact_h':   s('contact_h',   fontName='Cal',  fontSize=9,  textColor=colors.HexColor('#A5B4FC'),  leading=12),
    'section':     s('section',     fontName='CalB', fontSize=10, textColor=C_ACCENT, leading=13, spaceBefore=5*mm, spaceAfter=2*mm),
    'body':        s('body',        fontName='Cal',  fontSize=9.5, textColor=BLACK,   leading=13.5, spaceAfter=1.5*mm, alignment=TA_JUSTIFY),
    'body_s':      s('body_s',      fontName='Cal',  fontSize=9,  textColor=C_MID,   leading=12.5),
    'proj_name':   s('proj_name',   fontName='CalB', fontSize=10.5, textColor=BLACK,  leading=13),
    'proj_sub':    s('proj_sub',    fontName='CalI', fontSize=9,  textColor=C_GRAY,  leading=12, spaceAfter=1*mm),
    'proj_body':   s('proj_body',   fontName='Cal',  fontSize=9.5, textColor=BLACK,   leading=13, spaceAfter=1*mm, alignment=TA_JUSTIFY),
    'exp_role':    s('exp_role',    fontName='CalB', fontSize=10, textColor=BLACK,    leading=13),
    'exp_company': s('exp_company', fontName='Cal',  fontSize=9,  textColor=C_GRAY,  leading=12, spaceAfter=1*mm),
    'bullet':      s('bullet',      fontName='Cal',  fontSize=9.5, textColor=BLACK,   leading=13, leftIndent=10, firstLineIndent=-8),
    'edu':         s('edu',         fontName='Cal',  fontSize=9.5, textColor=BLACK,   leading=13),
    'edu_bold':    s('edu_bold',    fontName='CalB', fontSize=9.5, textColor=BLACK,   leading=13),
    'chip':        s('chip',        fontName='Cal',  fontSize=8.5, textColor=C_CHIP_T, leading=11),
    'tier_label':  s('tier_label',  fontName='CalB', fontSize=8,  textColor=C_ACCENT, leading=11, spaceAfter=1*mm),
    'avail':       s('avail',       fontName='CalB', fontSize=9.5, textColor=C_ACCENT, leading=12),
    'footer':      s('footer',      fontName='CalI', fontSize=8,  textColor=C_GRAY,  leading=10, alignment=TA_CENTER),
    'url':         s('url',         fontName='Cal',  fontSize=8.5, textColor=C_ACCENT, leading=11),
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def divider(color=C_LGRAY, thickness=0.5):
    return HRFlowable(width='100%', thickness=thickness, color=color,
                      spaceAfter=2*mm, spaceBefore=0)

def section_header(text):
    return [
        Paragraph(text.upper(), STYLES['section']),
        HRFlowable(width='100%', thickness=1, color=C_ACCENT, spaceAfter=2.5*mm, spaceBefore=0),
    ]

def bullet(text):
    return Paragraph(f'<bullet>•</bullet> {text}', STYLES['bullet'])

def chip_row(items):
    """Renderiza una fila de chips usando una tabla de una sola fila."""
    cells = [Paragraph(item, STYLES['chip']) for item in items]
    col_widths = [len(item)*5*mm for item in items]
    # Normalizar para que no excedan el ancho
    total = sum(col_widths)
    if total > CONTENT_W:
        factor = CONTENT_W / total
        col_widths = [w * factor for w in col_widths]
    t = Table([cells], colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_CHIP),
        ('ROUNDEDCORNERS', [4]),
        ('LEFTPADDING',  (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING',   (0,0), (-1,-1), 3),
        ('BOTTOMPADDING',(0,0), (-1,-1), 3),
        ('TEXTCOLOR',    (0,0), (-1,-1), C_CHIP_T),
    ]))
    return t

def project_block(title, subtitle, body, url=None, status='prod'):
    """Crea un bloque de proyecto con borde lateral de color."""
    accent_color = C_PROJ_B if status == 'prod' else C_WARN_B
    bg_color     = C_PROJ   if status == 'prod' else C_WARN

    inner = []
    inner.append(Paragraph(title, STYLES['proj_name']))
    inner.append(Paragraph(subtitle, STYLES['proj_sub']))
    inner.append(Paragraph(body, STYLES['proj_body']))
    if url:
        inner.append(Paragraph(f'<link href="{url}" color="#4F46E5">{url}</link>', STYLES['url']))

    inner_table = Table([[inner]], colWidths=[CONTENT_W - 8*mm])
    inner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('LEFTPADDING',  (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING',   (0,0), (-1,-1), 6),
        ('BOTTOMPADDING',(0,0), (-1,-1), 6),
    ]))
    outer = Table(
        [[Table([[''], [inner_table]], colWidths=[3], rowHeights=[None, None])]],
        colWidths=[CONTENT_W]
    )
    # Simpler approach: just use background table with left border color block
    accent_bar = Table([['']], colWidths=[3*mm], rowHeights=[None])
    accent_bar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), accent_color),
        ('LEFTPADDING',  (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING',   (0,0), (-1,-1), 0),
        ('BOTTOMPADDING',(0,0), (-1,-1), 0),
    ]))
    content_block = Table([['']], colWidths=[CONTENT_W - 3*mm])
    content_block.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('LEFTPADDING',  (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING',   (0,0), (-1,-1), 7),
        ('BOTTOMPADDING',(0,0), (-1,-1), 7),
    ]))

    # Build as [accent_bar | content]
    content_rows = []
    content_rows.append(Paragraph(title, STYLES['proj_name']))
    content_rows.append(Paragraph(subtitle, STYLES['proj_sub']))
    content_rows.append(Paragraph(body, STYLES['proj_body']))
    if url:
        content_rows.append(Paragraph(f'<link href="{url}" color="#4F46E5">→ {url}</link>', STYLES['url']))

    content_cell = content_rows

    final = Table(
        [[Paragraph('', STYLES['body_s']), content_cell]],
        colWidths=[3*mm, CONTENT_W - 3*mm]
    )
    final.setStyle(TableStyle([
        ('BACKGROUND',   (0,0), (0,-1), accent_color),
        ('BACKGROUND',   (1,0), (1,-1), bg_color),
        ('VALIGN',       (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING',  (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING',   (0,0), (-1,-1), 7),
        ('BOTTOMPADDING',(0,0), (-1,-1), 7),
        ('LEFTPADDING',  (1,0), (1,-1), 9),
    ]))
    return [final, Spacer(1, 3*mm)]

# ── HEADER ────────────────────────────────────────────────────────────────────

def build_header():
    """Header oscuro con nombre, título y contacto."""

    name_para    = Paragraph('Mario Yesid Peláez Sánchez', STYLES['name'])
    title_para   = Paragraph(
        'Desarrollador de Software  ·  Sistemas con IA  ·  Automatización',
        STYLES['title_h']
    )
    contact_para = Paragraph(
        'Medellín, Antioquia  ·  300 670 7219  ·  myesidpelaez@gmail.com  ·  '
        'linkedin.com/in/mario-yesid-pelaez  ·  github.com/myesidpelaez',
        STYLES['contact_h']
    )

    header_content = [[name_para], [title_para], [Spacer(1, 2*mm)], [contact_para]]
    t = Table(header_content, colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND',   (0,0), (-1,-1), C_DARK),
        ('LEFTPADDING',  (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('TOPPADDING',   (0,0), (0,0),   10),
        ('TOPPADDING',   (0,1), (-1,-1), 0),
        ('BOTTOMPADDING',(0,-1),(-1,-1), 10),
        ('BOTTOMPADDING',(0,0), (-1,-2), 2),
    ]))
    return [t, Spacer(1, 4*mm)]

# ── PERFIL ────────────────────────────────────────────────────────────────────

def build_perfil():
    items = section_header('Perfil Profesional')
    items.append(Paragraph(
        'Ingeniero de Sistemas (2025) con 3 años construyendo software que las personas realmente usan. '
        'Fundador de <b>MejorIA Product Lab</b>: un laboratorio de producto que convierte operaciones caóticas de pymes '
        'en sistemas medibles y listos para crecer. '
        'Diseño aplicaciones web a medida con React + Firebase, automatizo flujos operativos con n8n y APIs, '
        'e integro agentes supervisados de IA como capacidad real sobre sistemas en producción. '
        'Me apoyo en modelos de lenguaje para aprender más rápido y resolver con más criterio — '
        'en un campo donde estar al día es un compromiso diario, no un destino.',
        STYLES['body']
    ))
    return items

# ── STACK ─────────────────────────────────────────────────────────────────────

def build_stack():
    items = section_header('Stack Técnico')

    tiers = [
        ('Domino',              ['React', 'TypeScript', 'Firebase', 'Firestore', 'SQL', 'Git', 'REST APIs', 'Tailwind']),
        ('Uso activo',          ['Python', 'n8n', 'Webhooks', 'Cloud Functions', 'Firebase Auth', 'Linux básico']),
        ('Enfoque actual — Agentes IA', ['Hermes Agent', 'LangChain', 'MCP', 'Claude Code', 'Agentes supervisados']),
    ]

    for label, chips in tiers:
        items.append(Paragraph(label, STYLES['tier_label']))
        # Chips como texto plano separado por · (más ATS-friendly)
        items.append(Paragraph(
            '  '.join([f'<font color="#4F46E5">▪</font> {c}' for c in chips]),
            ParagraphStyle('chips_inline', fontName='Cal', fontSize=9, textColor=BLACK,
                           leading=14, spaceAfter=3*mm, leftIndent=4)
        ))

    return items

# ── PROYECTOS ─────────────────────────────────────────────────────────────────

def build_proyectos():
    items = section_header('Proyectos Reales')

    # Moto Wash
    items += project_block(
        'Moto Wash Manager',
        'En producción · Medellín · React + Firebase',
        'Sistema operativo completo para un lavadero de motos: órdenes de servicio, registro de lavadores, '
        'pagos y configuración del negocio en una sola interfaz. '
        'Adoptado por el equipo completo en menos de 3 meses. Usuarios activos en producción.',
        url='demomotorwash.web.app',
        status='prod'
    )

    # Nodum
    items += project_block(
        'Nodum — Gestión Institucional',
        'Sector público · Hatonuevo, La Guajira · React + Firebase',
        'Plataforma web para el municipio de Hatonuevo: coordina actividades institucionales, '
        'asigna responsables, registra avances y genera bitácora de seguimiento. '
        'Primer sistema digital de este tipo implementado en la entidad.',
        url='nodum-62b50.web.app',
        status='prod'
    )

    # Centro Coworking
    items += project_block(
        'Centro Coworking',
        'En desarrollo · Medellín · React + Firebase',
        'Sistema de gestión para espacios de coworking: reservas de salas, control de membresías, '
        'facturación y seguimiento de ocupación. '
        'Diseñado para operar desde el día uno con datos reales del negocio.',
        status='dev'
    )

    return items

# ── EXPERIENCIA ───────────────────────────────────────────────────────────────

def build_experiencia():
    items = section_header('Experiencia Laboral')

    # MejorIA
    items.append(KeepTogether([
        Paragraph('Desarrollador Independiente — MejorIA Product Lab', STYLES['exp_role']),
        Paragraph('Medellín, Colombia  ·  2024 – Presente', STYLES['exp_company']),
        bullet('Diagnóstico, diseño y desarrollo de software a medida para pymes de distintos sectores.'),
        bullet('Automatizaciones con n8n, Firebase, APIs externas y notificaciones WhatsApp.'),
        bullet('Consultoría en adopción de IA: talleres prácticos para equipos sin experiencia técnica.'),
        bullet('Experimentación activa con agentes supervisados (Hermes Agent, LangChain, MCP).'),
        Spacer(1, 3*mm),
    ]))

    # Analista Sistemas / Coworking
    items.append(KeepTogether([
        Paragraph('Desarrollador Junior  —  Centro Coworking', STYLES['exp_role']),
        Paragraph('Riohacha, La Guajira  ·  Ago 2025', STYLES['exp_company']),
        bullet('Reemplazó flujos manuales en Excel por sistema digital de gestión de clientes y servicios.'),
        bullet('Dashboards en Looker Studio para seguimiento financiero y operativo.'),
        Spacer(1, 3*mm),
    ]))

    # ALVITEK — reencuadrada
    items.append(KeepTogether([
        Paragraph('Analista de Sistemas  —  ALVITEK S.A.S', STYLES['exp_role']),
        Paragraph('Fonseca, La Guajira  ·  Feb 2022 – Nov 2024', STYLES['exp_company']),
        bullet('Análisis de datos operativos y de costos para apoyar decisiones estratégicas.'),
        bullet('Reportes interactivos en Power BI para seguimiento de proyectos y rentabilidad.'),
        bullet('Adquirió criterio de negocio que hoy aplica al diseño de sistemas a medida.'),
        Spacer(1, 3*mm),
    ]))

    # Cerrejón
    items.append(KeepTogether([
        Paragraph('Practicante — Coordinación de Contratos  ·  Cerrejón', STYLES['exp_role']),
        Paragraph('Albania, La Guajira  ·  Feb 2024 – Ago 2024', STYLES['exp_company']),
        bullet('Digitalización y gestión de información contractual bajo estándares estrictos.'),
        bullet('Desarrollo inicial en Power Apps para automatizar solicitudes internas.'),
        Spacer(1, 3*mm),
    ]))

    return items

# ── EDUCACIÓN ─────────────────────────────────────────────────────────────────

def build_educacion():
    items = section_header('Educación y Formación')

    rows = [
        ('Ingeniería de Sistemas', 'Universidad de La Guajira', '2025'),
        ('Diplomado en Inteligencia de Negocios y Minería de Datos', 'Uniguajira', '2025'),
        ('IA para la Eficiencia Competitiva', 'SENA', '2025'),
    ]

    for title, inst, year in rows:
        row_table = Table(
            [[Paragraph(f'<b>{title}</b>  ·  {inst}', STYLES['edu']),
              Paragraph(year, ParagraphStyle('y', fontName='Cal', fontSize=9, textColor=C_GRAY,
                                             leading=12, alignment=TA_RIGHT))]],
            colWidths=[CONTENT_W * 0.80, CONTENT_W * 0.20]
        )
        row_table.setStyle(TableStyle([
            ('VALIGN',       (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING',  (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING',   (0,0), (-1,-1), 0),
            ('BOTTOMPADDING',(0,0), (-1,-1), 3),
        ]))
        items.append(row_table)

    return items

# ── DISPONIBLE PARA ───────────────────────────────────────────────────────────

def build_disponible():
    avail = Table(
        [[Paragraph('Disponible para:', STYLES['tier_label']),
          Paragraph('Empleo  ·  Freelance  ·  Consultoría', STYLES['avail'])]],
        colWidths=[CONTENT_W * 0.25, CONTENT_W * 0.75]
    )
    avail.setStyle(TableStyle([
        ('VALIGN',       (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING',  (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING',   (0,0), (-1,-1), 0),
        ('BOTTOMPADDING',(0,0), (-1,-1), 0),
    ]))
    return [Spacer(1, 3*mm), divider(C_ACCENT, 0.8), Spacer(1, 2*mm), avail]

# ── FOOTER ────────────────────────────────────────────────────────────────────

def add_footer(canvas_obj, doc):
    canvas_obj.saveState()
    p = Paragraph(
        'Mario Yesid Peláez Sánchez  ·  myesidpelaez@gmail.com  ·  '
        'MejorIA Product Lab  ·  2026',
        STYLES['footer']
    )
    w, h = p.wrap(CONTENT_W, 20)
    p.drawOn(canvas_obj, ML, MB - 2*mm)
    canvas_obj.restoreState()

# ── BUILD ─────────────────────────────────────────────────────────────────────

def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=ML, rightMargin=MR,
        topMargin=MT, bottomMargin=MB + 6*mm,
        title='CV Mario Yesid Peláez Sánchez',
        author='Mario Yesid Peláez Sánchez',
        subject='Desarrollador de Software · Sistemas con IA · Automatización',
    )

    story = []

    # Página 1
    story += build_header()
    story += build_perfil()
    story += build_stack()
    story += build_proyectos()

    # Página 2
    story.append(PageBreak())
    story += build_experiencia()
    story += build_educacion()
    story += build_disponible()

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f'CV generado: {OUTPUT}')

if __name__ == '__main__':
    build()
