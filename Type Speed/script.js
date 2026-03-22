(function(){

const SCHEMA_VERSION = '3';
(function(){
  if(localStorage.getItem('typefast_schema_v') !== SCHEMA_VERSION){
    Object.keys(localStorage).forEach(k=>{if(k.startsWith('typefast_'))localStorage.removeItem(k)});
    localStorage.setItem('typefast_schema_v', SCHEMA_VERSION);
  }
})();

const WORDS = ["the","be","to","of","and","a","in","that","have","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him","know","take","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also","back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us","great","between","need","large","often","hand","high","place","hold","turn","was","around","every","found","still","learn","plant","cover","food","sun","four","state","keep","never","start","city","earth","eye","light","thought","head","under","story","saw","left","don","few","while","along","might","close","something","seem","next","hard","open","example","begin","life","always","those","both","paper","together","got","group","run","important","until","children","side","feet","car","mile","night","walk","white","sea","began","grow","took","river","carry","once","book","hear","stop","without","second","later","miss","idea","enough","eat","face","watch","far","really","almost","let","above","girl","sometimes","mountain","cut","young","talk","soon","list","song","being","leave","family","body","music","color","stand","questions","fish","area","mark","dog","horse","birds","problem","complete","room","knew","since","ever","piece","told","usually","friends","easy","heard","order","red","door","sure","become","top","ship","across","today","during","short","better","best","however","low","hours","black","products","happened","whole","measure","remember","early","waves","reached","listen","wind","rock","space","covered","fast","several","himself","toward","five","step","morning","passed","vowel","true","hundred","against","pattern","numeral","table","north","slowly","money","map","farm","pulled","draw","voice","power","town","fine","drive","led","contain","front","teach","week","final","gave","green","quick","developed","ocean","warm","free","minute","strong","special","behind","clear","tail","produce","fact","street","inches","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","yet","busy","test","record","boat","common","gold","possible","plane","age","wonder","laughed","thousand","ran","check","game","shape","yes","hot","brought","heat","snow","bed","bring","sit","perhaps","fill","east","weight","language","among"];
const PUNCT_EXTRAS = [',','.',';',':','!','?',"'"];
const NUMS = ['2','3','4','5','6','7','8','9','10','12','15','20','100'];
const KEYBOARD_ROWS = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','='],
  ['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
  ['A','S','D','F','G','H','J','K','L',';',"'"],
  ['Z','X','C','V','B','N','M',',','.','/'],
  [' ']
];
const THEMES = ['ink','carbon','rust'];
const THEME_LABELS = {ink:'INK',carbon:'CRBN',rust:'RUST'};
const PACE_LABELS = [[0,'—'],[1,'slow'],[30,'building'],[50,'good pace'],[70,'fast'],[90,'blazing']];

let selectedTime = 15;
let selectedWords = 25;
let selectedContent = 'words';
let currentScreen = 'home';
let testWords = [];
let currentWordIdx = 0;
let typedInWord = '';
let totalKeystrokes = 0;
let correctKeystrokes = 0;
let incorrectKeystrokes = 0;
let testStarted = false;
let testStartTime = null;
let timerInterval = null;
let wpmInterval = null;
let timeLeft = 0;
let wpmHistory = [];
let perSecondWpm = [];
let wpmSampleInterval = null;
let consecutiveErrors = 0;
let streak = 0;
let perKeyMistakes = {};
let wordLineOffsets = [];
let lineHeight = 0;
let currentLine = 0;
let soundEnabled = true;
let idleTimer = null;
let sparklineHistory = [];
let finalWpmResult = 0;
let finalAccResult = 0;
let finalElapsed = 0;
let clockInterval = null;
let paceInterval = null;
let rhythmData = [];
let lastKeystrokeTime = 0;
let tabGuardActive = false;
let tabGuardTimer = null;
let currentThemeIdx = 0;
let paceLabel = '';

const cursor = document.getElementById('cursor');
const vignette = document.getElementById('vignette');
const caretEl = document.getElementById('caret-el');
const capsWarning = document.getElementById('caps-warning');
const screenHome = document.getElementById('screen-home');
const screenTest = document.getElementById('screen-test');
const screenResults = document.getElementById('screen-results');
const wordsContainer = document.getElementById('words-container');
const liveWpm = document.getElementById('live-wpm');
const liveAcc = document.getElementById('live-acc');
const liveTime = document.getElementById('live-time');
const liveStreak = document.getElementById('live-streak');
const timerBar = document.getElementById('timer-bar');
const sparkCanvas = document.getElementById('sparkline');
const sparkCtx = sparkCanvas.getContext('2d');
const rhythmCanvas = document.getElementById('rhythm-canvas');
const rhythmCtx = rhythmCanvas.getContext('2d');
const restartGuard = document.getElementById('restart-guard');

document.getElementById('header-date').textContent = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

function attachHoverCursor(){
  document.querySelectorAll('button,.mode-chip,.kb-key,.btn-result').forEach(el=>{
    if(el._hoverBound) return;
    el._hoverBound = true;
    el.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
  });
}
attachHoverCursor();

const savedTheme = localStorage.getItem('typefast_theme') || 'ink';
currentThemeIdx = THEMES.indexOf(savedTheme) >= 0 ? THEMES.indexOf(savedTheme) : 0;
applyTheme(THEMES[currentThemeIdx]);

function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  const lbl = document.getElementById('theme-label');
  if(lbl) lbl.textContent = THEME_LABELS[t];
  localStorage.setItem('typefast_theme', t);
}

document.getElementById('btn-theme').addEventListener('click',()=>{
  currentThemeIdx = (currentThemeIdx + 1) % THEMES.length;
  applyTheme(THEMES[currentThemeIdx]);
});

soundEnabled = localStorage.getItem('typefast_sound') !== 'off';
updateSoundBtn();

function updateSoundBtn(){
  const btn = document.getElementById('btn-sound');
  if(!btn) return;
  btn.classList.toggle('muted',!soundEnabled);
  btn.title = soundEnabled ? 'Sound on' : 'Sound off';
}

document.getElementById('btn-sound').addEventListener('click',()=>{
  soundEnabled = !soundEnabled;
  localStorage.setItem('typefast_sound', soundEnabled ? 'on' : 'off');
  updateSoundBtn();
});

function getStorageKey(){return `typefast_best_${selectedTime}s_${selectedWords}w_${selectedContent}`}
function getLBKey(){return `typefast_lb_${selectedTime}s_${selectedWords}w_${selectedContent}`}
function getBest(){return parseInt(localStorage.getItem(getStorageKey())||'0')}
function setBest(wpm){if(wpm>getBest()) localStorage.setItem(getStorageKey(),wpm)}

function getLeaderboard(){
  try{return JSON.parse(localStorage.getItem(getLBKey())||'[]')}catch(e){return []}
}
function saveLeaderboard(entry){
  let lb = getLeaderboard();
  lb.push(entry);
  lb.sort((a,b)=>b.wpm-a.wpm);
  lb = lb.slice(0,5);
  localStorage.setItem(getLBKey(), JSON.stringify(lb));
}

function updateBestDisplay(){
  const b = getBest();
  const el = document.getElementById('best-score-display');
  if(b>0) el.innerHTML = `Personal Best: <span>${b} WPM</span>`;
  else el.textContent = '';
  renderLeaderboard();
}

function renderLeaderboard(){
  const section = document.getElementById('leaderboard-section');
  const lb = getLeaderboard();
  if(!lb.length){section.innerHTML='';return}
  let html = `<div class="lb-header">Top Scores — ${selectedTime}s / ${selectedWords} words</div>`;
  lb.forEach((entry,i)=>{
    const cls = i===0?'lb-row lb-top':'lb-row';
    html += `<div class="${cls}"><span class="lb-rank">#${i+1}</span><span>${entry.wpm} WPM</span><span>${entry.acc}%</span><span>${entry.date}</span></div>`;
  });
  section.innerHTML = html;
}

function showScreen(name){
  const map = {home:screenHome,test:screenTest,results:screenResults};
  const cur = map[currentScreen];
  const next = map[name];
  cur.classList.add('exit');
  setTimeout(()=>{
    cur.classList.remove('active','exit');
    next.classList.add('active');
    currentScreen = name;
    if(name==='home'){updateBestDisplay();startIdleTimer();stopClock()}
    else{clearIdleTimer();screenHome.classList.remove('idle')}
    if(name==='test') startClock();
  },380);
}

function startIdleTimer(){
  clearIdleTimer();
  idleTimer = setTimeout(()=>{if(currentScreen==='home') screenHome.classList.add('idle')},5000);
}
function clearIdleTimer(){if(idleTimer) clearTimeout(idleTimer);idleTimer=null}

document.addEventListener('mousemove',()=>{
  if(currentScreen==='home'){screenHome.classList.remove('idle');startIdleTimer()}
});

document.getElementById('time-modes').addEventListener('click',e=>{
  const chip = e.target.closest('.mode-chip');if(!chip) return;
  document.querySelectorAll('#time-modes .mode-chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');selectedTime=parseInt(chip.dataset.time);updateBestDisplay();
  screenHome.classList.remove('idle');startIdleTimer();
});
document.getElementById('word-modes').addEventListener('click',e=>{
  const chip = e.target.closest('.mode-chip');if(!chip) return;
  document.querySelectorAll('#word-modes .mode-chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');selectedWords=parseInt(chip.dataset.words);updateBestDisplay();
  screenHome.classList.remove('idle');startIdleTimer();
});
document.getElementById('content-modes').addEventListener('click',e=>{
  const chip = e.target.closest('.mode-chip');if(!chip) return;
  document.querySelectorAll('#content-modes .mode-chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');selectedContent=chip.dataset.content;updateBestDisplay();
  screenHome.classList.remove('idle');startIdleTimer();
});

document.getElementById('btn-start').addEventListener('click',function(e){
  const rect = this.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const size = Math.max(rect.width,rect.height)*2;
  ripple.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;position:absolute;`;
  this.appendChild(ripple);
  setTimeout(()=>ripple.remove(),650);
  setTimeout(()=>startTest(),180);
});

document.getElementById('btn-retry').addEventListener('click',()=>startTest());
document.getElementById('btn-change').addEventListener('click',()=>{stopTest();showScreen('home')});

document.getElementById('btn-copy').addEventListener('click',function(){
  const d = new Date().toISOString().split('T')[0];
  const text = `TypeFast · ${finalWpmResult} WPM · ${finalAccResult}% ACC · ${selectedTime}s · ${d}`;
  navigator.clipboard.writeText(text).then(()=>{
    this.textContent='Copied!';this.classList.add('copied');
    setTimeout(()=>{this.textContent='Copy Result';this.classList.remove('copied')},2000);
  });
});

function startClock(){
  stopClock();
  const el = document.getElementById('masthead-clock');
  function tick(){
    const n = new Date();
    el.textContent = n.toTimeString().slice(0,8);
  }
  tick();
  clockInterval = setInterval(tick,1000);
}
function stopClock(){clearInterval(clockInterval);clockInterval=null}

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
function applyPunct(word){
  if(Math.random()<0.3){
    const p=PUNCT_EXTRAS[Math.floor(Math.random()*PUNCT_EXTRAS.length)];
    if(p==="'") return word.slice(0,Math.max(1,Math.floor(word.length/2)))+"'"+word.slice(Math.max(1,Math.floor(word.length/2)));
    return word+p;
  }
  return word;
}
function buildWordList(){
  let shuffled=shuffle(WORDS);let result=[];
  while(result.length<selectedWords) result.push(...shuffled.slice(0,selectedWords-result.length));
  result=result.slice(0,selectedWords);
  if(selectedContent==='punct') result=result.map(w=>applyPunct(w));
  else if(selectedContent==='nums'){
    const nc=Math.max(3,Math.floor(selectedWords*0.15));
    for(let i=0;i<nc;i++){const pos=Math.floor(Math.random()*result.length);result.splice(pos,0,NUMS[Math.floor(Math.random()*NUMS.length)])}
    result=result.slice(0,selectedWords);
  }
  return result;
}

function startTest(){
  stopTest();
  testWords=buildWordList();
  currentWordIdx=0;typedInWord='';totalKeystrokes=0;correctKeystrokes=0;incorrectKeystrokes=0;
  testStarted=false;testStartTime=null;timeLeft=selectedTime;
  wpmHistory=[];perSecondWpm=[];sparklineHistory=[];consecutiveErrors=0;streak=0;perKeyMistakes={};
  rhythmData=[];lastKeystrokeTime=0;tabGuardActive=false;clearTabGuard();paceLabel='';
  liveWpm.textContent='0';liveWpm.className='stat-value';
  liveAcc.textContent='100%';liveAcc.className='stat-value';
  liveTime.textContent=selectedTime+'s';liveTime.className='stat-value';
  liveStreak.textContent='0';
  timerBar.style.width='100%';timerBar.style.background='var(--accent)';
  caretEl.style.opacity='0';clearSparkline();clearRhythmCanvas();
  const pi=document.getElementById('pace-indicator');pi.textContent='';pi.classList.remove('visible');
  renderWords();
  if(currentScreen!=='test') showScreen('test');
  else{wordsContainer.style.transition='none';wordsContainer.style.transform='translateY(0)';currentLine=0}
}

function renderWords(){
  wordsContainer.innerHTML='';wordsContainer.style.transform='translateY(0)';currentLine=0;
  testWords.forEach((word,wi)=>{
    const wordEl=document.createElement('div');
    wordEl.classList.add('word');wordEl.dataset.idx=wi;
    if(wi===0) wordEl.classList.add('current');
    word.split('').forEach(ch=>{
      const charEl=document.createElement('span');charEl.classList.add('char');charEl.textContent=ch;
      wordEl.appendChild(charEl);
    });
    wordsContainer.appendChild(wordEl);
  });
  setTimeout(()=>{computeLineOffsets();positionCaret()},60);
}

function computeLineOffsets(){
  const wordEls=wordsContainer.querySelectorAll('.word');
  wordLineOffsets=[];let prevTop=null;let lineIdx=0;
  wordEls.forEach((el,i)=>{
    const top=el.offsetTop;
    if(prevTop===null) prevTop=top;
    if(top>prevTop+5){lineIdx++;prevTop=top}
    wordLineOffsets[i]={line:lineIdx,top};
  });
  if(wordEls.length>0) lineHeight=wordEls[0].offsetHeight+8;
}

function getWordEl(idx){return wordsContainer.querySelector(`.word[data-idx="${idx}"]`)}
function getCharEls(wordEl){return wordEl.querySelectorAll('.char')}

function positionCaret(newLine){
  const wordEl=getWordEl(currentWordIdx);
  if(!wordEl){caretEl.style.opacity='0';return}
  const chars=getCharEls(wordEl);
  const idx=typedInWord.length;
  const targetEl=idx<chars.length?chars[idx]:chars[chars.length-1];
  if(!targetEl){caretEl.style.opacity='0';return}
  if(newLine){
    caretEl.style.transition='opacity 0.1s';
    caretEl.style.opacity='0';
    setTimeout(()=>{
      const rect=targetEl.getBoundingClientRect();
      const offset=idx>=chars.length?rect.right-1:rect.left-1;
      caretEl.style.transition='left 0.08s ease,top 0.08s ease,opacity 0.15s';
      caretEl.style.left=offset+'px';caretEl.style.top=(rect.top+2)+'px';caretEl.style.height=(rect.height-4)+'px';
      caretEl.style.opacity='1';
    },300);
  } else {
    caretEl.style.transition='left 0.08s ease,top 0.08s ease,opacity 0.1s';
    const rect=targetEl.getBoundingClientRect();
    const offset=idx>=chars.length?rect.right-1:rect.left-1;
    caretEl.style.left=offset+'px';caretEl.style.top=(rect.top+2)+'px';caretEl.style.height=(rect.height-4)+'px';
    caretEl.style.opacity='1';
  }
}

function flashVignette(){vignette.classList.add('flash');setTimeout(()=>vignette.classList.remove('flash'),80)}

function updateWordDisplay(){
  const wordEl=getWordEl(currentWordIdx);if(!wordEl) return;
  const chars=getCharEls(wordEl);const word=testWords[currentWordIdx];
  chars.forEach((ch,ci)=>{
    ch.classList.remove('correct','wrong','current');
    if(ci<typedInWord.length) ch.classList.add(typedInWord[ci]===word[ci]?'correct':'wrong');
  });
  positionCaret(false);
}

function advanceLine(){
  if(!wordLineOffsets.length) return false;
  const info=wordLineOffsets[currentWordIdx];if(!info) return false;
  const targetLine=info.line;
  if(targetLine>currentLine){
    const scrollY=(targetLine-1)*lineHeight;
    wordsContainer.style.transition='transform 0.28s ease';
    wordsContainer.style.transform=`translateY(-${scrollY}px)`;
    currentLine=targetLine;return true;
  }
  return false;
}

function calcWpm(){
  if(!testStartTime) return 0;
  const elapsed=(Date.now()-testStartTime)/60000;if(elapsed<=0) return 0;
  return Math.round((correctKeystrokes/5)/elapsed);
}
function calcRawWpm(){
  if(!testStartTime) return 0;
  const elapsed=(Date.now()-testStartTime)/60000;if(elapsed<=0) return 0;
  return Math.round((totalKeystrokes/5)/elapsed);
}
function calcNetWpm(){
  if(!testStartTime) return 0;
  const elapsed=(Date.now()-testStartTime)/60000;if(elapsed<=0) return 0;
  const errorsPerMin=incorrectKeystrokes/elapsed;
  return Math.max(0,Math.round((correctKeystrokes/5)/elapsed-errorsPerMin));
}
function calcAcc(){
  if(totalKeystrokes===0) return 100;
  return Math.round((correctKeystrokes/totalKeystrokes)*100);
}
function calcConsistency(samples){
  if(samples.length<2) return 100;
  const avg=samples.reduce((a,b)=>a+b,0)/samples.length;
  if(avg===0) return 100;
  const variance=samples.reduce((s,v)=>s+Math.pow(v-avg,2),0)/samples.length;
  const stdDev=Math.sqrt(variance);
  return Math.max(0,Math.round(100-(stdDev/avg*100)));
}

function clearSparkline(){sparkCtx.clearRect(0,0,80,30)}
function drawSparkline(){
  const data=sparklineHistory.slice(-10);sparkCtx.clearRect(0,0,80,30);if(data.length<2) return;
  const max=Math.max(...data,1);
  const inkColor=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f0ece4';
  sparkCtx.beginPath();
  data.forEach((v,i)=>{
    const x=(i/(data.length-1))*76+2;const y=28-(v/max)*24;
    i===0?sparkCtx.moveTo(x,y):sparkCtx.lineTo(x,y);
  });
  sparkCtx.strokeStyle=inkColor;sparkCtx.lineWidth=1.5;sparkCtx.globalAlpha=0.7;sparkCtx.stroke();sparkCtx.globalAlpha=1;
}

function clearRhythmCanvas(){rhythmCtx.clearRect(0,0,rhythmCanvas.width,rhythmCanvas.height)}
function drawRhythmCanvas(){
  const W=rhythmCanvas.width;const H=36;
  rhythmCtx.clearRect(0,0,W,H);
  const barW=Math.floor(W/30)-1;
  const last30=rhythmData.slice(-30);
  const maxInterval=500;
  const style=getComputedStyle(document.documentElement);
  const inkColor=style.getPropertyValue('--ink').trim()||'#0d0b08';
  const accentColor=style.getPropertyValue('--accent').trim()||'#c0392b';
  last30.forEach((item,i)=>{
    const barH=item.interval>0?Math.max(4,Math.round((1-Math.min(item.interval,maxInterval)/maxInterval)*H*0.85)):4;
    const x=i*(barW+1);const y=H-barH;
    rhythmCtx.fillStyle=item.correct?inkColor:accentColor;
    rhythmCtx.globalAlpha=item.correct?0.5:0.75;
    rhythmCtx.fillRect(x,y,barW,barH);
    rhythmCtx.globalAlpha=1;
  });
}

function getPaceLabel(wpm){
  let label='—';
  for(let i=0;i<PACE_LABELS.length;i++){
    if(wpm>=PACE_LABELS[i][0]) label=PACE_LABELS[i][1];
  }
  return label;
}

function startTimers(){
  timerInterval=setInterval(()=>{
    timeLeft--;
    const pct=(timeLeft/selectedTime)*100;
    timerBar.style.width=pct+'%';
    liveTime.textContent=timeLeft+'s';
    if(timeLeft<=selectedTime*0.2){liveTime.className='stat-value red';timerBar.style.background='#c0392b'}
    else if(timeLeft<=selectedTime*0.5) liveTime.className='stat-value amber';
    if(timeLeft<=0) endTest();
  },1000);

  wpmInterval=setInterval(()=>{
    const w=calcWpm();
    liveWpm.textContent=w;
    const a=calcAcc();
    liveAcc.textContent=a+'%';
    sparklineHistory.push(w);perSecondWpm.push(w);
    drawSparkline();
  },1000);

  wpmSampleInterval=setInterval(()=>{wpmHistory.push(calcWpm())},5000);

  paceInterval=setInterval(()=>{
    const w=calcWpm();const newLabel=getPaceLabel(w);
    const pi=document.getElementById('pace-indicator');
    if(newLabel!==paceLabel){
      paceLabel=newLabel;pi.classList.remove('visible');
      setTimeout(()=>{pi.textContent=newLabel;pi.classList.add('visible')},200);
    }
  },2000);
}

function stopTest(){
  clearInterval(timerInterval);clearInterval(wpmInterval);clearInterval(wpmSampleInterval);clearInterval(paceInterval);
  timerInterval=null;wpmInterval=null;wpmSampleInterval=null;paceInterval=null;
}

function clearTabGuard(){
  restartGuard.classList.remove('visible');
  if(tabGuardTimer) clearTimeout(tabGuardTimer);tabGuardTimer=null;tabGuardActive=false;
}

function handleKey(e){
  if(currentScreen==='home') return;

  if(e.key==='Tab'){
    e.preventDefault();
    if(currentScreen==='results'){startTest();return}
    if(!testStarted||totalKeystrokes<5){startTest();return}
    if(tabGuardActive){clearTabGuard();startTest();return}
    tabGuardActive=true;restartGuard.classList.add('visible');
    tabGuardTimer=setTimeout(()=>clearTabGuard(),2000);
    return;
  }

  if(currentScreen==='results') return;
  if(currentScreen!=='test') return;

  if(e.key==='CapsLock'){
    setTimeout(()=>{
      const on=e.getModifierState&&e.getModifierState('CapsLock');
      capsWarning.classList.toggle('visible',on);
    },50);
    return;
  }
  if(e.getModifierState&&e.getModifierState('CapsLock')) capsWarning.classList.add('visible');
  else capsWarning.classList.remove('visible');

  if(!testStarted&&e.key.length===1){
    testStarted=true;testStartTime=Date.now();startTimers();
  }
  if(!testStarted) return;
  if(timeLeft<=0) return;

  const wordEl=getWordEl(currentWordIdx);if(!wordEl) return;
  const word=testWords[currentWordIdx];

  if(e.key==='Backspace'){
    e.preventDefault();
    if(typedInWord.length>0){
      typedInWord=typedInWord.slice(0,-1);updateWordDisplay();playTypeSoundWith(1.0);
    }
    return;
  }

  if(e.key===' '){
    e.preventDefault();
    if(typedInWord.length===0){
      const penalty=word.length;
      incorrectKeystrokes+=penalty;totalKeystrokes+=penalty;
      word.split('').forEach(ch=>{const k=ch.toLowerCase();perKeyMistakes[k]=(perKeyMistakes[k]||0)+1});
      flashVignette();streak=0;playTypeSoundWith(0.7);liveStreak.textContent=streak;
      wordEl.classList.remove('current');currentWordIdx++;typedInWord='';consecutiveErrors=0;
      if(currentWordIdx>=testWords.length){endTest();return}
      const nw=getWordEl(currentWordIdx);if(nw){nw.classList.add('current');const nl=advanceLine();setTimeout(()=>positionCaret(nl),10)}
      return;
    }
    const isCorrect=typedInWord===word;
    if(!isCorrect){
      incorrectKeystrokes++;totalKeystrokes++;flashVignette();streak=0;playTypeSoundWith(0.7);
    } else {
      correctKeystrokes++;totalKeystrokes++;streak++;
      const chars=getCharEls(wordEl);
      chars.forEach((ch,ci)=>{
        ch.style.transitionDelay=(ci*30)+'ms';
      });
      wordEl.classList.add('correct-flash','correct-done');
      setTimeout(()=>{wordEl.classList.remove('correct-flash');chars.forEach(ch=>{ch.style.transitionDelay=''})},350);
      playTypeSoundWith(1.3);
    }
    liveStreak.textContent=streak;
    wordEl.classList.remove('current');currentWordIdx++;typedInWord='';consecutiveErrors=0;
    if(currentWordIdx>=testWords.length){endTest();return}
    const nextWordEl=getWordEl(currentWordIdx);
    if(nextWordEl){nextWordEl.classList.add('current');const nl=advanceLine();setTimeout(()=>positionCaret(nl),10)}
    return;
  }

  if(e.key.length!==1) return;
  if(typedInWord.length>=word.length) return;

  const expected=word[typedInWord.length];const isCorrect=e.key===expected;
  const now=Date.now();const interval=lastKeystrokeTime>0?now-lastKeystrokeTime:0;lastKeystrokeTime=now;
  totalKeystrokes++;

  if(isCorrect){
    correctKeystrokes++;consecutiveErrors=0;playTypeSoundWith(1.0);
    rhythmData.push({interval,correct:true});
  } else {
    incorrectKeystrokes++;consecutiveErrors++;flashVignette();playTypeSoundWith(0.85);
    rhythmData.push({interval,correct:false});
    const keyLower=e.key.toLowerCase();perKeyMistakes[keyLower]=(perKeyMistakes[keyLower]||0)+1;
    if(consecutiveErrors>=3){
      wordEl.classList.remove('shake');void wordEl.offsetWidth;wordEl.classList.add('shake');
      setTimeout(()=>wordEl.classList.remove('shake'),400);
    }
  }
  drawRhythmCanvas();
  typedInWord+=e.key;updateWordDisplay();
}

document.addEventListener('keydown',handleKey);

function endTest(){
  stopTest();clearTabGuard();
  caretEl.style.opacity='0';capsWarning.classList.remove('visible');
  const elapsed=testStartTime?Math.round((Date.now()-testStartTime)/1000):selectedTime;
  const netWpm=calcNetWpm();const rawWpm=calcRawWpm();
  const acc=calcAcc();const cons=calcConsistency(perSecondWpm);
  finalWpmResult=netWpm;finalAccResult=acc;finalElapsed=elapsed;
  const prevBest=getBest();
  setBest(netWpm);
  saveLeaderboard({wpm:netWpm,acc,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})});
  wpmHistory.push(netWpm);
  if(netWpm>prevBest&&prevBest>0) scheduleConfetti();
  showResults(netWpm,rawWpm,acc,elapsed,cons);
}

function scheduleConfetti(){
  const container=document.getElementById('confetti-container');
  const colors=['#c0392b','#0d0b08','#f0ece4','#8b2920','#d4a017','#2d6a2d'];
  for(let i=0;i<40;i++){
    const el=document.createElement('div');
    el.classList.add('confetti-piece');
    const size=4+Math.random()*6;
    el.style.cssText=`
      left:${Math.random()*100}%;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()<0.5?'50%':'0'};
      animation-duration:${0.8+Math.random()*1.2}s;
      animation-delay:${Math.random()*0.5}s;
    `;
    container.appendChild(el);
  }
  setTimeout(()=>{container.innerHTML=''},3500);
}

function animateCount(el,target,suffix,duration){
  const start=performance.now();const dur=duration||1200;
  function step(now){
    const t=Math.min((now-start)/dur,1);const ease=1-Math.pow(1-t,3);
    el.textContent=Math.round(ease*target)+(suffix||'');
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function showResults(netWpm,rawWpm,acc,elapsed,cons){
  document.getElementById('res-time').textContent=elapsed+'s';
  document.getElementById('res-mode-tag').textContent=selectedTime+'s · '+selectedWords+' words · '+selectedContent;
  document.getElementById('res-consistency').textContent=cons+'%';

  const wpmBigEl=document.getElementById('res-wpm');
  wpmBigEl.dataset.value=netWpm;

  setTimeout(()=>{
    animateCount(wpmBigEl,netWpm,'',1400);
    animateCount(document.getElementById('res-raw-wpm'),rawWpm,'',1100);
    animateCount(document.getElementById('res-acc-num'),acc,'',1200);
    animateCount(document.getElementById('res-keystrokes'),totalKeystrokes,'',900);
    animateCount(document.getElementById('res-correct'),correctKeystrokes,'',900);
    animateCount(document.getElementById('res-incorrect'),incorrectKeystrokes,'',900);

    const ring=document.getElementById('acc-ring');
    const offset=339.3-(acc/100)*339.3;
    setTimeout(()=>{ring.style.strokeDashoffset=offset},300);

    drawWpmChart();buildKeyboard();
    setTimeout(()=>{
      const kb=document.getElementById('keyboard-section-el');
      if(kb) kb.scrollIntoView({behavior:'smooth',block:'nearest'});
    },900);
  },500);

  showScreen('results');
  document.getElementById('screen-results').scrollTop=0;
}

function drawWpmChart(){
  const canvas=document.getElementById('wpm-chart');
  const ctx=canvas.getContext('2d');
  const W=canvas.offsetWidth;const H=120;
  canvas.width=W;canvas.height=H;ctx.clearRect(0,0,W,H);
  const data=wpmHistory.length>1?wpmHistory:[0,wpmHistory[0]||0];
  const maxVal=Math.max(...data,10);
  const pad={top:12,right:14,bottom:20,left:30};
  const gW=W-pad.left-pad.right;const gH=H-pad.top-pad.bottom;
  const style=getComputedStyle(document.documentElement);
  const inkColor=style.getPropertyValue('--ink').trim()||'#0d0b08';
  const accentColor=style.getPropertyValue('--accent').trim()||'#c0392b';
  ctx.strokeStyle=inkColor;ctx.globalAlpha=0.07;ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=pad.top+(gH/4)*i;
    ctx.beginPath();ctx.moveTo(pad.left,y);ctx.lineTo(pad.left+gW,y);ctx.stroke();
    ctx.globalAlpha=0.4;ctx.fillStyle=inkColor;ctx.font='9px Courier Prime,monospace';
    ctx.fillText(Math.round(maxVal-(maxVal/4)*i),4,y+4);ctx.globalAlpha=0.07;
  }
  ctx.globalAlpha=1;
  const points=data.map((v,i)=>({x:pad.left+(i/(data.length-1))*gW,y:pad.top+gH-(v/maxVal)*gH}));
  ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);
  for(let i=1;i<points.length;i++){const cpx=(points[i-1].x+points[i].x)/2;ctx.bezierCurveTo(cpx,points[i-1].y,cpx,points[i].y,points[i].x,points[i].y)}
  ctx.lineTo(points[points.length-1].x,pad.top+gH);ctx.lineTo(points[0].x,pad.top+gH);
  ctx.closePath();ctx.globalAlpha=0.1;ctx.fillStyle=accentColor;ctx.fill();ctx.globalAlpha=1;
  ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);
  for(let i=1;i<points.length;i++){const cpx=(points[i-1].x+points[i].x)/2;ctx.bezierCurveTo(cpx,points[i-1].y,cpx,points[i].y,points[i].x,points[i].y)}
  ctx.strokeStyle=accentColor;ctx.lineWidth=2;ctx.stroke();
  points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fillStyle=accentColor;ctx.fill()});
}

function buildKeyboard(){
  const kb=document.getElementById('keyboard');kb.innerHTML='';
  const maxMistakes=Math.max(1,...Object.values(perKeyMistakes));
  let delay=0;
  KEYBOARD_ROWS.forEach(row=>{
    const rowEl=document.createElement('div');rowEl.classList.add('kb-row');
    row.forEach(key=>{
      const keyEl=document.createElement('div');keyEl.classList.add('kb-key');
      if(key===' '){keyEl.classList.add('space');keyEl.textContent='space'}
      else {
        keyEl.textContent=key;
        const keyLower=key.toLowerCase();
        const mistakes=perKeyMistakes[keyLower]||0;
        if(mistakes>0){
          const ratio=mistakes/maxMistakes;
          if(ratio>=0.67) keyEl.classList.add('heat-3');
          else if(ratio>=0.33) keyEl.classList.add('heat-2');
          else keyEl.classList.add('heat-1');
          const tip=document.createElement('div');tip.classList.add('kb-tooltip');
          tip.textContent=`${key.toUpperCase()} — ${mistakes} mistake${mistakes!==1?'s':''}`;
          keyEl.appendChild(tip);
          keyEl.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
          keyEl.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
        }
      }
      setTimeout(()=>keyEl.classList.add('revealed'),delay);delay+=16;
      rowEl.appendChild(keyEl);
    });
    kb.appendChild(rowEl);
  });
}

updateBestDisplay();
startIdleTimer();

const _typeSoundB64 = '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';
const _typeSoundBytes = Uint8Array.from(atob(_typeSoundB64), c=>c.charCodeAt(0)).buffer;
const _audioCtx = new (window.AudioContext||window.webkitAudioContext)();
let _typeAudioBuffer = null;
_audioCtx.decodeAudioData(_typeSoundBytes.slice(0)).then(buf=>{_typeAudioBuffer=buf}).catch(()=>{});

function playTypeSoundWith(rate){
  if(!soundEnabled) return;
  if(!_typeAudioBuffer) return;
  if(_audioCtx.state==='suspended') _audioCtx.resume();
  const src=_audioCtx.createBufferSource();
  src.buffer=_typeAudioBuffer;src.playbackRate.value=rate||1.0;
  const gain=_audioCtx.createGain();gain.gain.value=0.5;
  src.connect(gain);gain.connect(_audioCtx.destination);src.start(0);
}

})();
