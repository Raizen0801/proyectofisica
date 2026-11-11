"""Utilidades para construir los documentos Word (manual e informe) con python-docx."""
from __future__ import annotations

import re
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

AZUL = RGBColor(0x1F, 0x4E, 0x79)
GRIS = RGBColor(0x59, 0x59, 0x59)
TMP = Path(__file__).resolve().parent / "_tmp"
TMP.mkdir(exist_ok=True)


def _shade(el, hex_fill):
    pr = el.get_or_add_pPr() if hasattr(el, "get_or_add_pPr") else el
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    pr.append(shd)


def _field(paragraph, instr):
    run = paragraph.add_run()
    for kind, text in (("begin", None), (None, instr), ("separate", None), ("text", "1"), ("end", None)):
        if kind in ("begin", "separate", "end"):
            c = OxmlElement("w:fldChar")
            c.set(qn("w:fldCharType"), kind)
            run._r.append(c)
        elif kind is None:
            t = OxmlElement("w:instrText")
            t.set(qn("xml:space"), "preserve")
            t.text = text
            run._r.append(t)
        else:
            t = OxmlElement("w:t")
            t.text = text
            run._r.append(t)
    return run


class Doc:
    def __init__(self, titulo_corto: str):
        self.d = Document()
        self.fig_n = 0
        self.tab_n = 0
        self.eq_cache: dict[str, Path] = {}
        sec = self.d.sections[0]
        sec.page_width, sec.page_height = Cm(21.0), Cm(29.7)
        sec.left_margin = sec.right_margin = Cm(2.4)
        sec.top_margin, sec.bottom_margin = Cm(2.3), Cm(2.2)
        st = self.d.styles
        st["Normal"].font.name = "Calibri"
        st["Normal"].font.size = Pt(11)
        st["Normal"].element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
        st["Normal"].paragraph_format.space_after = Pt(6)
        st["Normal"].paragraph_format.line_spacing = 1.15
        for name, size, color in (("Heading 1", 18, AZUL), ("Heading 2", 14, AZUL), ("Heading 3", 12, RGBColor(0x2E, 0x75, 0xB6))):
            s = st[name]
            s.font.name = "Calibri"
            s.font.size = Pt(size)
            s.font.bold = True
            s.font.color.rgb = color
            s.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
            s.element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
            s.element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
            s.paragraph_format.space_before = Pt(16 if name == "Heading 1" else 12)
            s.paragraph_format.space_after = Pt(6)
            s.paragraph_format.keep_with_next = True
        # pie con número de página
        foot = sec.footer.paragraphs[0]
        foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = foot.add_run(f"{titulo_corto}  ·  Página ")
        r.font.size = Pt(9)
        r.font.color.rgb = GRIS
        f = _field(foot, "PAGE")
        f.font.size = Pt(9)
        f.font.color.rgb = GRIS
        sec.different_first_page_header_footer = True

    # ---------- texto ----------
    def _runs(self, p, text, size=None, color=None, italic=False):
        for i, part in enumerate(re.split(r"(`[^`]+`|\*\*.+?\*\*|(?<!\*)\*[^*\s][^*]*?\*(?!\*))", text)):
            if not part:
                continue
            if part.startswith("`") and part.endswith("`") and len(part) > 2:
                r = p.add_run(part[1:-1])
                r.font.name = "Consolas"
                r.element.rPr.rFonts.set(qn("w:eastAsia"), "Consolas")
                r.font.size = Pt((size or 11) - 1)
                r.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
                continue
            bold = part.startswith("**") and part.endswith("**") and len(part) > 4
            ital = (not bold) and part.startswith("*") and part.endswith("*") and len(part) > 2
            r = p.add_run(part[2:-2] if bold else part[1:-1] if ital else part)
            r.bold = bold
            r.italic = italic or ital
            if size:
                r.font.size = Pt(size)
            if color:
                r.font.color.rgb = color
        return p

    def h1(self, t, newpage=True):
        h = self.d.add_heading(t, 1)
        h.paragraph_format.page_break_before = newpage
        return h

    def plain_title(self, t, newpage=True):
        """Título grande que no aparece en el índice."""
        para = self.d.add_paragraph()
        para.paragraph_format.page_break_before = newpage
        r = para.add_run(t)
        r.bold = True
        r.font.size = Pt(18)
        r.font.color.rgb = AZUL
        para.paragraph_format.space_after = Pt(10)

    def h2(self, t):
        return self.d.add_heading(t, 2)

    def h3(self, t):
        return self.d.add_heading(t, 3)

    def p(self, text, align=None, size=None, color=None, italic=False, after=None):
        para = self.d.add_paragraph()
        self._runs(para, text, size, color, italic)
        if align == "center":
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        elif align == "justify":
            para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        if after is not None:
            para.paragraph_format.space_after = Pt(after)
        return para

    def bullets(self, items, style="List Bullet"):
        for it in items:
            para = self.d.add_paragraph(style=style)
            self._runs(para, it)
            para.paragraph_format.space_after = Pt(2)

    def numbered(self, items):
        for i, it in enumerate(items, 1):
            para = self.d.add_paragraph()
            para.paragraph_format.left_indent = Cm(0.9)
            para.paragraph_format.first_line_indent = Cm(-0.6)
            para.paragraph_format.space_after = Pt(2)
            para.add_run(f"{i}.  ").bold = True
            self._runs(para, it)

    def note(self, text, fill="EAF2FB"):
        t = self.d.add_table(rows=1, cols=1)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        c = t.rows[0].cells[0]
        c.paragraphs[0].text = ""
        self._runs(c.paragraphs[0], text, size=10)
        tcPr = c._tc.get_or_add_tcPr()
        shd = OxmlElement("w:shd")
        shd.set(qn("w:val"), "clear")
        shd.set(qn("w:color"), "auto")
        shd.set(qn("w:fill"), fill)
        tcPr.append(shd)
        self.d.add_paragraph().paragraph_format.space_after = Pt(2)

    def code(self, text):
        for line in text.strip("\n").splitlines():
            para = self.d.add_paragraph()
            para.paragraph_format.space_after = Pt(0)
            para.paragraph_format.left_indent = Cm(0.4)
            r = para.add_run(line if line else " ")
            r.font.name = "Consolas"
            r.element.rPr.rFonts.set(qn("w:eastAsia"), "Consolas")
            r.font.size = Pt(8.5)
            _shade(para._p, "F2F2F2")
        self.d.add_paragraph().paragraph_format.space_after = Pt(2)

    # ---------- ecuaciones, figuras, tablas ----------
    def eq(self, tex, label=None, size=15):
        key = tex + str(size)
        if key not in self.eq_cache:
            fig = plt.figure(figsize=(0.1, 0.1))
            fig.text(0, 0, f"${tex}$", fontsize=size)
            path = TMP / f"eq_{len(self.eq_cache):03d}.png"
            fig.savefig(path, dpi=300, bbox_inches="tight", pad_inches=0.05, transparent=True)
            plt.close(fig)
            self.eq_cache[key] = path
        para = self.d.add_paragraph()
        para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.paragraph_format.space_after = Pt(6)
        from PIL import Image
        with Image.open(self.eq_cache[key]) as im:
            wpx, hpx = im.size
        w_cm = min(15.0, wpx / 300 * 2.54 * 0.82)  # ≈ texto de 12 pt
        para.add_run().add_picture(str(self.eq_cache[key]), width=Cm(w_cm))
        if label:
            r = para.add_run(f"        ({label})")
            r.font.size = Pt(10)
            r.font.color.rgb = GRIS
        return para

    def fig(self, path, caption, width_cm=15.0):
        path = Path(path)
        para = self.d.add_paragraph()
        para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.paragraph_format.keep_with_next = True
        para.paragraph_format.space_after = Pt(2)
        para.add_run().add_picture(str(path), width=Cm(width_cm))
        self.fig_n += 1
        c = self.d.add_paragraph()
        c.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = c.add_run(f"Figura {self.fig_n}. ")
        r.bold = True
        r.font.size = Pt(9.5)
        r2 = c.add_run(caption)
        r2.font.size = Pt(9.5)
        r2.italic = True
        c.paragraph_format.space_after = Pt(10)

    def table(self, header, rows, caption=None, widths=None, size=9.5):
        if caption:
            self.tab_n += 1
            c = self.d.add_paragraph()
            c.paragraph_format.keep_with_next = True
            c.paragraph_format.space_after = Pt(3)
            r = c.add_run(f"Tabla {self.tab_n}. ")
            r.bold = True
            r.font.size = Pt(9.5)
            r2 = c.add_run(caption)
            r2.italic = True
            r2.font.size = Pt(9.5)
        t = self.d.add_table(rows=1, cols=len(header))
        t.style = "Table Grid"
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        for i, h in enumerate(header):
            cell = t.rows[0].cells[i]
            cell.text = ""
            run = cell.paragraphs[0].add_run(h)
            run.bold = True
            run.font.size = Pt(size)
            run.font.color.rgb = RGBColor(255, 255, 255)
            tcPr = cell._tc.get_or_add_tcPr()
            shd = OxmlElement("w:shd")
            shd.set(qn("w:val"), "clear")
            shd.set(qn("w:fill"), "1F4E79")
            tcPr.append(shd)
        for k, row in enumerate(rows):
            cells = t.add_row().cells
            for i, v in enumerate(row):
                cells[i].text = ""
                self._runs(cells[i].paragraphs[0], str(v), size=size)
                cells[i].paragraphs[0].paragraph_format.space_after = Pt(1)
                if k % 2:
                    tcPr = cells[i]._tc.get_or_add_tcPr()
                    shd = OxmlElement("w:shd")
                    shd.set(qn("w:val"), "clear")
                    shd.set(qn("w:fill"), "F2F6FA")
                    tcPr.append(shd)
        if widths:
            for row in t.rows:
                for i, w in enumerate(widths):
                    row.cells[i].width = Cm(w)
        self.d.add_paragraph().paragraph_format.space_after = Pt(4)

    def toc(self):
        para = self.d.add_paragraph()
        run = para.add_run()
        for kind, text in (("begin", None), (None, 'TOC \\o "1-2" \\h \\z \\u'), ("separate", None), ("text", "Haz clic derecho y elige «Actualizar campo» para generar el índice."), ("end", None)):
            if kind in ("begin", "separate", "end"):
                c = OxmlElement("w:fldChar")
                c.set(qn("w:fldCharType"), kind)
                run._r.append(c)
            elif kind is None:
                t = OxmlElement("w:instrText")
                t.set(qn("xml:space"), "preserve")
                t.text = text
                run._r.append(t)
            else:
                t = OxmlElement("w:t")
                t.text = text
                run._r.append(t)

    def cover(self, titulo, subtitulo, lineas, color=AZUL):
        self.d.add_paragraph()
        logo = Path(__file__).resolve().parent.parent / "simulador-web" / "img" / "logo-upeu-completo.jpg"
        if logo.exists():
            lp = self.d.add_paragraph()
            lp.alignment = WD_ALIGN_PARAGRAPH.CENTER
            lp.add_run().add_picture(str(logo), width=Cm(5.6))
        p = self.d.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run("UNIVERSIDAD PERUANA UNIÓN")
        r.bold = True
        r.font.size = Pt(14)
        r.font.color.rgb = GRIS
        p = self.d.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run("Facultad de Ingeniería y Arquitectura · E.P. Ingeniería de Sistemas")
        r.font.size = Pt(11)
        r.font.color.rgb = GRIS
        for _ in range(3):
            self.d.add_paragraph()
        p = self.d.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(titulo)
        r.bold = True
        r.font.size = Pt(28)
        r.font.color.rgb = color
        p = self.d.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(subtitulo)
        r.font.size = Pt(15)
        r.font.color.rgb = GRIS
        for _ in range(4):
            self.d.add_paragraph()
        t = self.d.add_table(rows=0, cols=2)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        for k, v in lineas:
            cells = t.add_row().cells
            cells[0].text = ""
            cells[1].text = ""
            a = cells[0].paragraphs[0].add_run(k)
            a.bold = True
            a.font.color.rgb = AZUL
            cells[1].paragraphs[0].add_run(v)
            cells[0].width, cells[1].width = Cm(4.2), Cm(9.5)

    def save(self, path):
        self.d.save(path)
