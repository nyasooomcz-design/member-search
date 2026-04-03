// ===== Config =====
const SHEET_ID = '1KDWJkgtxdMzW2sefWNFfU4MM9x0bBhZw5-SeNMQwKtI';
const GID = '514561957';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

// Chatwork avatar mapping (account_id → avatar_image_url)
const AVATARS = {
  2160795: 'https://appdata.chatwork.com/avatar/B7WORKLK7J.rsz.png',
  2462061: 'https://appdata.chatwork.com/avatar/6MQ3nzoEAW.png',
  3150272: 'https://appdata.chatwork.com/avatar/5AdX64XnA2.png',
  4115870: 'https://appdata.chatwork.com/avatar/w7zBR0gR7l.png',
  4116014: 'https://appdata.chatwork.com/avatar/Vq3Wnjmrql.png',
  4178191: 'https://appdata.chatwork.com/avatar/6MoQkp9wA8.png',
  5281342: 'https://appdata.chatwork.com/avatar/dqvodQjeAz.png',
  5501140: 'https://appdata.chatwork.com/avatar/d7ganpLJqp.png',
  5570590: 'https://appdata.chatwork.com/avatar/374B4BeBqn.png',
  6170843: 'https://appdata.chatwork.com/avatar/d7gaR3Q5qp.png',
  6549800: 'https://appdata.chatwork.com/avatar/JqnW5m41AD.png',
  6688550: 'https://appdata.chatwork.com/avatar/oMp4n9DdM6.png',
  6811051: 'https://appdata.chatwork.com/avatar/4MlnyGL6A5.png',
  7019620: 'https://appdata.chatwork.com/avatar/bqJLDZ6K70.png',
  7086699: 'https://appdata.chatwork.com/avatar/d75Bz8D8M2.png',
  7266150: 'https://appdata.chatwork.com/avatar/Yq9eBn0bqW.png',
  7419912: 'https://appdata.chatwork.com/avatar/2Akb8bOBq0.png',
  7490926: 'https://appdata.chatwork.com/avatar/PMKB3jw17Y.png',
  7641229: 'https://appdata.chatwork.com/avatar/Vq3WYvj2ql.png',
  7647679: 'https://appdata.chatwork.com/avatar/RMbaEOzP70.png',
  7810263: 'https://appdata.chatwork.com/avatar/EMypo5Nd7B.png',
  7945573: 'https://appdata.chatwork.com/avatar/374Wg2ZyAn.png',
  7989950: 'https://appdata.chatwork.com/avatar/EMyJ0RdYqB.png',
  8052239: 'https://appdata.chatwork.com/avatar/6MoQkXvlA8.png',
  8109399: 'https://appdata.chatwork.com/avatar/R769Z3NpAr.rsz.png',
  8194031: 'https://appdata.chatwork.com/avatar/RMOrmkvw7G.png',
  8286281: 'https://appdata.chatwork.com/avatar/4MlE2zzaq5.rsz.png',
  8390419: 'https://appdata.chatwork.com/avatar/1qGm5pnQ7e.png',
  8647030: 'https://appdata.chatwork.com/avatar/372JnXD975.png',
  8681032: 'https://appdata.chatwork.com/avatar/6MQp6d9O7W.png',
  8899783: 'https://appdata.chatwork.com/avatar/W781yGnNMJ.rsz.png',
  9011407: 'https://appdata.chatwork.com/avatar/6MoQd9k0A8.rsz.png',
  9068468: 'https://appdata.chatwork.com/avatar/PMKBve827Y.rsz.jpg',
  9069676: 'https://appdata.chatwork.com/avatar/RAXo2j5Yqr.png',
  9138591: 'https://appdata.chatwork.com/avatar/oq0kVKmLMZ.png',
  9164819: 'https://appdata.chatwork.com/avatar/LqjP3lP07N.png',
  9252102: 'https://appdata.chatwork.com/avatar/PMKnjVy37Y.png',
  9585669: 'https://appdata.chatwork.com/avatar/OqaoBPaz76.png',
  9681577: 'https://appdata.chatwork.com/avatar/PAZmE1BrqE.png',
  9787577: 'https://appdata.chatwork.com/avatar/1qGYB3Qj7e.png',
  9814525: 'https://appdata.chatwork.com/avatar/4AVg284O7V.png',
  9876825: 'https://appdata.chatwork.com/avatar/VqL6z6lE7N.png',
  9977431: 'https://appdata.chatwork.com/avatar/d75BmbgJM2.rsz.jpg',
  10031553: 'https://appdata.chatwork.com/avatar/xArWLJvL7D.png',
  10185734: 'https://appdata.chatwork.com/avatar/Vq3WYvnbql.png',
  10310025: 'https://appdata.chatwork.com/avatar/4Mlnz8mKA5.png',
  10444300: 'https://appdata.chatwork.com/avatar/oq0kV2xJMZ.png',
  10508877: 'https://appdata.chatwork.com/avatar/oMp4dOWZM6.png',
  10577606: 'https://appdata.chatwork.com/avatar/374BkzOXqn.rsz.png',
  10579701: 'https://appdata.chatwork.com/avatar/EMyJ64mvqB.rsz.png',
  10604994: 'https://appdata.chatwork.com/avatar/LqjPdY2b7N.rsz.png',
  10667166: 'https://appdata.chatwork.com/avatar/OMNOyYZEq3.png',
  10704425: 'https://appdata.chatwork.com/avatar/dqvoZ3lwAz.rsz.png',
  10785054: 'https://appdata.chatwork.com/avatar/KqD8b4p5qz.rsz.jpg',
};

// Category keywords mapping — skills列のみで判定
const CATEGORIES = {
  'デザイン': ['デザイン', 'Illustrator', 'Photoshop', 'Figma', 'バナー', 'サムネイル', 'ロゴ', 'チラシ', '名刺', 'アイキャッチ'],
  '経理': ['経理', '仕訳', '入金消込', '記帳代行', '会計', '簿記', '弥生'],
  '秘書': ['秘書業務', 'スケジュール調整', 'スケジュール管理', '日程調整', '出張', '会食'],
  'ライティング': ['ライティング', 'SEO', '台本', '記事作成', '記事制作', '校正', '執筆'],
  'データ入力': ['データ入力', 'データ集計', 'データ整理', 'データ分析', 'データベース構築', 'ピボット'],
  '動画編集': ['動画編集', 'PremierePro', 'Premiere Pro', 'PrPro', 'CapCut', 'Filmora', 'vllo'],
  'Web制作': ['Web制作', 'WEB制作', 'ホームページ制作', 'ホームページ製作', 'HP制作', 'HP作成', 'コーディング', 'HTML', 'LP制作', 'Studio'],
  'SNS': ['SNS運用', 'SNS代行', 'SNS投稿', 'Instagram運用', 'インスタ運用', 'X運用'],
  'LINE': ['LINE構築', 'Lステップ', 'エルメ', 'L Message', '公式LINE'],
  '労務・人事': ['給与計算', '社会保険', '労働保険', '労務', '人事', '採用'],
};

// Region mapping (prefecture → region)
const REGIONS = {
  '北海道・東北': ['北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島'],
  '関東': ['東京', '神奈川', '埼玉', '千葉', '茨城', '栃木', '群馬'],
  '中部': ['新潟', '富山', '石川', '福井', '山梨', '長野', '岐阜', '静岡', '愛知'],
  '近畿': ['三重', '滋賀', '京都', '大阪', '兵庫', '奈良', '和歌山'],
  '中国・四国': ['鳥取', '島根', '岡山', '広島', '山口', '徳島', '香川', '愛媛', '高知'],
  '九州・沖縄': ['福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄'],
};

function getRegion(prefecture) {
  if (!prefecture) return null;
  // 「県」「府」「都」を除去して比較
  const norm = prefecture.replace(/(都|府|県)$/, '');
  for (const [region, prefs] of Object.entries(REGIONS)) {
    if (prefs.some(p => norm.includes(p) || prefecture.includes(p))) return region;
  }
  // 日本の都道府県にマッチしなければ海外
  return '海外';
}

// ===== State =====
let allMembers = [];
let filteredMembers = [];
let activeCategory = 'all';
let activeRegion = 'all';

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
  let current = '';
  let inQuotes = false;
  const lines = [];

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
      // skip
    } else {
      current += ch;
    }
  }
  if (current) lines.push(current);

  const rows = [];
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

  const members = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[1] || !r[1].trim()) continue;

    const chatworkTo = (r[3] || '').trim();
    const accountId = extractAccountId(chatworkTo);

    members.push({
      role: (r[0] || '').trim(),
      name: (r[1] || '').trim(),
      intro: (r[2] || '').trim(),
      chatworkTo,
      accountId,
      cityUrl: (r[4] || '').trim(),
      email: (r[5] || '').trim(),
      displayName: (r[6] || '').trim(),
      chatworkId: (r[7] || '').trim(),
      prefecture: (r[8] || '').trim(),
      availability: (r[9] || '').trim(),
      skills: (r[10] || '').trim(),
      isManager: (r[0] || '').includes('責任者'),
    });
  }

  return members;
}

function extractAccountId(toStr) {
  const m = toStr.match(/\[To:(\d+)\]/);
  return m ? parseInt(m[1], 10) : null;
}

// ===== Region Filter =====
function setRegion(btn) {
  document.querySelectorAll('.btn-region').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeRegion = btn.dataset.region;
  applyFilters();
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

    // Skill text filter (searches skills + intro)
    if (skillQuery && !m.skills.toLowerCase().includes(skillQuery) && !m.intro.toLowerCase().includes(skillQuery)) return false;

    // Region filter
    if (activeRegion !== 'all') {
      const memberRegion = getRegion(m.prefecture);
      if (memberRegion !== activeRegion) return false;
    }

    // Category filter — skills列のみで判定
    if (activeCategory !== 'all') {
      const keywords = CATEGORIES[activeCategory] || [];
      const text = m.skills.toLowerCase();
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
  const avatarUrl = m.accountId ? AVATARS[m.accountId] : null;

  const avatar = avatarUrl
    ? `<img class="card-avatar" src="${escAttr(avatarUrl)}" alt="${escHTML(m.name)}" onerror="this.outerHTML='<div class=\\'card-avatar-placeholder\\'>${escHTML(initial)}</div>'">`
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

  // Links & info
  const links = [];
  if (m.cityUrl) links.push(`<a href="${escAttr(m.cityUrl)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>シティ</a>`);
  if (m.chatworkId) links.push(`<span class="card-chatwork-id"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>${escHTML(m.chatworkId)}</span>`);

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
    [/ライティング/i, 'ライティング'],
    [/WordPress/i, 'WordPress'],
    [/データ入力/i, 'データ入力'],
    [/データ集計|データ整理|データ分析/i, 'データ集計・分析'],
    [/Excel|エクセル/i, 'Excel'],
    [/スプレッドシート|スプシ/i, 'スプレッドシート'],
    [/動画編集/i, '動画編集'],
    [/PremierePro|Premiere Pro|PrPro/i, 'Premiere Pro'],
    [/CapCut/i, 'CapCut'],
    [/Web制作|WEB制作|ホームページ制作|ホームページ製作|HP制作/i, 'Web制作'],
    [/HTML|CSS/i, 'HTML/CSS'],
    [/SNS運用|SNS代行|Instagram運用|インスタ運用/i, 'SNS運用'],
    [/LINE構築|Lステップ|エルメ|公式LINE/i, 'LINE構築'],
    [/GAS/i, 'GAS'],
    [/VBA|マクロ/i, 'VBA/マクロ'],
    [/Notion/i, 'Notion'],
    [/資料作成|マニュアル作成/i, '資料・マニュアル作成'],
    [/営業事務/i, '営業事務'],
    [/人事|採用/i, '人事'],
    [/給与計算|社会保険|労務/i, '労務'],
    [/イラスト/i, 'イラスト'],
    [/簿記/i, '簿記'],
  ];

  for (const [re, tag] of patterns) {
    if (re.test(text)) tags.add(tag);
  }
  return [...tags].slice(0, 8);
}

// ===== Copy Chatwork IDs =====
function copyChatworkIds() {
  const includeManagers = document.getElementById('includeManagers').checked;

  const ids = filteredMembers
    .filter(m => includeManagers || !m.isManager)
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
