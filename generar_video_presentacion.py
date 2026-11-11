import os
import subprocess
import wave
import json
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, "docs")
CAPT_DIR = os.path.join(DOCS_DIR, "capturas")
FIG_DIR = os.path.join(DOCS_DIR, "figuras")
TEMP_DIR = os.path.join(BASE_DIR, "_temp_video")
OUTPUT_VIDEO = os.path.join(BASE_DIR, "Video_Presentacion_Simulador_EM.mp4")

os.makedirs(TEMP_DIR, exist_ok=True)

# Lista de escenas: (id, titulo, subtitulo, formula, img_path, audio_text)
SCENES = [
    (
        "01_intro",
        "SIMULADOR INTERACTIVO DE CAMPOS EM EN 3D",
        "Producto Final · Física 2 · Ingeniería de Sistemas (UPeU)",
        "Visualización en tiempo real · Motor físico propio · Validación científica",
        os.path.join(CAPT_DIR, "01_cargas_3d.png"),
        "Bienvenidos a la presentación del Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D, desarrollado para el curso de Física 2 en Ingeniería de Sistemas. Una plataforma integral para visualizar, calcular y experimentar con los fenómenos del electromagnetismo en tiempo real."
    ),
    (
        "02_cargas",
        "UNIDAD 1 · VISUALIZADOR DE CARGAS PUNTUALES EN 3D",
        "Distribución de cargas, líneas de fuerza y superficies equipotenciales",
        "Ley de Coulomb: E = k Σ qᵢ/rᵢ²  |  Superficie Equipotencial V = 0",
        os.path.join(CAPT_DIR, "01_cargas_3d.png"),
        "En la Unidad 1, el visualizador 3D permite manipular cargas en el espacio. El motor calcula las líneas de campo eléctrico en tiempo real mediante Runge-Kutta 4, genera las superficies equipotenciales y anima el flujo de partículas según la intensidad del campo."
    ),
    (
        "03_potencial",
        "UNIDAD 1 · CALCULADORA DE POTENCIAL Y TRABAJO",
        "Mapa bidimensional de potencial, perfil de campo y cálculo de trabajo",
        "Trabajo de traslación: W(P → Q) = q₀ · (V_P − V_Q)",
        os.path.join(CAPT_DIR, "03_potencial.png"),
        "La calculadora de potencial evalúa el trabajo necesario para trasladar una carga de prueba entre dos puntos del plano. Además, genera perfiles gráficos continuos que muestran la variación del voltaje y la magnitud del campo eléctrico a lo largo del trayecto."
    ),
    (
        "04_trayectoria",
        "UNIDAD 1 · TRAYECTORIA DE PARTÍCULAS CARGADAS",
        "Integración numérica RK45 adaptativa y balance de energía",
        "F = q·E  |  Conservación de la energía: ΔK + ΔU = 0 (Error < 10⁻¹⁵)",
        os.path.join(CAPT_DIR, "04_trayectoria.png"),
        "El simulador de trayectorias integra las ecuaciones de movimiento de electrones y protones en campos eléctricos con el algoritmo Dormand-Prince de paso adaptativo, demostrando la conservación exacta de la energía mecánica total."
    ),
    (
        "05_capacitor",
        "UNIDAD 2 · CAPACITORES Y DIELÉCTRICOS",
        "Geometría de placas, inserción de dieléctrico y ruptura dieléctrica",
        "Capacitancia: C = κ · ε₀ · A / d  |  Alerta de ruptura en 3 MV/m",
        os.path.join(CAPT_DIR, "05_capacitor.png"),
        "En la Unidad 2, analizamos capacitores de placas paralelas variando geometría y dieléctricos con inserción parcial. Se anima la corriente de carga hasta alcanzar el equilibrio electrostático y se alerta si se supera la rigidez dieléctrica del medio."
    ),
    (
        "06_rc",
        "UNIDAD 2 · ENERGÍA ALMACENADA Y CIRCUITO RC",
        "Balance de potencia en carga y constante de tiempo tau = R · C",
        "U = ½ C V²  |  Energía disipada en R = ½ C V² (Independiente del valor de R)",
        os.path.join(CAPT_DIR, "07_energia_rc.png"),
        "El módulo de energía y circuito RC comprueba numéricamente un resultado fundamental: la mitad de la energía entregada por la fuente se almacena en el capacitor y la otra mitad se disipa térmicamente en la resistencia, sin importar el valor de R."
    ),
    (
        "07_circuitos",
        "UNIDAD 3 · SIMULADOR DE CIRCUITOS Y REDES MIXTAS",
        "Reducción recursiva, corrientes por rama y balance de potencia",
        "Req serie/paralelo  |  Balance de potencia 100%: Σ I²R = V · I",
        os.path.join(CAPT_DIR, "08_circuitos.png"),
        "En la Unidad 3, el simulador resuelve circuitos en serie, paralelo y redes mixtas anidadas. Calcula las corrientes y voltajes en cada resistor, animando el flujo de carga proporcional a la corriente y comprobando el balance total de potencia."
    ),
    (
        "08_ohm",
        "UNIDAD 3 · VISUALIZADOR DE LA LEY DE OHM",
        "Relación V-I-R interactiva con barrido de señal en tiempo real",
        "V = I · R  |  Potencia: P = V · I = I² · R",
        os.path.join(CAPT_DIR, "09_ohm.png"),
        "El visualizador de la Ley de Ohm ofrece un barrido dinámico de voltaje y resistencia. Muestra en tiempo real la respuesta inmediata de la corriente y la potencia disipada con gráficos interactivos y efecto de incandescencia."
    ),
    (
        "09_magnetico",
        "UNIDAD 4 · CAMPO MAGNÉTICO Y BIOT-SAVART",
        "Solenoides, espiras, hilos y brújula con inercia física",
        "Biot-Savart: B = (μ₀/4π) ∮ I dl × r̂ / r²  |  Líneas de B cerradas",
        os.path.join(CAPT_DIR, "10_magnetico.png"),
        "La Unidad 4 modela el campo magnético para diversas fuentes: imanes, hilos y solenoides calculados mediante la ley de Biot-Savart. Muestra que las líneas de B son siempre cerradas y simula una brújula virtual que oscila hasta alinearse."
    ),
    (
        "10_lorentz",
        "UNIDAD 4 · FUERZA DE LORENTZ Y DERIVA E x B",
        "Hélices, cicloides y selector de velocidad con Integrador de Boris",
        "F = q (E + v × B)  |  Integrador de Boris (Orden 2, conserva |v|)",
        os.path.join(CAPT_DIR, "11_lorentz.png"),
        "Para el movimiento en campos eléctricos y magnéticos cruzados implementamos el integrador de Boris, algoritmo estándar en física de plasmas que conserva el radio de Larmor, reproduciendo con exactitud hélices, cicloides y selectores de velocidad."
    ),
    (
        "11_arquitectura",
        "ARQUITECTURA DE SOFTWARE Y VALIDACIÓN CIENTÍFICA",
        "Motor físico desacoplado, bundle web ligero y validación en Python",
        "44 Pruebas automáticas superadas  |  Comparación con NumPy / SciPy",
        os.path.join(FIG_DIR, "fig_arquitectura.png"),
        "Como proyecto de Ingeniería de Sistemas, la solución destaca por su arquitectura desacoplada: un motor físico modular en JavaScript y renderizado 3D con Three.js, respaldado por un paquete en Python con cuarenta y cuatro pruebas automáticas."
    ),
    (
        "12_cierre",
        "SIMULADOR INTERACTIVO DE CAMPOS EM EN 3D",
        "Producto Final · Física 2 · Universidad Peruana Unión",
        "Software Web · Informe Técnico Formal · Manual de Usuario",
        os.path.join(CAPT_DIR, "01_cargas_3d.png"),
        "En conclusión, este proyecto une el rigor científico con tecnologías web interactivas para facilitar la comprensión del electromagnetismo. Agradecemos su atención y quedamos a su disposición para cualquier pregunta."
    )
]

def generate_tts(text, out_wav):
    # Genera audio con PowerShell usando System.Speech y Helena
    ps_cmd = f"""
    Add-Type -AssemblyName System.Speech;
    $s = New-Object System.Speech.Synthesis.SpeechSynthesizer;
    $s.SelectVoice('Microsoft Helena Desktop');
    $s.Rate = 0;
    $s.SetOutputToWaveFile('{out_wav.replace(os.sep, "/")}');
    $s.Speak('{text}');
    $s.Dispose();
    """
    subprocess.run(["powershell", "-Command", ps_cmd], check=True, capture_output=True)

def get_audio_duration(wav_path):
    with wave.open(wav_path, "rb") as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def build_slide(scene_id, title_text, sub_text, pill_text, img_path, out_img, step_idx, total_steps):
    W, H = 1920, 1080
    im = Image.new("RGB", (W, H), (11, 15, 23)) # Dark background #0B0F17
    draw = ImageDraw.Draw(im)

    # Fonts
    font_bold = "C:\\Windows\\Fonts\\segoeuib.ttf"
    font_regular = "C:\\Windows\\Fonts\\segoeui.ttf"
    font_mono = "C:\\Windows\\Fonts\\consola.ttf"

    f_title = ImageFont.truetype(font_bold, 36)
    f_sub = ImageFont.truetype(font_regular, 22)
    f_pill = ImageFont.truetype(font_bold, 20)
    f_header = ImageFont.truetype(font_bold, 18)
    f_page = ImageFont.truetype(font_regular, 18)

    # Top Header Bar
    draw.rectangle([0, 0, W, 55], fill=(21, 29, 44))
    draw.line([0, 55, W, 55], fill=(40, 52, 75), width=2)
    draw.text((50, 16), "PROYECTO FINAL · FÍSICA II  |  INGENIERÍA DE SISTEMAS — UPeU", font=f_header, fill=(76, 194, 255))
    draw.text((W - 200, 16), f"MÓDULO {step_idx}/{total_steps}", font=f_page, fill=(147, 160, 184))

    # Title & Subtitle
    draw.text((50, 75), title_text, font=f_title, fill=(255, 255, 255))
    draw.text((50, 125), sub_text, font=f_sub, fill=(160, 175, 200))

    # Main Image Panel
    panel_x, panel_y, panel_w, panel_h = 50, 175, 1820, 780
    draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=16, fill=(16, 22, 34), outline=(40, 52, 75), width=2)

    if os.path.exists(img_path):
        with Image.open(img_path) as shot:
            shot = shot.convert("RGB")
            # Fit inside panel maintaining aspect ratio
            max_w, max_h = panel_w - 40, panel_h - 40
            scale = min(max_w / shot.width, max_h / shot.height)
            nw, nh = int(shot.width * scale), int(shot.height * scale)
            shot_resized = shot.resize((nw, nh), Image.Resampling.LANCZOS)
            ox = panel_x + (panel_w - nw) // 2
            oy = panel_y + (panel_h - nh) // 2
            im.paste(shot_resized, (ox, oy))

    # Bottom Pill / Badge
    pill_w = 1100
    pill_h = 48
    pill_x = (W - pill_w) // 2
    pill_y = H - 95
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=12, fill=(21, 29, 44), outline=(76, 194, 255), width=2)
    draw.text((pill_x + 24, pill_y + 11), pill_text, font=f_pill, fill=(124, 222, 255))

    # Progress Bar at the very bottom
    prog_w = int((step_idx / total_steps) * W)
    draw.rectangle([0, H - 8, prog_w, H], fill=(76, 194, 255))

    im.save(out_img, quality=95)

def main():
    print("=== Generador de Video de Presentación (2-3 min) ===")
    clip_files = []
    total_scenes = len(SCENES)
    total_duration = 0.0

    for i, (sid, title, sub, pill, img, narration) in enumerate(SCENES, 1):
        print(f"[{i}/{total_scenes}] Procesando escena: {sid}...")
        wav_file = os.path.join(TEMP_DIR, f"{sid}.wav")
        img_file = os.path.join(TEMP_DIR, f"{sid}.png")
        clip_file = os.path.join(TEMP_DIR, f"{sid}.mp4")

        # 1. Audio TTS
        generate_tts(narration, wav_file)
        dur = get_audio_duration(wav_file) + 0.8 # un poco de respiro al final
        total_duration += dur
        print(f"    Audio generado: {dur:.1f} seg")

        # 2. Slide visual
        build_slide(sid, title, sub, pill, img, img_file, i, total_scenes)

        # 3. Render escena con FFMPEG
        cmd = [
            FFMPEG, "-y",
            "-loop", "1", "-i", img_file,
            "-i", wav_file,
            "-c:v", "libx264", "-tune", "stillimage", "-c:a", "aac", "-b:a", "192k",
            "-pix_fmt", "yuv420p",
            "-t", str(dur),
            clip_file
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        clip_files.append(clip_file)

    print(f"\nDuración total estimada: {total_duration / 60:.2f} minutos ({total_duration:.1f} segundos).")
    print("Concatenando clips en el video final...")

    concat_txt = os.path.join(TEMP_DIR, "concat_list.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for cf in clip_files:
            f.write(f"file '{cf.replace(os.sep, '/')}'\n")

    cmd_concat = [
        FFMPEG, "-y",
        "-f", "concat", "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        OUTPUT_VIDEO
    ]
    subprocess.run(cmd_concat, check=True, capture_output=True)

    print(f"\n¡VIDEO GENERADO CON ÉXITO!")
    print(f"Ruta: {OUTPUT_VIDEO}")
    print(f"Tamaño: {os.path.getsize(OUTPUT_VIDEO) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
