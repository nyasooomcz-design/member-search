// ===== Config =====
const SHEET_ID = '1KDWJkgtxdMzW2sefWNFfU4MM9x0bBhZw5-SeNMQwKtI';
const GID = '514561957';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

// Category keywords mapping
const CATEGORIES = {
  'デザイン': ['デザイン', 'Canva', 'Illustrator', 'Photoshop', 'Figma', 'バナー', 'サムネイル', 'ロゴ', 'チラシ', '名刺'],
  '経理': ['経理', '仕訳', '請求書', '入金消込', '給与計算', '記帳', '会計', '経費', '簿記', 'マネーフォワード', 'マネフォ', '弥生'],
  '秘書': ['秘書', 'スケジュール', 'リサーチ', 'メール対応', '出張', '会食', '日程調整'],
  'ライティング': ['ライティング', 'WordPress', 'ブログ', '記事', '入稿', '執筆', 'SEO', '台本', '文章作成', '校正'],
  'データ入力': ['データ入力', 'データ集計', 'データ整理', 'データ分析', 'Excel', 'エクセル', 'スプレッドシート', 'スプシ', 'ピボット', '関数'],
  '動画編集': ['動画編集', 'PremierePro', 'Premiere Pro', 'CapCut', 'Filmora', 'vllo', 'リール'],
  'Web制作': ['Web制作', 'ホームページ', 'HP', 'WordPress', 'コーディング', 'HTML', 'CSS', 'Studio', 'LP'],
  'SNS': ['SNS', 'Instagram', 'インスタ', 'X運用', 'X投稿', 'Twitter'],
  'LINE': ['LINE', 'エルメ', 'Lステップ', 'リッチメニュー', '公式LINE'],
};

// ===== State =====
let allMembers = [];
let filteredMembers = [];
let activeCategory = 'all';

// ===== Init =====
document.addEventListener('DOMContentLoaded', fetchData);

// ===== Fetch & Parse CSV =====
async function fetchData() {
  const btn = document.getElementById('refreshBtn');
  const loading = document.getElementById('loading');
  const grid = document.getElementById('memberGrid');

  btn.classList.add('loading');
  loading.style.display = '';
  grid.innerHTML = '';
  document.getElementById('emptyState').style.display = 'none';

  try {
    const res = await fetch(CSV_URL);
    const text = await res.text();
    allMembers = parseCSV(text);
    applyFilters();

    const now = new Date();
    document.getElementById('lastUpdated').textContent =
      `最終更新: ${now.toLocaleDateString('ja-JP')} ${now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (e) {
    loading.innerHTML = '<p style="color:#e55">データの取得に失敗しました。再度お試しください。</p>';
    console.error(e);
  } finally {
    btn.classList.remove('loading');
  }
}

function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const lines = [];

  // Handle quoted fields with newlines
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === '\n' && !inQuotes) {
      lines.push(current);
      current = '';
    } else if (ch === '\r' && !inQuotes) {
      // skip \r
    } else {
      current += ch;
    }
  }
  if (current) lines.push(current);

  // Parse each line into fields
  for (const line of lines) {
    const fields = [];
    let field = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (q && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          q = !q;
        }
      } else if (ch === ',' && !q) {
        fields.push(field);
        field = '';
      } else {
        field += ch;
      }
    }
    fields.push(field);
    rows.push(fields);
  }

  if (rows.length < 2) return [];

  const headers = rows[0];
  const members = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[1] || !r[1].trim()) continue; // skip empty name

    members.push({
      role: (r[0] || '').trim(),
      name: (r[1] || '').trim(),
      intro: (r[2] || '').trim(),
      chatworkTo: (r[3] || '').trim(),
      cityUrl: (r[4] || '').trim(),
      email: (r[5] || '').trim(),
      displayName: (r[6] || '').trim(),
      chatworkId: (r[7] || '').trim(),
      prefecture: (r[8] || '').trim(),
      availability: (r[9] || '').trim(),
      skills: (r[10] || '').trim(),
    });
  }

  return members;
}

// ===== Filters =====
function setCategory(btn) {
  document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategory = btn.dataset.cat;
  applyFilters();
}

function applyFilters() {
  const nameQuery = document.getElementById('nameSearch').value.trim().toLowerCase();
  const skillQuery = document.getElementById('skillSearch').value.trim().toLowerCase();

  filteredMembers = allMembers.filter(m => {
    // Name filter
    if (nameQuery && !m.name.toLowerCase().includes(nameQuery)) return false;

    // Skill text filter
    if (skillQuery && !m.skills.toLowerCase().includes(skillQuery) && !m.intro.toLowerCase().includes(skillQuery)) return false;

    // Category filter
    if (activeCategory !== 'all') {
      const keywords = CATEGORIES[activeCategory] || [];
      const text = (m.skills + ' ' + m.intro).toLowerCase();
      const match = keywords.some(kw => text.includes(kw.toLowerCase()));
      if (!match) return false;
    }

    return true;
  });

  renderGrid();
}

// ===== Render =====
function renderGrid() {
  const grid = document.getElementById('memberGrid');
  const loading = document.getElementById('loading');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('memberCount');

  loading.style.display = 'none';

  if (filteredMembers.length === 0 && allMembers.length > 0) {
    empty.style.display = '';
    grid.innerHTML = '';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = filteredMembers.map(cardHTML).join('');
  }

  count.textContent = `${filteredMembers.length} / ${allMembers.length} 名表示中`;
}

function cardHTML(m) {
  const initial = m.name.charAt(0);
  const avatarUrl = getCityAvatarUrl(m.cityUrl);

  const avatar = avatarUrl
    ? `<img class="card-avatar" src="${avatarUrl}" alt="${escHTML(m.name)}" onerror="this.outerHTML='<div class=\\'card-avatar-placeholder\\'>${escHTML(initial)}</div>'">`
    : `<div class="card-avatar-placeholder">${escHTML(initial)}</div>`;

  const role = m.role ? `<span class="card-role">${escHTML(m.role)}</span>` : '';

  const meta = [];
  if (m.prefecture) meta.push(`<span class="card-meta-item"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>${escHTML(m.prefecture)}</span>`);
  if (m.availability) meta.push(`<span class="card-meta-item"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>${escHTML(truncate(m.availability, 30))}</span>`);

  const skillTags = extractSkillTags(m.skills);
  const skillsHTML = skillTags.length
    ? `<div class="card-skills">${skillTags.map(s => `<span class="skill-tag">${escHTML(s)}</span>`).join('')}</div>`
    : '';

  const introText = m.intro ? `<div class="card-intro" id="intro-${escAttr(m.name)}">${escHTML(m.intro)}</div>
    <button class="card-toggle-intro" onclick="toggleIntro(this)">もっと見る</button>` : '';

  const links = [];
  if (m.cityUrl) links.push(`<a href="${escAttr(m.cityUrl)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>シティ</a>`);
  if (m.chatworkId) links.push(`<a href="https://www.chatwork.com/${escAttr(m.chatworkId)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>Chatwork</a>`);

  return `<div class="card">
    <div class="card-header">
      ${avatar}
      <div class="card-name-area">
        <div class="card-name">${escHTML(m.name)}</div>
        ${role}
      </div>
    </div>
    ${meta.length ? `<div class="card-meta">${meta.join('')}</div>` : ''}
    ${introText}
    ${skillsHTML}
    ${links.length ? `<div class="card-links">${links.join('')}</div>` : ''}
  </div>`;
}

// ===== Skill tags extraction =====
function extractSkillTags(text) {
  if (!text) return [];
  const tags = new Set();
  const patterns = [
    [/デザイン/i, 'デザイン'],
    [/Canva/i, 'Canva'],
    [/Illustrator/i, 'Illustrator'],
    [/Photoshop/i, 'Photoshop'],
    [/Figma/i, 'Figma'],
    [/経理|仕訳|入金消込/i, '経理'],
    [/給与計算/i, '給与計算'],
    [/請求書/i, '請求書作成'],
    [/マネーフォワード|マネフォ/i, 'マネーフォワード'],
    [/弥生/i, '弥生会計'],
    [/秘書|スケジュール調整/i, '秘書業務'],
    [/リサーチ/i, 'リサーチ'],
    [/ライティング|記事/i, 'ライティング'],
    [/WordPress/i, 'WordPress'],
    [/データ入力/i, 'データ入力'],
    [/データ集計|データ整理|データ分析/i, 'データ集計・分析'],
    [/Excel|エクセル/i, 'Excel'],
    [/スプレッドシート|スプシ/i, 'スプレッドシート'],
    [/動画編集/i, '動画編集'],
    [/PremierePro|Premiere Pro|PrPro/i, 'Premiere Pro'],
    [/CapCut/i, 'CapCut'],
    [/Web制作|ホームページ制作|HP制作/i, 'Web制作'],
    [/HTML|CSS/i, 'HTML/CSS'],
    [/SNS|Instagram|インスタ/i, 'SNS運用'],
    [/LINE構築|Lステップ|エルメ|リッチメニュー/i, 'LINE構築'],
    [/GAS/i, 'GAS'],
    [/VBA|マクロ/i, 'VBA/マクロ'],
    [/Notion/i, 'Notion'],
    [/資料作成|マニュアル作成/i, '資料・マニュアル作成'],
    [/営業事務/i, '営業事務'],
    [/人事/i, '人事'],
    [/イラスト/i, 'イラスト'],
    [/簿記/i, '簿記'],
  ];

  for (const [re, tag] of patterns) {
    if (re.test(text)) tags.add(tag);
  }
  return [...tags].slice(0, 8);
}

// ===== City avatar URL =====
function getCityAvatarUrl(cityUrl) {
  // リベシティのプロフィールURLからユーザーIDを抽出
  if (!cityUrl) return null;
  const match = cityUrl.match(/user_profile\/([A-Za-z0-9]+)/);
  if (!match) return null;
  // リベシティのアバター画像はCORSで取得できない可能性が高いのでnull
  return null;
}

// ===== Copy Chatwork IDs =====
function copyChatworkIds() {
  const ids = filteredMembers
    .map(m => m.chatworkTo)
    .filter(id => id && id.trim());

  if (ids.length === 0) {
    showToast('表示中のメンバーにChatwork IDがありません');
    return;
  }

  const text = ids.join('');
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${ids.length}名のChatwork IDをコピーしました`);
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`${ids.length}名のChatwork IDをコピーしました`);
  });
}

// ===== Toast =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Toggle intro =====
function toggleIntro(btn) {
  const intro = btn.previousElementSibling;
  intro.classList.toggle('expanded');
  btn.textContent = intro.classList.contains('expanded') ? '閉じる' : 'もっと見る';
}

// ===== Utils =====
function escHTML(s) {
  if (!s) return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(s) {
  return escHTML(s);
}
function truncate(s, max) {
  return s.length > max ? s.substring(0, max) + '...' : s;
}
