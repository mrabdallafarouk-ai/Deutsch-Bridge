/* =========================================================
   Deutsch Bridge — KURS-DATEN
   ---------------------------------------------------------
   So erweiterst du später Wochen 2–5:
   1) Trage in der Woche "locked:false" ein.
   2) Fülle für jeden Tag das Feld "activities:[ ... ]".
   3) Die Engine rendert alles automatisch.
   ---------------------------------------------------------
   Activity-Typen:
     theorie    -> { title, blocks:[ {kind:'text'|'rule'|'example', text|word/gloss} ] }
     vokabeln   -> { title, cards:[ {word, gloss} ] }
     quiz       -> { title, q, options:[...], answer: idx, explain }
     sortieren  -> { title, instr, bins:[{name}], items:[{text, bin}] }
     verbinden  -> { title, pairs:[ {a, b} ] }
     geschichte -> { title, sentences:[ {de, gloss} ] }
     aussprache -> { title, target, hint, focus:[...] }
     meilenstein-> { title, text, criteria:[ {label, detail} ] }
   ========================================================= */

var COURSE = {
  title: "Deutsch Bridge — Aussprache-Abenteuer",
  weeks: [
    {
      id: "w1", n: 1, title: "Woche 1", subtitle: "Grundlagen der Aussprache",
      locked: false, theme: "#3b6ef6",
      days: [
        /* ====================== TAG 1 ====================== */
        {
          id: "w1d1", n: 1, title: "Tag 1", subtitle: "Die Umlaute ä, ö, ü",
          icon: "👄", color: "#3b6ef6",
          activities: [
            { type:"theorie", title:"Der Mund beim Sprechen", blocks:[
              { kind:"text", text:"Für Deutsch ohne Akzent musst du deinen Mund anders bewegen. Der Kiefer bleibt stabil, die Lippen arbeiten stark. Der Ton kommt nach vorne zu den Zähnen." },
              { kind:"rule", text:"Regel: Kiefer stabil, Lippen aktiv, Ton nach VORNE zu den Zähnen." }
            ]},
            { type:"theorie", title:"Der Ä-Laut (offenes E)", blocks:[
              { kind:"text", text:"Öffne den Mund etwas weiter als für ein normales E." },
              { kind:"example", word:"Käse", gloss:"(Das Essen)" },
              { kind:"example", word:"Mädchen", gloss:"(Das junge Kind)" },
              { kind:"example", word:"Väter", gloss:"(Mehr als ein Vater)" }
            ]},
            { type:"theorie", title:"Der Ö-Laut", blocks:[
              { kind:"text", text:"Sag erst ein langes E (wie in 'Meer'). Dann: Zunge NICHT bewegen, Lippen rund wie ein Kreis (O) machen." },
              { kind:"example", word:"hören", gloss:"(mit den Ohren)" },
              { kind:"example", word:"schön", gloss:"(wunderbar / toll)" },
              { kind:"example", word:"Öl", gloss:"(zum Kochen)" }
            ]},
            { type:"theorie", title:"Der Ü-Laut", blocks:[
              { kind:"text", text:"Sag erst ein langes I (wie in 'hier'). Dann: Zunge NICHT bewegen, Lippen eng zusammen wie zum Pfeifen." },
              { kind:"example", word:"Tür", gloss:"(zum Zimmer)" },
              { kind:"example", word:"müde", gloss:"(ich möchte schlafen)" },
              { kind:"example", word:"Küche", gloss:"(wo man kocht)" }
            ]},
            { type:"vokabeln", title:"Umlaut-Wörter hören", cards:[
              { word:"Käse", gloss:"Käse = Essen" },
              { word:"Mädchen", gloss:"Mädchen = junges Kind" },
              { word:"hören", gloss:"hören = mit den Ohren" },
              { word:"schön", gloss:"schön = toll / wunderbar" },
              { word:"Tür", gloss:"Tür = zum Zimmer" },
              { word:"müde", gloss:"müde = möchte schlafen" },
              { word:"Küche", gloss:"Küche = wo man kocht" },
              { word:"Väter", gloss:"Väter = mehrere Väter" }
            ]},
            { type:"quiz", title:"Welcher Umlaut?", q:"Höre das Wort. Welcher Umlaut kommt darin vor?  Wort: „schön“", options:["ä","ö","ü"], answer:1, explain:"Richtig! „schön“ hat den Ö-Laut. Lippen rund wie ein Kreis." },
            { type:"quiz", title:"Welcher Umlaut?", q:"Wort: „müde“ — welcher Umlaut?", options:["ä","ö","ü"], answer:2, explain:"Genau! „müde“ hat das Ü. Lippen eng zusammen, Zunge wie bei „i“." },
            { type:"quiz", title:"Welcher Umlaut?", q:"Wort: „Käse“ — welcher Umlaut?", options:["ä","ö","ü"], answer:0, explain:"Stimmt! „Käse“ hat das Ä, das offene E." },
            { type:"theorie", title:"Vokale: lang oder kurz?", blocks:[
              { kind:"rule", text:"Regel: Nach dem Vokal EIN Konsonant = LANG. ZWEI Konsonanten = KURZ und schnell." },
              { kind:"example", word:"Bahn", gloss:"lang A — Der Zug" },
              { kind:"example", word:"Bann", gloss:"kurz A — Das Verbot" },
              { kind:"example", word:"Beet", gloss:"lang E — Blumen im Garten" },
              { kind:"example", word:"Bett", gloss:"kurz E — Hier schlafe ich" },
              { kind:"example", word:"Sohn", gloss:"lang O — Mein Kind" },
              { kind:"example", word:"Sonne", gloss:"kurz O — am Himmel" }
            ]},
            { type:"sortieren", title:"Lang oder kurz?", instr:"Höre jedes Wort und lege es in die richtige Gruppe.", bins:[{name:"LANG ⏳"},{name:"KURZ ⚡"}], items:[
              { text:"Bahn", bin:0 },
              { text:"Bett", bin:1 },
              { text:"Beet", bin:0 },
              { text:"Fluss", bin:1 },
              { text:"Flug", bin:0 },
              { text:"Sonne", bin:1 }
            ]},
            { type:"geschichte", title:"📖 Geschichte: Der müde Müller", sentences:[
              { de:"Herr Müller ist sehr müde.", gloss:"Herr Müller hat keine Energie." },
              { de:"Er sitzt in der Küche und trinkt Kaffee.", gloss:"Er ist in der Küche und trinkt Kaffee." },
              { de:"Er möchte schöne Musik hören,", gloss:"Er will Musik hören," },
              { de:"aber die Tür ist offen und es ist zu laut.", gloss:"aber die Tür ist nicht zu. Es ist laut." },
              { de:"Draußen steht ein Mädchen.", gloss:"Ein Mädchen steht draußen." },
              { de:"Das Mädchen isst Käse.", gloss:"Das Mädchen isst Käse." },
              { de:"Herr Müller schließt die Tür.", gloss:"Müller macht die Tür zu." },
              { de:"Ah, jetzt ist es schön ruhig!", gloss:"Jetzt hat er Ruhe." }
            ]},
            { type:"aussprache", title:"🎤 Sprich den Satz", target:"Ah, jetzt ist es schön ruhig!", hint:"Bringe den Ton ganz nach vorne an die Zähne. Beachte: schön, ruhig.", focus:["schön","ruhig","jetzt"] },
            { type:"aussprache", title:"🎤 Umlaute trainieren", target:"Herr Müller ist müde in der Küche.", hint:"Lippen rund und aktiv bei: müde, Küche.", focus:["müde","Küche","Müller"] }
          ]
        },

        /* ====================== TAG 2 ====================== */
        {
          id:"w1d2", n:2, title:"Tag 2", subtitle:"Doppelvokale & Konsonanten",
          icon:"🗣️", color:"#8b5cf6",
          activities:[
            { type:"theorie", title:"Doppelvokal: EI / AI", blocks:[
              { kind:"text", text:"Zwei Vokale zusammen = ein neuer Sound. EI/AI klingt wie das Wort „Ei“." },
              { kind:"rule", text:"Trick: Vergiss das E, sprich direkt ein klares I." },
              { kind:"example", word:"Nein", gloss:"(Negation)" },
              { kind:"example", word:"mein", gloss:"(Possessivpronomen)" },
              { kind:"example", word:"Eis", gloss:"(Das Essen im Sommer)" }
            ]},
            { type:"theorie", title:"Doppelvokal: EU / ÄU", blocks:[
              { kind:"text", text:"EU/ÄU klingt wie „Oj“." },
              { kind:"rule", text:"Lippen am Ende ganz rund nach vorne." },
              { kind:"example", word:"neu", gloss:"(Nicht alt)" },
              { kind:"example", word:"Euro", gloss:"(Das Geld in Deutschland)" },
              { kind:"example", word:"Bäume", gloss:"(Große Pflanzen im Wald)" }
            ]},
            { type:"theorie", title:"Doppelvokal: AU", blocks:[
              { kind:"text", text:"AU klingt wie „Au“ (wenn etwas wehtut)." },
              { kind:"rule", text:"Start bei A mit offenem Mund, dann U mit kleinem Mund." },
              { kind:"example", word:"Haus", gloss:"(Hier wohnen Menschen)" },
              { kind:"example", word:"blau", gloss:"(Eine Farbe)" },
              { kind:"example", word:"Auto", gloss:"(Das Fahrzeug)" }
            ]},
            { type:"quiz", title:"Welcher Doppelvokal?", q:"Höre: „Haus“ — welcher Laut?", options:["EI (Ei)","EU (Oj)","AU (Au)"], answer:2, explain:"Richtig! „Haus“ hat AU — wie wenn etwas wehtut." },
            { type:"quiz", title:"Welcher Doppelvokal?", q:"Höre: „neu“ — welcher Laut?", options:["EI (Ei)","EU (Oj)","AU (Au)"], answer:1, explain:"Genau! „neu“ hat EU — klingt wie „Oj“." },
            { type:"quiz", title:"Welcher Doppelvokal?", q:"Höre: „mein“ — welcher Laut?", options:["EI (Ei)","EU (Oj)","AU (Au)"], answer:0, explain:"Stimmt! „mein“ hat EI." },
            { type:"theorie", title:"Die S-Kombinationen", blocks:[
              { kind:"rule", text:"S vor P oder T am Wort-/Silbenanfang = dickes „Sch“." },
              { kind:"example", word:"Schule", gloss:"SCH" },
              { kind:"example", word:"Straße", gloss:"ST = Scht" },
              { kind:"example", word:"Stadt", gloss:"ST = Scht" },
              { kind:"example", word:"sprechen", gloss:"SP = Schp" },
              { kind:"example", word:"Sport", gloss:"SP = Schp" },
              { kind:"example", word:"spät", gloss:"SP = Schp" }
            ]},
            { type:"theorie", title:"Die zwei Seiten von CH", blocks:[
              { kind:"rule", text:"Der Vokal VOR dem ch zeigt den Sound." },
              { kind:"text", text:"Ich-Laut (weich): nach i, e, ä, ö, ü, ei, eu. Zungenspitze unten, Mitte hoch — weiche Katze." },
              { kind:"example", word:"ich", gloss:"Ich-Laut" },
              { kind:"example", word:"sprechen", gloss:"Ich-Laut" },
              { kind:"example", word:"Milch", gloss:"Ich-Laut" },
              { kind:"text", text:"Ach-Laut (hart/tief): nach a, o, u, au. Sound aus dem Hals." },
              { kind:"example", word:"ach", gloss:"Ach-Laut" },
              { kind:"example", word:"Nacht", gloss:"Ach-Laut" },
              { kind:"example", word:"Buch", gloss:"Ach-Laut" }
            ]},
            { type:"sortieren", title:"Ich-Laut oder Ach-Laut?", instr:"Höre das Wort. Welcher CH-Laut ist richtig?", bins:[{name:"Ich-Laut (weich)"},{name:"Ach-Laut (hart)"}], items:[
              { text:"ich", bin:0 },
              { text:"Nacht", bin:1 },
              { text:"Milch", bin:0 },
              { text:"Buch", bin:1 },
              { text:"sprechen", bin:0 },
              { text:"auch", bin:1 }
            ]},
            { type:"sortieren", title:"ST/SP wie Scht/Schp?", instr:"Höre und ordne zu.", bins:[{name:"ST = Scht"},{name:"SP = Schp"}], items:[
              { text:"Straße", bin:0 },
              { text:"Sport", bin:1 },
              { text:"Stadt", bin:0 },
              { text:"sprechen", bin:1 },
              { text:"verstehen", bin:0 },
              { text:"spät", bin:1 }
            ]},
            { type:"geschichte", title:"📖 Geschichte: Die schnelle Straße", sentences:[
              { de:"Stefan spricht kein Deutsch.", gloss:"Stefan kann noch kein Deutsch sprechen." },
              { de:"Er steht auf der Straße und sucht ein neues Haus.", gloss:"Er ist auf der Straße. Er sucht eine neue Wohnung." },
              { de:"Es ist schon spät am Abend.", gloss:"Es ist Nacht." },
              { de:"Im Haus brennt Licht.", gloss:"Im Haus ist Licht an." },
              { de:"Ein Mann kocht Milch in der Küche.", gloss:"Ein Mann macht Milch warm." },
              { de:"Stefan ruft: „Ich verstehe das nicht! Wo ist mein Auto?“", gloss:"Stefan ruft: Ich verstehe das nicht. Wo steht mein Auto?" },
              { de:"Der Mann spricht schnell: „Dein Auto ist in der Stadt!“", gloss:"Der Mann antwortet: Dein Auto steht in der Stadt." }
            ]},
            { type:"aussprache", title:"🎤 ST und SP üben", target:"Stefan spricht spät am Abend auf der Straße.", hint:"ST = Scht, SP = Schp. Trainiere deine Gesichtsmuskeln.", focus:["Stefan","spricht","spät","Straße"] }
          ]
        },

        /* ====================== TAG 3 ====================== */
        {
          id:"w1d3", n:3, title:"Tag 3", subtitle:"Das R & Endungen",
          icon:"👅", color:"#23b97a",
          activities:[
            { type:"theorie", title:"Das Konsonanten-R (im Hals)", blocks:[
              { kind:"rule", text:"R am Wort-/Silbenanfang = weich aus dem Hals. NICHT mit der Zungenspitze rollen!" },
              { kind:"text", text:"Etwa wie das arabische غ, aber viel weicher und ohne Druck." },
              { kind:"example", word:"rot", gloss:"(Eine Farbe)" },
              { kind:"example", word:"richtig", gloss:"(Nicht falsch)" },
              { kind:"example", word:"Reis", gloss:"(Das Essen)" }
            ]},
            { type:"theorie", title:"Das Vokal-R (fast unsichtbares A)", blocks:[
              { kind:"rule", text:"R am Wortende oder nach langem Vokal = KEIN echtes R. Es wird ein kurzes, entspanntes „Ah“." },
              { kind:"example", word:"Vater", gloss:"klingt wie „Va-tah“" },
              { kind:"example", word:"hier", gloss:"klingt wie „Hee-ah“" },
              { kind:"example", word:"Bier", gloss:"klingt wie „Bee-ah“" }
            ]},
            { type:"quiz", title:"Welches R?", q:"Höre: „Vater“ — welches R hörst du?", options:["Hals-R (weich gerollt)","Ah-Laut (kein echtes R)"], answer:1, explain:"Richtig! Am Wortende wird R zu einem kurzen „Ah“: Va-tah." },
            { type:"quiz", title:"Welches R?", q:"Höre: „rot“ — welches R hörst du?", options:["Hals-R (weich)","Ah-Laut (kein echtes R)"], answer:0, explain:"Genau! R am Anfang kommt weich aus dem Hals." },
            { type:"sortieren", title:"Hals-R oder Ah-Laut?", instr:"Höre jedes Wort und ordne zu.", bins:[{name:"Hals-R (Anfang)"},{name:"Ah-Laut (Ende)"}], items:[
              { text:"rot", bin:0 },
              { text:"Vater", bin:1 },
              { text:"richtig", bin:0 },
              { text:"Bier", bin:1 },
              { text:"Reis", bin:0 },
              { text:"hier", bin:1 },
              { text:"Mutter", bin:1 }
            ]},
            { type:"theorie", title:"Endung -en (schnell)", blocks:[
              { kind:"rule", text:"Bei normaler Sprache verschwindet das E fast. Geh direkt zum N." },
              { kind:"example", word:"machen", gloss:"klingt wie „mach-n“" },
              { kind:"example", word:"kommen", gloss:"klingt wie „komm-n“" }
            ]},
            { type:"theorie", title:"Endung -tion", blocks:[
              { kind:"rule", text:"-tion-Wörter sind feminin (die), Betonung am Ende, „ti“ klingt wie „zi“." },
              { kind:"example", word:"Information", gloss:"klingt wie „In-for-ma-zion“" },
              { kind:"example", word:"Situation", gloss:"klingt wie „Si-tua-zion“" }
            ]},
            { type:"quiz", title:"Die Endung -tion", q:"Wie spricht man „Information“ aus?", options:["In-for-ma-TION","In-for-ma-zion","In-for-MA-tion"], answer:1, explain:"Richtig! „ti“ wird zu „zi“ und die Betonung liegt am Ende." },
            { type:"verbinden", title:"Wort und Klang verbinden", pairs:[
              { a:"Vater", b:"Va-tah" },
              { a:"machen", b:"mach-n" },
              { a:"Information", b:"In-for-ma-zion" },
              { a:"Bier", b:"Bee-ah" },
              { a:"kommen", b:"komm-n" }
            ]},
            { type:"geschichte", title:"📖 Geschichte: Der Reiseplan", sentences:[
              { de:"Mein Vater und meine Mutter wollen nach Berlin reisen.", gloss:"Die Eltern möchten nach Berlin fahren." },
              { de:"Sie sitzen im Zimmer und machen einen Plan.", gloss:"Sie sind im Zimmer und planen die Reise." },
              { de:"Die Situation ist wirklich interessant,", gloss:"Es ist interessant," },
              { de:"denn sie suchen eine Information im Internet.", gloss:"weil sie Informationen im Internet suchen." },
              { de:"Mein Vater trinkt ein Bier und sagt:", gloss:"Der Vater trinkt ein Bier. Er sagt:" },
              { de:"„Das Wetter in Berlin ist super, wir kommen morgen an!“", gloss:"In Berlin ist die Sonne da, wir sind morgen dort." },
              { de:"Meine Mutter lacht und packt die Koffer.", gloss:"Die Mutter ist glücklich und packt die Taschen." }
            ]},
            { type:"aussprache", title:"🎤 R und Endungen", target:"Mein Vater trinkt hier ein Bier und sucht eine Information.", hint:"Vater und Bier = „Ah“. trinkt, sucht = kurzes Ende. Information = -zion.", focus:["Vater","Bier","Information","hier"] }
          ]
        },

        /* ====================== TAG 4 ====================== */
        {
          id:"w1d4", n:4, title:"Tag 4", subtitle:"Wortakzent & Satzmelodie",
          icon:"🎵", color:"#ff8a3d",
          activities:[
            { type:"theorie", title:"Der Wortakzent", blocks:[
              { kind:"rule", text:"Goldene Regel: Bei echten deutschen Wörtern liegt die Betonung fast immer auf der ERSTEN Silbe." },
              { kind:"example", word:"Kaffee", gloss:"KAF-fee" },
              { kind:"example", word:"Arbeit", gloss:"AR-beit" },
              { kind:"example", word:"lernen", gloss:"LER-nen" },
              { kind:"rule", text:"Ausnahme: Wörter aus anderen Sprachen werden oft am ENDE betont." },
              { kind:"example", word:"Musik", gloss:"Mu-SIK" },
              { kind:"example", word:"Student", gloss:"Stu-DENT" },
              { kind:"example", word:"Restaurant", gloss:"Re-stau-RANT" }
            ]},
            { type:"sortieren", title:"Betonung vorne oder hinten?", instr:"Höre und ordne zu.", bins:[{name:"ERSTE Silbe"},{name:"am ENDE"}], items:[
              { text:"Kaffee", bin:0 },
              { text:"Musik", bin:1 },
              { text:"Arbeit", bin:0 },
              { text:"Student", bin:1 },
              { text:"lernen", bin:0 },
              { text:"Restaurant", bin:1 }
            ]},
            { type:"theorie", title:"Trennbare Verben", blocks:[
              { kind:"rule", text:"Vorsilbe allein (Infinitiv) = stark betonen. Im Satz wandert die Vorsilbe ans Ende = dort LAUT und HOCH sprechen." },
              { kind:"example", word:"anrufen", gloss:"Ich rufe dich an." },
              { kind:"example", word:"aufräumen", gloss:"Ich räume das Zimmer auf." },
              { kind:"example", word:"mitkommen", gloss:"Kommst du mit?" }
            ]},
            { type:"theorie", title:"Satzmelodie: ↘ oder ↗", blocks:[
              { kind:"rule", text:"↘ Stimme nach UNTEN: Aussagen und W-Fragen (Wer, Was, Wie, Warum)." },
              { kind:"example", word:"Ich lerne Deutsch. ↘", gloss:"Aussage" },
              { kind:"example", word:"Wie heißt du? ↘", gloss:"W-Frage" },
              { kind:"rule", text:"↗ Stimme nach OBEN: Ja/Nein-Fragen (beginnen mit Verb)." },
              { kind:"example", word:"Lernst du Deutsch? ↗", gloss:"Ja/Nein-Frage" },
              { kind:"example", word:"Kommst du mit? ↗", gloss:"Ja/Nein-Frage" }
            ]},
            { type:"sortieren", title:"↘ unten oder ↗ oben?", instr:"Höre den Satz. Welche Melodie gehört dazu?", bins:[{name:"↘ unten"},{name:"↗ oben"}], items:[
              { text:"Ich lerne Deutsch.", bin:0 },
              { text:"Kommst du mit?", bin:1 },
              { text:"Wie heißt du?", bin:0 },
              { text:"Lernst du Deutsch?", bin:1 },
              { text:"Du kommst mit.", bin:0 },
              { text:"Gehst du ins Restaurant?", bin:1 }
            ]},
            { type:"verbinden", title:"Verb und Vorsilbe", pairs:[
              { a:"anrufen", b:"Ich rufe dich an." },
              { a:"aufräumen", b:"Ich räume auf." },
              { a:"mitkommen", b:"Kommst du mit?" },
              { a:"vorbeikommen", b:"Ich komme vorbei." },
              { a:"einschalten", b:"Ich schalte an." }
            ]},
            { type:"geschichte", title:"📖 Geschichte: Das Telefonat", sentences:[
              { de:"Tobias ist im Büro.", gloss:"Tobias arbeitet noch im Büro." },
              { de:"Er ruft seine Freundin Nina an.", gloss:"Er telefoniert mit Nina." },
              { de:"Er fragt: „Hallo Nina, die Arbeit ist fertig. Gehst du heute ins Restaurant?“ ↗", gloss:"Er fragt: Gehst du heute in ein Restaurant essen?" },
              { de:"Nina antwortet: „Nein, ich bleibe zu Hause. Ich räume meine Küche auf.“", gloss:"Nina: Nein, ich bin zu Hause. Ich mache die Küche sauber." },
              { de:"Tobias sagt: „Kein Problem, ich komme schnell mit dem Auto vorbei!“", gloss:"Tobias: Ich komme mit dem Auto zu dir." },
              { de:"Nina freut sich und schaltet die Musik an.", gloss:"Nina ist glücklich und macht Musik an." }
            ]},
            { type:"aussprache", title:"🎤 Mini-Dialog mit Melodie", target:"Räumst du die Küche auf? Ja, ich räume die Küche auf.", hint:"Erste Frage: Stimme am Ende HOCH (↗). Antwort: Stimme am Ende TIEF (↘).", focus:["auf","auf"] }
          ]
        },

        /* ====================== TAG 5 ====================== */
        {
          id:"w1d5", n:5, title:"Tag 5", subtitle:"Wörter verbinden & Test",
          icon:"🏆", color:"#ff5d8f",
          activities:[
            { type:"theorie", title:"Connected Speech: Die Brücke", blocks:[
              { kind:"rule", text:"Regel A: Konsonant am Ende + Vokal am Anfang = der Konsonant springt hinüber und baut eine Brücke." },
              { kind:"example", word:"ist ein", gloss:"gesprochen: is-tein" },
              { kind:"example", word:"ich habe ein", gloss:"gesprochen: ich-ha-bein" },
              { kind:"example", word:"das ist", gloss:"gesprochen: da-sist" }
            ]},
            { type:"theorie", title:"Pronomen verschlucken", blocks:[
              { kind:"rule", text:"Regel B: In der Alltagssprache verschwinden kleine Wörter wie „es“ oder „ich“ fast." },
              { kind:"example", word:"Gibt es", gloss:"gesprochen: Gippts" },
              { kind:"example", word:"Wie geht es dir?", gloss:"gesprochen: Wie geht's dir?" },
              { kind:"example", word:"Habe ich", gloss:"gesprochen: Hab-ich" }
            ]},
            { type:"verbinden", title:"Geschrieben oder gesprochen?", pairs:[
              { a:"ist ein", b:"is-tein" },
              { a:"das ist", b:"da-sist" },
              { a:"Gibt es", b:"Gippts" },
              { a:"Wie geht es dir?", b:"Wie geht's dir?" },
              { a:"Habe ich", b:"Hab-ich" }
            ]},
            { type:"quiz", title:"Connected Speech", q:"Höre: „Das ist ein toller Samstag.“ Wie spricht man das verbunden?", options:["Wort für Wort mit Pausen","Da-sis-tein ... (verbunden)","Ganz leise"], answer:1, explain:"Richtig! Die Wörter verschmelzen: Da-sis-tein toller Samstag." },
            { type:"geschichte", title:"📖 Geschichte: Ein schöner Tag", sentences:[
              { de:"Das ist ein toller Samstag!", gloss:"Heute ist ein super Samstag." },
              { de:"Es ist warm und die Sonne scheint.", gloss:"Das Wetter ist warm und die Sonne ist da." },
              { de:"Ich habe ein Buch und sitze draußen.", gloss:"Ich habe ein Buch und bin im Garten." },
              { de:"Gibt es etwas Schöneres?", gloss:"Das ist perfekt." },
              { de:"Ein Freund ruft an und fragt:", gloss:"Ein Freund telefoniert und fragt:" },
              { de:"„Wie geht's dir? Kommst du mit ins Kino?“", gloss:"Wie geht es dir? Gehst du mit mir ins Kino?" },
              { de:"Ich sage: „Ja, das ist eine super Idee! Ich packe es schnell ein und komme vorbei.“", gloss:"Ich antworte: Ja, tolle Idee! Ich nehme meine Sachen und komme zu dir." }
            ]},
            { type:"aussprache", title:"🎤 Wörter verbinden", target:"Das ist ein toller Samstag! Gibt es etwas Schöneres?", hint:"Verbinde: Da-sis-tein. Keine Pausen zwischen den Wörtern.", focus:["Das ist","ein","Gibt es"] },
            { type:"meilenstein", title:"🏆 Meilenstein: Der Aussprache-Test", text:"Mein Vater ist heute sehr müde. Er sitzt spät am Abend in der Küche und hört schöne Musik. Da ruft ein Freund an und spricht schnell: „Stefan, kommst du mit auf die Straße? Das Wetter ist wirklich herrlich!“ Mein Vater lacht, schließt die Tür und sagt: „Ja, ich komme sofort mit dem Auto vorbei. Das ist eine fantastische Idee!“", criteria:[
              { label:"Die Umlaute", detail:"Klingen müde, Küche, schöne richtig? Lippen rund und nach vorne?" },
              { label:"Die Konsonanten", detail:"spät, Straße, spricht richtig wie Scht und Schp?" },
              { label:"Die zwei R-Laute", detail:"Vater = kurzes „ah“? Straße = weich im Hals?" },
              { label:"Der Fluss", detail:"Wörter verbunden (Das ist, ruft an) oder mit Pausen?" }
            ]}
          ]
        }
      ]
    },

    /* ===================== WOCHE 2 (gesperrt) ===================== */
    { id:"w2", n:2, title:"Woche 2", subtitle:"Bald verfügbar", locked:true, theme:"#23b97a", days: makeLockedWeek(2) },

    /* ===================== WOCHE 3 (gesperrt) ===================== */
    { id:"w3", n:3, title:"Woche 3", subtitle:"Bald verfügbar", locked:true, theme:"#ff8a3d", days: makeLockedWeek(3) },

    /* ===================== WOCHE 4 (gesperrt) ===================== */
    { id:"w4", n:4, title:"Woche 4", subtitle:"Bald verfügbar", locked:true, theme:"#8b5cf6", days: makeLockedWeek(4) },

    /* ===================== WOCHE 5 (gesperrt) ===================== */
    { id:"w5", n:5, title:"Woche 5", subtitle:"Bald verfügbar", locked:true, theme:"#ff5d8f", days: makeLockedWeek(5) }
  ]
};

/* Hilfsfunktion: leere, gesperrte Woche generieren */
function makeLockedWeek(wn){
  var days=[];
  var titles=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag"];
  var icons=["🔒","🔒","🔒","🔒","🔒"];
  for(var i=1;i<=5;i++){
    days.push({
      id:"w"+wn+"d"+i, n:i, title:"Tag "+i, subtitle:"Bald verfügbar",
      icon:icons[i-1], color:"#9098b5", locked:true, activities:[]
    });
  }
  return days;
}

/* Abzeichen-Definitionen (Bedingungen geprüft in app.js) */
var BADGES = [
  { id:"first", emoji:"🌱", name:"Erster Schritt", desc:"Erstes Level geschafft" },
  { id:"umlaut", emoji:"👄", name:"Umlaut-Meister", desc:"Tag 1 mit 3 Sternen" },
  { id:"rmeiser", emoji:"👅", name:"R-Profis", desc:"Tag 3 mit 3 Sternen" },
  { id:"week1", emoji:"🏅", name:"Woche 1 Held", desc:"Alle 5 Tage geschafft" },
  { id:"perfect", emoji:"⭐", name:"Perfekt", desc:"15 Sterne in Woche 1" },
  { id:"flow", emoji:"🌊", name:"Redefluss", desc:"Meilenstein-Test geschafft" },
  { id:"streak3", emoji:"🔥", name:"3er-Serie", desc:"3 Tage in Folge gespielt" },
  { id:"xp500", emoji:"⚡", name:"Energiebündel", desc:"500 XP erreicht" }
];
