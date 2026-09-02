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
