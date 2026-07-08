/* =========================================================
   Deutsch Bridge — Stylesheet
   Bunt & spielerisch (Duolingo-Style), responsiv, LTR.
   ========================================================= */

:root{
  --c-bg1:#eef4ff;
  --c-bg2:#f7f0ff;
  --c-bg3:#e8fbf1;
  --c-card:#ffffff;
  --c-ink:#1f2440;
  --c-ink-soft:#5b6080;
  --c-muted:#9098b5;

  --c-blue:#3b6ef6;
  --c-blue-d:#2559d6;
  --c-green:#23b97a;
  --c-green-d:#169a62;
  --c-yellow:#ffba2e;
  --c-orange:#ff8a3d;
  --c-pink:#ff5d8f;
  --c-purple:#8b5cf6;
  --c-red:#ef4444;

  --c-correct:#23b97a;
  --c-wrong:#ef4444;

  --radius:20px;
  --radius-sm:12px;
  --shadow:0 8px 24px rgba(40,60,120,.12);
  --shadow-lg:0 16px 40px rgba(40,60,120,.18);

  --font:'Segoe UI', system-ui, -apple-system, 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;padding:0;}
body{
  font-family:var(--font);
  color:var(--c-ink);
  background:
    radial-gradient(1200px 600px at -10% -10%, var(--c-bg2), transparent 60%),
    radial-gradient(900px 500px at 110% 0%, var(--c-bg3), transparent 55%),
    var(--c-bg1);
  min-height:100vh;
  min-height:100dvh;
  overflow-x:hidden;
}

#app{max-width:880px;margin:0 auto;padding:0 14px 60px;}

/* ---------- TOPBAR ---------- */
.topbar{
  position:sticky;top:0;z-index:50;
  display:flex;align-items:center;gap:10px;
  padding:10px 6px;margin-bottom:8px;
  background:linear-gradient(180deg, rgba(238,244,255,.92), rgba(238,244,255,.78));
  backdrop-filter:blur(8px);
  border-bottom:2px solid rgba(59,110,246,.08);
}
.brand{display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:800;letter-spacing:.2px;}
.brand-flag{font-size:1.4rem;}
.brand-name{font-size:1.05rem;}
.stats{margin-left:auto;display:flex;gap:8px;}
.stat{
  background:var(--c-card);border-radius:999px;padding:6px 12px;font-weight:700;font-size:.9rem;
  box-shadow:var(--shadow);white-space:nowrap;
}
.stat b{color:var(--c-blue);}
.icon-btn{
  border:none;background:var(--c-card);border-radius:14px;width:42px;height:42px;font-size:1.2rem;cursor:pointer;
  box-shadow:var(--shadow);transition:transform .12s ease;
}
.icon-btn:active{transform:scale(.92);}

/* ---------- SCREENS ---------- */
.screen{display:none;animation:fade .35s ease;}
.screen.active{display:block;}
@keyframes fade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

/* ---------- MAP / HOME ---------- */
.map-hero{
  background:linear-gradient(135deg,#3b6ef6,#8b5cf6);
  color:#fff;border-radius:var(--radius);padding:22px 20px;margin:14px 0 18px;
  box-shadow:var(--shadow-lg);position:relative;overflow:hidden;
}
.map-hero::after{
  content:"";position:absolute;right:-40px;top:-40px;width:180px;height:180px;border-radius:50%;
  background:rgba(255,255,255,.12);
}
.map-hero h1{margin:0 0 4px;font-size:1.5rem;}
.map-sub{margin:0 0 14px;opacity:.92;font-size:.98rem;}
.xpbar-wrap{background:rgba(255,255,255,.28);border-radius:999px;height:14px;overflow:hidden;}
.xpbar{height:100%;background:linear-gradient(90deg,var(--c-yellow),#fff);border-radius:999px;transition:width .6s ease;}
.lvl-label{margin-top:8px;font-size:.85rem;opacity:.95;}

.week-grid{display:flex;flex-direction:column;gap:18px;}
.week-block{background:var(--c-card);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow);}
.week-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.week-head h2{margin:0;font-size:1.1rem;}
.week-tag{font-size:.78rem;font-weight:700;color:#fff;background:var(--c-green);padding:4px 10px;border-radius:999px;}
.week-tag.locked{background:var(--c-muted);}
.day-path{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
.day-node{
  position:relative;border:none;border-radius:16px;padding:14px 6px 10px;cursor:pointer;text-align:center;
  background:linear-gradient(180deg,#f3f7ff,#e9efff);color:var(--c-ink);
  box-shadow:var(--shadow);transition:transform .12s ease, box-shadow .12s ease;
}
.day-node:hover{transform:translateY(-2px);}
.day-node:active{transform:translateY(0);}
.day-node .dn-icon{font-size:1.5rem;}
.day-node .dn-label{font-size:.74rem;font-weight:700;margin-top:2px;line-height:1.1;}
.day-node .dn-stars{font-size:.7rem;margin-top:3px;letter-spacing:1px;}
.day-node.done{background:linear-gradient(180deg,#e7fbee,#d4f7e3);}
.day-node.current{background:linear-gradient(180deg,#fff3d6,#ffe3a8);outline:3px solid var(--c-yellow);outline-offset:-3px;}
.day-node.locked{opacity:.55;cursor:not-allowed;background:linear-gradient(180deg,#eef0f6,#e4e7f0);}
.day-node.locked .dn-icon{filter:grayscale(1);}
.week-block.locked{opacity:.7;}

/* ---------- BADGES ---------- */
.badges-row{margin-top:26px;}
.badges-row h2{font-size:1.05rem;margin:0 0 10px;}
.badges-box{display:flex;flex-wrap:wrap;gap:10px;}
.badge{
  display:flex;flex-direction:column;align-items:center;gap:4px;width:84px;
  background:var(--c-card);border-radius:14px;padding:10px 6px;box-shadow:var(--shadow);text-align:center;
}
.badge .b-emoji{font-size:1.7rem;filter:grayscale(1) opacity(.5);transition:.3s;}
.badge .b-name{font-size:.66rem;font-weight:700;color:var(--c-muted);line-height:1.1;}
.badge.earned .b-emoji{filter:none;}
.badge.earned .b-name{color:var(--c-ink);}

/* ---------- LEVEL / STATION ---------- */
.level-head{display:flex;align-items:center;gap:10px;margin:10px 0 14px;}
.level-head .back{width:auto;padding:0 14px;height:42px;font-weight:700;font-size:.9rem;}
.level-title{font-weight:800;font-size:1.05rem;flex:1;}
.level-progress{flex:0 0 90px;height:10px;background:#e6ecf8;border-radius:999px;overflow:hidden;}
.level-progress-fill{height:100%;width:0;background:linear-gradient(90deg,var(--c-blue),var(--c-purple));transition:width .4s ease;}

#stationHost{display:flex;flex-direction:column;gap:16px;}

.card{
  background:var(--c-card);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);
}
.card h3{margin:0 0 10px;font-size:1.1rem;}
.card p{margin:0 0 8px;line-height:1.55;color:var(--c-ink-soft);}
.kicker{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--c-blue);margin-bottom:6px;}

/* station intro bar */
.station-bar{
  display:flex;align-items:center;gap:10px;background:#fff;border-radius:14px;padding:10px 14px;box-shadow:var(--shadow);
}
.station-bar .sb-dot{width:30px;height:30px;border-radius:50%;background:var(--c-blue);color:#fff;display:grid;place-items:center;font-weight:800;}
.station-bar .sb-title{font-weight:800;}
.station-bar .sb-type{margin-left:auto;font-size:.75rem;color:var(--c-muted);font-weight:700;text-transform:uppercase;}

/* ---------- HEAR / AUDIO BUTTONS ---------- */
.hear{
  border:none;background:linear-gradient(135deg,var(--c-blue),var(--c-blue-d));color:#fff;
  border-radius:999px;padding:8px 14px;font-weight:700;font-size:.86rem;cursor:pointer;
  display:inline-flex;align-items:center;gap:6px;box-shadow:var(--shadow);transition:transform .1s ease;
}
.hear:active{transform:scale(.95);}
.hear.speaking{animation:pulse 1s infinite;}
.hear.small{padding:6px 10px;font-size:.8rem;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(59,110,246,.4);}50%{box-shadow:0 0 0 8px rgba(59,110,246,0);}}
.hear-slow{background:linear-gradient(135deg,#8b5cf6,#6d3fe0);}

/* ---------- THEORIE ---------- */
.theorie-example{
  display:flex;align-items:center;gap:10px;background:#f3f7ff;border-radius:12px;padding:10px 12px;margin:6px 0;
}
.theorie-example .word{font-weight:800;font-size:1.05rem;}
.theorie-example .gloss{color:var(--c-ink-soft);font-size:.9rem;}
.theorie-example .hear{margin-left:auto;}
.rule-box{background:#fff8e6;border-left:5px solid var(--c-yellow);border-radius:10px;padding:10px 12px;margin:8px 0;}

/* ---------- VOKABELN (Flip cards) ---------- */
.flip-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;}
.flip{
  perspective:900px;height:130px;cursor:pointer;
}
.flip-inner{
  position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d;
}
.flip.flipped .flip-inner{transform:rotateY(180deg);}
.flip-face{
  position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px;
  box-shadow:var(--shadow);
}
.flip-front{background:linear-gradient(180deg,#fff,#eef4ff);text-align:center;}
.flip-front .fw{font-size:1.15rem;font-weight:800;}
.flip-back{transform:rotateY(180deg);background:linear-gradient(180deg,#e7fbee,#d4f7e3);}
.flip-back .fg{font-size:.92rem;font-weight:700;text-align:center;}
.flip-hint{font-size:.68rem;color:var(--c-muted);}
.flip-mark{
  position:absolute;top:8px;right:8px;font-size:1.2rem;opacity:0;transition:.3s;
}
.flip.learned .flip-mark{opacity:1;}

/* ---------- QUIZ ---------- */
.quiz-q{font-size:1.08rem;font-weight:800;margin-bottom:12px;}
.quiz-options{display:grid;gap:10px;}
.quiz-opt{
  text-align:left;border:2px solid #e6ecf8;background:#fff;border-radius:14px;padding:14px 16px;cursor:pointer;
  font-size:1rem;font-weight:600;transition:.15s;display:flex;align-items:center;gap:10px;
}
.quiz-opt:hover{border-color:var(--c-blue);}
.quiz-opt .qo-key{
  width:28px;height:28px;border-radius:8px;background:#eef4ff;color:var(--c-blue);display:grid;place-items:center;font-weight:800;font-size:.8rem;flex:0 0 auto;
}
.quiz-opt.correct{border-color:var(--c-correct);background:#e7fbee;}
.quiz-opt.correct .qo-key{background:var(--c-correct);color:#fff;}
.quiz-opt.wrong{border-color:var(--c-wrong);background:#fdeaec;}
.quiz-opt.wrong .qo-key{background:var(--c-wrong);color:#fff;}
.quiz-opt.disabled{pointer-events:none;}
.quiz-feedback{margin-top:10px;font-weight:700;font-size:.95rem;min-height:1.2em;}
.quiz-feedback.ok{color:var(--c-correct);}
.quiz-feedback.no{color:var(--c-wrong);}

/* ---------- SORTIEREN ---------- */
.sort-instr{font-weight:700;margin-bottom:10px;}
.sort-bins{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
.sort-bin{
  border-radius:14px;padding:12px;min-height:60px;background:#f3f7ff;border:2px dashed #cdd8f5;text-align:center;
}
.sort-bin .sb-name{font-weight:800;margin-bottom:6px;}
.sort-bin.dragover{border-color:var(--c-blue);background:#eaf0ff;}
.sort-pool{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:8px;}
.sort-chip{
  background:#fff;border:2px solid #e6ecf8;border-radius:999px;padding:8px 14px;font-weight:700;cursor:pointer;
  box-shadow:var(--shadow);user-select:none;transition:transform .1s;
}
.sort-chip:active{transform:scale(.95);}
.sort-chip.placed{opacity:.35;pointer-events:none;}
.sort-chip.correct{border-color:var(--c-correct);background:#e7fbee;}
.sort-chip.wrong{border-color:var(--c-wrong);background:#fdeaec;animation:shake .4s;}
@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}

/* ---------- VERBINDEN ---------- */
.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;}
.match-col{display:flex;flex-direction:column;gap:8px;}
.match-item{
  background:#fff;border:2px solid #e6ecf8;border-radius:12px;padding:12px;font-weight:700;cursor:pointer;text-align:center;box-shadow:var(--shadow);
  transition:.15s;
}
.match-item:hover{border-color:var(--c-blue);}
.match-item.sel{border-color:var(--c-blue);background:#eaf0ff;}
.match-item.matched{background:#e7fbee;border-color:var(--c-correct);pointer-events:none;opacity:.7;}
.match-item.wrong{border-color:var(--c-wrong);background:#fdeaec;animation:shake .4s;}

/* ---------- GESCHICHTE ---------- */
.story-head{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.story-toggle{margin-left:auto;font-size:.8rem;font-weight:700;background:#eef4ff;border:none;border-radius:999px;padding:6px 12px;cursor:pointer;color:var(--c-blue);}
.story-text{font-size:1.12rem;line-height:1.9;}
.story-sentence{
  cursor:pointer;border-radius:8px;padding:2px 4px;transition:background .15s;
}
.story-sentence:hover{background:#eef4ff;}
.story-sentence.playing{background:#fff3d6;}
.story-gloss{font-size:.92rem;color:var(--c-muted);font-style:normal;display:none;margin-top:8px;line-height:1.7;}
.show-gloss .story-gloss{display:block;}
.show-gloss .story-text-only{display:none;}

/* ---------- AUSSPRACHE / RECORDING ---------- */
.pron-stage{
  background:linear-gradient(180deg,#f3f7ff,#eef4ff);border-radius:16px;padding:18px;text-align:center;
}
.pron-target{font-size:1.2rem;font-weight:800;margin:6px 0 14px;}
.pron-target small{display:block;font-size:.8rem;font-weight:600;color:var(--c-muted);margin-top:4px;}
.rec-row{display:flex;align-items:center;justify-content:center;gap:12px;margin:10px 0;}
.rec-btn{
  border:none;border-radius:50%;width:72px;height:72px;font-size:1.6rem;cursor:pointer;color:#fff;
  background:linear-gradient(135deg,var(--c-pink),#e23d72);box-shadow:var(--shadow-lg);transition:transform .12s;
}
.rec-btn:active{transform:scale(.93);}
.rec-btn.recording{animation:recPulse 1.2s infinite;}
@keyframes recPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,93,143,.5);}50%{box-shadow:0 0 0 14px rgba(255,93,143,0);}}
.play-btn{
  border:none;border-radius:50%;width:56px;height:56px;font-size:1.2rem;cursor:pointer;color:#fff;
  background:linear-gradient(135deg,var(--c-green),var(--c-green-d));box-shadow:var(--shadow);transition:transform .12s;
}
.play-btn:disabled{opacity:.4;cursor:not-allowed;}
.play-btn:active{transform:scale(.93);}
.rec-hint{font-size:.82rem;color:var(--c-muted);margin-top:6px;}
.rate-row{display:flex;gap:10px;justify-content:center;margin-top:14px;}
.rate-btn{
  border:none;border-radius:14px;padding:12px 18px;font-weight:800;cursor:pointer;box-shadow:var(--shadow);font-size:.92rem;
}
.rate-good{background:linear-gradient(135deg,var(--c-green),var(--c-green-d));color:#fff;}
.rate-again{background:#fff;color:var(--c-ink);border:2px solid #e6ecf8;}
.rec-perm-note{font-size:.8rem;color:var(--c-wrong);margin-top:8px;display:none;}
.audio-player{display:none;}

/* ---------- MEILENSTEIN ---------- */
.milestone-criteria{display:flex;flex-direction:column;gap:8px;margin:10px 0;}
.crit-item{
  display:flex;align-items:flex-start;gap:10px;background:#f3f7ff;border-radius:12px;padding:10px 12px;cursor:pointer;
}
.crit-item .ci-box{width:24px;height:24px;border-radius:7px;border:2px solid #cdd8f5;flex:0 0 auto;display:grid;place-items:center;font-weight:800;color:#fff;font-size:.8rem;margin-top:1px;}
.crit-item.checked .ci-box{background:var(--c-green);border-color:var(--c-green);}
.crit-item .ci-text{font-size:.92rem;line-height:1.45;}
.crit-item .ci-text b{display:block;}

/* ---------- NAV / WEITER ---------- */
.station-nav{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:6px;}
.btn{
  border:none;border-radius:14px;padding:13px 20px;font-weight:800;cursor:pointer;font-size:.98rem;box-shadow:var(--shadow);transition:transform .1s;
}
.btn:active{transform:scale(.97);}
.btn.primary{background:linear-gradient(135deg,var(--c-green),var(--c-green-d));color:#fff;}
.btn.secondary{background:linear-gradient(135deg,var(--c-blue),var(--c-blue-d));color:#fff;}
.btn.ghost{background:#fff;color:var(--c-ink);border:2px solid #e6ecf8;box-shadow:none;}
.btn:disabled{opacity:.5;cursor:not-allowed;}
.btn.prev{background:#fff;color:var(--c-ink);border:2px solid #e6ecf8;box-shadow:none;}

/* ---------- ABSCHLUSS ---------- */
#screen-done{display:none;min-height:80vh;align-items:center;justify-content:center;}
#screen-done.active{display:flex;}
.done-card{
  background:var(--c-card);border-radius:24px;padding:30px 24px;text-align:center;box-shadow:var(--shadow-lg);
  max-width:420px;width:100%;position:relative;z-index:2;
}
.done-emoji{font-size:3.4rem;}
.done-card h1{margin:6px 0 10px;font-size:1.6rem;}
.done-stars{font-size:2.2rem;letter-spacing:4px;margin:6px 0;}
.done-xp{font-size:1.1rem;margin:4px 0;}
.done-xp b{color:var(--c-blue);}
.done-msg{color:var(--c-ink-soft);margin:8px 0 18px;line-height:1.5;}
.done-actions{display:flex;flex-direction:column;gap:10px;}

.confetti{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;}

/* ---------- TOAST ---------- */
.toast{
  position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(120px);
  background:var(--c-ink);color:#fff;padding:12px 18px;border-radius:14px;font-weight:700;box-shadow:var(--shadow-lg);
  z-index:200;opacity:0;transition:.3s;max-width:90vw;text-align:center;
}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;}
.toast.ok{background:var(--c-green);}
.toast.no{background:var(--c-red);}

/* ---------- VOICE NOTICE ---------- */
.voice-notice{
  position:fixed;left:12px;right:12px;bottom:12px;z-index:300;
  background:#fff8e6;border:2px solid var(--c-yellow);border-radius:14px;padding:12px 14px;
  display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-lg);font-size:.88rem;
}
.voice-notice.hidden{display:none;}
.voice-notice button{margin-left:auto;background:none;border:none;font-size:1rem;cursor:pointer;color:var(--c-muted);}
.hidden{display:none !important;}

/* ---------- FEEDBACK POP ---------- */
.pop{position:fixed;inset:0;display:none;place-items:center;z-index:150;}
.pop.show{display:grid;}
.pop-inner{
  background:#fff;border-radius:24px;padding:26px 24px;text-align:center;min-width:240px;box-shadow:var(--shadow-lg);
  animation:popIn .3s ease;
}
@keyframes popIn{from{transform:scale(.7);opacity:0;}to{transform:scale(1);opacity:1;}}
.pop-emoji{font-size:3rem;}
.pop-text{font-weight:800;font-size:1.2rem;margin-top:4px;}
.pop.ok .pop-emoji{}
.pop.no .pop-emoji{}

/* ---------- START OVERLAY ---------- */
.start-overlay{
  position:fixed; inset:0; z-index:500; display:none; place-items:center;
  background:linear-gradient(135deg,#3b6ef6 0%, #8b5cf6 50%, #ff5d8f 100%);
  padding:20px;
}
.start-overlay.show{ display:grid; animation:fade .4s ease;}
.start-card{
  background:#fff; border-radius:28px; padding:34px 26px; text-align:center; max-width:440px; width:100%;
  box-shadow:0 30px 80px rgba(0,0,0,.3); animation:popIn .5s ease;
}
.start-flags{font-size:4rem; line-height:1;}
.start-card h1{margin:6px 0 2px; font-size:2rem; background:linear-gradient(135deg,#3b6ef6,#8b5cf6); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;}
.start-sub{margin:0 0 12px; color:var(--c-purple); font-weight:700;}
.start-desc{color:var(--c-ink-soft); line-height:1.55; margin:0 0 18px; font-size:.96rem;}
.start-feats{display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:22px;}
.feat{background:#f3f7ff; border-radius:12px; padding:10px 8px; font-weight:700; font-size:.82rem; color:var(--c-blue);}
.start-btn{
  border:none; border-radius:16px; padding:15px 24px; font-size:1.1rem; font-weight:800; cursor:pointer; width:100%;
  background:linear-gradient(135deg,#23b97a,#169a62); color:#fff; box-shadow:var(--shadow-lg); transition:transform .12s;
  margin-bottom:8px;
}
.start-btn:active{transform:scale(.97);}
.start-btn.ghost{background:#fff; color:var(--c-blue); border:2px solid #e6ecf8; box-shadow:none;}
.start-foot{margin:10px 0 0; font-size:.78rem; color:var(--c-muted);}

/* ---------- RESPONSIVE ---------- */
@media (max-width:560px){
  .brand-name{display:none;}
  .stat{padding:5px 9px;font-size:.82rem;}
  .map-hero h1{font-size:1.3rem;}
  .day-node{padding:10px 4px 8px;}
  .day-node .dn-label{font-size:.66rem;}
  .day-node .dn-icon{font-size:1.3rem;}
  .flip-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr));}
  .level-progress{flex-basis:60px;}
  .sort-bins{grid-template-columns:1fr 1fr;}
}
@media (max-width:380px){
  .stat{padding:5px 7px;font-size:.76rem;}
}
