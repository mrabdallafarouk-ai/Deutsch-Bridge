/* =========================================================
   Deutsch Bridge — GAME ENGINE (app.js)
   Steuert: Start-Screen, Karte, Level, Stationen, Abschluss,
   Gamification (XP, Sterne, Streak, Abzeichen, Freischaltungen).
   ========================================================= */

(function(){
  "use strict";

  // ---- Referenzen ----
  var $ = function(id){ return document.getElementById(id); };
  var screens = {
    map: $('screen-map'),
    level: $('screen-level'),
    done: $('screen-done')
  };
  var startOverlay = null;

  // ---- Spiel-Zustand (Session) ----
  var session = {
    weekIdx: 0,
    dayIdx: 0,
    stationIdx: 0,
    stationXp: 0,          // XP in aktuellem Level gesammelt
    correctCount: 0,       // korrekte Quiz/Sortier-Antworten im Level
    totalCount: 0,         // zählbare Aufgaben im Level
    stationCompleted: []   // boolean pro Station
  };

  // ====================================================
  //  INIT
  // ====================================================
  document.addEventListener('DOMContentLoaded', function(){
    Store.load();
    Audio2.onVoiceMissing(showVoiceNotice);
    Audio2.init();

    buildStartOverlay();          // Start-Button
    wireGlobal();
    renderMap();
    updateTopStats();

    if(!Store.get().started){
      showStart();
    } else {
      go('map');
    }
  });

  // ====================================================
  //  START-SCREEN (Start-Button)
  // ====================================================
  function buildStartOverlay(){
    startOverlay = document.createElement('div');
    startOverlay.className = 'start-overlay';
    startOverlay.id = 'startOverlay';
    startOverlay.innerHTML =
      '<div class="start-card">'+
        '<div class="start-flags">🇩🇪</div>'+
        '<h1>Deutsch Bridge</h1>'+
        '<p class="start-sub">Dein Aussprache-Abenteuer</p>'+
        '<p class="start-desc">Lerne deutsche Aussprache spielerisch — 5 Wochen, jede Woche 5 Levels. Höre jedes Wort, sprich nach, sammle Sterne!</p>'+
        '<div class="start-feats">'+
          '<div class="feat">🔊 Jedes Wort hörbar</div>'+
          '<div class="feat">🎤 Du sprichst &amp; bewertest</div>'+
          '<div class="feat">⭐ Sterne &amp; Abzeichen</div>'+
          '<div class="feat">🗺️ 5 Wochen Reise</div>'+
        '</div>'+
        '<button class="start-btn" id="startGoBtn">▶ Reise starten</button>'+
        (Store.get().xp>0 ? '<button class="start-btn ghost" id="startResumeBtn">↩ Weitermachen</button>' : '')+
        '<p class="start-foot">Niveau A2 · Aussprache-Training</p>'+
      '</div>';
    document.body.appendChild(startOverlay);
  }

  function showStart(){
    if(startOverlay) startOverlay.classList.add('show');
  }
  function hideStart(){
    if(startOverlay){ startOverlay.classList.remove('show'); }
  }

  // ====================================================
  //  GLOBALE EVENTS
  // ====================================================
  function wireGlobal(){
    $('homeBtn').addEventListener('click', function(){ go('map'); });
    $('brandBtn').addEventListener('click', function(){ go('map'); });
    $('levelBackBtn').addEventListener('click', function(){ go('map'); });
    $('doneHomeBtn').addEventListener('click', function(){ go('map'); renderMap(); updateTopStats(); });
    $('doneNextBtn').addEventListener('click', onNextAfterDone);
    $('voiceNoticeClose').addEventListener('click', function(){ $('voiceNotice').classList.add('hidden'); });

    // Delegierter Start-Button
    document.addEventListener('click', function(e){
      if(e.target && e.target.id==='startGoBtn'){ onPrimaryStart(); }
      if(e.target && e.target.id==='startResumeBtn'){ onPrimaryStart(); }
    });
  }

  function onPrimaryStart(){
    Store.get().started = true;
    Store.touchStreak();
    Store.save();
    hideStart();
    // Ersten freien Tag finden und dorthin springen
    var target = findCurrentLevel();
    session.weekIdx = target.wi;
    session.dayIdx = target.di;
    openLevel();
  }

  // Finde den Level, den der Spieler als nächstes machen sollte
  function findCurrentLevel(){
    for(var wi=0; wi<COURSE.weeks.length; wi++){
      var week = COURSE.weeks[wi];
      if(week.locked && !Store.isWeekUnlocked(wi)) continue;
      for(var di=0; di<week.days.length; di++){
        var day = week.days[di];
        if(day.locked) continue;
        var st = Store.getDay(day.id);
        if(!st || !st.completed){
          if(Store.isDayUnlocked(wi, di)) return {wi:wi, di:di};
        }
      }
    }
    // alle erledigt -> Woche 1 Tag 1
    return {wi:0, di:0};
  }

  // ====================================================
  //  SCREEN-WECHSEL
  // ====================================================
  function go(name){
    for(var k in screens){ screens[k].classList.remove('active'); }
    if(screens[name]){ screens[name].classList.add('active'); }
    window.scrollTo({top:0, behavior:'smooth'});
    if(name==='map'){ renderMap(); updateTopStats(); }
  }

  // ====================================================
  //  TOP-STATS
  // ====================================================
  function updateTopStats(){
    var s = Store.get();
    $('xpVal').textContent = s.xp;
    $('streakVal').textContent = s.streak;
    $('starsVal').textContent = Store.totalStars();
    // XP-Bar (Level = 100 XP)
    var lvl = Math.floor(s.xp/100)+1;
    var pct = (s.xp % 100);
    $('xpBar').style.width = pct + '%';
    $('lvlNum').textContent = lvl;
    $('totalStarsMap').textContent = Store.totalStars();
  }

  // ====================================================
  //  KARTE (Home)
  // ====================================================
  function renderMap(){
    var grid = $('weekGrid');
    grid.innerHTML = '';
    var s = Store.get();

    // Abzeichen-Leiste aktualisieren
    renderBadges();

    COURSE.weeks.forEach(function(week, wi){
      var unlocked = (week.locked===false) || Store.isWeekUnlocked(wi);
      var block = document.createElement('div');
      block.className = 'week-block' + (unlocked?'':' locked');

      var head = document.createElement('div');
      head.className = 'week-head';
      head.innerHTML =
        '<h2>'+esc(week.title)+(week.subtitle?(' · <span style="color:var(--c-muted);font-weight:600">'+esc(week.subtitle)+'</span>'):'')+'</h2>'+
        '<span class="week-tag'+(unlocked?'':' locked')+'">'+(unlocked?('Sterne: '+Store.weekStars(week.id)+'/15'):'🔒 Gesperrt')+'</span>';
      block.appendChild(head);

      var path = document.createElement('div');
      path.className = 'day-path';

      week.days.forEach(function(day, di){
        var canPlay = unlocked && Store.isDayUnlocked(wi, di) && !day.locked;
        var st = Store.getDay(day.id);
        var done = st && st.completed;
        var stars = st ? (st.stars||0) : 0;

        var node = document.createElement('button');
        node.className = 'day-node';
        if(done) node.classList.add('done');
        if(canPlay && !done) node.classList.add('current');
        if(!canPlay) node.classList.add('locked');

        var starStr = '';
        for(var i=0;i<3;i++){ starStr += (i<stars)?'⭐':'☆'; }
        if(!canPlay) starStr = '';

        node.innerHTML =
          '<div class="dn-icon">'+(canPlay?day.icon:'🔒')+'</div>'+
          '<div class="dn-label">'+esc(day.title)+(day.subtitle?('<br><span style="font-weight:600;opacity:.85">'+esc(day.subtitle)+'</span>'):'')+'</div>'+
          '<div class="dn-stars">'+starStr+'</div>';

        if(canPlay){
          (function(wi,di){ node.addEventListener('click', function(){
            session.weekIdx = wi; session.dayIdx = di;
            openLevel();
          }); })(wi,di);
        } else {
          node.addEventListener('click', function(){
            if(!unlocked){ toast('Schließe erst die vorige Woche ab 🔒', false); }
            else { toast('Schließe erst den vorigen Tag ab 🔒', false); }
          });
        }
        path.appendChild(node);
      });

      block.appendChild(path);
      grid.appendChild(block);
    });
  }

  function renderBadges(){
    var box = $('badgesBox');
    box.innerHTML = '';
    BADGES.forEach(function(b){
      var el = document.createElement('div');
      el.className = 'badge'+(Store.hasBadge(b.id)?' earned':'');
      el.innerHTML = '<div class="b-emoji">'+b.emoji+'</div><div class="b-name">'+esc(b.name)+'</div>';
      el.title = b.desc;
      box.appendChild(el);
    });
  }

  // ====================================================
  //  LEVEL ÖFFNEN
  // ====================================================
  function openLevel(){
    var day = COURSE.weeks[session.weekIdx].days[session.dayIdx];
    if(day.locked){ toast('Dieser Tag ist noch gesperrt.', false); return; }

    session.stationIdx = 0;
    session.stationXp = 0;
    session.correctCount = 0;
    session.totalCount = 0;
    session.stationCompleted = [];

    $('levelTitle').textContent = day.title + ' · ' + day.subtitle;
    updateLevelProgress();
    go('level');
    renderStation();
  }

  function updateLevelProgress(){
    var day = COURSE.weeks[session.weekIdx].days[session.dayIdx];
    var total = day.activities.length;
    var done = session.stationIdx; // Index = Anzahl abgeschlossen
    var pct = total? Math.round((done/total)*100) : 0;
    $('levelProgressFill').style.width = pct + '%';
  }

  // ====================================================
  //  STATION RENDERN
  // ====================================================
  function renderStation(){
    var day = COURSE.weeks[session.weekIdx].days[session.dayIdx];
    var act = day.activities[session.stationIdx];
    var host = $('stationHost');
    host.innerHTML = '';

    if(!act){
      finishLevel();
      return;
    }

    updateLevelProgress();

    // Station-Bar
    var bar = document.createElement('div');
    bar.className = 'station-bar';
    bar.innerHTML =
      '<div class="sb-dot">'+(session.stationIdx+1)+'</div>'+
      '<div class="sb-title">'+esc(act.title)+'</div>'+
      '<div class="sb-type">'+typeLabel(act.type)+'</div>';
    host.appendChild(bar);

    // Renderer wählen
    switch(act.type){
      case 'theorie':    renderTheorie(act, host); break;
      case 'vokabeln':   renderVokabeln(act, host); break;
      case 'quiz':       renderQuiz(act, host); break;
      case 'sortieren':  renderSortieren(act, host); break;
      case 'verbinden':  renderVerbinden(act, host); break;
      case 'geschichte': renderGeschichte(act, host); break;
      case 'aussprache': renderAussprache(act, host); break;
      case 'meilenstein':renderMeilenstein(act, host); break;
      default: renderTheorie(act, host);
    }
  }

  function typeLabel(t){
    var map = {
      theorie:'🎓 Theorie', vokabeln:'🃏 Vokabeln', quiz:'❓ Quiz',
      sortieren:'🧩 Übung', verbinden:'🔗 Verbinden', geschichte:'📖 Geschichte',
      aussprache:'🎤 Aussprache', meilenstein:'🏆 Meilenstein'
    };
    return map[t]||'Übung';
  }

  // ---- Hilfsfunktion: Hear-Button erzeugen ----
  function hearBtn(text, cls){
    var b = document.createElement('button');
    b.className = 'hear' + (cls?(' '+cls):'');
    b.innerHTML = '🔊 <span>Hören</span>';
    b.addEventListener('click', function(){ Audio2.speak(text, {button:b}); });
    return b;
  }
  function hearBtnSlow(text){
    var b = document.createElement('button');
    b.className = 'hear hear-slow small';
    b.innerHTML = '🐢 Langsam';
    b.addEventListener('click', function(){ Audio2.speak(text, {rate:0.6, button:b}); });
    return b;
  }

  // ====================================================
  //  RENDERER: THEORIE
  // ====================================================
  function renderTheorie(act, host){
    var card = document.createElement('div');
    card.className = 'card';
    act.blocks.forEach(function(bl){
      if(bl.kind==='text'){
        var p = document.createElement('p'); p.textContent = bl.text; card.appendChild(p);
      } else if(bl.kind==='rule'){
        var r = document.createElement('div'); r.className='rule-box'; r.textContent = bl.text; card.appendChild(r);
      } else if(bl.kind==='example'){
        var ex = document.createElement('div'); ex.className='theorie-example';
        var w = document.createElement('div');
        w.innerHTML = '<span class="word">'+esc(bl.word)+'</span>'+
                      (bl.gloss?(' <span class="gloss">'+esc(bl.gloss)+'</span>'):'');
        ex.appendChild(w);
        ex.appendChild(hearBtn(bl.word));
        card.appendChild(ex);
      }
    });
    host.appendChild(card);
    appendNav(host, true, true);  // Theorie: Weiter ohne Punkte
  }

  // ====================================================
  //  RENDERER: VOKABELN
  // ====================================================
  function renderVokabeln(act, host){
    var card = document.createElement('div');
    card.className = 'card';
    var p = document.createElement('p');
    p.style.cssText='margin-bottom:12px;color:var(--c-ink-soft);';
    p.textContent = 'Tippe eine Karte an, um die Bedeutung zu sehen. Tippe 🔊 zum Hören. Markiere gelernte Karten.';
    card.appendChild(p);

    var grid = document.createElement('div');
    grid.className = 'flip-grid';
    var learned = 0;

    act.cards.forEach(function(c){
      var flip = document.createElement('div'); flip.className='flip';
      flip.innerHTML =
        '<div class="flip-inner">'+
          '<div class="flip-face flip-front">'+
            '<div class="fw">'+esc(c.word)+'</div>'+
            '<div class="flip-hint">tippen zum Umdrehen</div>'+
          '</div>'+
          '<div class="flip-face flip-back">'+
            '<div class="fg">'+esc(c.gloss)+'</div>'+
          '</div>'+
          '<div class="flip-mark">✅</div>'+
        '</div>';
      var toggled=false, isLearned=false;
      flip.addEventListener('click', function(){
        if(!toggled){ flip.classList.add('flipped'); toggled=true; }
        else { flip.classList.toggle('learned'); isLearned = flip.classList.contains('learned'); }
      });
      // Hören per Doppel-Langdruck? Einfacher: eigener Button über Karte
      var hb = hearBtn(c.word,'small');
      hb.style.cssText='position:absolute;bottom:6px;right:6px;z-index:3;';
      hb.addEventListener('click', function(e){ e.stopPropagation(); });
      flip.style.position='relative';
      flip.appendChild(hb);
      grid.appendChild(flip);
    });

    card.appendChild(grid);
    host.appendChild(card);
    appendNav(host, true, true);
  }

  // ====================================================
  //  RENDERER: QUIZ
  // ====================================================
  function renderQuiz(act, host){
    session.totalCount++;
    var card = document.createElement('div'); card.className='card';
    var q = document.createElement('div'); q.className='quiz-q';
    // Frage + Hören falls Zielwort extrahiert werden kann
    q.innerHTML = esc(act.q);
    card.appendChild(q);

    var played = false;
    // Falls Frage ein Wort in Anführungszeichen enthält, Hören-Button anbieten
    var m = act.q.match(/[„"]([^""]+)[“"]/);
    if(m){
      card.appendChild(wrapHear(m[1]));
    }

    var opts = document.createElement('div'); opts.className='quiz-options';
    act.options.forEach(function(opt, idx){
      var b = document.createElement('button');
      b.className='quiz-opt';
      b.innerHTML = '<span class="qo-key">'+String.fromCharCode(65+idx)+'</span><span>'+esc(opt)+'</span>';
      b.addEventListener('click', function(){
        if(played) return; played=true;
        var correct = (idx===act.answer);
        var all = opts.querySelectorAll('.quiz-opt');
        all.forEach(function(x){ x.classList.add('disabled'); });
        all[act.answer].classList.add('correct');
        if(!correct){ b.classList.add('wrong'); }

        var fb = document.createElement('div');
        fb.className = 'quiz-feedback '+(correct?'ok':'no');
        fb.innerHTML = (correct?'✅ Richtig! ':'❌ Nicht ganz. ') + (act.explain?(' '+esc(act.explain)):'');
        card.appendChild(fb);

        if(correct){ session.correctCount++; awardXp(10); pop('ok','Super!'); }
        else { awardXp(3); pop('no','Weiter üben!'); }

        revealNav(card, host);
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);
    host.appendChild(card);
  }

  function wrapHear(text){
    var div = document.createElement('div'); div.style.cssText='margin:6px 0 12px;';
    div.appendChild(hearBtn(text));
    return div;
  }

  // ====================================================
  //  RENDERER: SORTIEREN
  // ====================================================
  function renderSortieren(act, host){
    session.totalCount++;
    var card = document.createElement('div'); card.className='card';
    var instr = document.createElement('div'); instr.className='sort-instr'; instr.textContent = act.instr;
    card.appendChild(instr);

    var remaining = act.items.length;
    var placed = 0;

    var pool = document.createElement('div'); pool.className='sort-pool';
    var binsWrap = document.createElement('div'); binsWrap.className='sort-bins';

    var binEls = [];
    act.bins.forEach(function(bin, bi){
      var bel = document.createElement('div'); bel.className='sort-bin';
      bel.innerHTML = '<div class="sb-name">'+esc(bin.name)+'</div><div class="bin-items"></div>';
      binEls.push(bel);
      binsWrap.appendChild(bel);
    });

    card.appendChild(binsWrap);
    card.appendChild(pool);

    // Chips bauen und mischen
    var items = act.items.slice();
    shuffle(items);
    items.forEach(function(item){
      var chip = document.createElement('div'); chip.className='sort-chip'; chip.textContent=item.text;
      chip.appendChild(hearBtnInline(item.text));
      var done=false;
      chip.addEventListener('click', function(){
        if(done) return;
        // Einfache Zuweisung durch Klick-Zyklus wäre kompliziert; wir nutzen Tap->Tap auf Bin.
        selectChipForBin(chip, item, function(binIdx){
          if(done) return; done=true;
          chip.classList.add('placed');
          var ok = (binIdx===item.bin);
          if(ok){ chip.classList.add('correct'); placed++; session.correctCount++; awardXp(8); }
          else  { chip.classList.add('wrong'); awardXp(2); }
          // Chip in Bin verschieben
          binEls[binIdx].querySelector('.bin-items').appendChild(chip);
          chip.style.margin='4px';
          if(placed>=remaining){
            var fb=document.createElement('div'); fb.className='quiz-feedback ok'; fb.textContent='✅ Fertig! '+placed+' von '+remaining+' richtig.';
            card.appendChild(fb);
            pop(placed===remaining?'ok':'no', placed===remaining?'Perfekt!':'Gut gemacht!');
            revealNav(card, host);
          }
        });
      });
      pool.appendChild(chip);
    });

    host.appendChild(card);

    // ---- Tap-Chip dann Tap-Bin Logik ----
    var selectedChip = null, selectedItem = null, selectedCallback = null;
    function selectChipForBin(chip, item, cb){
      // vorherige Auswahl zurücksetzen
      document.querySelectorAll('.sort-chip.sel-active').forEach(function(x){ x.style.outline=''; x.classList.remove('sel-active'); });
      if(selectedChip===chip){
        // abwählen
        selectedChip=null; selectedItem=null; selectedCallback=null;
        chip.style.outline='';
        return;
      }
      selectedChip=chip; selectedItem=item; selectedCallback=cb;
      chip.classList.add('sel-active');
      chip.style.outline='3px solid #3b6ef6';
      // Bins klickbar machen
    }
    binEls.forEach(function(bel, bi){
      bel.addEventListener('click', function(){
        if(selectedCallback){
          var cb=selectedCallback; var chip=selectedChip;
          selectedChip=null; selectedCallback=null; selectedItem=null;
          if(chip) chip.style.outline='';
          cb(bi);
        }
      });
      // Hover-Effekt
      bel.style.cursor='pointer';
    });
  }

  function hearBtnInline(text){
    var s=document.createElement('span');
    s.textContent=' 🔊';
    s.style.cursor='pointer';
    s.style.fontSize='.8rem';
    s.addEventListener('click', function(e){ e.stopPropagation(); Audio2.speak(text); });
    return s;
  }

  // ====================================================
  //  RENDERER: VERBINDEN
  // ====================================================
  function renderVerbinden(act, host){
    session.totalCount++;
    var card = document.createElement('div'); card.className='card';
    var p=document.createElement('p'); p.style.color='var(--c-ink-soft)';
    p.textContent='Verbinde jedes Wort mit dem richtigen Klang. Tippe erst links, dann rechts.';
    card.appendChild(p);

    var grid=document.createElement('div'); grid.className='match-grid';
    var colA=document.createElement('div'); colA.className='match-col';
    var colB=document.createElement('div'); colB.className='match-col';

    var pairs = act.pairs.slice();
    var lefts = pairs.map(function(x){return x.a;});
    var rights = pairs.map(function(x){return x.b;});
    shuffle(rights);

    var selA=null, selB=null, matched=0, total=pairs.length;

    lefts.forEach(function(a){
      var el=document.createElement('div'); el.className='match-item'; el.textContent=a;
      el.appendChild(hearBtnInline(a));
      el.addEventListener('click', function(){
        if(el.classList.contains('matched')) return;
        colA.querySelectorAll('.match-item').forEach(function(x){ x.classList.remove('sel'); });
        el.classList.add('sel'); selA=el;
        tryMatch();
      });
      colA.appendChild(el);
    });
    rights.forEach(function(b){
      var el=document.createElement('div'); el.className='match-item';
      el.innerHTML=esc(b);
      el.addEventListener('click', function(){
        if(el.classList.contains('matched')) return;
        colB.querySelectorAll('.match-item').forEach(function(x){ x.classList.remove('sel'); });
        el.classList.add('sel'); selB=el;
        tryMatch();
      });
      colB.appendChild(el);
    });

    grid.appendChild(colA); grid.appendChild(colB);
    card.appendChild(grid);
    host.appendChild(card);

    function tryMatch(){
      if(!selA || !selB) return;
      var aText = selA.textContent.replace(' 🔊','').trim();
      var bText = selB.textContent.trim();
      var correct=false;
      for(var i=0;i<pairs.length;i++){
        if(pairs[i].a===aText && pairs[i].b===bText){ correct=true; break; }
      }
      if(correct){
        selA.classList.add('matched'); selB.classList.add('matched');
        selA.classList.remove('sel'); selB.classList.remove('sel');
        matched++; session.correctCount++; awardXp(10);
        pop('ok','Richtig!');
        if(matched>=total){
          var fb=document.createElement('div'); fb.className='quiz-feedback ok'; fb.textContent='✅ Alles verbunden!';
          card.appendChild(fb);
          revealNav(card, host);
        }
      } else {
        selA.classList.add('wrong'); selB.classList.add('wrong');
        awardXp(2);
        var a=selA,b=selB;
        setTimeout(function(){ a.classList.remove('wrong'); b.classList.remove('wrong'); a.classList.remove('sel'); b.classList.remove('sel'); },500);
      }
      selA=null; selB=null;
    }
  }

  // ====================================================
  //  RENDERER: GESCHICHTE
  // ====================================================
  function renderGeschichte(act, host){
    var card=document.createElement('div'); card.className='card story-card';
    var head=document.createElement('div'); head.className='story-head';
    head.innerHTML='<h3>📖 '+esc(act.title.replace('📖 ',''))+'</h3>';
    var toggle=document.createElement('button'); toggle.className='story-toggle'; toggle.textContent='Bedeutung zeigen';
    head.appendChild(toggle);
    card.appendChild(head);

    // Ganz vorab ganzen Text hören
    var fullText = act.sentences.map(function(s){return s.de;}).join(' ');
    var allRow=document.createElement('div'); allRow.style.cssText='margin:8px 0 14px;display:flex;gap:8px;flex-wrap:wrap;';
    allRow.appendChild(hearBtn(fullText));
    allRow.appendChild(hearBtnSlow(fullText));
    card.appendChild(allRow);

    var text=document.createElement('div'); text.className='story-text';
    act.sentences.forEach(function(s, i){
      var span=document.createElement('span'); span.className='story-sentence'; span.textContent=s.de+' ';
      span.addEventListener('click', function(){
        document.querySelectorAll('.story-sentence.playing').forEach(function(x){x.classList.remove('playing');});
        span.classList.add('playing');
        Audio2.speak(s.de, {onend:function(){ span.classList.remove('playing'); }});
      });
      text.appendChild(span);
    });
    card.appendChild(text);

    var gloss=document.createElement('div'); gloss.className='story-gloss';
    gloss.innerHTML = act.sentences.map(function(s){ return '• '+esc(s.gloss); }).join('<br>');
    card.appendChild(gloss);

    var glossOn=false;
    toggle.addEventListener('click', function(){
      glossOn=!glossOn; card.classList.toggle('show-gloss', glossOn);
      toggle.textContent = glossOn?'Bedeutung verbergen':'Bedeutung zeigen';
    });

    host.appendChild(card);
    appendNav(host, true, true);
  }

  // ====================================================
  //  RENDERER: AUSSPRACHE (Record + Playback + Self-rate)
  // ====================================================
  function renderAussprache(act, host){
    session.totalCount++;
    var card=document.createElement('div'); card.className='card';
    var p=document.createElement('p'); p.style.color='var(--c-ink-soft)';
    p.textContent='Höre das Vorbild, sprich es nach und bewerte dich selbst.';
    card.appendChild(p);

    var stage=document.createElement('div'); stage.className='pron-stage';
    var target=document.createElement('div'); target.className='pron-target';
    target.innerHTML=esc(act.target)+(act.hint?('<small>'+esc(act.hint)+'</small>'):'');
    stage.appendChild(target);

    // Modell hören
    var modelRow=document.createElement('div'); modelRow.style.cssText='display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;';
    var hb=hearBtn(act.target); modelRow.appendChild(hb);
    var hb2=hearBtnSlow(act.target); modelRow.appendChild(hb2);
    stage.appendChild(modelRow);

    // Aufnahme
    var recRow=document.createElement('div'); recRow.className='rec-row';
    var recBtn=document.createElement('button'); recBtn.className='rec-btn'; recBtn.innerHTML='🎤'; recBtn.title='Aufnahme starten';
    var playBtn=document.createElement('button'); playBtn.className='play-btn'; playBtn.innerHTML='▶'; playBtn.disabled=true; playBtn.title='Aufnahme abspielen';
    var hint=document.createElement('div'); hint.className='rec-hint'; hint.textContent='Tippe 🎤 und sprich den Satz.';
    var permNote=document.createElement('div'); permNote.className='rec-perm-note'; permNote.textContent='Mikrofon nicht erlaubt. Höre nur das Vorbild.';
    var audio=document.createElement('audio'); audio.className='audio-player'; audio.controls=true;

    recRow.appendChild(recBtn); recRow.appendChild(playBtn);
    stage.appendChild(recRow);
    stage.appendChild(hint);
    stage.appendChild(permNote);
    stage.appendChild(audio);
    card.appendChild(stage);

    var recording=false;
    var rated=false;

    if(!Audio2.isRecordingSupported()){
      hint.textContent='Aufnahme wird in diesem Browser nicht unterstützt. Höre das Vorbild und sprich laut nach.';
      recBtn.disabled=true; recBtn.style.opacity='.4';
    }

    recBtn.addEventListener('click', function(){
      if(rated) return;
      if(!recording){
        Audio2.startRecording().then(function(ok){
          if(ok){
            recording=true; recBtn.classList.add('recording'); recBtn.innerHTML='⏹'; hint.textContent='Aufnahme läuft … Tippe zum Stoppen.';
            permNote.style.display='none';
          } else {
            permNote.style.display='block';
            hint.textContent='Mikrofon nicht verfügbar. Höre das Vorbild und sprich nach.';
          }
        });
      } else {
        Audio2.stopRecording().then(function(url){
          recording=false; recBtn.classList.remove('recording'); recBtn.innerHTML='🎤';
          hint.textContent='Geschrieben! Tippe ▶ zum Anhören.';
          if(url){ audio.src=url; playBtn.disabled=false; }
        });
      }
    });
    playBtn.addEventListener('click', function(){ if(audio.src){ audio.play(); } });

    // Self-Rating
    var rateRow=document.createElement('div'); rateRow.className='rate-row';
    var good=document.createElement('button'); good.className='rate-btn rate-good'; good.textContent='😊 Das klang gut!';
    var again=document.createElement('button'); again.className='rate-btn rate-again'; again.textContent='🔁 Nochmal üben';
    rateRow.appendChild(good); rateRow.appendChild(again);
    card.appendChild(rateRow);

    good.addEventListener('click', function(){
      if(rated) return; rated=true;
      session.correctCount++; awardXp(15);
      good.style.opacity='1'; again.style.opacity='.4';
      pop('ok','Toll gesprochen!');
      revealNav(card, host);
    });
    again.addEventListener('click', function(){
      if(rated) return; rated=true;
      awardXp(5);
      good.style.opacity='.4'; again.style.opacity='1';
      pop('no','Übe weiter — du schaffst das!');
      revealNav(card, host);
    });

    host.appendChild(card);
  }

  // ====================================================
  //  RENDERER: MEILENSTEIN
  // ====================================================
  function renderMeilenstein(act, host){
    session.totalCount++;
    var card=document.createElement('div'); card.className='card';
    var p=document.createElement('p'); p.style.color='var(--c-ink-soft)';
    p.innerHTML='<b>Dein Test!</b> Nimm den Text auf (≈60 Sek.). Höre das Vorbild, lies laut und fließend vor.';
    card.appendChild(p);

    var stage=document.createElement('div'); stage.className='pron-stage';
    var target=document.createElement('div'); target.className='pron-target'; target.style.fontSize='1.05rem'; target.style.lineHeight='1.8';
    target.textContent=act.text;
    stage.appendChild(target);

    var modelRow=document.createElement('div'); modelRow.style.cssText='display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;';
    modelRow.appendChild(hearBtn(act.text));
    modelRow.appendChild(hearBtnSlow(act.text));
    stage.appendChild(modelRow);

    // Aufnahme
    var recBtn=document.createElement('button'); recBtn.className='rec-btn'; recBtn.innerHTML='🎤';
    var playBtn=document.createElement('button'); playBtn.className='play-btn'; playBtn.innerHTML='▶'; playBtn.disabled=true;
    var recRow=document.createElement('div'); recRow.className='rec-row'; recRow.appendChild(recBtn); recRow.appendChild(playBtn);
    var hint=document.createElement('div'); hint.className='rec-hint'; hint.textContent='🎤 Aufnehmen, ▶ abspielen, dann Kriterien abhaken.';
    var permNote=document.createElement('div'); permNote.className='rec-perm-note'; permNote.textContent='Mikrofon nicht erlaubt — lies trotzdem laut vor.';
    var audio=document.createElement('audio'); audio.className='audio-player'; audio.controls=true;
    stage.appendChild(recRow); stage.appendChild(hint); stage.appendChild(permNote); stage.appendChild(audio);
    card.appendChild(stage);

    var recording=false;
    recBtn.addEventListener('click', function(){
      if(!Audio2.isRecordingSupported()){ permNote.style.display='block'; return; }
      if(!recording){
        Audio2.startRecording().then(function(ok){
          if(ok){ recording=true; recBtn.classList.add('recording'); recBtn.innerHTML='⏹'; hint.textContent='Aufnahme läuft …'; }
          else { permNote.style.display='block'; }
        });
      } else {
        Audio2.stopRecording().then(function(url){
          recording=false; recBtn.classList.remove('recording'); recBtn.innerHTML='🎤';
          if(url){ audio.src=url; playBtn.disabled=false; hint.textContent='▶ Abhören, dann Kriterien prüfen.'; }
        });
      }
    });
    playBtn.addEventListener('click', function(){ if(audio.src) audio.play(); });

    // Kriterien-Checkliste
    var critTitle=document.createElement('div'); critTitle.style.cssText='font-weight:800;margin:14px 0 6px;';
    critTitle.textContent='Darauf achten wir:';
    card.appendChild(critTitle);

    var list=document.createElement('div'); list.className='milestone-criteria';
    var checked=0;
    act.criteria.forEach(function(c){
      var it=document.createElement('div'); it.className='crit-item';
      it.innerHTML='<div class="ci-box"></div><div class="ci-text"><b>'+esc(c.label)+'</b>'+esc(c.detail)+'</div>';
      it.addEventListener('click', function(){
        var on=it.classList.toggle('checked');
        checked += on?1:-1;
        it.querySelector('.ci-box').textContent = on?'✓':'';
      });
      list.appendChild(it);
    });
    card.appendChild(list);

    var doneBtn=document.createElement('button'); doneBtn.className='btn primary'; doneBtn.style.cssText='width:100%;margin-top:8px;';
    doneBtn.textContent='Test abschließen';
    var finished=false;
    doneBtn.addEventListener('click', function(){
      if(finished) return; finished=true;
      if(checked>=Math.ceil(act.criteria.length/2)){ session.correctCount++; awardXp(25); }
      else { awardXp(10); }
      revealNav(card, host);
    });
    card.appendChild(doneBtn);

    host.appendChild(card);
  }

  // ====================================================
  //  NAVIGATION / WEITER
  // ====================================================
  function appendNav(host, allowBack, autoAdvance){
    var nav=document.createElement('div'); nav.className='station-nav';
    var back=document.createElement('button'); back.className='btn prev'; back.textContent='← Zurück';
    back.style.visibility = (session.stationIdx>0 && allowBack)?'visible':'hidden';
    back.addEventListener('click', function(){
      if(session.stationIdx>0){ session.stationIdx--; renderStation(); }
    });
    var next=document.createElement('button'); next.className='btn primary'; next.textContent='Weiter ▶';
    next.addEventListener('click', function(){
      session.stationIdx++;
      renderStation();
    });
    nav.appendChild(back); nav.appendChild(next);
    host.appendChild(nav);
  }

  function revealNav(card, host){
    var nav=document.createElement('div'); nav.className='station-nav';
    var back=document.createElement('button'); back.className='btn prev'; back.textContent='← Zurück';
    back.style.visibility = (session.stationIdx>0)?'visible':'hidden';
    back.addEventListener('click', function(){ if(session.stationIdx>0){ session.stationIdx--; renderStation(); } });
    var next=document.createElement('button'); next.className='btn primary'; next.textContent='Weiter ▶';
    next.addEventListener('click', function(){ session.stationIdx++; renderStation(); });
    nav.appendChild(back); nav.appendChild(next);
    host.appendChild(nav);
  }

  // ====================================================
  //  XP / FEEDBACK
  // ====================================================
  function awardXp(n){
    session.stationXp += n;
    Store.get().xp += n;
    Store.save();
    updateTopStats();
  }

  var popTimer=null;
  function pop(kind, text){
    var p=$('pop') || (function(){
      var d=document.createElement('div'); d.id='pop'; d.className='pop';
      d.innerHTML='<div class="pop-inner"><div class="pop-emoji"></div><div class="pop-text"></div></div>';
      document.body.appendChild(d); return d;
    })();
    p.className='pop show '+(kind==='ok'?'ok':'no');
    p.querySelector('.pop-emoji').textContent = kind==='ok'?'🎉':'💪';
    p.querySelector('.pop-text').textContent = text;
    clearTimeout(popTimer);
    popTimer=setTimeout(function(){ p.classList.remove('show'); }, 900);
  }

  // ====================================================
  //  LEVEL ABSCHLUSS
  // ====================================================
  function finishLevel(){
    var day = COURSE.weeks[session.weekIdx].days[session.dayIdx];
    // Sterne berechnen
    var stars=1;
    var ratio = session.totalCount? (session.correctCount/session.totalCount):1;
    if(ratio>=0.9) stars=3;
    else if(ratio>=0.6) stars=2;
    else stars=1;

    Store.completeDay(day.id, stars, session.stationXp);
    checkBadges();

    // Done-Screen
    $('doneEmoji').textContent = stars===3?'🌟':(stars===2?'⭐':'✅');
    $('doneTitle').textContent = stars===3?'Perfekt!':(stars===2?'Super gemacht!':'Level geschafft!');
    var ss=''; for(var i=0;i<3;i++){ ss += (i<stars)?'⭐':'☆'; }
    $('doneStars').textContent = ss;
    $('doneXp').textContent = session.stationXp;
    $('doneMsg').textContent = praise(stars);

    go('done');
    launchConfetti(stars);
  }

  function praise(stars){
    if(stars===3) return 'Hervorragende Aussprache! Du bist ein echtes Talent.';
    if(stars===2) return 'Sehr gut! Ein bisschen Übung, dann wird es perfekt.';
    return 'Geschafft! Wiederhole das Level für mehr Sterne.';
  }

  function onNextAfterDone(){
    // Nächsten freigeschalteten Tag suchen
    var target = findCurrentLevel();
    // falls aktueller Tag erledigt, geht findCurrentLevel zum nächsten
    session.weekIdx = target.wi; session.dayIdx = target.di;
    var day = COURSE.weeks[target.wi].days[target.di];
    if(Store.getDay(day.id) && Store.getDay(day.id).completed){
      // alle erledigt -> trotzdem Tag 1
      session.weekIdx=0; session.dayIdx=0;
    }
    openLevel();
  }

  // ====================================================
  //  ABZEICHEN
  // ====================================================
  function checkBadges(){
    var s=Store.get();
    var earned=[];
    function tryBadge(id, cond){ if(cond && !Store.hasBadge(id)){ Store.awardBadge(id); earned.push(id); } }

    // first: irgend ein Tag erledigt
    var anyDone=false; for(var k in s.days){ if(s.days[k].completed) anyDone=true; }
    tryBadge('first', anyDone);

    var d1=Store.getDay('w1d1'); tryBadge('umlaut', d1 && d1.completed && d1.stars>=3);
    var d3=Store.getDay('w1d3'); tryBadge('rmeiser', d3 && d3.completed && d3.stars>=3);

    var w1all = ['w1d1','w1d2','w1d3','w1d4','w1d5'].every(function(id){ var d=Store.getDay(id); return d&&d.completed; });
    tryBadge('week1', w1all);
    tryBadge('perfect', Store.weekStars('w1')>=15);

    var d5=Store.getDay('w1d5'); tryBadge('flow', d5 && d5.completed);
    tryBadge('streak3', s.streak>=3);
    tryBadge('xp500', s.xp>=500);

    if(earned.length){
      setTimeout(function(){ toast('🏅 Neues Abzeichen: '+badgeName(earned[0])+'!', true); }, 600);
    }
  }
  function badgeName(id){ for(var i=0;i<BADGES.length;i++){ if(BADGES[i].id===id) return BADGES[i].name; } return id; }

  // ====================================================
  //  CONFETTI
  // ====================================================
  function launchConfetti(stars){
    var cv=$('confetti'); if(!cv) return;
    var ctx=cv.getContext('2d');
    cv.width=window.innerWidth; cv.height=window.innerHeight;
    var colors=['#3b6ef6','#23b97a','#ffba2e','#ff8a3d','#ff5d8f','#8b5cf6'];
    var parts=[];
    var count = stars===3?160:(stars===2?100:60);
    for(var i=0;i<count;i++){
      parts.push({
        x:Math.random()*cv.width, y:-20-Math.random()*cv.height*0.5,
        w:6+Math.random()*8, h:8+Math.random()*10,
        c:colors[(Math.random()*colors.length)|0],
        vy:2+Math.random()*4, vx:-1+Math.random()*2,
        rot:Math.random()*Math.PI, vr:-0.2+Math.random()*0.4
      });
    }
    var frame=0, max=140;
    function tick(){
      ctx.clearRect(0,0,cv.width,cv.height);
      parts.forEach(function(p){
        p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
        ctx.fillStyle=p.c; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
        ctx.restore();
      });
      frame++;
      if(frame<max){ requestAnimationFrame(tick); }
      else { ctx.clearRect(0,0,cv.width,cv.height); }
    }
    tick();
  }

  // ====================================================
  //  TOAST & VOICE NOTICE
  // ====================================================
  function toast(msg, ok){
    var t=$('toast'); t.textContent=msg;
    t.className='toast show'+(ok===true?' ok':(ok===false?' no':''));
    clearTimeout(toast._t);
    toast._t=setTimeout(function(){ t.className='toast'; }, 2400);
  }

  function showVoiceNotice(){
    var n=$('voiceNotice'); if(n) n.classList.remove('hidden');
  }

  // ====================================================
  //  HELPERS
  // ====================================================
  function esc(s){
    if(s==null) return '';
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function shuffle(a){
    for(var i=a.length-1;i>0;i--){ var j=(Math.random()*(i+1))|0; var t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }

  // Toast global verfügbar (audio.js braucht nichts; app besitzt)
  window._toast = toast;

})();
