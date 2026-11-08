"""从 TypingMind 的模型图标库导入图标，统一成「彩色圆角底 + 白色图形」的 Surge 图标。

来源：https://custom.typingmind.com/assets/models/
用法：python3 make_typingmind_icons.py
"""
import json
import os
import urllib.request
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'icons')
BASE = 'https://custom.typingmind.com/assets/models/'
UA = {'User-Agent': 'VqssLs-IconImport'}

# 输出名: (源文件名, 底色)
ITEMS = {
    'OpenAI': ('openai.jpg', '#10A37F'),
    'Anthropic': ('anthropic.jpg', '#D97757'),
    'Claude': ('claude.jpg', '#D97757'),
    'Gemini': ('gemini.jpg', '#8E75B2'),
    'Google': ('google.jpg', '#4285F4'),
    'Gemma': ('gemma.jpg', '#1A73E8'),
    'GPT4': ('gpt-4.webp', '#10A37F'),
    'DeepSeek': ('deepseek.jpg', '#5786FE'),
    'Qwen': ('qwen.jpg', '#6F42C1'),
    'Alibaba': ('alibaba.jpg', '#FF6A00'),
    'Meta': ('meta.jpg', '#0866FF'),
    'Llama': ('llama.png', '#0467DF'),
    'Grok': ('grok.jpg', '#111111'),
    'xAI': ('xai.jpg', '#111111'),
    'Mistral': ('mistral.jpg', '#FA520F'),
    'MistralAI': ('mistralai.png', '#FA520F'),
    'Cohere': ('cohere.jpg', '#39594D'),
    'Groq': ('groq.jpg', '#F55036'),
    'Ollama': ('ollama.jpg', '#111111'),
    'HuggingFace': ('huggingface.jpg', '#FFD21E'),
    'OpenRouter': ('openrouter.jpg', '#6467F2'),
    'OpenRouterAI': ('openrouterai.png', '#6467F2'),
    'Perplexity': ('perplexity.jpg', '#1FB8CD'),
    'Kimi': ('kimi.jpg', '#1F1F1F'),
    'Moonshot': ('moonshot.jpg', '#1F1F1F'),
    'Zhipu': ('zhipu.jpg', '#3859FF'),
    'GLM': ('zhipu.jpg', '#3859FF'),
    'Baichuan': ('baichuan.jpg', '#FF6B00'),
    'Baidu': ('baidu.jpg', '#2932E1'),
    'ByteDance': ('bytedance.jpg', '#325AB4'),
    'Doubao': ('doubao.jpg', '#4B6EF5'),
    'Tencent': ('tencent.jpg', '#0052D9'),
    'Hunyuan': ('hunyuan.jpg', '#0A5BD3'),
    'Spark': ('spark.jpg', '#1E88E5'),
    'Yi': ('yi.jpg', '#003425'),
    'MiniMax': ('minimax.jpg', '#FF5A5F'),
    'Microsoft': ('microsoft.jpg', '#5E5E5E'),
    'Azure': ('azure.jpg', '#0078D4'),
    'AzureOpenAI': ('azureopenai.png', '#0078D4'),
    'Bedrock': ('bedrock.jpg', '#FF9900'),
    'Nvidia': ('nvidia.jpg', '#76B900'),
    'Databricks': ('databricks.jpg', '#FF3621'),
    'Together': ('together.jpg', '#0F6FFF'),
    'Fireworks': ('fireworks.jpg', '#FF5C28'),
    'Replicate': ('replicate.jpg', '#111111'),
    'DeepInfra': ('deepinfra.jpg', '#4B6BFB'),
    'Novita': ('novita.jpg', '#6C3BFF'),
    'Nebius': ('nebius.jpg', '#2A6DF4'),
    'Hyperbolic': ('hyperbolic.jpg', '#6E56CF'),
    'Lambda': ('lambda.jpg', '#6C2BD9'),
    'Baseten': ('baseten.jpg', '#0B1220'),
    'Cerebras': ('cerebras.jpg', '#F26B21'),
    'SambaNova': ('sambanova.jpg', '#EE3124'),
    'Upstage': ('upstage.jpg', '#4C2AFF'),
    'Jina': ('jina.jpg', '#EB6161'),
    'Voyage': ('voyage.jpg', '#1B4DFF'),
    'AI21': ('ai21.jpg', '#E85D2A'),
    'Cloudflare': ('cloudflare.jpg', '#F38020'),
    'Vercel': ('vercel.jpg', '#000000'),
    'GitHub': ('github.jpg', '#181717'),
    'Aya': ('aya.jpg', '#39594D'),
    'Copilot': ('copilot.jpg', '#24292F'),
    'DALLE': ('dalle.jpg', '#10A37F'),
    'DBRX': ('dbrx.jpg', '#FF3621'),
    'ElevenLabs': ('elevenlabs.jpg', '#111111'),
    'Falcon': ('falcon.png', '#0B1E3C'),
    'Featherless': ('featherless.jpg', '#7C3AED'),
    'FLUX': ('flux.jpg', '#000000'),
    'Hailuo': ('hailuo.jpg', '#FF5A5F'),
    'IBM': ('ibm.jpg', '#1F70C1'),
    'Kling': ('kling.jpg', '#FF4D00'),
    'Luma': ('luma.jpg', '#111827'),
    'Midjourney': ('midjourney.jpg', '#0B0B0B'),
    'Pika': ('pika.jpg', '#111111'),
    'Poe': ('poe.jpg', '#5D5CDE'),
    'Runway': ('runway.jpg', '#0F0F0F'),
    'RWKV': ('rwkv.jpg', '#2F6FEB'),
    'Snowflake': ('snowflake.jpg', '#29B5E8'),
    'Suno': ('suno.jpg', '#111111'),
    'Vicuna': ('vicuna.png', '#6B4FBB'),
    'Chutes': ('chutes.jpg', '#2563EB'),
    'Exa': ('exa.jpg', '#1F2937'),
    'Fal': ('fal.jpg', '#6C2BD9'),
    'Firecrawl': ('firecrawl.jpg', '#FF5A1F'),
    'Glama': ('glama.jpg', '#7C3AED'),
    'Kluster': ('kluster.jpg', '#0EA5E9'),
    'LMStudio': ('lmstudio.jpg', '#1F6FEB'),
    'PaLM': ('palm.jpg', '#4285F4'),
    'Qwen2': ('qwen2.png', '#6F42C1'),
    'SearXNG': ('searxng.jpg', '#3050FF'),
    'Targon': ('targon.jpg', '#111827'),
    'Tavily': ('tavily.jpg', '#2F6BFF'),
    'Udio': ('udio.jpg', '#FF3D71'),
    'VertexAI': ('vertexai.jpg', '#4285F4'),
    'vLLM': ('vllm.jpg', '#F59E0B'),
    'Coze': ('coze.jpg', '#1A73E8'),
    'DeepMind': ('deepmind.jpg', '#4285F4'),
    'Dify': ('dify.jpg', '#1C64F2'),
    'Dolphin': ('dolphin.jpg', '#0EA5E9'),
    'FastGPT': ('fastgpt.jpg', '#10B981'),
    'Haiper': ('haiper.jpg', '#7C3AED'),
    'Hedra': ('hedra.jpg', '#EC4899'),
    'LLaVA': ('llava.jpg', '#7C5CFF'),
    'n8n': ('n8n.jpg', '#EA4B71'),
    'Notion': ('notion.jpg', '#000000'),
    'OpenChat': ('openchat.jpg', '#06B6D4'),
    'OpenWebUI': ('openwebui.jpg', '#1F2937'),
    'Sora': ('sora.jpg', '#000000'),
    'Stability': ('stability.jpg', '#7C3AED'),
    'AI2': ('ai2.jpg', '#FDB515'),
    'Cline': ('cline.jpg', '#2563EB'),
    'Codex': ('codex.jpg', '#10A37F'),
    'Huawei': ('huawei.jpg', '#CF0A2C'),
    'HuaweiCloud': ('huaweicloud.jpg', '#CF0A2C'),
    'SenseNova': ('sensenova.jpg', '#E60012'),
    'Skywork': ('skywork.jpg', '#1E88E5'),
    'StepFun': ('stepfun.jpg', '#0EA5E9'),
    'Tiangong': ('tiangong.jpg', '#4F46E5'),
    'Trae': ('trae.jpg', '#111827'),
    'Volcengine': ('volcengine.jpg', '#1664FF'),
    'Windsurf': ('windsurf.jpg', '#0EA5E9'),
}


CATS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'categories.json')


def icon_path(name):
    """按 categories.json 决定落到哪个分类目录。"""
    try:
        cats = json.load(open(CATS_PATH, encoding='utf-8'))
    except Exception:
        cats = {}
    d = os.path.join(OUT, cats.get(name, 'other'))
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name + '.png')


def download(name):
    cache = os.path.join('/tmp/tm_icons', name)
    if os.path.exists(cache):
        return cache
    os.makedirs('/tmp/tm_icons', exist_ok=True)
    data = urllib.request.urlopen(urllib.request.Request(BASE + name, headers=UA), timeout=30).read()
    with open(cache, 'wb') as f:
        f.write(data)
    return cache


def luminance_to_alpha(img):
    """黑底白图的标志：取反亮度当透明度，得到纯白图形。"""
    rgb = img.convert('RGB')
    lum = rgb.convert('L')
    alpha = lum.point(lambda v: 255 - v)
    white = Image.new('RGBA', rgb.size, (255, 255, 255, 255))
    white.putalpha(alpha)
    return white


def is_dark(color):
    r, g, b = (int(color[i:i + 2], 16) for i in (1, 3, 5))
    return (0.299 * r + 0.587 * g + 0.114 * b) < 165


def build(name, src, color):
    img = Image.open(download(src))
    glyph = luminance_to_alpha(img)
    # 裁掉四周空白，再等比缩放
    bbox = glyph.split()[3].getbbox()
    if bbox:
        glyph = glyph.crop(bbox)
    inner = 168
    w, h = glyph.size
    scale = min(inner / w, inner / h)
    glyph = glyph.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)

    canvas = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle([6, 6, 250, 250], radius=58, fill=color)

    if is_dark(color):
        tint = glyph
    else:  # 浅色底用深色图形
        dark = Image.new('RGBA', glyph.size, (24, 24, 24, 255))
        dark.putalpha(glyph.split()[3])
        tint = dark

    canvas.paste(tint, ((256 - tint.size[0]) // 2, (256 - tint.size[1]) // 2), tint)
    canvas.save(icon_path(name))


if __name__ == '__main__':
    ok = fail = 0
    for name, (src, color) in ITEMS.items():
        try:
            build(name, src, color)
            ok += 1
        except Exception as e:
            fail += 1
            print('fail', name, e)
    print(f'done ok={ok} fail={fail}')
