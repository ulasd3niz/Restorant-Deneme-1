/* ═══════════════════════════════════════════
   shared.js — SmartPOS + Firebase Realtime DB
   ═══════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBXt0V74a-gb0bEcFyHwGRbP6AueFZsLTU",
  authDomain: "smartpos-restoran.firebaseapp.com",
  databaseURL: "https://smartpos-restoran-default-rtdb.firebaseio.com",
  projectId: "smartpos-restoran",
  storageBucket: "smartpos-restoran.firebasestorage.app",
  messagingSenderId: "960092603051",
  appId: "1:960092603051:web:0893e8375ee6cb7c40adee"
};

const MENU = [
  {id:'m01',name:'Truffle Smash Burger',cat:'burger',price:185,cal:820,prep:12,vegan:false,gluten:true,dairy:true,nuts:false,hot:true,
   img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
   desc:'Çift smash patty, truffle mayo, karamelize soğan, gruyère peyniri, brioche'},
  {id:'m02',name:'Crispy Chicken Sandwich',cat:'burger',price:155,cal:680,prep:10,vegan:false,gluten:true,dairy:false,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
   desc:'Çıtır tavuk göğsü, jalapeño turşusu, sriracha sos, brioche'},
  {id:'m03',name:'BBQ Bacon Burger',cat:'burger',price:165,cal:900,prep:11,vegan:false,gluten:true,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
   desc:'Angus beef, füme bacon, cheddar, BBQ sos, soğan halkası'},
  {id:'m04',name:'Margherita Napoletana',cat:'pizza',price:165,cal:720,prep:15,vegan:false,gluten:true,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
   desc:'San Marzano domates, taze mozzarella, fesleğen, EZZ'},
  {id:'m05',name:'Diavola Piccante',cat:'pizza',price:175,cal:780,prep:15,vegan:false,gluten:true,dairy:true,nuts:false,hot:true,
   img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
   desc:'Acı İtalyan sucuğu, kırmızı biber, fior di latte, chili flakes'},
  {id:'m06',name:'Porcini Tagliatelle',cat:'pasta',price:175,cal:680,prep:14,vegan:false,gluten:true,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80',
   desc:'Taze yumurtalı makarna, porcini mantarı, parmesan, trüf yağı'},
  {id:'m07',name:'Beef Tenderloin Risotto',cat:'pasta',price:245,cal:890,prep:22,vegan:false,gluten:false,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
   desc:'Osso bucco, safran risotto, grana padano, gremolata'},
  {id:'m08',name:'Vegan Buddha Bowl',cat:'salad',price:135,cal:420,prep:8,vegan:true,gluten:false,dairy:false,nuts:true,hot:false,
   img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
   desc:'Kinoa, avokado, nohut, havuç, tahini sos, nar taneleri'},
  {id:'m09',name:'Vegan Jackfruit Taco',cat:'salad',price:125,cal:390,prep:10,vegan:true,gluten:false,dairy:false,nuts:false,hot:true,
   img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
   desc:'BBQ jackfruit, corn tortilla, mango salsa, avokado krema'},
  {id:'m10',name:'Crème Brûlée',cat:'dessert',price:85,cal:340,prep:5,vegan:false,gluten:false,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80',
   desc:'Klasik vanilya, karamelize şeker, taze meyveler'},
  {id:'m11',name:'Tiramisu Classico',cat:'dessert',price:90,cal:380,prep:5,vegan:false,gluten:true,dairy:true,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
   desc:'Mascarpone, lady finger, espresso, kakao'},
  {id:'m12',name:'Cold Brew Tonic',cat:'drink',price:65,cal:80,prep:2,vegan:true,gluten:false,dairy:false,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
   desc:'24 saat demleme, premium tonic, limon kabuğu'},
  {id:'m13',name:'Mango Chili Mocktail',cat:'drink',price:75,cal:120,prep:3,vegan:true,gluten:false,dairy:false,nuts:false,hot:false,
   img:'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80',
   desc:'Taze mango püresi, tajin, limon, soda, mint'},
];

const JUKEBOX_INIT = [
  {id:'j1',title:'Heat Waves',artist:'Glass Animals',votes:30,dur:'3:59'},
  {id:'j2',title:'Blinding Lights',artist:'The Weeknd',votes:24,dur:'3:20'},
  {id:'j3',title:'Levitating',artist:'Dua Lipa',votes:18,dur:'3:23'},
  {id:'j4',title:'Stay',artist:'The Kid LAROI',votes:15,dur:'2:21'},
  {id:'j5',title:'Shivers',artist:'Ed Sheeran',votes:11,dur:'3:27'},
];

const TABLES_COUNT = 12;

/* ═══ FIREBASE ENGINE ═══ */
const FDB = {
  db: null,
  ready: false,

  async init() {
    await this._loadSDK();
    firebase.initializeApp(FIREBASE_CONFIG);
    this.db = firebase.database();
    this.ready = true;
    await this._ensureDefaults();
  },

  _loadSDK() {
    return new Promise((resolve, reject) => {
      if (window.firebase && window.firebase.database) { resolve(); return; }
      const s1 = document.createElement('script');
      s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
      s1.onerror = () => reject(new Error('Firebase SDK yüklenemedi'));
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
        s2.onerror = () => reject(new Error('Firebase DB SDK yüklenemedi'));
        s2.onload = () => resolve();
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    });
  },

  async _ensureDefaults() {
    const snap = await this.db.ref('tables').once('value');
    if (!snap.exists()) {
      const tables = {};
      for (let i = 1; i <= TABLES_COUNT; i++) {
        tables['t' + i] = {
          id: i, status: 'free', seats: (i % 3 === 0) ? 6 : 4,
          orders: {}, note: '', waiter_call: false,
          waiter_call_time: null, order_time: null
        };
      }
      await this.db.ref('tables').set(tables);
    }
    const jSnap = await this.db.ref('jukebox').once('value');
    if (!jSnap.exists()) {
      const jbox = {};
      JUKEBOX_INIT.forEach(j => { jbox[j.id] = j; });
      await this.db.ref('jukebox').set(jbox);
    }
    const aSnap = await this.db.ref('announcements').once('value');
    if (!aSnap.exists()) {
      await this.db.ref('announcements').set('🍽️ Bugünün Önerisi: Truffle Smash Burger %20 İndirimli!  ·  🎵 Jukebox aktif!');
    }
    const zSnap = await this.db.ref('zReport').once('value');
    if (!zSnap.exists()) {
      await this.db.ref('zReport').set({ totalRevenue: 0, orderCount: 0, topItems: {}, openedAt: Date.now() });
    }
  },

  async getTable(id) {
    const s = await this.db.ref('tables/t' + id).once('value');
    return s.val();
  },

  async getAllTables() {
    const s = await this.db.ref('tables').once('value');
    const val = s.val() || {};
    return Object.values(val).sort((a, b) => a.id - b.id);
  },

  watchTables(cb) {
    this.db.ref('tables').on('value', snap => {
      const val = snap.val() || {};
      cb(Object.values(val).sort((a, b) => a.id - b.id));
    });
  },

  async updateTable(id, data) {
    await this.db.ref('tables/t' + id).update(data);
  },

  async addOrder(tableId, items, note) {
    const now = Date.now();
    const updates = {};
    const snap = await this.db.ref('tables/t' + tableId + '/orders').once('value');
    const existing = snap.val() || {};
    items.forEach(item => {
      if (existing[item.id]) {
        updates['tables/t' + tableId + '/orders/' + item.id + '/qty'] = (existing[item.id].qty || 0) + item.qty;
      } else {
        updates['tables/t' + tableId + '/orders/' + item.id] = { id: item.id, qty: item.qty, note: note || '', sentAt: now };
      }
    });
    updates['tables/t' + tableId + '/status'] = 'occupied';
    updates['tables/t' + tableId + '/order_time'] = now;
    await this.db.ref('/').update(updates);
  },

  async completeOrder(tableId) {
    const snap = await this.db.ref('tables/t' + tableId).once('value');
    const table = snap.val();
    if (!table) return;
    const orders = table.orders || {};
    let revenue = 0;
    const topItems = {};
    Object.values(orders).forEach(o => {
      const m = menuById(o.id);
      if (m) { revenue += m.price * o.qty; topItems[o.id] = o.qty; }
    });
    const zSnap = await this.db.ref('zReport').once('value');
    const z = zSnap.val() || { totalRevenue: 0, orderCount: 0, topItems: {} };
    z.totalRevenue = (z.totalRevenue || 0) + revenue;
    z.orderCount = (z.orderCount || 0) + 1;
    Object.entries(topItems).forEach(([id, qty]) => {
      z.topItems[id] = (z.topItems[id] || 0) + qty;
    });
    await this.db.ref('zReport').set(z);
    await this.db.ref('tables/t' + tableId).update({
      orders: {}, status: 'free', order_time: null,
      note: '', waiter_call: false, waiter_call_time: null
    });
  },

  async getJukebox() {
    const s = await this.db.ref('jukebox').once('value');
    const val = s.val() || {};
    return Object.values(val).sort((a, b) => b.votes - a.votes);
  },

  watchJukebox(cb) {
    this.db.ref('jukebox').on('value', snap => {
      const val = snap.val() || {};
      cb(Object.values(val).sort((a, b) => b.votes - a.votes));
    });
  },

  async voteJukebox(id) {
    const s = await this.db.ref('jukebox/' + id + '/votes').once('value');
    await this.db.ref('jukebox/' + id + '/votes').set((s.val() || 0) + 1);
  },

  async getAnnouncements() {
    const s = await this.db.ref('announcements').once('value');
    return s.val() || '';
  },

  watchAnnouncements(cb) {
    this.db.ref('announcements').on('value', snap => cb(snap.val() || ''));
  },

  async setAnnouncements(text) {
    await this.db.ref('announcements').set(text);
  },

  async getZReport() {
    const s = await this.db.ref('zReport').once('value');
    return s.val() || { totalRevenue: 0, orderCount: 0, topItems: {}, openedAt: Date.now() };
  },

  watchZReport(cb) {
    this.db.ref('zReport').on('value', snap => cb(snap.val() || {}));
  },

  async resetDay() {
    const updates = {};
    for (let i = 1; i <= TABLES_COUNT; i++) {
      updates['tables/t' + i + '/orders'] = {};
      updates['tables/t' + i + '/status'] = 'free';
      updates['tables/t' + i + '/order_time'] = null;
      updates['tables/t' + i + '/note'] = '';
      updates['tables/t' + i + '/waiter_call'] = false;
      updates['tables/t' + i + '/waiter_call_time'] = null;
    }
    updates['zReport'] = { totalRevenue: 0, orderCount: 0, topItems: {}, openedAt: Date.now() };
    await this.db.ref('/').update(updates);
  },
};

/* ═══ HELPERS ═══ */
function menuById(id) {
  if (!id) return null;
  // exact match
  let m = MENU.find(m => m.id === id);
  if (m) return m;
  // eski format: 'm1' → 'm01'
  if (/^m\d$/.test(id)) m = MENU.find(m => m.id === 'm0' + id[1]);
  return m || null;
}

function tableTotal(table) {
  const orders = table.orders || {};
  return Object.values(orders).reduce((s, o) => {
    const m = menuById(o.id);
    return s + (m ? m.price * o.qty : 0);
  }, 0);
}

function calcWaitTime(tables) {
  const active = tables.filter(t => Object.keys(t.orders || {}).length > 0);
  if (!active.length) return '~8-12';
  let total = 0, cnt = 0;
  active.forEach(t => Object.values(t.orders || {}).forEach(o => {
    const m = menuById(o.id);
    if (m) { total += m.prep * o.qty; cnt++; }
  }));
  const avg = cnt > 0 ? Math.round(total / cnt) : 10;
  return '~' + avg + '-' + (avg + 3);
}

function allergenIcons(m) {
  let s = '';
  if (m.vegan)  s += '<span title="Vegan">🌿</span>';
  if (m.gluten) s += '<span title="Glüten">⚠️</span>';
  if (m.dairy)  s += '<span title="Süt">🥛</span>';
  if (m.nuts)   s += '<span title="Kuruyemiş">🥜</span>';
  if (m.hot)    s += '<span title="Acı">🌶️</span>';
  return s;
}

/* ═══ TOAST ═══ */
function toast(msg, type) {
  type = type || 'success';
  let zone = document.getElementById('toast-zone');
  if (!zone) {
    zone = document.createElement('div');
    zone.id = 'toast-zone';
    zone.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(zone);
  }
  const colors = { success: 'rgba(34,197,94,0.4)', warn: 'rgba(255,200,0,0.4)', critical: 'rgba(255,75,75,0.5)' };
  const bgs    = { success: 'rgba(0,20,8,0.97)', warn: 'rgba(30,25,0,0.97)', critical: 'rgba(30,0,0,0.97)' };
  const icons  = { success: '✅', warn: '⚠️', critical: '🚨' };
  const el = document.createElement('div');
  el.style.cssText = 'background:' + (bgs[type]||bgs.success) + ';border:1px solid ' + (colors[type]||colors.success) + ';border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px;font-size:13px;max-width:340px;pointer-events:all;color:#e8e8f0;font-family:sans-serif;';
  el.innerHTML = '<span>' + (icons[type]||'ℹ️') + '</span><span style="flex:1;">' + msg + '</span><span style="cursor:pointer;color:#888;" onclick="this.parentElement.remove()">✕</span>';
  zone.appendChild(el);
  setTimeout(function() {
    el.style.transition = 'all .3s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(120px)';
    setTimeout(function() { el.remove(); }, 320);
  }, 4500);
}

/* ═══ BEEP ═══ */
function playBeep(freq, dur) {
  freq = freq || 880; dur = dur || 0.5;
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch(e) {}
}

/* ═══ CLOCK ═══ */
function startClock() {
  function tick() {
    var el = document.getElementById('live-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('tr-TR');
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══ TICKER ═══ */
async function initTicker() {
  var wrap  = document.getElementById('ticker-wrap');
  var inner = document.getElementById('ticker-text');
  if (!wrap || !inner) return;
  var text = await FDB.getAnnouncements();
  if (text) {
    wrap.style.display = 'block';
    inner.innerHTML = '<span>' + text + '&nbsp;&nbsp;·&nbsp;&nbsp;' + text + '</span>';
  }
  FDB.watchAnnouncements(function(t) {
    if (!t) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    inner.innerHTML = '<span>' + t + '&nbsp;&nbsp;·&nbsp;&nbsp;' + t + '</span>';
  });
}

/* ═══ LOADING ═══ */
function showLoading(msg) {
  msg = msg || 'Bağlanıyor...';
  // Eğer zaten varsa sadece mesajı güncelle
  var existing = document.getElementById('fb-loading');
  if (existing) {
    var m = existing.querySelector('#fb-loading-msg');
    if (m) m.textContent = msg;
    return;
  }
  var el = document.createElement('div');
  el.id = 'fb-loading';
  el.style.cssText = 'position:fixed;inset:0;background:#0a0a0f;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;gap:16px;';
  el.innerHTML = '<div style="font-size:40px;">🔥</div>'
    + '<div style="font-family:Syne,sans-serif;font-size:18px;font-weight:800;color:#f0c060;">SmartPOS</div>'
    + '<div style="color:#7878a0;font-size:13px;" id="fb-loading-msg">' + msg + '</div>'
    + '<div style="width:200px;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
    + '<div id="fb-bar" style="height:100%;background:#f0c060;border-radius:2px;animation:loadBar 1.5s ease-in-out infinite;"></div></div>'
    + '<style>@keyframes loadBar{0%{width:0%;margin-left:0;}50%{width:60%;}100%{width:0%;margin-left:100%;}}</style>';
  document.body.appendChild(el);
}

function hideLoading() {
  var el = document.getElementById('fb-loading');
  if (!el) return;
  el.style.transition = 'opacity 0.4s';
  el.style.opacity = '0';
  setTimeout(function() {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }, 450);
}

function setLoadingMsg(msg) {
  var el = document.getElementById('fb-loading-msg');
  if (el) el.textContent = msg;
}
