/* ═══════════════════════════════════════════
   shared.js  —  SmartPOS ortak veri & state
   ═══════════════════════════════════════════ */

/* ─── MENU ─── */
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

/* ─── JUKEBOX ─── */
const JUKEBOX_INIT = [
  {id:'j1',title:'Heat Waves',artist:'Glass Animals',votes:30,dur:'3:59'},
  {id:'j2',title:'Blinding Lights',artist:'The Weeknd',votes:24,dur:'3:20'},
  {id:'j3',title:'Levitating',artist:'Dua Lipa',votes:18,dur:'3:23'},
  {id:'j4',title:'Stay',artist:'The Kid LAROI',votes:15,dur:'2:21'},
  {id:'j5',title:'Shivers',artist:'Ed Sheeran',votes:11,dur:'3:27'},
  {id:'j6',title:'MONTERO',artist:'Lil Nas X',votes:9,dur:'2:17'},
];

/* ─── TABLES INIT ─── */
const TABLES_INIT = Array.from({length:12},(_,i)=>({
  id: i+1,
  status: 'free',          // free | occupied | reserved
  seats: (i%3===0)?6:4,
  orders: [],              // [{id,qty,note,sentAt}]  ← mutfağa gönderilmiş
  pendingOrders: [],       // garson tarafından mutfağa gönderilmeden önce POS'ta bekleyen
  note: '',
  waiter_call: false,
  waiter_call_time: null,
  order_time: null,
  merged_with: null,
}));

/* ═══ STATE ENGINE ═══ */
const DB = {
  KEY: 'smartpos_v2',

  defaults() {
    return {
      tables: JSON.parse(JSON.stringify(TABLES_INIT)),
      jukebox: JSON.parse(JSON.stringify(JUKEBOX_INIT)),
      announcements: '🍽️ Bugünün Önerisi: Truffle Smash Burger %20 İndirimli!  ·  🎵 Jukebox aktif — şarkı oylayın!  ·  ☕ Taze filtre kahve geldi',
      zReport: { totalRevenue:0, orderCount:0, topItems:{}, openedAt: new Date().toISOString() },
      splitSeats: 2,
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaults();
      return { ...this.defaults(), ...JSON.parse(raw) };
    } catch(e) { return this.defaults(); }
  },

  save(state) {
    localStorage.setItem(this.KEY, JSON.stringify(state));
  },

  get() { return this.load(); },

  update(fn) {
    const state = this.load();
    fn(state);
    this.save(state);
    return state;
  },
};

/* ═══ HELPERS ═══ */
function menuById(id) { return MENU.find(m=>m.id===id); }

function tableTotal(table) {
  return (table.orders||[]).reduce((s,o)=>{
    const m = menuById(o.id);
    return s + (m ? m.price * o.qty : 0);
  }, 0);
}

function calcWaitTime() {
  const state = DB.get();
  const active = state.tables.filter(t=>(t.orders||[]).length > 0);
  if (!active.length) return '~8-12';
  let total=0, cnt=0;
  active.forEach(t=>t.orders.forEach(o=>{
    const m=menuById(o.id);
    if(m){total+=m.prep*o.qty;cnt++;}
  }));
  const avg = cnt>0 ? Math.round(total/cnt) : 10;
  return `~${avg}-${avg+3}`;
}

function top3Ids() {
  const counts = {};
  MENU.forEach(m=>{ counts[m.id]=0; });
  DB.get().tables.forEach(t=>(t.orders||[]).forEach(o=>{
    counts[o.id]=(counts[o.id]||0)+o.qty;
  }));
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(e=>e[0]);
}

function salesCount(itemId) {
  let c=0;
  DB.get().tables.forEach(t=>(t.orders||[]).forEach(o=>{if(o.id===itemId)c+=o.qty;}));
  return c;
}

/* ═══ TOAST ═══ */
function toast(msg, type='success') {
  let zone = document.getElementById('toast-zone');
  if (!zone) { zone=document.createElement('div'); zone.id='toast-zone'; document.body.appendChild(zone); }
  zone.style.cssText='position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
  const el = document.createElement('div');
  const colors = {success:'rgba(34,197,94,0.35)',warn:'rgba(255,200,0,0.35)',critical:'rgba(255,75,75,0.5)'};
  const bgs    = {success:'rgba(0,20,8,0.95)',warn:'rgba(30,25,0,0.95)',critical:'rgba(30,0,0,0.95)'};
  const icons  = {success:'✅',warn:'⚠️',critical:'🚨'};
  el.style.cssText=`background:${bgs[type]||bgs.success};border:1px solid ${colors[type]||colors.success};border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px;font-size:13px;backdrop-filter:blur(20px);max-width:340px;animation:toastIn .3s ease;color:#e8e8f0;font-family:'DM Sans',sans-serif;`;
  el.innerHTML=`<span>${icons[type]||'ℹ️'}</span><span style="flex:1;">${msg}</span><span style="cursor:pointer;color:#666;" onclick="this.parentElement.remove()">✕</span>`;
  zone.appendChild(el);
  setTimeout(()=>{el.style.transition='all .3s';el.style.opacity='0';el.style.transform='translateX(120px)';setTimeout(()=>el.remove(),320);},4500);
}

/* ═══ BEEP ═══ */
function playBeep(freq=880, dur=0.5) {
  try {
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+dur);
    osc.start(); osc.stop(ctx.currentTime+dur);
  } catch(e){}
}

/* ═══ TICKER ═══ */
function initTicker() {
  const wrap = document.getElementById('ticker-wrap');
  const inner = document.getElementById('ticker-text');
  if (!wrap || !inner) return;
  const s = DB.get();
  if (!s.announcements) { wrap.style.display='none'; return; }
  wrap.style.display='block';
  const t = s.announcements;
  inner.innerHTML = `<span>${t}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;${t}</span>`;
}

/* ═══ CLOCK ═══ */
function startClock() {
  const tick = () => {
    const el = document.getElementById('live-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('tr-TR');
  };
  tick();
  setInterval(tick, 1000);
}