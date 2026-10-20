# -*- coding: utf-8 -*-
import io, re, sys

p = '/root/content/tool-nav/index.html'
s = io.open(p, encoding='utf-8').read()

start = s.index('const HOTSPOT={')
end = s.index('\n};', start)
block = s[start:end]

# new item line
new_item = ('    {t: "🧊", h: "Viggle 发布 JST-2 世界模型", '
 'd: "Viggle 10 月 19 日发布 JST-2 物理原生世界模型（Joint Space-and-Time 第二代）：把场景、角色、动作统一建模在同一个 3D 世界里，用 Physics-Native Token 表示持续存在的物质原子（显式 xyz 位置 + 属性向量 + 动力学向量）。生成一个 3D 场景约 1 秒、单次推理成本低于 0.01 美元（官方对比 Marble 需 6 分钟）；场景解码成 3D Gaussian splats 在浏览器本地实时渲染，可自由移镜、逐视角扩展场景（最多 64 个输入视角作为空间上下文）。角色能从单张图片生成、动作内建，无需单独绑定骨骼与蒙皮即可直接动画；动作支持文本生成与视频重建，并原生兼容标准 3D 角色骨骼，无需重定向。官方盲测称角色生成与动作就绪度均优于 Meshy 7.1 与 Tripo H3.1，面部细节保留最好。现已在 PINOC 网页版免费可用（场景模式 / Agent 模式），另开放 API 与 MCP，可接 Codex、Claude Code 等智能体。", '
 'params: "已上线 · PINOC 网页版免费（API/MCP 可接）", '
 'scene: "3D · 实时场景/免骨骼角色/文生动作", '
 'link: "https://viggle.ai/jst2"}')

lines = block.split('\n')
# locate last item line (starts with '    {t:')
idxs = [i for i, l in enumerate(lines) if l.lstrip().startswith('{t:')]
last = idxs[-1]
# normalize trailing comma
lines[last] = lines[last].rstrip()
if lines[last].endswith(','):
    lines[last] = lines[last][:-1]
lines.insert(last + 1, new_item + ',')
# dedupe double commas across whole block
block2 = '\n'.join(lines)
block2 = re.sub(r',\s*,', ',', block2)
block2 = block2.replace('10月20日 08:10更新', '10月20日 19:15更新')

s2 = s[:start] + block2 + s[end:]
io.open(p, 'w', encoding='utf-8').write(s2)
print('written')
