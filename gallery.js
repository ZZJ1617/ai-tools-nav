// ===== AI灵感画廊数据 =====
// 更新方式：往 GALLERY 数组里加对象即可（不定期更新）
// 字段说明:
//   id: 唯一标识
//   title: 卡片标题（中文）
//   cat: 分类 poster(海报) | ecommerce(电商) | vibe(氛围感) | duo(主题替换)
//   img: 图片路径
//   prompt: 完整提示词（英文，可复制去生成）
//   tip: 玩法提示（可选）
//   group: duo 分类的组名（同组图片一起展示对比）
const GALLERY = [
  {
    id: "poster-cyberpunk-01",
    title: "赛博朋克电影海报：雨夜独行者",
    cat: "poster",
    img: "images/gallery/poster-cyberpunk-film.webp",
    prompt: "Cinematic movie poster of a lone figure in a glowing cyberpunk city at night, neon pink and cyan reflections on wet streets, rain, dramatic backlight, film grain, epic scale, blockbuster poster composition, no text",
    tip: "把「lone figure」换成你的主角描述，就是一张原创电影海报"
  },
  {
    id: "ecommerce-perfume-01",
    title: "电商主图：奢华香水广告",
    cat: "ecommerce",
    img: "images/gallery/ecommerce-perfume.webp",
    prompt: "Luxury perfume product photography, crystal glass bottle on wet black stone with golden light rays, water droplets, dark moody background with warm bokeh, commercial advertising style, ultra realistic, no text",
    tip: "把「perfume crystal bottle」换成你的商品（手表/口红/耳机都行）"
  },
  {
    id: "vibe-cozy-01",
    title: "氛围感：雨窗边的暖茶",
    cat: "vibe",
    img: "images/gallery/vibe-cozy-reading.webp",
    prompt: "Cozy atmosphere photo, warm fairy lights and steaming tea cup on wooden window sill during golden hour rain, soft bokeh, hygge mood, warm amber tones, cinematic photography, no text",
    tip: "氛围感关键词：warm tones / soft bokeh / golden hour，想换场景改主语即可"
  },
  {
    id: "duo-cat-01",
    title: "主题替换：同一只猫，两种世界",
    cat: "duo",
    img: "images/gallery/duo-cat-oil.webp",
    group: "cat-oil",
    prompt: "A fluffy orange cat sitting regally, painted in classical baroque oil painting style, dramatic chiaroscuro lighting, rich dark background, museum masterpiece quality",
    tip: "同一主体换风格的核心：固定主语（a fluffy orange cat），换风格词（oil painting→cyberpunk→watercolor）",
    duo_pair: {
      title: "赛博朋克版",
      img: "images/gallery/duo-cat-cyber.webp",
      prompt: "A fluffy orange cat with glowing cybernetic armor, neon purple and cyan cyberpunk style, digital art, futuristic city background, vibrant, detailed"
    }
  },
  {
    id: "poster-retro-flash",
    title: "复古闪光胶片：砖墙前的女孩",
    cat: "poster",
    img: "images/gallery/poster-retro-flash.webp",
    prompt: "Editorial retro flash portrait of a young woman with short dark curls standing against a plain dark red brick wall at night, harsh direct on-camera flash, deep shadows, saturated 90s colors, heavy film grain, fashion magazine look, empty background, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "关键词是 retro flash（直闪硬光）+ heavy film grain（重胶片颗粒），把人换成你想要的形象就是一张复古海报"
  },
  {
    id: "poster-knight-01",
    title: "电影质感：火光中的铠甲勇士",
    cat: "poster",
    img: "images/gallery/poster-knight-01.webp",
    prompt: "Cinematic movie still, a lone knight in glowing golden armor walking through burning battlefield embers at dusk, dramatic rim light, volumetric smoke, epic scale, shallow depth of field, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "电影感三件套：dramatic rim light（轮廓光）+ volumetric smoke（体积烟雾）+ shallow depth of field（浅景深）"
  },
  {
    id: "poster-toy-avatar",
    title: "潮玩 3D：宇航服小猫",
    cat: "poster",
    img: "images/gallery/poster-toy-avatar.webp",
    prompt: "Toy-like 3D render of a cute astronaut cat, glossy plastic vinyl texture, big shiny eyes, soft studio lighting, pastel mint background, blind-box collectible toy style, clay render, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "「blind-box collectible toy style」= 盲盒潮玩风，主体任意换（猫/狗/机器人）都能出同款质感"
  },
  {
    id: "poster-film-roadtrip",
    title: "胶片怀旧：海岸公路自驾",
    cat: "poster",
    img: "images/gallery/poster-film-roadtrip.webp",
    prompt: "Nostalgic 35mm film photograph of a vintage convertible driving a coastal highway at golden hour, warm faded tones, light leaks, dust and scratches, 1970s summer road trip mood, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "怀旧胶片关键词：35mm film + light leaks（漏光）+ faded tones（褪色调）"
  },
  {
    id: "poster-anime-space",
    title: "插画风：粉色星球低空飞行",
    cat: "poster",
    img: "images/gallery/poster-anime-space.webp",
    prompt: "Flat illustration, a sleek silver spacecraft flying low over a pink alien planet with floating rocks and a giant pastel moon, vibrant dreamy gradient colors, clean vector illustration style, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "扁平插画风：flat illustration + clean vector style，适合做公众号头图/科普配图"
  },
  {
    id: "ecommerce-dopamine-3d",
    title: "电商主图：3D 多巴胺彩妆",
    cat: "ecommerce",
    img: "images/gallery/ecommerce-dopamine-3d.webp",
    prompt: "3D C4D commercial render, a glossy pink lipstick and a colorful cosmetic bottle floating among bouncing geometric spheres, dopamine color palette of bright pink mint and lemon yellow, soft studio lighting, playful product render, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "2026 电商大促主流风格：3D 立体 + 多巴胺撞色，把口红换成你的商品即可"
  },
  {
    id: "ecommerce-serum-splash",
    title: "电商主图：精华水花飞溅",
    cat: "ecommerce",
    img: "images/gallery/ecommerce-serum-splash.webp",
    prompt: "Premium skincare serum bottle standing on wet dark stone, a crystal clear water splash frozen mid-air around it, fresh green botanical leaves, soft rim lighting, ultra realistic luxury commercial product photography, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "产品图保鲜招：water splash frozen mid-air（定格水花）+ ultra realistic 商业摄影感"
  },
  {
    id: "ecommerce-snack-scene",
    title: "食品电商：坚果木盘场景",
    cat: "ecommerce",
    img: "images/gallery/ecommerce-snack-scene.webp",
    prompt: "Scene-based food photography, roasted nuts and dried fruit scattered on a rustic wooden board, warm side sunlight, honey drizzle, shallow depth of field, appetizing commercial food shot, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "食品类用 scene-based（场景化）+ warm side sunlight（暖侧光），比纯白底更有食欲"
  },
  {
    id: "vibe-rain-neon",
    title: "氛围感：雨夜霓虹湿地面",
    cat: "vibe",
    img: "images/gallery/vibe-rain-neon.webp",
    prompt: "Rainy night alley with abstract neon light reflections on wet asphalt, glowing pink and cyan light bands from out-of-frame sources, mist in the air, cinematic moody photography, empty street, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "雨夜氛围的关键：wet asphalt reflections（湿地反射）+ light from out-of-frame（光源不入画，避免出现招牌文字）"
  },
  {
    id: "vibe-cat-sunbeam",
    title: "氛围感：阳光午后的猫",
    cat: "vibe",
    img: "images/gallery/vibe-cat-sunbeam.webp",
    prompt: "Warm afternoon sunlight streaming through a window onto a sleeping ginger cat curled on a linen cushion, dust motes floating in the light beam, soft long shadows, cozy hygge film photograph, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "治愈系公式：sunbeam（光束）+ dust motes（光尘）+ hygge（北欧温暖感）"
  },
  {
    id: "vibe-minimal-tulip",
    title: "极简留白：瓶中白郁金香",
    cat: "vibe",
    img: "images/gallery/vibe-minimal-tulip.webp",
    prompt: "Minimalist fine art still life, a single white tulip in a clear glass vase on a plain beige surface, soft diffused daylight, generous negative space, muted tones, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "做封面留白位用：generous negative space（大量留白）+ muted tones（低饱和），文字叠上去不抢戏"
  },
  {
    id: "duo-fox-watercolor",
    title: "主题替换：同一只狐狸，两种世界",
    cat: "duo",
    img: "images/gallery/duo-fox-watercolor.webp",
    prompt: "A red fox sitting alert in a snowy field, watercolor illustration with crisp clean linework and clearly defined fur detail, white background, translucent washes, muted earth tones, sharp focus, no text, no words, no letters, no captions, no typography, no watermark",
    tip: "固定主语（a red fox）+ 只换风格词，同一主体就能出完全不同世界的图",
    group: "fox-style",
    duo_pair: {
      title: "赛博机甲版",
      img: "images/gallery/duo-fox-cyber.webp",
      prompt: "A red fox with glowing cybernetic metal plating along its back, neon purple and cyan rim light, futuristic ruined city background, detailed digital concept art, no text, no words, no letters, no captions, no typography, no watermark"
    }
  }
];

// ===== 分类 =====
const CATS = [
  { key: "all", label: "全部" },
  { key: "poster", label: "🎬 热门海报" },
  { key: "ecommerce", label: "🛍️ 电商场景" },
  { key: "vibe", label: "✨ 氛围感" },
  { key: "duo", label: "🔁 主题替换" }
];

let currentCat = "all";

// ===== 渲染分类chips =====
function renderChips() {
  const bar = document.getElementById("chipBar");
  bar.innerHTML = CATS.map(c =>
    `<button class="chip ${c.key === currentCat ? "active" : ""}" onclick="filterCat('${c.key}')">${c.label}</button>`
  ).join("");
}

// ===== 过滤 =====
function filterCat(cat) {
  currentCat = cat;
  renderChips();
  renderGrid();
}

// ===== 渲染卡片 =====
function renderGrid() {
  const grid = document.getElementById("galleryGrid");
  const empty = document.getElementById("emptyState");
  const items = currentCat === "all" ? GALLERY : GALLERY.filter(g => g.cat === currentCat);
  empty.style.display = items.length ? "none" : "block";
  grid.innerHTML = items.map(g => {
    const catLabel = CATS.find(c => c.key === g.cat)?.label || g.cat;
    return `
    <div class="card" onclick="openModal('${g.id}')">
      <img src="${g.img}" alt="${g.title}" loading="lazy">
      <div class="card-body">
        <div class="card-title">${g.title}</div>
        <span class="card-tag">${catLabel}</span>
        <div class="card-copy">📋 点开复制提示词</div>
      </div>
    </div>`;
  }).join("");
}

// ===== 弹窗 =====
function openModal(id) {
  const g = GALLERY.find(x => x.id === id);
  if (!g) return;
  const catLabel = CATS.find(c => c.key === g.cat)?.label || "";
  let html = `
    <img src="${g.img}" alt="${g.title}">
    <div class="modal-title">${g.title}</div>
    <div class="modal-cat">${catLabel}</div>
    ${g.tip ? `<div class="modal-tip">💡 ${g.tip}</div>` : ""}
    <div class="modal-tip">📋 完整提示词（点击下方按钮复制）：</div>
    <div class="prompt-box">${escapeHtml(g.prompt)}</div>
    <button class="copy-btn" onclick="copyPrompt(this, ${JSON.stringify(g.prompt).replace(/"/g, "&quot;")})">📋 复制提示词</button>
  `;
  // duo 主题替换：显示对比图
  if (g.duo_pair) {
    html = `
    <div class="modal-tip" style="font-size:14px;margin-bottom:10px">🔁 主题替换演示：同一主体，两种风格</div>
    <div class="duo-grid">
      <div class="duo-item">
        <img src="${g.img}" alt="风格A">
        <div class="duo-label">风格A：${escapeHtml(g.title.split("：")[1] || "油画")}</div>
      </div>
      <div class="duo-item">
        <img src="${g.duo_pair.img}" alt="风格B">
        <div class="duo-label">风格B：${escapeHtml(g.duo_pair.title)}</div>
      </div>
    </div>
    <div class="modal-title">${g.title}</div>
    <div class="modal-cat">${catLabel} · 换风格玩法</div>
    <div class="modal-tip">💡 ${g.tip || ""}</div>
    <div class="modal-tip">📋 风格A 提示词：</div>
    <div class="prompt-box">${escapeHtml(g.prompt)}</div>
    <button class="copy-btn" style="margin-bottom:12px" onclick="copyPrompt(this, ${JSON.stringify(g.prompt).replace(/"/g, "&quot;")})">📋 复制风格A提示词</button>
    <div class="modal-tip">📋 风格B 提示词：</div>
    <div class="prompt-box">${escapeHtml(g.duo_pair.prompt)}</div>
    <button class="copy-btn" onclick="copyPrompt(this, ${JSON.stringify(g.duo_pair.prompt).replace(/"/g, "&quot;")})">📋 复制风格B提示词</button>`;
  }
  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("modal").classList.add("open");
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
}

// ===== 复制 =====
function copyPrompt(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent;
    btn.textContent = "✅ 已复制！去生成吧";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = old;
      btn.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    btn.textContent = "✅ 已复制！";
    setTimeout(() => { btn.textContent = "📋 复制提示词"; }, 2000);
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ESC 关闭
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ===== 初始化 =====
renderChips();
renderGrid();
