/* =========================================================
   Deutsch Bridge — PROGRESS / STORAGE
   Speichert Fortschritt im Browser (localStorage).
   ========================================================= */

var Store = (function(){
  var KEY = 'deutschBridge_v1';
  var state = null;

  var DEFAULTS = {
    started: false,
    xp: 0,
    streak: 0,
    lastPlayDate: null,      // yyyy-mm-dd
    days: {},                // dayId -> { stars, completed, bestPct }
    badges: {},              // badgeId -> true
    weekStars: {}            // weekId -> number (cache)
  };

  function load(){
    try{
      var raw = localStorage.getItem(KEY);
      if(raw){ state = JSON.parse(raw); }
      else { state = JSON.parse(JSON.stringify(DEFAULTS)); }
    }catch(e){
      state = JSON.parse(JSON.stringify(DEFAULTS));
    }
    // fehlende Felder auffüllen
    for(var k in DEFAULTS){ if(state[k]===undefined) state[k] = DEFAULTS[k]; }
    if(!state.days) state.days = {};
    if(!state.badges) state.badges = {};
    if(!state.weekStars) state.weekStars = {};
    return state;
  }

  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  }

  function get(){ if(!state) load(); return state; }

  function reset(){ state = JSON.parse(JSON.stringify(DEFAULTS)); save(); }

  function todayStr(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }

  /* --- Streak-Pflege beim Start des Spielens (nicht nur Laden) --- */
  function touchStreak(){
    var today = todayStr();
    if(state.lastPlayDate === today){
      // schon gezählt
    } else {
      var yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      var yStr = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate();
      if(state.lastPlayDate === yStr){
        state.streak += 1;            // Serie verlängern
      } else if(state.lastPlayDate === null){
        state.streak = 1;             // allererster Tag
      } else {
        state.streak = 1;             // Serie war unterbrochen -> neu starten
      }
      state.lastPlayDate = today;
      save();
    }
  }

  /* --- Tag als abgeschlossen markieren --- */
  function completeDay(dayId, stars, xpGained){
    if(!state.days[dayId]) state.days[dayId] = {stars:0,completed:false,bestPct:0};
    var d = state.days[dayId];
    var prevStars = d.stars || 0;
    d.stars = Math.max(prevStars, stars);
    d.completed = true;
    // XP nur für NEUE Sterne addieren (kein Farmen), Basis-XP aber immer etwas
    var newStarGain = Math.max(0, stars - prevStars) * 20;
    state.xp += (xpGained + newStarGain);
    touchStreak();
    save();
    return { totalStars: d.stars };
  }

  function getDay(dayId){
    return state.days[dayId] || null;
  }

  function totalStars(){
    var s=0;
    for(var k in state.days){ if(state.days[k].stars) s += state.days[k].stars; }
    return s;
  }

  function weekStars(weekId){
    var s=0;
    // Berechne aus allen days dieser Woche anhand des Präfix
    for(var k in state.days){
      if(k.indexOf(weekId)===0 && state.days[k].stars){ s += state.days[k].stars; }
    }
    return s;
  }

  function awardBadge(id){
    if(!state.badges[id]){ state.badges[id]=true; save(); return true; }
    return false;
  }

  function hasBadge(id){ return !!state.badges[id]; }

  /* --- Freischalt-Logik: ist ein Tag spielbar? --- */
  function isWeekUnlocked(weekIdx){
    if(weekIdx===0) return true;                 // Woche 1 frei
    // vorherige Woche muss alle 5 Tage abgeschlossen sein
    var prevWeek = COURSE.weeks[weekIdx-1];
    if(!prevWeek) return false;
    for(var i=0;i<prevWeek.days.length;i++){
      var d = state.days[prevWeek.days[i].id];
      if(!d || !d.completed) return false;
    }
    return true;
  }

  function isDayUnlocked(weekIdx, dayIdx){
    var week = COURSE.weeks[weekIdx];
    if(!week) return false;
    if(week.locked && !isWeekUnlocked(weekIdx)) return false;
    if(dayIdx===0) return true;                  // erster Tag frei (wenn Woche frei)
    var prev = week.days[dayIdx-1];
    var pd = state.days[prev.id];
    return !!(pd && pd.completed);
  }

  return {
    load: load, save: save, get: get, reset: reset,
    touchStreak: touchStreak, completeDay: completeDay,
    getDay: getDay, totalStars: totalStars, weekStars: weekStars,
    awardBadge: awardBadge, hasBadge: hasBadge,
    isWeekUnlocked: isWeekUnlocked, isDayUnlocked: isDayUnlocked
  };
})();
