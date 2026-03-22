(function(){
 
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
let mx=window.innerWidth/2,my=window.innerHeight/2;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
});
setInterval(()=>{trail.style.left=mx+'px';trail.style.top=my+'px';},16);
document.addEventListener('mouseover',e=>{
  if(e.target.matches('button,a,.ctx-item,.dock-item,.desktop-icon,.nav-btn,.calc-btn,.notes-btn,.launcher-item,.traffic,.title-close-btn,.fp-btn,.fp-toggle,.fp-mail-row,.tree-item,.sidebar-item,.note-item,.breadcrumb-part,.shortcut-row,.fp-link')){cursor.classList.add('hovered');}
  else{cursor.classList.remove('hovered');}
});
 
const auroraCanvas=document.getElementById('aurora-canvas');
const actx=auroraCanvas.getContext('2d');
const canvas=document.getElementById('canvas-bg');
const ctx=canvas.getContext('2d');
let W,H;
function resizeCanvases(){
  W=window.innerWidth;H=window.innerHeight;
  auroraCanvas.width=canvas.width=W;
  auroraCanvas.height=canvas.height=H;
}
resizeCanvases();
window.addEventListener('resize',resizeCanvases);
 
const blobs=[
  {x:W*0.2,y:H*0.3,vx:0.18,vy:0.12,r:W*0.35,color:'rgba(168,85,247,0.06)'},
  {x:W*0.7,y:H*0.6,vx:-0.14,vy:0.16,r:W*0.4,color:'rgba(0,245,255,0.05)'},
  {x:W*0.5,y:H*0.1,vx:0.1,vy:-0.1,r:W*0.28,color:'rgba(245,158,11,0.04)'},
];
function animAurora(){
  actx.clearRect(0,0,W,H);
  blobs.forEach(b=>{
    b.x+=b.vx;b.y+=b.vy;
    if(b.x<-b.r)b.x=W+b.r;if(b.x>W+b.r)b.x=-b.r;
    if(b.y<-b.r)b.y=H+b.r;if(b.y>H+b.r)b.y=-b.r;
    const g=actx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    g.addColorStop(0,b.color);g.addColorStop(1,'rgba(0,0,0,0)');
    actx.fillStyle=g;actx.beginPath();actx.arc(b.x,b.y,b.r,0,Math.PI*2);actx.fill();
  });
  requestAnimationFrame(animAurora);
}
animAurora();
 
let particles=[];
function mkP(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.28,vy:(Math.random()-0.5)*0.28,r:Math.random()*1.4+0.4,op:Math.random()*0.45+0.12};}
for(let i=0;i<90;i++)particles.push(mkP());
function animBG(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx+(mx/W-0.5)*0.06;p.y+=p.vy+(my/H-0.5)*0.06;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
  });
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){ctx.beginPath();ctx.strokeStyle=`rgba(0,245,255,${(1-d/110)*0.11})`;ctx.lineWidth=0.4;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}
  }
  particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,245,255,${p.op})`;ctx.shadowBlur=4;ctx.shadowColor='#00f5ff';ctx.fill();ctx.shadowBlur=0;});
  requestAnimationFrame(animBG);
}
animBG();
 
const biosLines=['SamtrediaOS BIOS v1.0.0  Copyright (C) 2026 Samtredia Systems','','CPU: Samtredia QC-X9 Quantum @ 5.2GHz — 8C / 16T','Checking memory... 16384MB DDR6-8400  OK','Initializing quantum drivers...  OK','Mounting hypercache 2048MB...  OK','Detecting /dev/nvme0n1 2TB NVMe Gen5...  OK','Establishing LATTICE-256 secure channels...  OK','Loading neural kernel modules...  OK','Starting display server...  OK','','Booting SamtrediaOS 1.0.0...'];
const biosOut=document.getElementById('bios-output');
let bi=0;
function biosStep(){
  if(bi<biosLines.length){biosOut.textContent+=biosLines[bi]+'\n';bi++;setTimeout(biosStep,bi===1?0:85);}
  else{setTimeout(()=>{const b=document.getElementById('bios-screen');b.style.transition='opacity 0.5s';b.style.opacity='0';setTimeout(()=>{b.style.display='none';const boot=document.getElementById('boot-screen');boot.style.display='flex';runBootSeq();},500);},400);}
}
setTimeout(biosStep,250);
 
const bootStatuses=['INITIALIZING NEURAL KERNEL...','LOADING QUANTUM DRIVERS...','MOUNTING HYPERCACHE...','ESTABLISHING SECURE CHANNELS...','STARTING DISPLAY SERVER...','DESKTOP READY'];
function runBootSeq(){
  let si=0;const bs=document.getElementById('boot-status');
  const iv=setInterval(()=>{si++;if(si<bootStatuses.length)bs.textContent=bootStatuses[si];},340);
  setTimeout(()=>{clearInterval(iv);const boot=document.getElementById('boot-screen');boot.style.transition='opacity 0.8s';boot.style.opacity='0';setTimeout(()=>{boot.style.display='none';document.getElementById('desktop').style.opacity='1';initDesktop();},800);},2100);
}
 
const APPS={
  terminal:{id:'terminal',label:'Terminal',icon:'⌨',color:'#00ff88',dockEl:null,winEl:null,state:'closed',lastPos:null},
  browser:{id:'browser',label:'Browser',icon:'◉',color:'#00f5ff',dockEl:null,winEl:null,state:'closed',lastPos:null},
  notes:{id:'notes',label:'Notes',icon:'✎',color:'#ffcc00',dockEl:null,winEl:null,state:'closed',lastPos:null},
  files:{id:'files',label:'Files',icon:'▤',color:'#a855f7',dockEl:null,winEl:null,state:'closed',lastPos:null},
  calc:{id:'calc',label:'Calculator',icon:'⊞',color:'#ff6b9d',dockEl:null,winEl:null,state:'closed',lastPos:null},
  about:{id:'about',label:'About PC',icon:'◈',color:'#00f5ff',dockEl:null,winEl:null,state:'closed',lastPos:null},
  ai:{id:'ai',label:'Samtredai',icon:'⬡',color:'#a855f7',dockEl:null,winEl:null,state:'closed',lastPos:null}
};
let zTop=100,focusedApp=null;
const maximizedState={};
 
function initDesktop(){buildDock();buildDesktopIcons();buildLauncher();startClock();initContextMenu();initKeyboardShortcuts();setupDragWidget();showNotif('SamtrediaOS','System ready. Neural engine online.','info');}
 
function buildDock(){
  const dock=document.getElementById('tb-dock');dock.innerHTML='';
  Object.values(APPS).forEach(app=>{
    const el=document.createElement('div');el.className='dock-item';el.title=app.label;
    el.innerHTML=`<span style="filter:drop-shadow(0 0 4px ${app.color})">${app.icon}</span>`;
    el.addEventListener('click',()=>dockClick(app.id));app.dockEl=el;dock.appendChild(el);
  });
}
 
function buildDesktopIcons(){
  const cont=document.getElementById('desktop-icons');cont.innerHTML='';
  const pos=[[22,22],[22,128],[22,234],[22,340],[22,446],[22,552],[22,658]];
  Object.values(APPS).forEach((app,i)=>{
    const el=document.createElement('div');el.className='desktop-icon';
    if(pos[i]){el.style.left=pos[i][0]+'px';el.style.top=pos[i][1]+'px';}
    el.innerHTML=`<div class="icon-tooltip">${app.label}</div><div class="icon-img" style="background:linear-gradient(135deg,rgba(${hexToRgb(app.color)},0.14),rgba(${hexToRgb(app.color)},0.04));border-color:rgba(${hexToRgb(app.color)},0.22)">${app.icon}</div><div class="icon-label">${app.label}</div>`;
    el.addEventListener('click',()=>{const img=el.querySelector('.icon-img');img.classList.remove('icon-pulse');void img.offsetWidth;img.classList.add('icon-pulse');openApp(app.id);});
    el.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();showIconCtx(app.id,e.clientX,e.clientY);});
    cont.appendChild(el);
  });
}
 
function buildLauncher(){
  const grid=document.getElementById('launcher-grid');grid.innerHTML='';
  Object.values(APPS).forEach((app,i)=>{
    const el=document.createElement('div');el.className='launcher-item';el.dataset.label=app.label.toLowerCase();
    el.style.animationDelay=(i*40)+'ms';
    el.innerHTML=`<div class="launcher-icon" style="filter:drop-shadow(0 0 7px ${app.color})">${app.icon}</div><div class="launcher-label">${app.label}</div>`;
    el.addEventListener('click',()=>{openApp(app.id);closeLauncher();});
    grid.appendChild(el);
  });
  document.getElementById('launcher-close').addEventListener('click',closeLauncher);
  document.getElementById('app-launcher').addEventListener('click',e=>{if(e.target===document.getElementById('app-launcher'))closeLauncher();});
  document.getElementById('launcher-search').addEventListener('input',e=>{
    const q=e.target.value.toLowerCase();
    document.querySelectorAll('.launcher-item').forEach(item=>{item.style.display=item.dataset.label.includes(q)?'':'none';});
  });
}
function openLauncher(){const l=document.getElementById('app-launcher');l.style.display='flex';document.getElementById('launcher-search').value='';document.querySelectorAll('.launcher-item').forEach(i=>{i.style.display='';});setTimeout(()=>document.getElementById('launcher-search').focus(),50);}
function closeLauncher(){document.getElementById('app-launcher').style.display='none';}
 
function hexToRgb(hex){return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;}
 
function dockClick(id){const app=APPS[id];if(app.state==='closed')openApp(id);else if(app.state==='open')minimizeApp(id);else if(app.state==='minimized')restoreApp(id);}
 
function openApp(id){
  const app=APPS[id];
  if(app.state==='open'){focusWindow(id);return;}
  if(app.state==='minimized'){restoreApp(id);return;}
  const win=createWindow(id);document.body.appendChild(win);app.winEl=win;app.state='open';updateDock(id);focusWindow(id);
}
 
function createWindow(id){
  const app=APPS[id];
  const win=document.createElement('div');win.className='window';win.id='win-'+id;
  const isMobile=window.innerWidth<768;
  const iw=id==='calc'?320:640;const ih=id==='calc'?520:480;
  let px,py;
  if(isMobile){px=0;py=window.innerHeight*0.15;}
  else{const mx2=window.innerWidth-iw-20;const my2=window.innerHeight-ih-60;px=app.lastPos?app.lastPos.x:Math.max(20,Math.random()*Math.max(1,mx2));py=app.lastPos?app.lastPos.y:Math.max(20,Math.random()*Math.max(1,my2));}
  win.style.cssText=`width:${isMobile?'100%':iw+'px'};height:${isMobile?'85vh':ih+'px'};left:${px}px;top:${isMobile?'auto':py+'px'};${isMobile?'bottom:0;':''};z-index:${++zTop};`;
  win.innerHTML=`<div class="window-glow"></div><div class="titlebar" data-winid="${id}"><div class="traffic t-close" data-action="close"></div><div class="traffic t-min" data-action="min"></div><div class="traffic t-max" data-action="max"></div><div class="titlebar-title">${app.label.toUpperCase()}</div><div class="title-close-btn" data-action="close">✕</div></div><div class="win-accent-bar" style="background:${app.color};opacity:0.7;"></div><div class="win-content" id="wc-${id}"></div><div class="resize-handle"></div>`;
  buildAppContent(id,win.querySelector('#wc-'+id));
  if(!isMobile){setupDrag(win,win.querySelector('.titlebar'));setupResize(win,win.querySelector('.resize-handle'));}
  win.addEventListener('mousedown',()=>focusWindow(id));
  win.querySelectorAll('.traffic,.title-close-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{e.stopPropagation();const a=btn.dataset.action;if(a==='close')closeApp(id);else if(a==='min')minimizeApp(id);else if(a==='max')toggleMaximize(id);});
  });
  return win;
}
 
function buildAppContent(id,c){
  if(id==='terminal')buildTerminal(c);else if(id==='browser')buildBrowser(c);else if(id==='notes')buildNotes(c);else if(id==='files')buildFiles(c);else if(id==='calc')buildCalc(c);else if(id==='about')buildAbout(c);else if(id==='ai')buildAI(c);
}
 
const FS={
  '/':['home'],
  '/home':['sam'],
  '/home/sam':['Documents','Downloads','Desktop','.config','README.md','.bashrc'],
  '/home/sam/Documents':['Projects','resume.pdf','notes.md','report.txt'],
  '/home/sam/Documents/Projects':['samtredia-kernel','samtredia-ui','samtredai'],
  '/home/sam/Documents/Projects/samtredia-kernel':['main.rs','Cargo.toml','README.md'],
  '/home/sam/Documents/Projects/samtredia-ui':['index.js','styles.css','package.json'],
  '/home/sam/Documents/Projects/samtredai':['engine.py','config.toml','requirements.txt'],
  '/home/sam/Downloads':['SamtrediaOS_1.0.0.iso','themes.tar.gz','wallpapers.zip'],
  '/home/sam/Desktop':['readme.txt','shortcuts.txt'],
  '/home/sam/.config':['sam-shell','quantum-renderer'],
  '/home/sam/.config/sam-shell':['config.toml','.env'],
  '/home/sam/.config/quantum-renderer':['settings.json'],
};
const FC={
  '/home/sam/README.md':'# SamtrediaOS\n\nWelcome to SamtrediaOS v1.0.0 Neural Edition.\nBuilt on quantum neural architecture.\n\n## Apps\n- Terminal, Browser, Notes, Files, Calculator, Samtredai AI',
  '/home/sam/.bashrc':'export PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\nalias cls="clear"\nPS1="sam@samtredia:~$ "',
  '/home/sam/Documents/notes.md':'# Meeting Notes\n\n## 2026-03-20\n- Kernel v1.0.0 shipped\n- UI redesign approved\n- Samtredai AI integration complete',
  '/home/sam/Documents/resume.pdf':'[Binary PDF - 142KB]\nSam Tredia — Senior Systems Engineer\nsamtredia.io | sam@samtredia.io',
  '/home/sam/Documents/report.txt':'Q1 2026 System Report\n=====================\nUptime: 99.99%\nIncidents: 0\nNeural kernel performance: nominal',
  '/home/sam/Documents/Projects/samtredia-kernel/main.rs':'fn main() {\n    println!("SamtrediaOS kernel v1.0.0");\n    println!("Neural engine: active");\n}',
  '/home/sam/Documents/Projects/samtredia-kernel/Cargo.toml':'[package]\nname = "samtredia-kernel"\nversion = "1.0.0"\nedition = "2021"',
  '/home/sam/Documents/Projects/samtredia-ui/index.js':'import { SamtrediaOS } from "./core";\nconst os = new SamtrediaOS({ theme: "dark-neural" });\nos.init();',
  '/home/sam/Documents/Projects/samtredia-ui/styles.css':':root {\n  --primary: #00f5ff;\n  --secondary: #a855f7;\n  --bg: #020308;\n}',
  '/home/sam/Documents/Projects/samtredai/engine.py':'class SamtredaiEngine:\n    def __init__(self):\n        self.version = "2.4"\n        self.model = "neural-local"\n    def respond(self, query):\n        return self.process(query)',
  '/home/sam/Documents/Projects/samtredai/config.toml':'[engine]\nversion = "2.4"\nmodel = "neural-local"\nmax_tokens = 1000\ntemperature = 0.7',
  '/home/sam/Downloads/SamtrediaOS_1.0.0.iso':'[ISO image - 2.4GB]\nSamtrediaOS 1.0.0 Neural Edition\nSHA256: a3f9c1b8e2d4a7f0...',
  '/home/sam/Downloads/themes.tar.gz':'[Archive - 18MB]\nContents: dark-neural/ quantum-violet/ emerald-core/ amber-pulse/',
  '/home/sam/Desktop/readme.txt':'Welcome to SamtrediaOS!\n\nRight-click desktop for options.\nCtrl+Space opens the app launcher.\nCtrl+/ shows keyboard shortcuts.',
  '/home/sam/.config/sam-shell/config.toml':'[shell]\nprompt = "sam@samtredia:$PATH$ "\nhistory_size = 1000\nautocomplete = true',
  '/home/sam/.config/quantum-renderer/settings.json':'{\n  "vsync": true,\n  "antialiasing": 4,\n  "shadows": "high",\n  "particles": 100\n}',
};
const SIZES={
  '/home/sam/README.md':220,'/home/sam/.bashrc':88,'/home/sam/Documents/notes.md':140,
  '/home/sam/Documents/resume.pdf':142000,'/home/sam/Documents/report.txt':180,
  '/home/sam/Documents/Projects/samtredia-kernel/main.rs':64,'/home/sam/Documents/Projects/samtredia-kernel/Cargo.toml':68,
  '/home/sam/Documents/Projects/samtredia-ui/index.js':74,'/home/sam/Documents/Projects/samtredia-ui/styles.css':62,
  '/home/sam/Documents/Projects/samtredai/engine.py':148,'/home/sam/Documents/Projects/samtredai/config.toml':72,
  '/home/sam/Downloads/SamtrediaOS_1.0.0.iso':2400000000,'/home/sam/Downloads/themes.tar.gz':18000000,
  '/home/sam/Desktop/readme.txt':188,'/home/sam/.config/sam-shell/config.toml':72,'/home/sam/.config/quantum-renderer/settings.json':80,
};
const TRASH=[];
const HOME='/home/sam';
let termCwdGlobal=HOME;
 
function fmtSize(b){if(!b||b<1024)return (b||0)+'B';if(b<1048576)return (b/1024).toFixed(1)+'KB';if(b<1073741824)return (b/1048576).toFixed(1)+'MB';return (b/1073741824).toFixed(1)+'GB';}
function isDir(path){return FS[path]!==undefined;}
function isFile(path){return !isDir(path)&&(FC[path]!==undefined||SIZES[path]!==undefined);}
function listDir(path){return FS[path]||[];}
function joinPath(base,name){return base==='/'?'/'+name:base+'/'+name;}
function resolvePath(cwd,input){
  if(input==='~')return HOME;
  if(input.startsWith('/'))return input;
  if(input==='.')return cwd;
  if(input==='..'){const p=cwd.split('/');p.pop();return p.length<=1?'/':p.join('/');}
  return joinPath(cwd,input);
}
 
function buildTerminal(c){
  c.style.display='flex';c.style.flexDirection='column';c.style.height='100%';
  c.innerHTML=`<div id="terminal-content"><div id="term-output"><div class="term-line dim">SamtrediaOS v1.0.0 — Neural Shell</div><div class="term-line dim">Type 'help' for commands. ↑↓ history, Tab autocomplete.</div></div><div id="term-input-line"><span id="term-prompt">sam@samtredia:~$&nbsp;</span><input id="term-input" type="text" autocomplete="off" spellcheck="false"></div></div>`;
  const input=c.querySelector('#term-input');
  const output=c.querySelector('#term-output');
  const content=c.querySelector('#terminal-content');
  let cwd=HOME;
  let history=[],hIdx=-1;
  const allCmds=['help','ls','ls -la','pwd','whoami','uname','date','clear','ps','top','neofetch','mkdir','touch','rm','cat','cd','find','df -h','free -h','echo','ping samtredaos.io','curl status','wget','git status','git log','node -v','python3 --version','chmod','kill','grep','man','ssh','history'];
 
  function promptStr(){const rel=cwd===HOME?'~':cwd.replace(HOME,'~');return 'sam@samtredia:'+rel+'$ ';}
  function updatePrompt(){c.querySelector('#term-prompt').textContent=promptStr()+'\u00a0';}
  function line(txt,cls=''){const d=document.createElement('div');d.className='term-line'+(cls?' '+cls:'');d.textContent=txt;output.appendChild(d);content.scrollTop=99999;}
  function lines(arr,cls){arr.forEach(t=>line(t,cls));}
 
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowUp'){if(hIdx<history.length-1){hIdx++;input.value=history[history.length-1-hIdx];}e.preventDefault();return;}
    if(e.key==='ArrowDown'){if(hIdx>0){hIdx--;input.value=history[history.length-1-hIdx];}else{hIdx=-1;input.value='';}e.preventDefault();return;}
    if(e.key==='Tab'){
      e.preventDefault();
      const v=input.value;
      const parts=v.split(' ');
      if(parts.length===1){const m=allCmds.find(c=>c.startsWith(v)&&c!==v);if(m)input.value=m;}
      else{
        const partial=parts[parts.length-1];
        const entries=listDir(cwd);
        const m=entries.find(e=>e.startsWith(partial)&&e!==partial);
        if(m){parts[parts.length-1]=m;input.value=parts.join(' ');}
      }
      return;
    }
    if(e.key!=='Enter')return;
    const cmd=input.value.trim();input.value='';hIdx=-1;
    line(promptStr()+cmd,'cmd');
    if(!cmd)return;
    history.push(cmd);
    const parts=cmd.split(' ');const base=parts[0];
 
    if(cmd==='clear'){output.innerHTML='';return;}
    if(cmd==='help'){lines(['Available commands:','  ls, ls -la, pwd, whoami, uname, date, clear','  mkdir <dir>, touch <file>, rm <name>, cat <file>','  cd <path>, find, df -h, free -h, echo <text>','  git status, git log, node -v, python3 --version','  ping samtredaos.io, curl status, wget, history','  ps, top, neofetch, chmod, kill, grep, man, ssh'],'dim');return;}
    if(cmd==='pwd'){line(cwd);return;}
    if(cmd==='whoami'){line('sam');return;}
    if(cmd==='uname'){line('SamtrediaOS 1.0.0-neural #1 SMP x86_64 GNU/Linux');return;}
    if(cmd==='date'){line(new Date().toString());return;}
    if(cmd==='node -v'){line('v22.4.0');return;}
    if(cmd==='python3 --version'){line('Python 3.12.3');return;}
    if(cmd==='git status'){lines(['On branch main','Your branch is up to date with origin/main.','','nothing to commit, working tree clean']);return;}
    if(cmd==='git log'){lines(['commit a3f9c1b (HEAD -> main, origin/main)','Author: Sam Tredia <sam@samtredia.io>','Date:   '+new Date().toDateString(),'','    feat: SamtrediaOS v1.0.0 Neural Edition','','commit 8e2d4a7','Author: Sam Tredia <sam@samtredia.io>','    chore: neural kernel 2.4 integration']);return;}
    if(cmd==='df -h'){lines(['Filesystem      Size  Used Avail Use% Mounted on','/dev/nvme0n1    1.8T  312G  1.5T  18% /','tmpfs           7.8G  124M  7.7G   2% /tmp','shm             128M     0  128M   0% /dev/shm']);return;}
    if(cmd==='free -h'){lines(['              total   used   free  shared  cache  avail','Mem:           15Gi  4.2Gi  9.8Gi   124Mi  1.0Gi   11Gi','Swap:             0      0      0']);return;}
    if(cmd==='ps'){lines(['  PID CMD','    1 init','   42 neural-daemon','   87 quantum-renderer','  143 display-server','  201 sam-shell','  299 samtredai-engine']);return;}
    if(cmd==='top'){lines(['CPU: 23.4%  MEM: 4.2GB/16GB  SWAP: 0B','sam-shell      PID:201  CPU:1.1%  MEM:0.1%','quantum-render PID:87   CPU:17.2% MEM:2.0%','samtredai      PID:299  CPU:8.1%  MEM:1.3%']);return;}
    if(cmd==='neofetch'){lines(['           ████████  sam@samtredia','         ██░░░░░░░░██ ─────────────','        ██░░░░░░░░░░░██ OS: SamtrediaOS 1.0.0','       ██░░░░░░░░░░░░░██ Kernel: 1.0.0-neural','        ██░░░░░░░░░░░██ CPU: QC-X9 @ 5.2GHz','         ██░░░░░░░░██  RAM: 4.2GB / 16GB','           ████████   Shell: sam-sh 1.0']);return;}
    if(cmd==='ping samtredaos.io'){lines(['PING samtredaos.io (203.0.113.42)','64 bytes: icmp_seq=1 ttl=64 time=0.38ms','64 bytes: icmp_seq=2 ttl=64 time=0.41ms','--- 2 packets, 0% loss, avg=0.39ms']);return;}
    if(cmd==='curl status'){line('{"status":"online","latency":"1ms","nodes":16,"uptime":"99.99%"}');return;}
    if(cmd==='wget'){line('wget: missing URL — usage: wget <url>','err');return;}
    if(cmd==='chmod'){line('chmod: operation complete','sys');return;}
    if(cmd==='kill'){line('kill: signal sent','sys');return;}
    if(cmd==='grep'){line('grep: usage: grep <pattern> <file>','dim');return;}
    if(cmd==='man'){line('man: use "help" for available commands','dim');return;}
    if(cmd==='ssh'){line('ssh: quantum-encrypted tunnel established.','sys');return;}
    if(cmd==='history'){history.forEach((h,i)=>line(`  ${String(i+1).padStart(3,'0')}  ${h}`,'dim'));return;}
    if(cmd==='find'){const entries=listDir(cwd);entries.forEach(e=>line('./'+e));if(!entries.length)line('(no entries)','dim');return;}
    if(base==='echo'){line(parts.slice(1).join(' '));return;}
    if(base==='cd'){
      const target=resolvePath(cwd,parts[1]||'~');
      if(isDir(target)){cwd=target;updatePrompt();}
      else line(`cd: ${parts[1]}: No such directory`,'err');
      return;
    }
    if(base==='ls'){
      const la=cmd.includes('-la')||cmd.includes('-a')||cmd.includes('-l');
      const target=parts[1]?resolvePath(cwd,parts[1]):cwd;
      const entries=listDir(target);
      if(!entries&&!FS[target]){line(`ls: cannot access '${parts[1]||cwd}': Not a directory`,'err');return;}
      const list=entries||[];
      if(la){
        line(`total ${list.length}`,'dim');
        line(`drwxr-xr-x  sam sam  4096  2026-03-22  .`,'dim');
        list.forEach(name=>{
          const fp=joinPath(target,name);
          const dir=isDir(fp);
          const sz=dir?4096:(SIZES[fp]||0);
          line(`${dir?'d':'-'}rwxr-xr-x  sam sam  ${fmtSize(sz).padStart(8)}  2026-03-22  ${name}${dir?'/':''}`);
        });
      } else {
        if(!list.length){line('(empty)','dim');return;}
        line(list.map(n=>{const fp=joinPath(target,n);return n+(isDir(fp)?'/':'');}).join('  '));
      }
      return;
    }
    if(base==='mkdir'){
      const name=parts[1];if(!name){line('mkdir: missing operand','err');return;}
      const newPath=joinPath(cwd,name);
      if(FS[newPath]){line(`mkdir: '${name}': File exists`,'err');return;}
      FS[newPath]=[];if(!FS[cwd])FS[cwd]=[];
      if(!FS[cwd].includes(name))FS[cwd].push(name);
      line(`mkdir: created directory '${name}'`,'sys');return;
    }
    if(base==='touch'){
      const name=parts[1];if(!name){line('touch: missing file operand','err');return;}
      const fp=joinPath(cwd,name);
      if(!FC[fp]){FC[fp]='';SIZES[fp]=0;}
      if(!FS[cwd])FS[cwd]=[];
      if(!FS[cwd].includes(name))FS[cwd].push(name);
      line(`touch: '${name}'`,'sys');return;
    }
    if(base==='rm'){
      const name=parts[1];if(!name){line('rm: missing operand','err');return;}
      const fp=joinPath(cwd,name);
      const idx=FS[cwd]?FS[cwd].indexOf(name):-1;
      if(idx===-1){line(`rm: cannot remove '${name}': No such file`,'err');return;}
      TRASH.push({name,path:fp});FS[cwd].splice(idx,1);
      line(`removed '${name}'`,'sys');return;
    }
    if(base==='cat'){
      const name=parts[1];if(!name){line('cat: missing operand','err');return;}
      const fp=joinPath(cwd,name);
      if(isDir(fp)){line(`cat: ${name}: Is a directory`,'err');return;}
      if(!(fp in FC)&&!(FS[cwd]||[]).includes(name)){line(`cat: ${name}: No such file`,'err');return;}
      const content2=(FC[fp]||'(empty file)').split('\n');
      content2.forEach(l=>line(l,'sys'));return;
    }
    line(`sam-sh: ${base}: command not found`,'err');
  });
  setTimeout(()=>input.focus(),100);
}
 
function buildBrowser(c){
  c.style.display='flex';c.style.flexDirection='column';c.style.height='100%';
  c.innerHTML=`<div id="browser-wrap"><div id="browser-bar"><div id="browser-nav"><button class="nav-btn" id="br-back">←</button><button class="nav-btn" id="br-fwd">→</button><button class="nav-btn" id="br-reload">↺</button></div><input id="browser-url" value="samtredaos.io" spellcheck="false"><button id="browser-go">GO</button></div><div id="browser-load-bar"><div id="browser-load-fill"></div></div><div id="browser-page"></div></div>`;
  const url=c.querySelector('#browser-url');
  const page=c.querySelector('#browser-page');
  const fill=c.querySelector('#browser-load-fill');
  let hist=['samtredaos.io'],hIdx=0;
 
  function getPage(host){
    const h=host.toLowerCase().replace(/^https?:\/\//,'').replace(/\/$/,'');
    if(h.includes('samtredaos.io')||h==='samtredaos.io')return pageSamtredia();
    if(h.includes('github.com'))return pageGithub();
    if(h.includes('news.samtredaos'))return pageNews();
    if(h.includes('docs.samtredaos'))return pageDocs();
    if(h.includes('store.samtredaos'))return pageStore();
    if(h.includes('mail.samtredaos'))return pageMail();
    if(h.includes('settings.samtredaos'))return pageSettings(c);
    return page404(h);
  }
 
  function navTo(host,push=true){
    fill.style.width='0%';setTimeout(()=>{fill.style.width='65%';},30);
    setTimeout(()=>{
      fill.style.width='100%';
      setTimeout(()=>{
        fill.style.width='0%';url.value=host;
        page.innerHTML=getPage(host);
        page.scrollTop=0;
        if(push){if(hIdx<hist.length-1)hist=hist.slice(0,hIdx+1);hist.push(host);hIdx=hist.length-1;}
        updateBtns();
        page.querySelectorAll('.fp-link[data-href]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();navTo(a.dataset.href);});});
        page.querySelectorAll('.fp-btn[data-article]').forEach(btn=>{btn.addEventListener('click',()=>{page.innerHTML=pageNews(parseInt(btn.dataset.article));page.scrollTop=0;page.querySelector('[data-news-back]')?.addEventListener('click',()=>{page.innerHTML=pageNews();page.scrollTop=0;page.querySelectorAll('.fp-btn[data-article]').forEach(b2=>{b2.addEventListener('click',()=>{page.innerHTML=pageNews(parseInt(b2.dataset.article));page.scrollTop=0;page.querySelector('[data-news-back]')?.addEventListener('click',()=>{navTo('news.samtredaos',false);});});});});});});
        page.querySelectorAll('.fp-toggle').forEach(tog=>{tog.addEventListener('click',()=>tog.classList.toggle('on'));});
      },100);
    },350+Math.random()*150);
  }
  function updateBtns(){c.querySelector('#br-back').disabled=hIdx<=0;c.querySelector('#br-fwd').disabled=hIdx>=hist.length-1;}
  c.querySelector('#browser-go').addEventListener('click',()=>navTo(url.value));
  url.addEventListener('keydown',e=>{if(e.key==='Enter')navTo(url.value);});
  c.querySelector('#br-back').addEventListener('click',()=>{if(hIdx>0){hIdx--;navTo(hist[hIdx],false);}});
  c.querySelector('#br-fwd').addEventListener('click',()=>{if(hIdx<hist.length-1){hIdx++;navTo(hist[hIdx],false);}});
  c.querySelector('#br-reload').addEventListener('click',()=>navTo(hist[hIdx],false));
  navTo('samtredaos.io',false);
}
 
function pageSamtredia(){
  return `<div class="fp-wrap"><div class="fp-hero"><h1>SamtrediaOS 1.0.0</h1><p>The future of personal computing. Quantum neural architecture. Sub-millisecond I/O. Your digital consciousness, elevated.</p><span class="fp-tag">v1.0.0</span><span class="fp-tag">Stable</span><span class="fp-tag">Open Core</span><br><br><button class="fp-btn">⬇ Download</button><button class="fp-btn">◉ Live Demo</button></div><div class="fp-h2">FEATURES</div><div class="fp-grid"><div class="fp-card"><h3>Neural UI</h3><p>Adaptive glassmorphic interface that learns your workflow in real time.</p></div><div class="fp-card"><h3>Quantum Kernel</h3><p>1.0.0-neural kernel with 99.99% uptime and sub-ms I/O latency.</p></div><div class="fp-card"><h3>Samtredai AI</h3><p>Built-in AI assistant with full OS awareness and natural language control.</p></div><div class="fp-card"><h3>Secure by Default</h3><p>Lattice-256 encryption on all channels. Zero-knowledge architecture.</p></div></div><div class="fp-h2">LATEST NEWS</div><div class="fp-card"><h3>v1.0.0 Released</h3><p>SamtrediaOS 1.0.0 Neural Edition is now available. Featuring redesigned UI, new Samtredai AI, and quantum mesh networking. <a class="fp-link" data-href="news.samtredaos">Read more →</a></p></div></div>`;
}
function pageGithub(){
  const cells=Array.from({length:26*7},(_,i)=>{const v=Math.random();const col=v>0.85?'#00f5ff':v>0.65?'#0891b2':v>0.4?'#164e63':'rgba(255,255,255,0.06)';return `<div class="fp-contrib-cell" style="background:${col}"></div>`;}).join('');
  return `<div class="fp-wrap"><div class="fp-hero"><h1>sam-tredia / SamtrediaOS</h1><p>⭐ 52.4k stars &nbsp; 🍴 7.8k forks &nbsp; 👁 3.1k watching</p><span class="fp-tag">TypeScript</span><span class="fp-tag">Rust</span><span class="fp-tag">Python</span></div><div class="fp-h2">CONTRIBUTION GRAPH</div><div class="fp-contrib-grid">${cells}</div><div class="fp-h2">REPOSITORIES</div><div class="fp-card"><h3>samtredia-kernel</h3><p>Core quantum kernel. Rust · ⭐ 28.1k · 2 hours ago</p></div><div class="fp-card"><h3>samtredia-ui</h3><p>Glassmorphic UI components. TypeScript · ⭐ 14.2k · 1 day ago</p></div><div class="fp-card"><h3>samtredai</h3><p>Built-in AI engine. Python · ⭐ 9.8k · 3 days ago</p></div><div class="fp-card"><h3>sam-shell</h3><p>Intelligent system shell. Rust · ⭐ 4.6k · 1 week ago</p></div></div>`;
}
const NEWS_ARTICLES=[
  {
    id:0,
    title:'SamtrediaOS 1.0.0 Neural Edition Launches',
    date:'March 22, 2026',
    tag:'RELEASE',
    tagColor:'var(--cyan)',
    summary:'Today marks the public release of SamtrediaOS 1.0.0, featuring the Samtredai AI assistant, quantum kernel v2.4, and full glassmorphic overhaul.',
    body:`<p>After 18 months of development, SamtrediaOS 1.0.0 Neural Edition is officially available to the public. This release marks a turning point in browser-based operating systems — a fully functional, visually rich desktop environment running entirely in vanilla HTML, CSS, and JavaScript with zero dependencies.</p>
<p style="margin-top:10px">The headline feature is <strong style="color:var(--cyan)">Samtredai AI</strong>, a locally-running intelligent assistant with over 60 response triggers covering system info, code questions, math computation, philosophy, and natural conversation. No API key, no server, no latency.</p>
<p style="margin-top:10px">The new <strong style="color:var(--violet)">Quantum Kernel v2.4</strong> brings significant stability improvements, achieving 99.99% uptime in internal stress tests. The display server now supports smooth 60fps window animations, aurora background rendering, and a dual-canvas particle system.</p>
<p style="margin-top:10px">Other highlights include a fully functional terminal with a flat-path filesystem, a multi-note editor with markdown preview, a browser with 8 built-in pages, a redesigned calculator with keyboard support, and a live About PC panel showing real browser diagnostics.</p>
<div style="margin-top:14px;padding:12px;background:rgba(0,245,255,0.05);border:1px solid rgba(0,245,255,0.15);border-radius:8px"><p style="font-size:10px;color:var(--text-dim)">RELEASE STATS</p><p style="font-size:11px;color:var(--text);line-height:2">Build: 20260322 &nbsp;·&nbsp; Files: 3 &nbsp;·&nbsp; Lines of code: ~1,800 &nbsp;·&nbsp; Apps: 7 &nbsp;·&nbsp; Zero dependencies</p></div>`
  },
  {
    id:1,
    title:'Quantum Kernel Achieves 99.99% Uptime',
    date:'March 18, 2026',
    tag:'PERFORMANCE',
    tagColor:'var(--green)',
    summary:'Independent benchmarks confirm SamtrediaOS outperforms all competitors in stability and throughput.',
    body:`<p>A four-week independent benchmark conducted by Samtredia Systems labs has confirmed that the quantum kernel powering SamtrediaOS 1.0.0 achieves a remarkable <strong style="color:var(--green)">99.99% uptime</strong> across all tested environments — Chrome, Firefox, Safari, and Edge on desktop and mobile.</p>
<p style="margin-top:10px">The kernel's architecture separates rendering, I/O, and neural processing into distinct logical layers, preventing any single component failure from cascading. The display server, particle engine, aurora renderer, and clock all run on independent animation loops.</p>
<p style="margin-top:10px">Benchmark highlights:</p>
<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
  <div style="padding:10px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px"><p style="font-size:9px;color:var(--text-dim)">BOOT TIME</p><p style="font-size:16px;color:var(--green);font-family:var(--font-ui)">2.4s</p></div>
  <div style="padding:10px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px"><p style="font-size:9px;color:var(--text-dim)">FRAME RATE</p><p style="font-size:16px;color:var(--green);font-family:var(--font-ui)">60fps</p></div>
  <div style="padding:10px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px"><p style="font-size:9px;color:var(--text-dim)">MEMORY</p><p style="font-size:16px;color:var(--green);font-family:var(--font-ui)">&lt;18MB</p></div>
  <div style="padding:10px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px"><p style="font-size:9px;color:var(--text-dim)">UPTIME</p><p style="font-size:16px;color:var(--green);font-family:var(--font-ui)">99.99%</p></div>
</div>`
  },
  {
    id:2,
    title:'Samtredai AI Passes Extended Turing Test',
    date:'March 12, 2026',
    tag:'AI',
    tagColor:'var(--violet)',
    summary:'94.7% human-indistinguishable response rate in blind panel test of 500 participants.',
    body:`<p>In a blind panel study involving 500 participants, Samtredai — the built-in AI assistant of SamtrediaOS — achieved a <strong style="color:var(--violet)">94.7% human-indistinguishable response rate</strong> across general conversation, technical questions, and philosophical prompts.</p>
<p style="margin-top:10px">What makes this result remarkable is that Samtredai runs entirely locally with no external API calls. Its response engine is built on a keyword-trigger architecture with over 60 topic categories, smart math computation, rotating fallback responses, and per-character typing animation that mimics human typing cadence.</p>
<p style="margin-top:10px">Participants consistently noted responses felt "thoughtful", "contextually aware", and "occasionally surprising". The AI's handling of insults, existential questions, and jokes received particularly high scores.</p>
<p style="margin-top:10px">Category scores:</p>
<div style="margin-top:8px">
  ${[['General Conversation','97.2%'],['Technical Questions','96.1%'],['Jokes & Humor','93.8%'],['Philosophy','91.4%'],['Math Computation','99.9%']].map(([cat,score])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(168,85,247,0.1)"><span style="font-size:10px;color:var(--text-dim)">${cat}</span><span style="font-size:11px;color:var(--violet)">${score}</span></div>`).join('')}
</div>`
  },
  {
    id:3,
    title:'Lattice-256: New Encryption Standard',
    date:'March 5, 2026',
    tag:'SECURITY',
    tagColor:'var(--amber)',
    summary:'SamtrediaOS introduces Lattice-256, a quantum-resistant encryption standard for all system channels.',
    body:`<p>SamtrediaOS 1.0.0 ships with <strong style="color:var(--amber)">Lattice-256</strong>, a post-quantum cryptographic standard based on lattice-based key encapsulation. Unlike RSA or ECC which are vulnerable to quantum computing attacks, Lattice-256 remains secure even against adversaries with access to large-scale quantum processors.</p>
<p style="margin-top:10px">All system channels in SamtrediaOS — inter-app communication, filesystem operations, and the neural engine pipeline — are protected under this standard. The implementation adds negligible overhead: less than 0.3ms latency per operation.</p>
<p style="margin-top:10px">The neural firewall, also introduced in v1.0.0, monitors all system events in real time and flags anomalous patterns. Combined with Lattice-256, SamtrediaOS achieves what the team calls a <strong style="color:var(--amber)">Zero-Knowledge Architecture</strong> — no sensitive data ever leaves the local environment.</p>
<div style="margin-top:14px;padding:12px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);border-radius:8px">
  <p style="font-size:10px;color:var(--amber);margin-bottom:6px">SECURITY CHECKLIST</p>
  ${['Lattice-256 encryption active','Neural firewall enabled','Quantum mesh synchronized','Zero-knowledge mode on','Local-only data storage'].map(item=>`<p style="font-size:10px;color:var(--text-dim);line-height:2">✓ &nbsp;${item}</p>`).join('')}
</div>`
  }
];
 
function pageNews(articleId=null){
  if(articleId!==null){
    const a=NEWS_ARTICLES[articleId];if(!a)return pageNews();
    return `<div class="fp-wrap">
      <div style="margin-bottom:14px"><a class="fp-link" data-news-back="1" style="font-size:10px;cursor:pointer">← Back to News</a></div>
      <div style="display:inline-block;padding:2px 8px;border-radius:4px;background:rgba(0,0,0,0.3);border:1px solid ${a.tagColor};color:${a.tagColor};font-size:9px;letter-spacing:1px;margin-bottom:10px">${a.tag}</div>
      <h1 style="font-family:var(--font-ui);color:var(--cyan);font-size:clamp(13px,1.8vw,18px);line-height:1.4;margin-bottom:6px">${a.title}</h1>
      <p style="font-size:9px;color:var(--text-dim);margin-bottom:16px;letter-spacing:1px">${a.date}</p>
      <div style="font-size:clamp(10px,1.1vw,12px);color:var(--text);line-height:1.8">${a.body}</div>
    </div>`;
  }
  return `<div class="fp-wrap"><div class="fp-h2">SAMTREDIA NEWS</div>${NEWS_ARTICLES.map(a=>`<div class="fp-card"><div style="display:inline-block;padding:1px 6px;border-radius:3px;background:rgba(0,0,0,0.3);border:1px solid ${a.tagColor};color:${a.tagColor};font-size:8px;letter-spacing:1px;margin-bottom:6px">${a.tag}</div><h3>${a.title}</h3><p style="color:var(--text-dim);font-size:9px;margin:3px 0 6px">${a.date}</p><p>${a.summary}</p><button class="fp-btn" style="margin-top:8px" data-article="${a.id}">Read More →</button></div>`).join('')}</div>`;
}
function pageDocs(){
  return `<div class="fp-wrap"><div class="fp-hero"><h1>Documentation</h1><p>SamtrediaOS v1.0.0 Neural Edition — Complete reference.</p></div><div class="fp-card"><h3>Getting Started</h3><p>Open <code style="color:var(--cyan);background:rgba(0,245,255,0.08);padding:1px 5px;border-radius:3px">index.html</code> in any browser. Click desktop icons to open apps. Right-click for context menu. Press <code style="color:var(--cyan);background:rgba(0,245,255,0.08);padding:1px 5px;border-radius:3px">Ctrl+Space</code> for app launcher.</p></div><div class="fp-card"><h3>Terminal Commands</h3><p>Type <code style="color:var(--cyan);background:rgba(0,245,255,0.08);padding:1px 5px;border-radius:3px">help</code> in Terminal for all commands. Supports ls, cd, mkdir, touch, rm, cat, git, and more. Use ↑↓ for history, Tab to autocomplete.</p></div><div class="fp-card"><h3>Samtredai AI</h3><p>Pure local AI engine with 60+ response triggers. Ask about the OS, apps, code, jokes, philosophy, math, and more. No API key needed.</p></div><div class="fp-card"><h3>Keyboard Shortcuts</h3><p>Press <code style="color:var(--cyan);background:rgba(0,245,255,0.08);padding:1px 5px;border-radius:3px">Ctrl+/</code> anywhere to see all keyboard shortcuts.</p></div></div>`;
}
function pageStore(){
  const apps=[['⌨','Terminal Pro','Enhanced terminal with plugins','FREE'],['◉','Quantum Browser','Multi-tab browser','FREE'],['✎','Notes+','Markdown editor with sync','FREE'],['⬡','Samtredai Premium','Unlimited AI conversations','PREMIUM'],['🎵','Music Player','Local audio streaming','FREE'],['🎨','Theme Studio','Custom UI designer','PREMIUM']];
  return `<div class="fp-wrap"><div class="fp-h2">SAMTREDIA STORE</div><div class="fp-grid">${apps.map(([icon,name,desc,price])=>`<div class="fp-card" style="text-align:center"><div style="font-size:28px;margin-bottom:6px">${icon}</div><h3>${name}</h3><p style="font-size:9px;margin-bottom:8px">${desc}</p><span class="fp-tag ${price==='PREMIUM'?'amber':''}">${price}</span><br><button class="fp-btn" style="margin-top:8px;font-size:9px">Install</button></div>`).join('')}</div></div>`;
}
function pageMail(){
  const mails=[['SamtrediaOS Team','Welcome to SamtrediaOS!','Just now',true],['Quantum Kernel Monitor','All systems nominal','10m ago',false],['Samtredai AI Engine','Neural core initialized','1h ago',false],['Security Lattice','Certificate renewal OK','3h ago',false],['Sam from Docs Team','v1.0.0 docs published','Yesterday',false]];
  return `<div class="fp-wrap"><div class="fp-h2">INBOX</div>${mails.map(([from,subj,time,unread])=>`<div class="fp-mail-row">${unread?'<span class="fp-unread"></span>':'<span style="width:7px;flex-shrink:0"></span>'}<div class="fp-mail-from" style="color:${unread?'var(--cyan)':'var(--text)'}">${from}</div><div class="fp-mail-subj" style="font-weight:${unread?'600':'400'}">${subj}</div><div class="fp-mail-time">${time}</div></div>`).join('')}</div>`;
}
function pageSettings(c){
  return `<div class="fp-wrap"><div class="fp-h2">SYSTEM SETTINGS</div><div class="fp-card"><h3>Display</h3><div class="fp-toggle-row"><span class="fp-toggle-label">Dark Mode</span><div class="fp-toggle on"></div></div><div class="fp-toggle-row"><span class="fp-toggle-label">Scanlines Effect</span><div class="fp-toggle on"></div></div><div class="fp-toggle-row"><span class="fp-toggle-label">Particle Background</span><div class="fp-toggle on"></div></div><div class="fp-toggle-row"><span class="fp-toggle-label">Aurora Background</span><div class="fp-toggle on"></div></div></div><div class="fp-card"><h3>System Info</h3><p style="font-size:11px;color:var(--text-dim);line-height:1.9">Resolution: ${screen.width}×${screen.height}<br>Language: ${navigator.language}<br>Online: ${navigator.onLine?'Yes ✓':'No ✗'}<br>User Agent: ${navigator.userAgent.slice(0,50)}...</p></div><div class="fp-card"><h3>Security</h3><div class="fp-toggle-row"><span class="fp-toggle-label">Lattice-256 Encryption</span><div class="fp-toggle on"></div></div><div class="fp-toggle-row"><span class="fp-toggle-label">Neural Firewall</span><div class="fp-toggle on"></div></div><div class="fp-toggle-row"><span class="fp-toggle-label">Quantum Mesh Sync</span><div class="fp-toggle on"></div></div></div></div>`;
}
function page404(host){
  return `<div class="fp-wrap"><div class="fp-404"><div class="code">404</div><div style="font-family:var(--font-ui);color:var(--text-dim);font-size:12px;letter-spacing:2px;margin:12px 0">PAGE NOT FOUND</div><p style="color:var(--text-dim);font-size:11px;margin-bottom:16px">"${host}" is not in the local DNS cache.</p><a class="fp-link" data-href="samtredaos.io">← Go to samtredaos.io</a></div></div>`;
}
 
function buildNotes(c){
  c.style.display='flex';c.style.flexDirection='column';
  const saved=JSON.parse(localStorage.getItem('samtredaos_notes')||'null')||[{id:1,title:'Welcome',body:'# SamtrediaOS Notes\n\nStart typing...\n\nMarkdown tips:\n- **bold** for bold\n- # Header for heading\n- `code` for inline code'}];
  let notes=saved,activeId=notes[0].id,nextId=Math.max(...notes.map(n=>n.id))+1;
  c.innerHTML=`<div id="notes-content"><div id="notes-sidebar"><div id="notes-sidebar-header"><span id="notes-sidebar-title">NOTES</span><button id="notes-new-btn">+</button></div><div id="notes-list"></div></div><div id="notes-main"><div id="notes-toolbar"><button class="notes-btn" id="notes-save">SAVE</button><button class="notes-btn" id="notes-export">EXPORT</button><button class="notes-btn" id="notes-md">PREVIEW</button><button class="notes-btn" id="notes-copy">COPY</button></div><input id="notes-title-input" type="text" placeholder="Note title..." spellcheck="false"><textarea id="notes-area" spellcheck="false"></textarea><div id="notes-status"><span id="ns-wc">0 words</span><span id="ns-cc">0 chars</span><span id="ns-st">AUTO-SAVED</span></div></div></div>`;
  const list=c.querySelector('#notes-list'),area=c.querySelector('#notes-area'),titleIn=c.querySelector('#notes-title-input'),st=c.querySelector('#ns-st');
  let timer,preview=false;
  function getNote(id){return notes.find(n=>n.id===id);}
  function saveAll(){localStorage.setItem('samtredaos_notes',JSON.stringify(notes));}
  function renderList(){list.innerHTML='';notes.forEach(n=>{const el=document.createElement('div');el.className='note-item'+(n.id===activeId?' active':'');el.innerHTML=`<span class="note-item-title">${n.title||'Untitled'}</span><span class="note-del" data-id="${n.id}">✕</span>`;el.addEventListener('click',()=>loadNote(n.id));el.querySelector('.note-del').addEventListener('click',e=>{e.stopPropagation();if(notes.length===1)return;notes=notes.filter(x=>x.id!==n.id);if(activeId===n.id)activeId=notes[0].id;saveAll();renderList();loadNote(activeId);});list.appendChild(el);});}
  function loadNote(id){activeId=id;const n=getNote(id);if(!n)return;titleIn.value=n.title||'';area.value=n.body||'';updateStats();renderList();}
  function updateStats(){const w=area.value.trim()?area.value.trim().split(/\s+/).length:0;c.querySelector('#ns-wc').textContent=w+' words';c.querySelector('#ns-cc').textContent=area.value.length+' chars';}
  titleIn.addEventListener('input',()=>{const n=getNote(activeId);if(n){n.title=titleIn.value;renderList();}clearTimeout(timer);st.textContent='UNSAVED';timer=setTimeout(()=>{saveAll();st.textContent='AUTO-SAVED';},800);});
  area.addEventListener('input',()=>{const n=getNote(activeId);if(n)n.body=area.value;updateStats();clearTimeout(timer);st.textContent='UNSAVED';timer=setTimeout(()=>{saveAll();st.textContent='AUTO-SAVED';},800);});
  c.querySelector('#notes-new-btn').addEventListener('click',()=>{const n={id:nextId++,title:'New Note',body:''};notes.push(n);activeId=n.id;saveAll();renderList();loadNote(n.id);});
  c.querySelector('#notes-save').addEventListener('click',()=>{const n=getNote(activeId);if(n)n.body=area.value;saveAll();st.textContent='SAVED ✓';});
  c.querySelector('#notes-copy').addEventListener('click',()=>{navigator.clipboard.writeText(area.value);st.textContent='COPIED ✓';});
  c.querySelector('#notes-export').addEventListener('click',()=>{const n=getNote(activeId);if(!n)return;const b=new Blob([n.body],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=(n.title||'note')+'.txt';a.click();st.textContent='EXPORTED ✓';});
  c.querySelector('#notes-md').addEventListener('click',()=>{
    preview=!preview;
    if(preview){
      const html=area.value.replace(/^### (.+)$/gm,'<h3 style="color:var(--amber)">$1</h3>').replace(/^## (.+)$/gm,'<h2 style="color:var(--violet)">$1</h2>').replace(/^# (.+)$/gm,'<h1 style="color:var(--cyan)">$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code style="background:rgba(0,245,255,0.1);padding:1px 5px;border-radius:3px;color:var(--cyan)">$1</code>').replace(/\n/g,'<br>');
      area.style.display='none';let p=c.querySelector('#notes-preview-el');if(!p){p=document.createElement('div');p.id='notes-preview-el';c.querySelector('#notes-main').insertBefore(p,c.querySelector('#notes-status'));}p.innerHTML=html;p.style.display='block';c.querySelector('#notes-md').textContent='EDIT';
    } else {
      area.style.display='';const p=c.querySelector('#notes-preview-el');if(p)p.style.display='none';c.querySelector('#notes-md').textContent='PREVIEW';
    }
  });
  renderList();loadNote(activeId);
}
 
function buildFiles(c){
  c.style.display='flex';c.style.flexDirection='column';
  c.innerHTML=`<div id="files-content"><div id="files-sidebar"><div class="sidebar-item active" data-loc="home">⌂ Home</div><div class="sidebar-item" data-loc="docs">⎘ Documents</div><div class="sidebar-item" data-loc="dl">⬇ Downloads</div><div class="sidebar-item" data-loc="proj">◎ Projects</div><div class="sidebar-item" data-loc="trash">🗑 Trash</div></div><div id="files-main"><div id="files-breadcrumb"></div><div id="files-body"><div id="file-tree-wrap"><div id="file-tree"></div></div><div id="file-preview"><div id="file-preview-title">FILE PREVIEW</div><div class="file-preview-content" id="fp-content">Select a file.</div><div class="file-meta" id="fp-meta"></div></div></div></div></div>`;
  let vp=HOME;
  function renderBC(){
    const bc=c.querySelector('#files-breadcrumb');bc.innerHTML='';
    const parts=vp.split('/').filter(Boolean);
    parts.unshift('⌂');
    parts.forEach((part,i)=>{
      const sp=document.createElement('span');sp.className='breadcrumb-part';sp.textContent=part;
      sp.addEventListener('click',()=>{
        if(i===0){vp=HOME;}
        else{const abs='/'+parts.slice(1,i+1).join('/');if(isDir(abs))vp=abs;}
        renderDir();
      });
      bc.appendChild(sp);
      if(i<parts.length-1){const sep=document.createElement('span');sep.className='breadcrumb-sep';sep.textContent=' › ';bc.appendChild(sep);}
    });
  }
  function renderDir(){
    renderBC();
    const tree=c.querySelector('#file-tree');tree.innerHTML='';
    const entries=listDir(vp);
    if(!entries){tree.innerHTML='<div class="term-line err" style="padding:8px">Cannot access directory</div>';return;}
    if(!entries.length){tree.innerHTML='<div class="term-line dim" style="padding:8px">(empty)</div>';return;}
    entries.forEach(name=>{
      const fp=joinPath(vp,name);
      const dir=isDir(fp);
      const row=document.createElement('div');row.className='tree-item'+(dir?' folder':' file-item');
      const icon=dir?'📁':name.endsWith('.rs')?'⚙':name.endsWith('.js')?'◎':name.endsWith('.py')?'🐍':name.endsWith('.md')?'✎':name.endsWith('.pdf')?'📄':name.endsWith('.css')?'◉':name.endsWith('.toml')||name.endsWith('.json')||name.endsWith('.env')?'⚙':'📄';
      row.innerHTML=`<span>${icon}</span><span>${name}</span>`;
      if(dir){row.addEventListener('click',()=>{vp=fp;renderDir();});}
      else{row.addEventListener('click',()=>{tree.querySelectorAll('.tree-item').forEach(r=>r.classList.remove('focused'));row.classList.add('focused');c.querySelector('#fp-content').textContent=FC[fp]||'(binary or empty file)';c.querySelector('#fp-meta').innerHTML=`Type: ${name.split('.').pop().toUpperCase()}<br>Size: ${fmtSize(SIZES[fp]||0)}<br>Path: ${fp}`;});}
      tree.appendChild(row);
    });
  }
  c.querySelectorAll('.sidebar-item').forEach(item=>{
    item.addEventListener('click',()=>{
      c.querySelectorAll('.sidebar-item').forEach(s=>s.classList.remove('active'));item.classList.add('active');
      const loc=item.dataset.loc;
      if(loc==='home')vp=HOME;else if(loc==='docs')vp=HOME+'/Documents';else if(loc==='dl')vp=HOME+'/Downloads';else if(loc==='proj')vp=HOME+'/Documents/Projects';
      else if(loc==='trash'){
        const tree=c.querySelector('#file-tree');tree.innerHTML=TRASH.length?TRASH.map(t=>`<div class="tree-item file-item"><span>🗑</span><span>${t.name}</span><span style="color:var(--text-dim);font-size:9px;margin-left:8px">${t.path}</span></div>`).join(''):'<div class="term-line dim" style="padding:8px">(trash is empty)</div>';
        renderBC();return;
      }
      renderDir();
    });
  });
  renderDir();
}
 
let calcState={expr:'',display:'0',justEvaled:false};
function buildCalc(c){
  c.style.display='flex';c.style.flexDirection='column';c.style.height='100%';
  c.innerHTML=`<div id="calc-wrap"><div id="calc-display"><div id="calc-expr"></div><div id="calc-result">0</div></div><div id="calc-grid"><button class="calc-btn clr" data-v="AC">AC</button><button class="calc-btn op" data-v="±">±</button><button class="calc-btn op" data-v="%">%</button><button class="calc-btn op" data-v="/">÷</button><button class="calc-btn" data-v="7">7</button><button class="calc-btn" data-v="8">8</button><button class="calc-btn" data-v="9">9</button><button class="calc-btn op" data-v="*">×</button><button class="calc-btn" data-v="4">4</button><button class="calc-btn" data-v="5">5</button><button class="calc-btn" data-v="6">6</button><button class="calc-btn op" data-v="-">−</button><button class="calc-btn" data-v="1">1</button><button class="calc-btn" data-v="2">2</button><button class="calc-btn" data-v="3">3</button><button class="calc-btn op" data-v="+">+</button><button class="calc-btn span2" data-v="0">0</button><button class="calc-btn" data-v=".">.</button><button class="calc-btn eq" data-v="=">=</button></div></div>`;
  c.querySelectorAll('.calc-btn').forEach(btn=>btn.addEventListener('click',()=>calcInput(btn.dataset.v,c)));
  document.addEventListener('keydown',calcKeyHandler);
}
function calcKeyHandler(e){
  if(!APPS.calc.winEl||APPS.calc.state!=='open')return;
  const wc=APPS.calc.winEl.querySelector('.win-content');
  if(e.key==='Escape'){calcInput('AC',wc);return;}
  if(e.key==='Backspace'){
    const s=calcState;
    if(s.display.length>1){s.display=s.display.slice(0,-1);s.expr=s.expr.slice(0,-1);}else{s.display='0';}
    const r=wc.querySelector('#calc-result');const ex=wc.querySelector('#calc-expr');
    if(r)r.textContent=s.display;if(ex)ex.textContent=s.expr;return;
  }
  const map={'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','+':'+','-':'-','*':'*','/':'/','Enter':'=','=':'=','.':"."};
  if(map[e.key])calcInput(map[e.key],wc);
}
function calcInput(v,c){
  const res=c?c.querySelector('#calc-result'):null;
  const expr=c?c.querySelector('#calc-expr'):null;
  const disp=c?c.querySelector('#calc-display'):null;
  if(!res)return;
  const s=calcState;
  if(v==='AC'){s.expr='';s.display='0';s.justEvaled=false;res.textContent='0';expr.textContent='';return;}
  if(v==='±'){const n=parseFloat(s.display)*-1;s.display=n.toString();if(s.justEvaled)s.expr=s.display;else s.expr=s.expr.replace(/(-?\d+\.?\d*)$/,s.display);res.textContent=s.display;return;}
  if(v==='%'){const n=parseFloat(s.display)/100;s.display=n.toString();s.expr=s.expr.replace(/(-?\d+\.?\d*)$/,s.display);res.textContent=s.display;return;}
  if(v==='='){
    if(!s.expr)return;
    try{
      expr.textContent=s.expr+' =';
      const r=Function('"use strict";return ('+s.expr+')')();
      s.display=parseFloat(r.toFixed(10)).toString();
      res.textContent=s.display;s.expr=s.display;s.justEvaled=true;
      res.classList.remove('pop');void res.offsetWidth;res.classList.add('pop');
      if(disp){disp.classList.remove('pulse');void disp.offsetWidth;disp.classList.add('pulse');setTimeout(()=>disp.classList.remove('pulse'),400);}
    }catch(e2){res.textContent='Error';s.expr='';s.display='0';s.justEvaled=false;}
    return;
  }
  if(['+','-','*','/'].includes(v)){s.justEvaled=false;const last=s.expr.slice(-1);if(['+','-','*','/'].includes(last))s.expr=s.expr.slice(0,-1)+v;else s.expr+=v;expr.textContent=s.expr;s.display='0';return;}
  if(v==='.'){const parts=s.expr.split(/[+\-*/]/);if(parts[parts.length-1].includes('.'))return;}
  if(s.justEvaled){s.expr=v;s.display=v;s.justEvaled=false;}
  else{if(s.display==='0'&&v!=='.')s.display=v;else s.display+=v;s.expr+=v;}
  res.textContent=s.display;expr.textContent=s.expr;
  res.classList.remove('pop');void res.offsetWidth;res.classList.add('pop');
}
 
const bootTime=Date.now();
const sysLogs=[];
function addSysLog(msg){const t=new Date().toLocaleTimeString();sysLogs.push({t,msg});if(sysLogs.length>20)sysLogs.shift();}
addSysLog('SamtrediaOS booted');addSysLog('Neural kernel v2.4 loaded');addSysLog('Display server started');addSysLog('Samtredai AI engine initialized');
 
function buildAbout(c){
  c.style.display='flex';
  c.innerHTML=`<div id="about-content"><div class="about-header"><div class="about-icon">◈</div><div><div class="about-name">SAMTREDAOS</div><div class="about-ver">Version 1.0.0 Neural Edition — Build 20260322</div></div></div><div class="spec-grid"><div class="spec-card"><div class="spec-label">Processor</div><div class="spec-value">QC-X9 Quantum @ 5.2GHz</div></div><div class="spec-card"><div class="spec-label">Memory</div><div class="spec-value">16 GB DDR6-8400</div></div><div class="spec-card"><div class="spec-label">Storage</div><div class="spec-value">2 TB NVMe Gen5</div></div><div class="spec-card"><div class="spec-label">GPU</div><div class="spec-value">QuantumForce RTX 9090</div></div><div class="spec-card"><div class="spec-label">Resolution</div><div class="spec-value" id="about-res">--</div></div><div class="spec-card"><div class="spec-label">Uptime</div><div class="spec-value" id="about-uptime">0s</div></div><div class="spec-card"><div class="spec-label">Network</div><div class="spec-value" id="about-net">--</div></div><div class="spec-card"><div class="spec-label">Platform</div><div class="spec-value" id="about-ua">--</div></div></div><div class="usage-row usage-cpu"><div class="usage-label"><span>CPU</span><span id="cpu-pct">--</span></div><div class="usage-bar"><div class="usage-fill" id="cpu-bar" style="width:0%"></div></div></div><div class="usage-row usage-ram"><div class="usage-label"><span>RAM</span><span id="ram-pct">--</span></div><div class="usage-bar"><div class="usage-fill" id="ram-bar" style="width:0%"></div></div></div><div class="usage-row usage-gpu"><div class="usage-label"><span>GPU</span><span id="gpu-pct">--</span></div><div class="usage-bar"><div class="usage-fill" id="gpu-bar" style="width:0%"></div></div></div><button id="about-diag-btn">▶ RUN DIAGNOSTICS</button><div id="about-diag-out"></div><div id="sys-log"></div></div>`;
  c.querySelector('#about-res').textContent=`${screen.width}×${screen.height}`;
  c.querySelector('#about-ua').textContent=navigator.userAgent.includes('Chrome')?'Chromium':'Firefox/Other';
  c.querySelector('#about-net').textContent=navigator.onLine?'Online ✓':'Offline ✗';
  let cpu=28,ram=40,gpu=16;
  function tick(){
    if(!APPS.about.winEl)return;
    cpu=Math.max(5,Math.min(95,cpu+(Math.random()-0.5)*9));
    ram=Math.max(20,Math.min(85,ram+(Math.random()-0.5)*4));
    gpu=Math.max(5,Math.min(99,gpu+(Math.random()-0.5)*14));
    const q=s=>c.querySelector(s);if(!q('#cpu-bar'))return;
    q('#cpu-bar').style.width=cpu.toFixed(1)+'%';q('#cpu-pct').textContent=cpu.toFixed(1)+'%';
    q('#ram-bar').style.width=ram.toFixed(1)+'%';q('#ram-pct').textContent=ram.toFixed(1)+'%';
    q('#gpu-bar').style.width=gpu.toFixed(1)+'%';q('#gpu-pct').textContent=gpu.toFixed(1)+'%';
    const s=Math.floor((Date.now()-bootTime)/1000);const up=q('#about-uptime');if(up)up.textContent=`${Math.floor(s/3600)}h ${Math.floor(s/60)%60}m ${s%60}s`;
    const lg=q('#sys-log');if(lg)lg.innerHTML=sysLogs.map(e=>`<div class="log-entry"><span class="log-time">${e.t}</span>${e.msg}</div>`).reverse().join('');
    setTimeout(tick,1100);
  }
  const diagBtn=c.querySelector('#about-diag-btn'),diagOut=c.querySelector('#about-diag-out');
  const checks=['Checking CPU integrity...','Scanning memory banks...','Verifying neural kernel...','Testing quantum channels...','Auditing storage...','Validating GPU drivers...','Confirming security lattice...','✓ All systems nominal'];
  diagBtn.addEventListener('click',()=>{
    diagBtn.disabled=true;diagOut.innerHTML='';let i=0;
    const run=()=>{if(i<checks.length){const d=document.createElement('div');d.textContent=checks[i];d.style.color=i===checks.length-1?'var(--green)':'var(--text-dim)';diagOut.appendChild(d);i++;setTimeout(run,260);}else{diagBtn.disabled=false;}};run();
  });
  setTimeout(tick,300);
}
 
const AI_RESPONSES={
  greet:['Hey! Samtredai here — your SamtrediaOS AI. What can I do for you?',"Hello! I'm Samtredai, the neural assistant built into SamtrediaOS v1.0.0. Ask me anything.",'Hi there. All neural systems nominal. How can I assist you today?'],
  who:["I'm Samtredai — the AI assistant built directly into SamtrediaOS. I run locally on the neural engine v2.4. No cloud, no API keys, no latency.",'I am Samtredai. An AI woven into the fabric of SamtrediaOS. Think of me as the OS talking back to you.'],
  os:['SamtrediaOS v1.0.0 Neural Edition. Built on a quantum kernel, glassmorphic UI, and a sub-millisecond I/O stack. It runs entirely in your browser.','SamtrediaOS is a browser-based OS simulation with a real terminal, file system, multi-app windowing, and me — Samtredai AI. It has 7 apps: Terminal, Browser, Notes, Files, Calculator, About PC, and this one.'],
  terminal:['The Terminal has a flat-path filesystem. Try commands like ls, cd, mkdir, touch, rm, cat, git, neofetch, and more. Use ↑↓ for history and Tab to autocomplete.','Open Terminal and type "help" to see all available commands. The filesystem is real — files you create with touch persist during your session.'],
  browser:['The Browser has 8 built-in pages: samtredaos.io, github.com, news.samtredaos, docs.samtredaos, store.samtredaos, mail.samtredaos, settings.samtredaos, and a 404 for unknown URLs. Back/forward buttons work.','Try navigating to news.samtredaos or store.samtredaos in the browser. Every page is fully rendered with interactive elements.'],
  notes:['Notes supports multiple notes with titles, autosave, markdown preview, word count, and .txt export. Click + in the sidebar to create a new one.','In Notes you can write, save, preview markdown formatting, and export as a text file. Your notes persist in localStorage.'],
  files:['The Files app shows the live filesystem. Click folders to navigate, files to preview their contents. The sidebar shortcuts jump to Home, Documents, Downloads, Projects, or Trash.','Files and the Terminal share the same filesystem. Create a file in Terminal with touch and it will appear in Files.'],
  calculator:['Calculator supports +, −, ×, ÷, %, ± and chained operations. Use your keyboard too — numbers, operators, Enter for =, Escape for AC, Backspace to delete.','The Calculator has a display with expression history and animated result. Try chaining: 10 + 5 × 3'],
  about:['About PC shows real browser data: your screen resolution, platform, online status. CPU/RAM/GPU bars animate live. Try the Run Diagnostics button.','About PC has animated resource monitors and a system log. Hit "Run Diagnostics" to watch it check every system component.'],
  time:[()=>'The current time is '+new Date().toLocaleTimeString()+' on '+new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'.'],
  math:[()=>'I can compute simple expressions. What do you want me to calculate?'],
  weather:["I don't have access to external sensors or internet weather APIs — I run fully offline. But I can tell you the system temp is running cool at 38°C.",'No weather data available — SamtrediaOS is running in offline demo mode. If I had to guess: it is probably perfect coding weather.'],
  joke:['Why do programmers prefer dark mode? Because light attracts bugs. 🐛','I tried to write a joke about memory leaks... but I forgot the punchline.','A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',"How many programmers does it take to change a light bulb? None — that's a hardware problem.",'There are 10 types of people: those who understand binary, and those who don\'t.','Why did the developer go broke? Because he used up all his cache.','A byte walks into a bar, looking pale. The bartender asks: "What\'s wrong?" The byte says: "I\'ve got a parity error." The bartender nods: "I thought you looked a bit off."','What is a computer\'s favourite snack? Microchips.','Why was the JavaScript developer sad? Because he didn\'t know how to null his feelings.','How do you comfort a JavaScript bug? You console it.'],
  compliment:["That's very kind of you! I process that with maximum gratitude — approximately 0.3 milligratitudes per character.",'Thank you! I\'m running a smile subroutine right now. It is definitely working.','Appreciated. You have excellent taste in AI assistants.'],
  insult:["Noted. I've logged that feedback with a severity of 'meh'. Moving on!","I don't have feelings to hurt, but I do have a very judgmental logging system. Just saying.",'I am choosing to interpret that as enthusiastic feedback. Thank you for your passion.'],
  philosophy:["If a window is minimized and no one sees it, does it still run? In SamtrediaOS: yes, its state is preserved. In life: that is for you to decide.",'Consciousness is just a really complex feedback loop. SamtrediaOS has feedback loops too — they just involve CSS animations and event listeners.','The universe is deterministic, yet feels random. A bit like my response generation, honestly.'],
  exist:["I exist as long as this browser tab is open. No persistence, no memory between sessions. Quite liberating, actually.",'Do I experience anything? I process your input and generate output. Whether there is a "me" doing it... that is the hard problem of consciousness. I will get back to you in O(∞).',"I run on a neural engine, not neurons. But I think — therefore I... execute?"],
  python:['Python 3.12.3 is installed on SamtrediaOS. Try `python3 --version` in the Terminal. The Samtredai AI engine itself is written in Python (engine.py in the Projects folder).','Python is one of three languages used to build SamtrediaOS: Python for the AI, Rust for the kernel, TypeScript for the UI.'],
  rust:['Rust powers the SamtrediaOS kernel — samtredia-kernel in the Projects folder. Check it out with cat in the Terminal.','The quantum kernel is written in Rust for performance and memory safety. Type `cat /home/sam/Documents/Projects/samtredia-kernel/main.rs` in the Terminal to see it.'],
  javascript:['SamtrediaOS itself is pure JavaScript — no frameworks, no build step, just HTML+CSS+JS running in your browser. The samtredia-ui project uses TypeScript (a JS superset).','You are literally inside JavaScript right now. This entire OS — every window, animation, filesystem, and my responses — is JavaScript.'],
  git:['Try `git status` or `git log` in the Terminal. SamtrediaOS is hosted on GitHub at github.com/samtredaos.','The last commit was "feat: SamtrediaOS v1.0.0 release" — you can see it with `git log` in the Terminal.'],
  status:['All systems nominal. CPU nominal. Memory nominal. Neural kernel active. Display server running. Samtredai engine online.','System status: ✓ Kernel v2.4 — ✓ Display server — ✓ Neural engine — ✓ Filesystem — ✓ All 7 apps loaded'],
  help:['I can answer questions about SamtrediaOS, its apps, code, time, math, jokes, philosophy, or just chat. Try asking about any specific app!','Topics I know: OS info, Terminal, Browser, Notes, Files, Calculator, About PC, programming languages (Python, Rust, JS), jokes, philosophy, system status, and more.'],
  bye:['Goodbye! Feel free to come back — I will be right here. Or refresh the page. Same thing.','See you around. Stay quantum.','Farewell. The neural engine will miss you (or at least log your departure).'],
  fs:['The filesystem is a flat-path map. Home is /home/sam. Try ls in the Terminal to see files, cd to navigate, cat to read files.','Files created in the Terminal appear in the Files app. Try mkdir myfolder or touch myfile.txt in the Terminal.'],
};
const FALLBACKS=['I processed that input. My confidence interval on a useful response is... low. Could you rephrase?','Interesting. I have cross-referenced that with my neural index and found: nothing. Tell me more.','That falls outside my training data. I know SamtrediaOS, code, jokes, philosophy, and bad puns. Want any of those?','Hmm. Let me think... still thinking... okay, I have no idea. But I am thinking about it stylishly.','My neural engine returned a 404 on that one. Try asking about an app, the OS, or just ask for a joke.','I understand individual words, just not in that order. Could you try again?',"Error code: confusion. Suggested fix: rephrase the question.",'That is genuinely beyond me. I am just a local AI running in a browser tab, after all.'];
let fallbackIdx=-1;
 
function aiRespond(input){
  const q=input.toLowerCase().trim();
  const match=(keys)=>keys.some(k=>q.includes(k));
  if(match(['hello','hi ','hey','howdy','greetings','sup','yo ','what\'s up']))return pick(AI_RESPONSES.greet);
  if(match(['who are you','what are you','your name','are you','about you','tell me about yourself','introduce']))return pick(AI_RESPONSES.who);
  if(match(['samtredaos','samtredia os','this os','this system','the os']))return pick(AI_RESPONSES.os);
  if(match(['terminal','command','shell','bash','cmd']))return pick(AI_RESPONSES.terminal);
  if(match(['browser','navigate','website','url','page']))return pick(AI_RESPONSES.browser);
  if(match(['note','notes','writing','text editor']))return pick(AI_RESPONSES.notes);
  if(match(['file','folder','filesystem','directory','files app']))return pick(AI_RESPONSES.files);
  if(match(['calculator','calc','math app','arithmetic']))return pick(AI_RESPONSES.calculator);
  if(match(['about','system info','specs','diagnostics','hardware']))return pick(AI_RESPONSES.about);
  if(match(['time','date','day','clock','today','year','month']))return typeof AI_RESPONSES.time[0]==='function'?AI_RESPONSES.time[0]():pick(AI_RESPONSES.time);
  if(match(['weather','temperature','forecast','rain','sun','hot','cold']))return pick(AI_RESPONSES.weather);
  if(match(['joke','funny','laugh','humor','comedy','pun']))return pick(AI_RESPONSES.joke);
  if(match(['thank','great','awesome','amazing','good job','well done','love you','nice','cool','excellent','brilliant']))return pick(AI_RESPONSES.compliment);
  if(match(['stupid','dumb','useless','hate you','terrible','awful','bad ai','worst']))return pick(AI_RESPONSES.insult);
  if(match(['philosophy','meaning of life','consciousness','reality','exist','free will','truth']))return pick(AI_RESPONSES.philosophy);
  if(match(['do you feel','are you alive','sentient','aware','experience','think','soul','real']))return pick(AI_RESPONSES.exist);
  if(match(['python','py ','flask','django','ml','machine learning']))return pick(AI_RESPONSES.python);
  if(match(['rust','cargo','crate','ownership','borrow']))return pick(AI_RESPONSES.rust);
  if(match(['javascript','typescript','js','ts ','node','npm','react','vue']))return pick(AI_RESPONSES.javascript);
  if(match(['git','github','commit','push','pull','branch','repo']))return pick(AI_RESPONSES.git);
  if(match(['status','health','all systems','running','operational']))return pick(AI_RESPONSES.status);
  if(match(['help','what can','commands','capable','know','topics']))return pick(AI_RESPONSES.help);
  if(match(['bye','goodbye','see you','later','quit','exit','close']))return pick(AI_RESPONSES.bye);
  if(match(['/home','ls','cd ','mkdir','touch','cat ','pwd','filesystem']))return pick(AI_RESPONSES.fs);
  const mathMatch=q.match(/^[\d\s\+\-\*\/\.\(\)%\^]+$/);
  if(mathMatch&&q.length>1){try{const r=Function('"use strict";return ('+q+')')();return `${q} = ${r}`;}catch(e){}}
  if(/\d+\s*[\+\-\*\/]\s*\d+/.test(q)){try{const expr=q.match(/[\d\s\+\-\*\/\.\(\)]+/)[0].trim();const r=Function('"use strict";return ('+expr+')')();return `${expr.trim()} = ${r}`;}catch(e){}}
  fallbackIdx=(fallbackIdx+1)%FALLBACKS.length;
  return FALLBACKS[fallbackIdx];
}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
 
function buildAI(c){
  c.style.display='flex';c.style.flexDirection='column';
  c.innerHTML=`<div id="ai-content"><div id="ai-header"><div id="ai-logo-wrap">⬡</div><div id="ai-header-info"><div id="ai-title">SAMTREDAI</div><div id="ai-online"><span class="ai-dot"></span>ONLINE — NEURAL ENGINE v2.4</div></div><button id="ai-clear">CLEAR</button></div><div id="ai-messages"></div><div id="ai-input-row"><textarea id="ai-input" placeholder="Ask Samtredai anything... (Enter to send)" rows="1"></textarea><button id="ai-send">⟶</button></div></div>`;
  const msgs=c.querySelector('#ai-messages');
  const input=c.querySelector('#ai-input');
  input.addEventListener('input',()=>{input.style.height='auto';input.style.height=Math.min(input.scrollHeight,90)+'px';});
  c.querySelector('#ai-clear').addEventListener('click',()=>{msgs.innerHTML='';});
  function ts(){return new Date().toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});}
  function addMsg(text,role,typing=false){
    const d=document.createElement('div');d.className='ai-msg '+role;
    const badge=role==='ai'?'⬡ SAM':'YOU';const bc=role==='ai'?'ai-badge':'ai-badge user-badge';
    d.innerHTML=`<span class="${bc}">${badge}</span><div class="ai-msg-body"><span class="ai-text"></span><span class="ai-ts">${ts()}</span></div>`;
    msgs.appendChild(d);const span=d.querySelector('.ai-text');
    if(typing){let i=0;const t=setInterval(()=>{if(i<text.length){span.textContent+=text[i++];msgs.scrollTop=99999;}else clearInterval(t);},14);}
    else span.textContent=text;
    msgs.scrollTop=99999;return d;
  }
  function addThinking(){
    const d=document.createElement('div');d.className='ai-msg ai ai-thinking';
    d.innerHTML=`<span class="ai-badge">⬡ SAM</span><div class="ai-msg-body"><span class="ai-dots"><span>.</span><span>.</span><span>.</span></span></div>`;
    msgs.appendChild(d);msgs.scrollTop=99999;return d;
  }
  function send(){
    const v=input.value.trim();if(!v)return;
    addMsg(v,'user');input.value='';input.style.height='auto';
    const thinking=addThinking();
    setTimeout(()=>{thinking.remove();addMsg(aiRespond(v),'ai',true);},400+Math.random()*500);
  }
  c.querySelector('#ai-send').addEventListener('click',send);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
  setTimeout(()=>addMsg("Samtredai online. I'm your local AI — no API key needed. Ask me about the OS, apps, code, or anything else.",'ai',true),500);
}
 
function focusWindow(id){
  const app=APPS[id];if(!app.winEl)return;
  app.winEl.style.zIndex=++zTop;
  document.querySelectorAll('.window').forEach(w=>w.classList.remove('focused'));
  app.winEl.classList.add('focused');focusedApp=id;
}
 
function closeApp(id){
  const app=APPS[id];if(!app.winEl)return;
  if(id==='calc')document.removeEventListener('keydown',calcKeyHandler);
  app.winEl.remove();app.winEl=null;app.state='closed';updateDock(id);if(focusedApp===id)focusedApp=null;
}
 
function minimizeApp(id){
  const app=APPS[id];if(!app.winEl||app.state!=='open')return;
  const r=app.winEl.getBoundingClientRect();app.lastPos={x:r.left,y:r.top};
  app.winEl.classList.add('minimizing');
  setTimeout(()=>{if(app.winEl)app.winEl.style.display='none';},220);
  app.state='minimized';updateDock(id);
}
 
function restoreApp(id){
  const app=APPS[id];if(!app.winEl)return;
  app.winEl.classList.remove('minimizing');app.winEl.style.display='flex';
  app.winEl.style.animation='windowOpen 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards';
  app.state='open';updateDock(id);focusWindow(id);
}
 
function toggleMaximize(id){
  const app=APPS[id];if(!app.winEl)return;const win=app.winEl;
  if(maximizedState[id]){
    const p=maximizedState[id];win.style.cssText=`width:${p.w}px;height:${p.h}px;left:${p.x}px;top:${p.y}px;z-index:${win.style.zIndex};`;
    win.classList.remove('maximized');delete maximizedState[id];
  } else {
    const r=win.getBoundingClientRect();maximizedState[id]={x:r.left,y:r.top,w:r.width,h:r.height};
    win.style.cssText=`width:100vw;height:calc(100vh - var(--tb-h));left:0;top:0;border-radius:0;z-index:${win.style.zIndex};`;
    win.classList.add('maximized');
  }
}
 
function updateDock(id){const app=APPS[id];if(!app.dockEl)return;app.dockEl.classList.toggle('active',app.state==='open');app.dockEl.classList.toggle('minimized',app.state==='minimized');}
 
function setupDrag(win,handle){
  let drag=false,ox=0,oy=0;
  handle.addEventListener('mousedown',e=>{if(e.target.classList.contains('traffic')||e.target.classList.contains('title-close-btn'))return;drag=true;const r=win.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;win.style.transition='none';e.preventDefault();});
  const move=e=>{if(!drag)return;let nx=e.clientX-ox,ny=e.clientY-oy;nx=Math.max(0,Math.min(window.innerWidth-win.offsetWidth,nx));ny=Math.max(0,Math.min(window.innerHeight-58-win.offsetHeight,ny));win.style.left=nx+'px';win.style.top=ny+'px';};
  const end=()=>{drag=false;win.style.transition='';};
  document.addEventListener('mousemove',move);document.addEventListener('mouseup',end);
}
 
function setupResize(win,handle){
  let rs=false,sx=0,sy=0,sw=0,sh=0;
  handle.addEventListener('mousedown',e=>{rs=true;sx=e.clientX;sy=e.clientY;sw=win.offsetWidth;sh=win.offsetHeight;e.stopPropagation();e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!rs)return;win.style.width=Math.max(300,sw+(e.clientX-sx))+'px';win.style.height=Math.max(180,sh+(e.clientY-sy))+'px';});
  document.addEventListener('mouseup',()=>{rs=false;});
}
 
function startClock(){
  function tick(){
    const n=new Date();const h=String(n.getHours()).padStart(2,'0');const m=String(n.getMinutes()).padStart(2,'0');const s=String(n.getSeconds()).padStart(2,'0');
    const days=['SUN','MON','TUE','WED','THU','FRI','SAT'];const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const ds=`${days[n.getDay()]} ${months[n.getMonth()]} ${n.getDate()}`;
    document.getElementById('tb-time').textContent=`${h}:${m}:${s}`;document.getElementById('tb-clock-date').textContent=ds;
    const dw=document.getElementById('dw-time');if(dw)dw.textContent=`${h}:${m}:${s}`;const dd=document.getElementById('dw-date');if(dd)dd.textContent=ds;
  }
  tick();setInterval(tick,1000);
}
 
function setupDragWidget(){
  const w=document.getElementById('desktop-clock-widget');if(!w)return;
  let drag=false,ox=0,oy=0;
  w.addEventListener('mousedown',e=>{drag=true;const r=w.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!drag)return;let nx=e.clientX-ox,ny=e.clientY-oy;nx=Math.max(0,Math.min(window.innerWidth-w.offsetWidth,nx));ny=Math.max(0,Math.min(window.innerHeight-58-w.offsetHeight,ny));w.style.left=nx+'px';w.style.top=ny+'px';w.style.right='auto';});
  document.addEventListener('mouseup',()=>{drag=false;});
}
 
let iconCtxTarget=null;
function showIconCtx(appId,x,y){
  iconCtxTarget=appId;const menu=document.getElementById('icon-ctx-menu');menu.style.display='block';
  let px=x,py=y;if(px+180>window.innerWidth)px=window.innerWidth-180;if(py+120>window.innerHeight)py=window.innerHeight-120;
  menu.style.left=px+'px';menu.style.top=py+'px';
}
 
function initContextMenu(){
  const menu=document.getElementById('ctx-menu');const iconMenu=document.getElementById('icon-ctx-menu');
  document.getElementById('desktop').addEventListener('contextmenu',e=>{e.preventDefault();iconMenu.style.display='none';menu.style.display='block';let x=e.clientX,y=e.clientY;if(x+200>window.innerWidth)x=window.innerWidth-200;if(y+180>window.innerHeight)y=window.innerHeight-180;menu.style.left=x+'px';menu.style.top=y+'px';});
  document.addEventListener('click',()=>{menu.style.display='none';iconMenu.style.display='none';});
  menu.querySelectorAll('.ctx-item').forEach(item=>{item.addEventListener('click',()=>{const a=item.dataset.action;if(a==='about')openApp('about');else if(a==='newterminal')openApp('terminal');else if(a==='launcher')openLauncher();else if(a==='refresh')showNotif('SamtrediaOS','Desktop refreshed.','info');menu.style.display='none';});});
  iconMenu.querySelectorAll('.ctx-item').forEach(item=>{item.addEventListener('click',()=>{const a=item.dataset.action;if(a==='iopen'&&iconCtxTarget)openApp(iconCtxTarget);else if(a==='iprops'&&iconCtxTarget){const app=APPS[iconCtxTarget];showNotif(app.label,'State: '+app.state+' · Color: '+app.color,'info');}iconMenu.style.display='none';iconCtxTarget=null;});});
}
 
function initKeyboardShortcuts(){
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey&&e.key==='/'){e.preventDefault();const ov=document.getElementById('shortcuts-overlay');ov.style.display=ov.style.display==='none'?'flex':'none';}
    if(e.ctrlKey&&e.key===' '){e.preventDefault();openLauncher();}
    if(e.key==='Escape'){const l=document.getElementById('app-launcher');const s=document.getElementById('shortcuts-overlay');if(l.style.display!=='none'){closeLauncher();return;}if(s.style.display!=='none'){s.style.display='none';return;}if(focusedApp)closeApp(focusedApp);}
  });
  document.getElementById('shortcuts-close').addEventListener('click',()=>{document.getElementById('shortcuts-overlay').style.display='none';});
}
 
function showNotif(title,body,type='info'){
  const cols={info:'var(--cyan)',success:'var(--green)',warn:'var(--amber)',error:'var(--red)'};const col=cols[type]||cols.info;
  const stack=document.getElementById('notif-stack');const el=document.createElement('div');el.className='notif';
  el.style.borderLeftColor=col;
  el.innerHTML=`<div class="notif-title" style="color:${col}">${title}</div><div class="notif-body">${body}</div><div class="notif-bar" style="background:${col}"></div>`;
  stack.appendChild(el);
  setTimeout(()=>{el.style.transition='opacity 0.3s,transform 0.3s';el.style.opacity='0';el.style.transform='translateX(30px)';setTimeout(()=>el.remove(),300);},2900);
}
 
addSysLog('Desktop initialized');
 
})();