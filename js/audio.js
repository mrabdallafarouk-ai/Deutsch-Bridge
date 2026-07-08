/* =========================================================
   Deutsch Bridge — AUDIO ENGINE
   - Text-to-Speech (deutsche Stimme, Web Speech API)
   - Aufnahme & Playback (MediaRecorder)
   Kein Server, kein Internet nötig.
   ========================================================= */

var Audio2 = (function(){

  var synth = window.speechSynthesis;
  var deVoice = null;
  var voicesReady = false;
  var onVoiceMissing = null;   // von app.js gesetzt

  function pickGermanVoice(){
    if(!synth) return null;
    var voices = synth.getVoices();
    if(!voices || !voices.length) return null;
    // 1. de-DE bevorzugen
    var v = voices.filter(function(x){ return x.lang && x.lang.toLowerCase()==='de-de'; })[0];
    // 2. sonst irgendeine deutsche Stimme
    if(!v){ v = voices.filter(function(x){ return x.lang && x.lang.toLowerCase().indexOf('de')===0; })[0]; }
    return v || null;
  }

  function init(){
    if(!synth){ notifyMissing(); return; }
    deVoice = pickGermanVoice();
    if(synth.onvoiceschanged !== undefined){
      synth.addEventListener('voiceschanged', function(){
        deVoice = pickGermanVoice();
        voicesReady = !!deVoice;
        if(!deVoice) notifyMissing();
      });
    }
    // Manche Browser brauchen einen Tick
    setTimeout(function(){
      deVoice = pickGermanVoice();
      voicesReady = !!deVoice;
      if(!deVoice){ /* später nochmal probieren */ }
    }, 300);
    setTimeout(function(){
      if(!deVoice){ deVoice = pickGermanVoice(); voicesReady=!!deVoice; if(!deVoice) notifyMissing(); }
    }, 1200);
  }

  function notifyMissing(){
    if(onVoiceMissing) onVoiceMissing();
  }

  /**
   * Spricht einen deutschen Text.
   * @param text  String
   * @param opts  { rate, onstart, onend, button }
   */
  function speak(text, opts){
    opts = opts || {};
    if(!synth){
      toast("Dein Browser unterstützt keine Sprachausgabe.",true);
      return;
    }
    try{ synth.cancel(); }catch(e){}

    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    if(!deVoice) deVoice = pickGermanVoice();
    if(deVoice) u.voice = deVoice;
    u.rate = opts.rate!=null ? opts.rate : 0.92;   // etwas langsamer zum Lernen
    u.pitch = 1;

    if(opts.button){
      opts.button.classList.add('speaking');
    }
    u.onstart = function(){ if(opts.onstart) opts.onstart(); };
    u.onend = function(){
      if(opts.button) opts.button.classList.remove('speaking');
      if(opts.onend) opts.onend();
    };
    u.onerror = function(){
      if(opts.button) opts.button.classList.remove('speaking');
      if(opts.onend) opts.onend();
    };
    // kleine Verzögerung hilft manchen Browsern nach cancel()
    setTimeout(function(){ synth.speak(u); }, 60);
  }

  function stop(){ try{ synth.cancel(); }catch(e){} }

  function hasGermanVoice(){ return !!deVoice; }

  /* ---------------- AUFNAHME (MediaRecorder) ---------------- */
  var recState = {
    recorder:null, stream:null, chunks:[], audioURL:null, blob:null, mimeType:'audio/webm'
  };

  function isRecordingSupported(){
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  function bestMime(){
    var types = ['audio/webm','audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/mp4'];
    for(var i=0;i<types.length;i++){
      if(window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[i])) return types[i];
    }
    return '';
  }

  /**
   * Startet Aufnahme. Gibt Promise auf true/false zurück.
   */
  function startRecording(){
    return new Promise(function(resolve){
      if(!isRecordingSupported()){ resolve(false); return; }
      recState.mimeType = bestMime();
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream){
          recState.stream = stream;
          recState.chunks = [];
          var opts = recState.mimeType ? {mimeType:recState.mimeType} : {};
          try{ recState.recorder = new MediaRecorder(stream, opts); }
          catch(e){ recState.recorder = new MediaRecorder(stream); recState.mimeType=''; }

          recState.recorder.ondataavailable = function(e){
            if(e.data && e.data.size>0) recState.chunks.push(e.data);
          };
          recState.recorder.onstop = function(){
            var type = recState.mimeType || 'audio/webm';
            recState.blob = new Blob(recState.chunks, {type:type});
            if(recState.audioURL){ URL.revokeObjectURL(recState.audioURL); }
            recState.audioURL = URL.createObjectURL(recState.blob);
            // Streams freigeben
            recState.stream.getTracks().forEach(function(t){ t.stop(); });
            recState.stream = null;
          };
          recState.recorder.start();
          resolve(true);
        })
        .catch(function(err){
          resolve(false);
        });
    });
  }

  function stopRecording(){
    return new Promise(function(resolve){
      if(recState.recorder && recState.recorder.state!=='inactive'){
        recState.recorder.onstop = function(){
          var type = recState.mimeType || 'audio/webm';
          recState.blob = new Blob(recState.chunks, {type:type});
          if(recState.audioURL){ URL.revokeObjectURL(recState.audioURL); }
          recState.audioURL = URL.createObjectURL(recState.blob);
          if(recState.stream){ recState.stream.getTracks().forEach(function(t){ t.stop(); }); recState.stream=null; }
          resolve(recState.audioURL);
        };
        recState.recorder.stop();
      } else { resolve(recState.audioURL); }
    });
  }

  function getAudioURL(){ return recState.audioURL; }

  return {
    init: init,
    speak: speak,
    stop: stop,
    hasGermanVoice: hasGermanVoice,
    onVoiceMissing: function(fn){ onVoiceMissing = fn; },
    isRecordingSupported: isRecordingSupported,
    startRecording: startRecording,
    stopRecording: stopRecording,
    getAudioURL: getAudioURL
  };
})();
