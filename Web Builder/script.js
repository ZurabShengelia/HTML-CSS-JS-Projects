const state = {
  elements: [],
  selectedId: null,
  selectedIds: [],
  history: [],
  future: [],
  dragging: null,
  resizing: null,
  codeTab: 'html',
  idCounter: 0,
  zoom: 1,
  panX: 0,
  panY: 0,
  isPanning: false,
  spaceDown: false,
  canvasW: 1920,
  canvasH: 1080,
  clipboard: null,
  contextElId: null,
  imgPickerTargetId: null,
  imgPickerDataUrl: null,
  vidPickerTargetId: null,
  vidPickerDataUrl: null,
  stickyDefaults: {},
  autoSaveTimer: null,
  canvasDark: false,
};

const GRID = 8;
const SNAP_THRESHOLD = 6;

const ICON_SET = {
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>',
  check: '<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/><polyline points="12 5 19 12 12 19" stroke="currentColor" stroke-width="2" fill="none"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.8" fill="none"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  phone: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .14h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  user: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  search: '<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="1.8"/>',
  settings: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.8" fill="none"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  cart: '<circle cx="9" cy="21" r="1" fill="currentColor"/><circle cx="20" cy="21" r="1" fill="currentColor"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  bell: '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.8" fill="none"/>',
};

const COLOR_SWATCHES = [
  '#ffffff','#f8fafc','#e2e8f0','#94a3b8','#475569',
  '#1e293b','#0f172a','#ef4444','#f97316','#eab308',
  '#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899',
];

const defaultStyles = {
  text:{name:'Text',width:220,height:44,content:'Type something here…',fontSize:14,fontWeight:'400',color:'#1e293b',bgColor:'transparent',padding:8,borderRadius:0,textAlign:'left',lineHeight:1.5,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:4,shadowBlur:12,shadowSpread:0,shadowColor:'#00000033'},
  heading:{name:'Heading',width:340,height:60,content:'Heading Text',fontSize:32,fontWeight:'700',color:'#0f172a',bgColor:'transparent',padding:8,borderRadius:0,textAlign:'left',lineHeight:1.2,letterSpacing:-0.5,opacity:100,shadow:false,shadowX:0,shadowY:4,shadowBlur:12,shadowSpread:0,shadowColor:'#00000033'},
  image:{name:'Image',width:300,height:200,src:'',borderRadius:8,bgColor:'transparent',padding:0,objectFit:'cover',opacity:100,shadow:true,shadowX:0,shadowY:8,shadowBlur:24,shadowSpread:0,shadowColor:'#00000026'},
  button:{name:'Button',width:140,height:44,content:'Click Me',fontSize:14,fontWeight:'600',color:'#ffffff',bgColor:'#5b7cf6',padding:12,borderRadius:8,textAlign:'center',opacity:100,shadow:true,shadowX:0,shadowY:4,shadowBlur:12,shadowSpread:0,shadowColor:'#5b7cf640'},
  container:{name:'Box',width:360,height:220,bgColor:'#f8fafc',borderRadius:12,padding:20,borderColor:'#e2e8f0',borderWidth:1,opacity:100,shadow:false,shadowX:0,shadowY:8,shadowBlur:24,shadowSpread:0,shadowColor:'#00000015'},
  divider:{name:'Divider',width:420,height:2,bgColor:'#e2e8f0',borderRadius:99,padding:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
  input:{name:'Input',width:240,height:40,placeholder:'Enter text…',fontSize:14,color:'#1e293b',bgColor:'#ffffff',borderColor:'#e2e8f0',borderWidth:1,borderRadius:8,padding:10,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
  video:{name:'Video',width:400,height:225,videoUrl:'',borderRadius:8,opacity:100,shadow:true,shadowX:0,shadowY:8,shadowBlur:24,shadowSpread:0,shadowColor:'#00000026'},
  icon:{name:'Icon',width:48,height:48,iconKey:'star',color:'#5b7cf6',bgColor:'transparent',borderRadius:0,padding:4,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
  badge:{name:'Badge',width:80,height:28,content:'Badge',fontSize:12,fontWeight:'600',color:'#5b7cf6',bgColor:'rgba(91,124,246,0.12)',borderRadius:99,padding:10,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
  section:{name:'Section',width:1200,height:320,bgColor:'#f8fafc',borderRadius:0,padding:40,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
  spacer:{name:'Spacer',width:400,height:60,bgColor:'transparent',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033'},
};

const TEMPLATES = {
  hero: (cx, cy) => [
    {type:'section',x:cx,y:cy,width:960,height:400,bgColor:'#f0f4ff',borderRadius:16,padding:60,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Hero Section'},
    {type:'badge',x:cx+380,y:cy+60,width:120,height:28,content:'✦ New Release',fontSize:11,fontWeight:'600',color:'#5b7cf6',bgColor:'rgba(91,124,246,0.12)',borderRadius:99,padding:12,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Badge'},
    {type:'heading',x:cx+160,y:cy+110,width:640,height:100,content:'Build beautiful things, faster.',fontSize:48,fontWeight:'700',color:'#0f172a',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'center',lineHeight:1.15,letterSpacing:-1,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Heading'},
    {type:'text',x:cx+230,y:cy+220,width:500,height:48,content:'The visual builder that makes UI design effortless and fun. No code required.',fontSize:16,fontWeight:'400',color:'#475569',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'center',lineHeight:1.6,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:4,shadowBlur:12,shadowSpread:0,shadowColor:'#00000033',name:'Subtitle'},
    {type:'button',x:cx+360,y:cy+300,width:160,height:48,content:'Get Started',fontSize:15,fontWeight:'600',color:'#ffffff',bgColor:'#5b7cf6',padding:16,borderRadius:10,textAlign:'center',opacity:100,shadow:true,shadowX:0,shadowY:6,shadowBlur:16,shadowSpread:0,shadowColor:'#5b7cf650',name:'CTA Button'},
    {type:'button',x:cx+532,y:cy+300,width:140,height:48,content:'Learn More',fontSize:15,fontWeight:'500',color:'#5b7cf6',bgColor:'transparent',padding:16,borderRadius:10,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Secondary Button'},
  ],
  card: (cx, cy) => [
    {type:'container',x:cx,y:cy,width:300,height:360,bgColor:'#ffffff',borderRadius:16,padding:0,borderColor:'#e2e8f0',borderWidth:1,opacity:100,shadow:true,shadowX:0,shadowY:8,shadowBlur:32,shadowSpread:0,shadowColor:'#0000001a',name:'Card'},
    {type:'image',x:cx,y:cy,width:300,height:180,src:'',borderRadius:0,bgColor:'#e2e8f0',padding:0,objectFit:'cover',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000026',name:'Card Image'},
    {type:'badge',x:cx+16,y:cy+196,width:72,height:24,content:'Design',fontSize:10,fontWeight:'600',color:'#5b7cf6',bgColor:'rgba(91,124,246,0.1)',borderRadius:99,padding:8,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Category'},
    {type:'heading',x:cx+16,y:cy+228,width:268,height:52,content:'Card Title Here',fontSize:18,fontWeight:'700',color:'#0f172a',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.3,letterSpacing:-0.3,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Card Title'},
    {type:'text',x:cx+16,y:cy+284,width:268,height:44,content:'Short description of what this card is all about.',fontSize:13,fontWeight:'400',color:'#64748b',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.5,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Card Text'},
    {type:'button',x:cx+16,y:cy+318,width:120,height:34,content:'Read more',fontSize:13,fontWeight:'600',color:'#ffffff',bgColor:'#5b7cf6',padding:10,borderRadius:8,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#5b7cf640',name:'Card Button'},
  ],
  navbar: (cx, cy) => [
    {type:'container',x:cx,y:cy,width:960,height:64,bgColor:'#ffffff',borderRadius:12,padding:0,borderColor:'#e2e8f0',borderWidth:1,opacity:100,shadow:true,shadowX:0,shadowY:2,shadowBlur:12,shadowSpread:0,shadowColor:'#0000000d',name:'Navbar'},
    {type:'heading',x:cx+20,y:cy+20,width:100,height:26,content:'SamtrediaWebBuilder',fontSize:16,fontWeight:'700',color:'#0f172a',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.2,letterSpacing:-0.5,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Logo'},
    {type:'text',x:cx+200,y:cy+22,width:60,height:22,content:'Features',fontSize:14,fontWeight:'500',color:'#475569',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.2,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Nav Link 1'},
    {type:'text',x:cx+276,y:cy+22,width:60,height:22,content:'Pricing',fontSize:14,fontWeight:'500',color:'#475569',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.2,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Nav Link 2'},
    {type:'text',x:cx+352,y:cy+22,width:56,height:22,content:'Docs',fontSize:14,fontWeight:'500',color:'#475569',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'left',lineHeight:1.2,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Nav Link 3'},
    {type:'button',x:cx+820,y:cy+14,width:100,height:36,content:'Sign Up',fontSize:13,fontWeight:'600',color:'#ffffff',bgColor:'#5b7cf6',padding:12,borderRadius:8,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#5b7cf640',name:'Nav CTA'},
    {type:'button',x:cx+716,y:cy+14,width:96,height:36,content:'Log In',fontSize:13,fontWeight:'500',color:'#475569',bgColor:'transparent',padding:12,borderRadius:8,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'Nav Login'},
  ],
  cta: (cx, cy) => [
    {type:'section',x:cx,y:cy,width:760,height:280,bgColor:'#0f172a',borderRadius:20,padding:60,opacity:100,shadow:true,shadowX:0,shadowY:20,shadowBlur:60,shadowSpread:0,shadowColor:'#0000004d',name:'CTA Section'},
    {type:'heading',x:cx+80,y:cy+60,width:600,height:80,content:'Ready to get started?',fontSize:38,fontWeight:'700',color:'#f8fafc',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'center',lineHeight:1.2,letterSpacing:-0.8,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'CTA Heading'},
    {type:'text',x:cx+140,y:cy+148,width:480,height:40,content:'Join thousands of teams already building with SamtrediaWebBuilder.',fontSize:15,fontWeight:'400',color:'#94a3b8',bgColor:'transparent',padding:0,borderRadius:0,textAlign:'center',lineHeight:1.6,letterSpacing:0,opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'CTA Subtitle'},
    {type:'button',x:cx+250,y:cy+208,width:160,height:48,content:'Start for free',fontSize:15,fontWeight:'600',color:'#0f172a',bgColor:'#f8fafc',padding:16,borderRadius:10,textAlign:'center',opacity:100,shadow:true,shadowX:0,shadowY:4,shadowBlur:20,shadowSpread:0,shadowColor:'#ffffff22',name:'CTA Button'},
    {type:'button',x:cx+424,y:cy+208,width:136,height:48,content:'Talk to sales',fontSize:15,fontWeight:'500',color:'#94a3b8',bgColor:'rgba(255,255,255,0.06)',padding:16,borderRadius:10,textAlign:'center',opacity:100,shadow:false,shadowX:0,shadowY:0,shadowBlur:0,shadowSpread:0,shadowColor:'#00000033',name:'CTA Secondary'},
  ],
};

function addTemplate(name){
  const area=document.getElementById('canvas-area');
  const cx=Math.max(60, Math.round((area.scrollLeft + area.clientWidth/2 - 480) / state.zoom / GRID) * GRID);
  const cy=Math.max(60, Math.round((area.scrollTop + 80) / state.zoom / GRID) * GRID);
  const fn=TEMPLATES[name];
  if(!fn){showToast('Unknown template');return}
  saveHistory();
  const els=fn(cx,cy);
  els.forEach(def=>{
    const el={...JSON.parse(JSON.stringify(defaultStyles[def.type]||defaultStyles.text)),...def,id:genId(),zIndex:state.elements.length+1,locked:false};
    state.elements.push(el);
    state.selectedId=el.id;
    state.selectedIds=[el.id];
  });
  renderCanvas();renderLayers();renderStylePanel();
  showToast('Template added: '+name.charAt(0).toUpperCase()+name.slice(1));
}

function genId(){return 'el_'+(++state.idCounter)+'_'+Math.random().toString(36).slice(2,7)}

function saveHistory(){
  state.history.push(JSON.stringify(state.elements));
  if(state.history.length>80)state.history.shift();
  state.future=[];
  updateUndoLabel();
}

function undoAction(){
  if(state.history.length===0){showToast('Nothing to undo');return}
  state.future.push(JSON.stringify(state.elements));
  state.elements=JSON.parse(state.history.pop());
  state.selectedId=null;state.selectedIds=[];
  renderCanvas();renderLayers();renderStylePanel();
  updateUndoLabel();
  showToast('Undo');
}

function redoAction(){
  if(state.future.length===0){showToast('Nothing to redo');return}
  state.history.push(JSON.stringify(state.elements));
  state.elements=JSON.parse(state.future.pop());
  state.selectedId=null;state.selectedIds=[];
  renderCanvas();renderLayers();renderStylePanel();
  updateUndoLabel();
  showToast('Redo');
}

function updateUndoLabel(){
  const el=document.getElementById('undo-info');
  if(el)el.textContent=state.history.length+' history';
}

function clearCanvas(){
  if(state.elements.length===0)return;
  saveHistory();
  state.elements=[];state.selectedId=null;state.selectedIds=[];
  renderCanvas();renderLayers();renderStylePanel();
  showToast('Canvas cleared');
}

function fitCanvasToView(){
  const area=document.getElementById('canvas-area');
  if(!area)return;
  const aw=area.clientWidth-80;
  const ah=area.clientHeight-80;
  const zoomX=aw/state.canvasW;
  const zoomY=ah/state.canvasH;
  const newZoom=Math.min(zoomX,zoomY,1)*0.9;
  state.zoom=Math.round(Math.min(3,Math.max(0.1,newZoom))*100)/100;
  applyZoom();

  setTimeout(()=>{
    const scaledW=state.canvasW*state.zoom;
    const scaledH=state.canvasH*state.zoom;
    area.scrollLeft=Math.max(0,(scaledW-area.clientWidth)/2);
    area.scrollTop=Math.max(0,(scaledH-area.clientHeight)/2-20);
  },60);
}

function adjustZoom(delta){
  state.zoom=Math.min(3,Math.max(0.1,Math.round((state.zoom+delta)*10)/10));
  applyZoom();
}

function applyZoom(){
  const vp=document.getElementById('canvas-viewport');
  if(vp){vp.style.transform=`scale(${state.zoom})`;vp.style.transformOrigin='top center';}
  const zl=document.getElementById('zoom-label');
  if(zl)zl.textContent=Math.round(state.zoom*100)+'%';
}

function toggleCanvasTheme(){
  state.canvasDark=!state.canvasDark;
  const canvas=document.getElementById('canvas');
  canvas.classList.toggle('dark-canvas',state.canvasDark);
  const moon=document.getElementById('theme-icon-moon');
  const sun=document.getElementById('theme-icon-sun');
  if(moon)moon.style.display=state.canvasDark?'none':'block';
  if(sun)sun.style.display=state.canvasDark?'block':'none';
  try{localStorage.setItem('samtrediawebbuilder_dark',state.canvasDark?'1':'0')}catch(e){}
  showToast('Canvas: '+(state.canvasDark?'Dark':'Light'));
}

function loadCanvasTheme(){
  try{
    const v=localStorage.getItem('samtrediawebbuilder_dark');
    if(v==='1'){state.canvasDark=true;document.getElementById('canvas').classList.add('dark-canvas');
      const moon=document.getElementById('theme-icon-moon');const sun=document.getElementById('theme-icon-sun');
      if(moon)moon.style.display='none';if(sun)sun.style.display='block';
    }
  }catch(e){}
}

function saveProject(){
  const data={version:1,canvasW:state.canvasW,canvasH:state.canvasH,idCounter:state.idCounter,elements:state.elements};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='samtrediawebbuilder-project-'+(new Date().toISOString().slice(0,10))+'.json';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),3000);
  showToast('Project saved!');
}

function loadProjectFile(){
  document.getElementById('load-project-input').click();
}

function handleLoadProject(e){
  const file=e.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data.elements)throw new Error('Invalid project file');
      saveHistory();
      state.elements=data.elements;
      state.canvasW=data.canvasW||1920;
      state.canvasH=data.canvasH||1080;
      state.idCounter=data.idCounter||state.elements.length;
      state.selectedId=null;state.selectedIds=[];
      const canvas=document.getElementById('canvas');
      canvas.style.width=state.canvasW+'px';
      canvas.style.height=state.canvasH+'px';
      renderCanvas();renderLayers();renderStylePanel();renderRulers();
      fitCanvasToView();
      showToast('Loaded '+state.elements.length+' elements');
    }catch(err){showToast('Error: Invalid project file')}
  };
  reader.readAsText(file);
  e.target.value='';
}

function createElement(type,x,y){
  const def=JSON.parse(JSON.stringify(defaultStyles[type]||defaultStyles.text));
  const sticky=state.stickyDefaults[type]||{};
  Object.assign(def,sticky);
  return{id:genId(),type,x:snapToGrid(x||60),y:snapToGrid(y||60),...def,zIndex:state.elements.length+1,locked:false};
}

function snapToGrid(v){return Math.round(v/GRID)*GRID}

function renderCanvas(){
  const canvas=document.getElementById('canvas');
  canvas.querySelectorAll('.canvas-element').forEach(e=>e.remove());
  const emptyEl=document.getElementById('canvas-empty');
  if(state.elements.length>0){emptyEl.classList.add('hidden')}
  else{emptyEl.classList.remove('hidden')}
  state.elements.forEach(el=>renderElement(el));
}

function renderElement(el){
  const canvas=document.getElementById('canvas');
  const existing=document.getElementById(el.id);
  if(existing)existing.remove();

  const div=document.createElement('div');
  div.id=el.id;
  div.className='canvas-element';
  if(state.selectedId===el.id)div.classList.add('selected');
  if(state.selectedIds.includes(el.id)&&state.selectedIds.length>1)div.classList.add('multi-selected');
  if(el.locked)div.classList.add('locked');
  div.style.cssText=`left:${el.x}px;top:${el.y}px;width:${el.width}px;height:${el.height}px;z-index:${el.zIndex||1};opacity:${(el.opacity||100)/100};`;
  div.setAttribute('data-type',el.type);

  const shadowCss=el.shadow?`${el.shadowX||0}px ${el.shadowY||4}px ${el.shadowBlur||12}px ${el.shadowSpread||0}px ${el.shadowColor||'rgba(0,0,0,0.2)'}`:el.shadowX||el.shadowY?`${el.shadowX||0}px ${el.shadowY||0}px ${el.shadowBlur||0}px ${el.shadowSpread||0}px ${el.shadowColor||'rgba(0,0,0,0.2)'}`:null;

  if(el.type==='text'||el.type==='heading'){
    div.style.background=el.bgColor||'transparent';
    div.style.borderRadius=(el.borderRadius||0)+'px';
    div.style.padding=(el.padding||0)+'px';
    if(shadowCss)div.style.textShadow=shadowCss;
    const span=document.createElement('div');
    span.className='inline-text';
    span.contentEditable='false';
    span.style.cssText=`font-size:${el.fontSize||14}px;font-weight:${el.fontWeight||'400'};color:${el.color||'#1e293b'};text-align:${el.textAlign||'left'};line-height:${el.lineHeight||1.5};letter-spacing:${el.letterSpacing||0}px;word-break:break-word;width:100%;height:100%;`;
    span.textContent=el.content||'';
    div.appendChild(span);
  } else if(el.type==='button'){
    div.style.cssText+=`background:${el.bgColor||'#5b7cf6'};border-radius:${el.borderRadius||8}px;display:flex;align-items:center;justify-content:center;cursor:pointer;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
    const span=document.createElement('span');
    span.style.cssText=`font-size:${el.fontSize||14}px;font-weight:${el.fontWeight||'600'};color:${el.color||'#fff'};padding:0 ${el.padding||12}px;pointer-events:none;letter-spacing:${el.letterSpacing||0}px;`;
    span.textContent=el.content||'Button';
    div.appendChild(span);
  } else if(el.type==='image'){
    div.style.cssText+=`border-radius:${el.borderRadius||8}px;overflow:hidden;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
    if(el.src){
      const img=document.createElement('img');
      img.src=el.src;
      img.style.cssText='width:100%;height:100%;object-fit:'+(el.objectFit||'cover')+';display:block;';
      img.draggable=false;
      div.appendChild(img);
    } else {
      const ph=document.createElement('div');
      ph.className='img-placeholder';
      ph.innerHTML=`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>Click to set image</span>`;
      ph.onclick=(e)=>{e.stopPropagation();openImgPicker(el.id)};
      div.appendChild(ph);
    }
  } else if(el.type==='container'){
    div.style.cssText+=`background:${el.bgColor||'#f8fafc'};border-radius:${el.borderRadius||12}px;border:${el.borderWidth||1}px solid ${el.borderColor||'#e2e8f0'};padding:${el.padding||20}px;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
  } else if(el.type==='divider'){
    div.style.cssText+=`background:${el.bgColor||'#e2e8f0'};border-radius:${el.borderRadius||99}px;`;
  } else if(el.type==='input'){
    div.style.cssText+=`border-radius:${el.borderRadius||8}px;overflow:hidden;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
    const inp=document.createElement('input');
    inp.type='text';
    inp.placeholder=el.placeholder||'Enter text…';
    inp.style.cssText=`width:100%;height:100%;font-size:${el.fontSize||14}px;color:${el.color||'#1e293b'};background:${el.bgColor||'#fff'};border:${el.borderWidth||1}px solid ${el.borderColor||'#e2e8f0'};border-radius:${el.borderRadius||8}px;padding:0 ${el.padding||10}px;outline:none;font-family:DM Sans, sans-serif;box-sizing:border-box;`;
    inp.disabled=true;
    div.appendChild(inp);
  } else if(el.type==='video'){
    div.style.cssText+=`border-radius:${el.borderRadius||8}px;overflow:hidden;background:#000;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
    if(el.videoUrl){
      if(el.videoUrl.startsWith('data:')||el.videoUrl.match(/\.mp4|webm|ogg/i)){
        const vid=document.createElement('video');
        vid.src=el.videoUrl;
        vid.controls=true;
        vid.style.cssText='width:100%;height:100%;object-fit:cover;pointer-events:none;display:block;';
        div.appendChild(vid);
      } else {
        const ytId=extractYoutubeId(el.videoUrl);
        if(ytId){
          const iframe=document.createElement('iframe');
          iframe.src=`https://www.youtube.com/embed/${ytId}`;
          iframe.style.cssText='width:100%;height:100%;border:none;pointer-events:none;';
          iframe.allowFullscreen=true;
          div.appendChild(iframe);
        }
      }
    } else {
      const ph=document.createElement('div');
      ph.className='vid-placeholder';
      ph.innerHTML=`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10,8 16,12 10,16" fill="#555"/></svg><span>Click to set video</span>`;
      ph.onclick=(e)=>{e.stopPropagation();openVidPicker(el.id)};
      div.appendChild(ph);
    }
  } else if(el.type==='icon'){
    div.style.cssText+=`background:${el.bgColor||'transparent'};border-radius:${el.borderRadius||0}px;padding:${el.padding||4}px;display:flex;align-items:center;justify-content:center;`;
    const svgEl=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgEl.setAttribute('viewBox','0 0 24 24');
    svgEl.style.cssText='width:100%;height:100%;color:'+(el.color||'#5b7cf6')+';';
    svgEl.innerHTML=ICON_SET[el.iconKey||'star']||ICON_SET.star;
    div.appendChild(svgEl);
  } else if(el.type==='badge'){
    div.style.cssText+=`background:${el.bgColor||'rgba(91,124,246,0.12)'};border-radius:${el.borderRadius||99}px;display:flex;align-items:center;justify-content:center;padding:0 ${el.padding||10}px;`;
    const span=document.createElement('span');
    span.style.cssText=`font-size:${el.fontSize||12}px;font-weight:${el.fontWeight||'600'};color:${el.color||'#5b7cf6'};white-space:nowrap;letter-spacing:${el.letterSpacing||0}px;`;
    span.textContent=el.content||'Badge';
    div.appendChild(span);
  } else if(el.type==='section'){
    div.style.cssText+=`background:${el.bgColor||'#f8fafc'};border-radius:${el.borderRadius||0}px;padding:${el.padding||40}px;`;
    if(shadowCss)div.style.boxShadow=shadowCss;
  } else if(el.type==='spacer'){
    div.style.cssText+=`background:transparent;border:1.5px dashed rgba(91,124,246,0.2);border-radius:4px;`;
    const label=document.createElement('div');
    label.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;color:rgba(91,124,246,0.4);font-weight:600;letter-spacing:0.5px;pointer-events:none;';
    label.textContent='SPACER';
    div.appendChild(label);
  }

  if(state.selectedId===el.id){
    const actions=document.createElement('div');
    actions.className='el-actions';
    actions.innerHTML=`
      <span class="el-action-label">${el.name||el.type}</span>
      <button class="el-action-btn" title="Duplicate (Ctrl+D)" onclick="duplicateElement('${el.id}',event)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
      <button class="el-action-btn" title="Send back" onclick="moveLayer('${el.id}','down',event)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg></button>
      <button class="el-action-btn" title="Bring forward" onclick="moveLayer('${el.id}','up',event)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
      <button class="el-action-btn danger" title="Delete" onclick="deleteElement('${el.id}',event)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>
    `;
    div.appendChild(actions);
    if(!el.locked){
      ['tl','tr','bl','br','mr','ml','mt','mb'].forEach(pos=>{
        const h=document.createElement('div');
        h.className='el-handle '+pos;
        h.onmousedown=(e)=>startResize(e,el.id,pos);
        div.appendChild(h);
      });
    }
  }

  div.addEventListener('mousedown',e=>startCanvasDrag(e,el.id));
  div.addEventListener('click',e=>{
    e.stopPropagation();
    if(e.shiftKey){toggleMultiSelect(el.id)}
    else{selectElement(el.id)}
  });
  div.addEventListener('dblclick',e=>{e.stopPropagation();startInlineEdit(el.id,div)});
  canvas.appendChild(div);
}

function extractYoutubeId(url){
  const m=url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return m?m[1]:null;
}

function startInlineEdit(id,div){
  const el=state.elements.find(e=>e.id===id);
  if(!el||!['text','heading','button','badge'].includes(el.type))return;
  const span=div.querySelector('.inline-text,span:not(.el-action-label)');
  if(!span)return;
  span.contentEditable='true';
  span.focus();
  const range=document.createRange();
  range.selectNodeContents(span);
  const sel=window.getSelection();
  sel.removeAllRanges();sel.addRange(range);
  span.oninput=()=>{el.content=span.textContent;updateStylePanel()};
  span.onblur=()=>{span.contentEditable='false';el.content=span.textContent;saveHistory()};
  span.onkeydown=(e)=>{if(e.key==='Escape')span.blur()};
}

function selectElement(id){
  state.selectedId=id;state.selectedIds=[id];
  renderCanvas();renderLayers();renderStylePanel();
}

function toggleMultiSelect(id){
  if(state.selectedIds.includes(id)){
    state.selectedIds=state.selectedIds.filter(x=>x!==id);
    if(state.selectedId===id)state.selectedId=state.selectedIds[state.selectedIds.length-1]||null;
  } else {
    state.selectedIds.push(id);
    state.selectedId=id;
  }
  renderCanvas();renderLayers();renderStylePanel();
}

function deselectAll(){
  state.selectedId=null;state.selectedIds=[];
  renderCanvas();renderLayers();renderStylePanel();
  hideContextMenu();
}

function deleteElement(id,e){
  if(e)e.stopPropagation();
  saveHistory();
  const ids=id?[id]:state.selectedIds;
  state.elements=state.elements.filter(el=>!ids.includes(el.id));
  if(ids.includes(state.selectedId)){state.selectedId=null;state.selectedIds=[]}
  renderCanvas();renderLayers();renderStylePanel();
  showToast('Deleted');
}

function duplicateElement(id,e){
  if(e)e.stopPropagation();
  const el=state.elements.find(el=>el.id===(id||state.selectedId));
  if(!el)return;
  saveHistory();
  const copy=JSON.parse(JSON.stringify(el));
  copy.id=genId();copy.x+=16;copy.y+=16;copy.name=el.name||el.type;
  state.elements.push(copy);
  state.selectedId=copy.id;state.selectedIds=[copy.id];
  renderCanvas();renderLayers();renderStylePanel();
  showToast('Duplicated');
}

function moveLayer(id,dir,e){
  if(e)e.stopPropagation();
  const idx=state.elements.findIndex(el=>el.id===id);
  if(idx<0)return;
  saveHistory();
  if(dir==='up'&&idx<state.elements.length-1){[state.elements[idx],state.elements[idx+1]]=[state.elements[idx+1],state.elements[idx]]}
  else if(dir==='down'&&idx>0){[state.elements[idx],state.elements[idx-1]]=[state.elements[idx-1],state.elements[idx]]}
  state.elements.forEach((el,i)=>el.zIndex=i+1);
  renderCanvas();renderLayers();
}

function toggleLock(id){
  const el=state.elements.find(e=>e.id===id);
  if(!el)return;
  el.locked=!el.locked;
  saveHistory();
  renderCanvas();renderLayers();
  showToast(el.locked?'Locked':'Unlocked');
}

let sidebarDragType=null,dragGhost=null;
function startSidebarDrag(e,type){
  sidebarDragType=type;
  dragGhost=document.createElement('div');
  const def=defaultStyles[type];
  dragGhost.style.cssText=`position:fixed;z-index:99999;pointer-events:none;opacity:0.9;
    background:rgba(19,21,26,0.95);border:1px solid rgba(91,124,246,0.5);border-radius:8px;
    padding:8px 14px;font-size:12px;font-weight:600;color:#5b7cf6;font-family:DM Sans,sans-serif;
    box-shadow:0 8px 24px rgba(91,124,246,0.3);white-space:nowrap;
    display:flex;align-items:center;gap:6px;transform:translate(-50%,-50%);
    backdrop-filter:blur(12px);
  `;
  dragGhost.innerHTML=`<span style="font-size:14px">+</span>${def?def.name:type}`;
  document.body.appendChild(dragGhost);
  dragGhost.style.left=e.clientX+'px';dragGhost.style.top=e.clientY+'px';
  document.addEventListener('mousemove',onSidebarDragMove);
  document.addEventListener('mouseup',onSidebarDragEnd);
}

function onSidebarDragMove(e){
  if(dragGhost){dragGhost.style.left=e.clientX+'px';dragGhost.style.top=e.clientY+'px'}
  const canvas=document.getElementById('canvas');
  const rect=canvas.getBoundingClientRect();
  const inside=e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom;
  canvas.classList.toggle('drag-over',inside);
}

function onSidebarDragEnd(e){
  document.removeEventListener('mousemove',onSidebarDragMove);
  document.removeEventListener('mouseup',onSidebarDragEnd);
  if(dragGhost){dragGhost.remove();dragGhost=null}
  const canvas=document.getElementById('canvas');
  canvas.classList.remove('drag-over');
  const rect=canvas.getBoundingClientRect();
  if(sidebarDragType&&e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom){
    const x=(e.clientX-rect.left)/state.zoom;
    const y=(e.clientY-rect.top)/state.zoom;
    addElement(sidebarDragType,x,y);
  }
  sidebarDragType=null;
}

function addElement(type,x,y){
  saveHistory();
  const el=createElement(type,snapToGrid(Math.max(0,x-50)),snapToGrid(Math.max(0,y-30)));
  state.elements.push(el);
  state.selectedId=el.id;state.selectedIds=[el.id];
  renderCanvas();renderLayers();renderStylePanel();
  if(type==='image')setTimeout(()=>openImgPicker(el.id),200);
}

function handleCanvasDragOver(e){e.preventDefault()}
function handleCanvasDrop(e){
  e.preventDefault();
  const type=e.dataTransfer.getData('text/plain');
  if(!type)return;
  const canvas=document.getElementById('canvas');
  const rect=canvas.getBoundingClientRect();
  addElement(type,(e.clientX-rect.left)/state.zoom,(e.clientY-rect.top)/state.zoom);
  canvas.classList.remove('drag-over');
}
function handleCanvasDragLeave(e){document.getElementById('canvas').classList.remove('drag-over')}

let canvasDragData=null;
function startCanvasDrag(e,id){
  if(e.button!==0)return;
  if(e.target.classList.contains('el-handle')||e.target.closest('.el-actions')||e.target.closest('.img-placeholder'))return;
  e.preventDefault();e.stopPropagation();
  const el=state.elements.find(el=>el.id===id);
  if(!el||el.locked)return;
  if(!e.shiftKey){selectElement(id)}

  const canvas=document.getElementById('canvas');
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)/state.zoom;
  const my=(e.clientY-rect.top)/state.zoom;

  const moveEls=state.selectedIds.length>1?state.selectedIds.map(sid=>{
    const sel=state.elements.find(e=>e.id===sid);
    return sel?{id:sid,startX:sel.x,startY:sel.y}:null;
  }).filter(Boolean):[{id,startX:el.x,startY:el.y}];

  canvasDragData={id,mouseX:mx,mouseY:my,offX:mx-el.x,offY:my-el.y,moved:false,moveEls};
  document.body.style.cursor='grabbing';
  document.addEventListener('mousemove',onCanvasDragMove);
  document.addEventListener('mouseup',onCanvasDragEnd);
}

function onCanvasDragMove(e){
  if(!canvasDragData)return;
  const canvas=document.getElementById('canvas');
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)/state.zoom;
  const my=(e.clientY-rect.top)/state.zoom;
  const dx=mx-canvasDragData.mouseX;
  const dy=my-canvasDragData.mouseY;
  if(Math.abs(dx)<1&&Math.abs(dy)<1)return;
  canvasDragData.moved=true;

  canvasDragData.moveEls.forEach(m=>{
    const el=state.elements.find(e=>e.id===m.id);
    if(!el)return;
    let nx=snapToGrid(m.startX+dx);
    let ny=snapToGrid(m.startY+dy);
    nx=Math.max(0,Math.min(nx,state.canvasW-(el.width||40)));
    ny=Math.max(0,Math.min(ny,state.canvasH-(el.height||20)));
    if(m.id===canvasDragData.id&&canvasDragData.moveEls.length===1){
      const snapped=snapToGuides(nx,ny,m.id,el.width,el.height);
      el.x=snapped.x;el.y=snapped.y;
      showSnapLines(snapped.snapH,snapped.snapV,snapped.hPos,snapped.vPos);
    } else {
      el.x=nx;el.y=ny;
    }
    const domEl=document.getElementById(m.id);
    if(domEl){domEl.style.left=el.x+'px';domEl.style.top=el.y+'px'}
  });
}

function snapToGuides(x,y,excludeId,elW,elH){
  let nx=x,ny=y,snapH=false,snapV=false,hPos=0,vPos=0;
  state.elements.forEach(el=>{
    if(el.id===excludeId)return;
    const cx=el.x+el.width/2;const cy=el.y+el.height/2;
    const myCx=x+elW/2;const myCy=y+elH/2;
    if(Math.abs(x-el.x)<SNAP_THRESHOLD){nx=el.x;snapV=true;vPos=el.x}
    if(Math.abs(x+elW-(el.x+el.width))<SNAP_THRESHOLD){nx=el.x+el.width-elW;snapV=true;vPos=el.x+el.width}
    if(Math.abs(myCx-cx)<SNAP_THRESHOLD){nx=cx-elW/2;snapV=true;vPos=cx}
    if(Math.abs(y-el.y)<SNAP_THRESHOLD){ny=el.y;snapH=true;hPos=el.y}
    if(Math.abs(y+elH-(el.y+el.height))<SNAP_THRESHOLD){ny=el.y+el.height-elH;snapH=true;hPos=el.y+el.height}
    if(Math.abs(myCy-cy)<SNAP_THRESHOLD){ny=cy-elH/2;snapH=true;hPos=cy}
  });
  return{x:nx,y:ny,snapH,snapV,hPos,vPos};
}

function showSnapLines(h,v,hPos,vPos){
  const lh=document.getElementById('snap-line-h');
  const lv=document.getElementById('snap-line-v');
  if(lh){lh.style.top=hPos+'px';lh.classList.toggle('visible',h)}
  if(lv){lv.style.left=vPos+'px';lv.classList.toggle('visible',v)}
}

function onCanvasDragEnd(){
  document.removeEventListener('mousemove',onCanvasDragMove);
  document.removeEventListener('mouseup',onCanvasDragEnd);
  document.body.style.cursor='';
  showSnapLines(false,false,0,0);
  if(canvasDragData&&canvasDragData.moved)saveHistory();
  canvasDragData=null;
  renderStylePanel();
}

let resizeData=null;
function startResize(e,id,handle){
  e.preventDefault();e.stopPropagation();
  const el=state.elements.find(el=>el.id===id);
  if(!el)return;
  resizeData={id,handle,startW:el.width,startH:el.height,startX:el.x,startY:el.y,mouseX:e.clientX,mouseY:e.clientY};
  document.addEventListener('mousemove',onResizeMove);
  document.addEventListener('mouseup',onResizeEnd);
}

function onResizeMove(e){
  if(!resizeData)return;
  const el=state.elements.find(el=>el.id===resizeData.id);
  if(!el)return;
  const dx=(e.clientX-resizeData.mouseX)/state.zoom;
  const dy=(e.clientY-resizeData.mouseY)/state.zoom;
  const h=resizeData.handle;
  let nw=resizeData.startW,nh=resizeData.startH,nx=resizeData.startX,ny=resizeData.startY;
  if(h.includes('r'))nw=Math.max(20,snapToGrid(resizeData.startW+dx));
  if(h.includes('l')){nw=Math.max(20,snapToGrid(resizeData.startW-dx));nx=snapToGrid(resizeData.startX+resizeData.startW-nw)}
  if(h.includes('b'))nh=Math.max(10,snapToGrid(resizeData.startH+dy));
  if(h.includes('t')){nh=Math.max(10,snapToGrid(resizeData.startH-dy));ny=snapToGrid(resizeData.startY+resizeData.startH-nh)}
  if(h==='mr')nw=Math.max(20,snapToGrid(resizeData.startW+dx));
  if(h==='ml'){nw=Math.max(20,snapToGrid(resizeData.startW-dx));nx=snapToGrid(resizeData.startX+resizeData.startW-nw)}
  if(h==='mb')nh=Math.max(10,snapToGrid(resizeData.startH+dy));
  if(h==='mt'){nh=Math.max(10,snapToGrid(resizeData.startH-dy));ny=snapToGrid(resizeData.startY+resizeData.startH-nh)}
  el.width=nw;el.height=nh;el.x=nx;el.y=ny;
  const domEl=document.getElementById(el.id);
  if(domEl){domEl.style.width=nw+'px';domEl.style.height=nh+'px';domEl.style.left=nx+'px';domEl.style.top=ny+'px'}
  updatePosInputs(el);
}

function onResizeEnd(){
  document.removeEventListener('mousemove',onResizeMove);
  document.removeEventListener('mouseup',onResizeEnd);
  if(resizeData)saveHistory();
  resizeData=null;
  renderStylePanel();
}

function updatePosInputs(el){
  ['x','y','width','height'].forEach(p=>{
    const inp=document.querySelector(`[data-prop="${p}"]`);
    if(inp)inp.value=el[p];
  });
}

function handleCanvasClick(e){
  if(e.target.id==='canvas'||e.target.classList.contains('canvas-grid-bg')||e.target.id==='canvas-empty'||e.target.closest('.canvas-empty')){
    deselectAll();
  }
  if(window.innerWidth<=1024) closeAllMobileSidebars();
}

let canvasAreaDragStart=null;
function handleCanvasAreaDown(e){
  if(state.spaceDown&&e.button===0){
    e.preventDefault();
    state.isPanning=true;
    canvasAreaDragStart={x:e.clientX,y:e.clientY,scrollLeft:document.getElementById('canvas-area').scrollLeft,scrollTop:document.getElementById('canvas-area').scrollTop};
    document.getElementById('canvas-area').classList.add('panning');
  }
}
function handleCanvasAreaMove(e){
  if(state.isPanning&&canvasAreaDragStart){
    const area=document.getElementById('canvas-area');
    area.scrollLeft=canvasAreaDragStart.scrollLeft-(e.clientX-canvasAreaDragStart.x);
    area.scrollTop=canvasAreaDragStart.scrollTop-(e.clientY-canvasAreaDragStart.y);
  }
}
function handleCanvasAreaUp(){
  state.isPanning=false;canvasAreaDragStart=null;
  document.getElementById('canvas-area').classList.remove('panning');
}

function handleContextMenu(e){
  e.preventDefault();e.stopPropagation();
  const el=e.target.closest('.canvas-element');
  if(!el)return;
  const id=el.id;
  state.contextElId=id;
  const lockEl=state.elements.find(x=>x.id===id);
  const lockLabel=document.getElementById('ctx-lock-label');
  if(lockLabel)lockLabel.textContent=lockEl&&lockEl.locked?'Unlock':'Lock';
  const menu=document.getElementById('context-menu');
  menu.style.left=Math.min(e.clientX,window.innerWidth-180)+'px';
  menu.style.top=Math.min(e.clientY,window.innerHeight-200)+'px';
  menu.classList.add('open');
  setTimeout(()=>document.addEventListener('click',hideContextMenu,{once:true}),10);
}
function hideContextMenu(){document.getElementById('context-menu').classList.remove('open')}
function ctxDuplicate(){duplicateElement(state.contextElId);hideContextMenu()}
function ctxBringForward(){moveLayer(state.contextElId,'up');hideContextMenu()}
function ctxSendBack(){moveLayer(state.contextElId,'down');hideContextMenu()}
function ctxToggleLock(){toggleLock(state.contextElId);hideContextMenu()}
function ctxDelete(){deleteElement(state.contextElId);hideContextMenu()}

function setCanvasSize(w,h,btn){
  state.canvasW=w;state.canvasH=h;
  const canvas=document.getElementById('canvas');
  canvas.style.width=w+'px';canvas.style.height=h+'px';
  document.querySelectorAll('.preset-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  showToast(w+'×'+h);
  renderRulers();

  setTimeout(fitCanvasToView,50);
}

function renderLayers(){
  const list=document.getElementById('layers-list');
  const count=document.getElementById('layers-count');
  if(count)count.textContent=state.elements.length+' layer'+(state.elements.length===1?'':'s');
  if(state.elements.length===0){
    list.innerHTML='<div class="no-layers">No elements yet.<br>Drag from Elements tab.</div>';return;
  }
  list.innerHTML='';
  [...state.elements].reverse().forEach(el=>{
    const item=document.createElement('div');
    item.className='layer-item'+(state.selectedId===el.id?' active':'')+(el.locked?' locked':'');
    item.innerHTML=`
      <svg class="layer-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${getTypeIconPath(el.type)}</svg>
      <span class="layer-name" title="${el.name||el.type}">${el.name||getLayerName(el)}</span>
      ${el.locked?'<svg class="layer-lock-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>':''}
    `;
    item.onclick=()=>selectElement(el.id);
    const nameSpan=item.querySelector('.layer-name');
    nameSpan.ondblclick=(e)=>{e.stopPropagation();startLayerRename(el.id,nameSpan)};
    list.appendChild(item);
  });
}

function getLayerName(el){
  if(['text','heading','button','badge'].includes(el.type))return(el.content||el.type).substring(0,20);
  return el.name||(el.type.charAt(0).toUpperCase()+el.type.slice(1));
}

function getTypeIconPath(type){
  const icons={
    text:'<path d="M4 6h16M4 10h10M4 14h14"/>',
    heading:'<path d="M4 5v14M20 5v14M4 12h16"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    button:'<rect x="2" y="7" width="20" height="10" rx="5"/>',
    container:'<rect x="2" y="2" width="20" height="20" rx="3"/>',
    divider:'<path d="M3 12h18"/>',
    input:'<rect x="2" y="7" width="20" height="10" rx="2"/>',
    video:'<rect x="2" y="4" width="20" height="16" rx="2"/>',
    icon:'<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>',
    badge:'<rect x="2" y="8" width="20" height="8" rx="4"/>',
    section:'<rect x="1" y="5" width="22" height="14" rx="1"/>',
    spacer:'<path d="M3 8V5h18v3M3 16v3h18v-3"/>',
  };
  return icons[type]||icons.text;
}

function startLayerRename(id,nameSpan){
  const el=state.elements.find(e=>e.id===id);
  if(!el)return;
  const inp=document.createElement('input');
  inp.className='layer-name-input';
  inp.value=el.name||el.type;
  nameSpan.replaceWith(inp);
  inp.focus();inp.select();
  const done=()=>{
    const val=inp.value.trim()||el.type;
    el.name=val;
    saveHistory();
    renderLayers();
    renderStylePanel();
  };
  inp.onblur=done;
  inp.onkeydown=(e)=>{if(e.key==='Enter')inp.blur();if(e.key==='Escape'){inp.value=el.name||el.type;inp.blur()}};
}

function switchSidebarTab(tab,btn){
  document.querySelectorAll('.stab-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.querySelectorAll('#left-sidebar .stab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
}

function switchPropTab(tab,btn){
  document.querySelectorAll('#right-sidebar .stab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
}

function renderStylePanel(){
  const panel=document.getElementById('style-panel');
  const el=state.elements.find(e=>e.id===state.selectedId);
  if(!el){
    panel.innerHTML=`<div class="empty-state"><div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg></div><p>Select an element to edit its properties</p></div>`;
    return;
  }
  panel.innerHTML=buildStylePanel(el);
  bindStyleInputs(el);
}

function buildStylePanel(el){
  const t=el.type;
  let h='';

  h+=`<div class="element-name-display"><span>${el.name||getLayerName(el)}</span><span class="el-name-tag">${t}</span></div>`;

  h+=section('Position & Size',
    numRow('X','x',el.x,'px')+numRow('Y','y',el.y,'px')+
    numRow('W','width',el.width,'px')+numRow('H','height',el.height,'px')
  );

  if(['text','heading','button','badge'].includes(t)){
    h+=section('Content',
      `<div class="style-row"><label class="style-label">Text</label><textarea class="style-textarea" data-prop="content">${el.content||''}</textarea></div>`+
      numRow('Font Size','fontSize',el.fontSize||14,'px')+
      selectRow('Weight','fontWeight',el.fontWeight||'400',[['300','Light'],['400','Regular'],['500','Medium'],['600','Semibold'],['700','Bold']])+
      numRow('Line Height','lineHeight',el.lineHeight||1.5)+
      numRow('Letter Sp.','letterSpacing',el.letterSpacing||0,'px')+
      `<div class="style-row"><label class="style-label">Color</label>${colorWithSwatches('color',el.color||'#1e293b')}</div>`+
      `<div class="style-row"><label class="style-label">Align</label><div class="align-btns">${['left','center','right'].map(a=>`<button class="align-btn${el.textAlign===a?' active':''}" onclick="setAlign('${el.id}','${a}')">${alignSvg(a)}</button>`).join('')}</div></div>`
    );
  }

  if(t==='image'){
    h+=section('Image',
      `<div class="style-row"><label class="style-label">Source</label><button class="topbar-btn" style="flex:1;justify-content:center" onclick="openImgPicker('${el.id}')">Set Image</button></div>`+
      selectRow('Fit','objectFit',el.objectFit||'cover',[['cover','Cover'],['contain','Contain'],['fill','Fill']])
    );
  }

  if(t==='video'){
    const srcLabel=el.videoUrl?(el.videoUrl.startsWith('data:')?'Uploaded file':el.videoUrl.substring(0,34)+'…'):'No source set';
    h+=section('Video',
      `<div class="style-row"><label class="style-label">Source</label><button class="topbar-btn" style="flex:1;justify-content:center" onclick="openVidPicker('${el.id}')">Set Video</button></div>`+
      `<div class="vid-src-label">${srcLabel}</div>`
    );
  }

  if(t==='input'){
    h+=section('Input',
      `<div class="style-row"><label class="style-label">Placeholder</label><input class="style-input" data-prop="placeholder" value="${el.placeholder||''}"></div>`+
      numRow('Font Size','fontSize',el.fontSize||14,'px')+
      `<div class="style-row"><label class="style-label">Text Color</label>${colorWithSwatches('color',el.color||'#1e293b')}</div>`+
      `<div class="style-row"><label class="style-label">Border Color</label>${colorWithSwatches('borderColor',el.borderColor||'#e2e8f0')}</div>`+
      numRow('Border W','borderWidth',el.borderWidth||1,'px')
    );
  }

  if(t==='icon'){
    h+=section('Icon',
      `<div class="style-row"><label class="style-label">Icon</label></div>`+
      `<div class="icon-grid">${Object.keys(ICON_SET).map(k=>`<button class="icon-option${el.iconKey===k?' active':''}" data-iconkey="${k}" onclick="setIconKey('${el.id}','${k}')"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" style="color:currentColor">${ICON_SET[k]}</svg></button>`).join('')}</div>`+
      `<div class="style-row" style="margin-top:8px"><label class="style-label">Icon Color</label>${colorWithSwatches('color',el.color||'#5b7cf6')}</div>`
    );
  }

  if(t==='container'||t==='section'){
    h+=section('Border',
      `<div class="style-row"><label class="style-label">Border Color</label>${colorWithSwatches('borderColor',el.borderColor||'#e2e8f0')}</div>`+
      numRow('Border W','borderWidth',el.borderWidth||0,'px')
    );
  }

  h+=section('Appearance',
    `<div class="style-row"><label class="style-label">Background</label>${colorWithSwatches('bgColor',el.bgColor||'transparent')}</div>`+
    numRow('Radius','borderRadius',el.borderRadius||0,'px')+
    numRow('Padding','padding',el.padding||0,'px')+
    rangeRow('Opacity','opacity',el.opacity||100,'%',0,100)
  );

  h+=section('Shadow',
    `<div class="shadow-toggle"><span class="style-label">Enable</span><button class="toggle-switch${el.shadow?' on':''}" id="shadow-toggle" onclick="toggleShadow('${el.id}')"></button></div>`+
    `<div id="shadow-fields" style="${el.shadow?'':'opacity:0.4;pointer-events:none'}">`+
    numRow('X','shadowX',el.shadowX||0,'px')+
    numRow('Y','shadowY',el.shadowY||4,'px')+
    numRow('Blur','shadowBlur',el.shadowBlur||12,'px')+
    numRow('Spread','shadowSpread',el.shadowSpread||0,'px')+
    `<div class="style-row"><label class="style-label">Color</label>${colorWithSwatches('shadowColor',el.shadowColor||'#00000033')}</div>`+
    `</div>`
  );

  return h;
}

function section(title,content){
  return `<div class="style-section"><div class="style-section-title">${title}</div>${content}</div><div class="style-divider"></div>`;
}
function numRow(label,prop,val,unit=''){
  return `<div class="style-row"><label class="style-label">${label}</label><input class="style-input" type="number" data-prop="${prop}" value="${val}" style="width:64px">${unit?`<span style="font-size:10px;color:var(--text3);margin-left:2px">${unit}</span>`:''}</div>`;
}
function selectRow(label,prop,val,opts){
  return `<div class="style-row"><label class="style-label">${label}</label><select class="style-select" data-prop="${prop}">${opts.map(([v,l])=>`<option value="${v}"${val===v?' selected':''}>${l}</option>`).join('')}</select></div>`;
}
function rangeRow(label,prop,val,unit,min=0,max=100){
  return `<div class="style-row"><label class="style-label">${label}</label><input class="style-input" type="range" data-prop="${prop}" value="${val}" min="${min}" max="${max}" style="width:80px"><span class="range-val" id="rv-${prop}">${val}${unit}</span></div>`;
}
function colorWithSwatches(prop,val){
  const preview=val==='transparent'?'background:repeating-conic-gradient(#aaa 0% 25%,#fff 0% 50%) 0/10px 10px':'background:'+val;
  return `<div class="with-swatch"><div class="color-preview" style="${preview}" onclick="this.nextElementSibling.click()" title="${val}"></div><input class="style-input" type="color" data-prop="${prop}" value="${val==='transparent'?'#ffffff':val}" style="width:28px;height:28px;padding:2px;opacity:0;position:absolute;pointer-events:none"></div>`;
}
function alignSvg(a){
  if(a==='left')return`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h15"/></svg>`;
  if(a==='center')return`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M4 18h16"/></svg>`;
  return`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M9 12h12M6 18h15"/></svg>`;
}

function setAlign(id,align){
  const el=state.elements.find(e=>e.id===id);if(!el)return;
  el.textAlign=align;renderElement(el);renderStylePanel();
}

function setIconKey(id,key){
  const el=state.elements.find(e=>e.id===id);if(!el)return;
  el.iconKey=key;saveHistory();renderElement(el);renderStylePanel();
}

function toggleShadow(id){
  const el=state.elements.find(e=>e.id===id);if(!el)return;
  el.shadow=!el.shadow;saveHistory();renderElement(el);renderStylePanel();
}

function bindStyleInputs(el){
  const panel=document.getElementById('style-panel');
  panel.querySelectorAll('[data-prop]').forEach(input=>{
    const prop=input.dataset.prop;
    const update=()=>{
      let val=input.type==='number'?parseFloat(input.value)||0:input.value;
      if(input.type==='range')val=parseFloat(input.value);
      el[prop]=val;
      state.stickyDefaults[el.type]=state.stickyDefaults[el.type]||{};
      state.stickyDefaults[el.type][prop]=val;
      if(input.type==='color'){
        const preview=input.previousElementSibling;
        if(preview&&preview.classList.contains('color-preview'))preview.style.background=val;
      }
      if(input.type==='range'){
        const rv=document.getElementById('rv-'+prop);
        if(rv){const unit=rv.textContent.replace(/[\d.-]/g,'');rv.textContent=val+unit}
      }
      renderElement(el);
      updatePosInputs(el);
    };
    input.addEventListener('input',update);
    if(input.tagName==='SELECT')input.addEventListener('change',update);
    input.addEventListener('change',()=>saveHistory());
    if(input.type==='color'){
      const preview=input.closest('.with-swatch')?.querySelector('.color-preview');
      if(preview){preview.onclick=()=>{input.style.pointerEvents='auto';input.click();input.style.pointerEvents='none'}}
    }
  });
}

function updateStylePanel(){
  const el=state.elements.find(e=>e.id===state.selectedId);
  if(!el)return;
  const ta=document.querySelector('[data-prop="content"]');
  if(ta)ta.value=el.content||'';
}

function openImgPicker(id){
  state.imgPickerTargetId=id;state.imgPickerDataUrl=null;
  document.getElementById('img-url-input').value='';
  const up=document.getElementById('img-url-preview');
  up.innerHTML='<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>Enter URL above to preview</span>';
  document.getElementById('img-panel-url').style.display='block';
  document.getElementById('img-panel-upload').style.display='none';
  document.getElementById('img-tab-url').classList.add('active');
  document.getElementById('img-tab-upload').classList.remove('active');
  document.getElementById('img-picker-modal').classList.add('open');

  const urlInput=document.getElementById('img-url-input');
  urlInput.oninput=debounce(()=>{
    const v=urlInput.value.trim();
    if(!v)return;
    const preview=document.getElementById('img-url-preview');
    preview.innerHTML='';
    const img=document.createElement('img');
    img.onload=()=>{state.imgPickerDataUrl=v;preview.innerHTML='';preview.appendChild(img)};
    img.onerror=()=>{preview.innerHTML='<span style="color:#f87171">Invalid image URL</span>'};
    img.src=v;img.style.cssText='width:100%;height:100%;object-fit:contain';
  },400);
}

function switchImgTab(tab,btn){
  document.querySelectorAll('#img-picker-modal .code-tab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  document.getElementById('img-panel-url').style.display=tab==='url'?'block':'none';
  document.getElementById('img-panel-upload').style.display=tab==='upload'?'block':'none';
}

function handleFileUpload(e){
  const file=e.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    state.imgPickerDataUrl=ev.target.result;
    const previewArea=document.getElementById('img-upload-preview');
    previewArea.style.display='flex';
    previewArea.innerHTML='';
    const img=document.createElement('img');
    img.src=ev.target.result;
    img.style.cssText='max-width:100%;max-height:100%;object-fit:contain';
    previewArea.appendChild(img);
    document.getElementById('upload-drop').style.display='none';
  };
  reader.readAsDataURL(file);
}

function confirmImage(){
  const el=state.elements.find(e=>e.id===state.imgPickerTargetId);
  if(!el)return;
  const urlVal=document.getElementById('img-url-input').value.trim();
  const src=state.imgPickerDataUrl||urlVal;
  if(!src){showToast('No image selected');return}
  el.src=src;
  saveHistory();
  renderElement(el);
  closeImgPicker();
}

function closeImgPicker(){
  document.getElementById('img-picker-modal').classList.remove('open');
  document.getElementById('upload-drop').style.display='flex';
  document.getElementById('img-upload-preview').style.display='none';
}

const vidUploadDrop=document.getElementById('vid-upload-drop');
if(vidUploadDrop){
  vidUploadDrop.ondragover=(e)=>{e.preventDefault();vidUploadDrop.style.borderColor='var(--accent)'};
  vidUploadDrop.ondragleave=()=>{vidUploadDrop.style.borderColor=''};
  vidUploadDrop.ondrop=(e)=>{
    e.preventDefault();vidUploadDrop.style.borderColor='';
    const file=e.dataTransfer.files[0];
    if(file&&file.type.startsWith('video/')){
      const inp=document.getElementById('vid-file-input');
      const dt=new DataTransfer();dt.items.add(file);inp.files=dt.files;
      handleVidFileUpload({target:inp});
    }
  };
}
const uploadDrop=document.getElementById('upload-drop');
if(uploadDrop){
  uploadDrop.ondragover=(e)=>{e.preventDefault();uploadDrop.style.borderColor='var(--accent)'};
  uploadDrop.ondragleave=()=>{uploadDrop.style.borderColor=''};
  uploadDrop.ondrop=(e)=>{
    e.preventDefault();uploadDrop.style.borderColor='';
    const file=e.dataTransfer.files[0];
    if(file&&file.type.startsWith('image/')){
      const inp=document.getElementById('file-input');
      const dt=new DataTransfer();dt.items.add(file);inp.files=dt.files;
      handleFileUpload({target:inp});
    }
  };
}

function renderRulers(){
  const rx=document.getElementById('ruler-x');
  const ry=document.getElementById('ruler-y');
  if(!rx||!ry)return;
  const step=50;const w=state.canvasW;const h=state.canvasH;
  rx.innerHTML='';ry.innerHTML='';
  for(let i=0;i<=w;i+=step){
    const tick=document.createElement('div');
    tick.className='ruler-tick';
    tick.style.cssText=`left:${i}px;width:1px;height:${i%100===0?8:4}px`;
    rx.appendChild(tick);
    if(i%100===0&&i>0){
      const lbl=document.createElement('div');
      lbl.className='ruler-label';
      lbl.style.left=(i+2)+'px';
      lbl.textContent=i;
      rx.appendChild(lbl);
    }
  }
  for(let i=0;i<=h;i+=step){
    const tick=document.createElement('div');
    tick.className='ruler-tick';
    tick.style.cssText=`top:${i}px;height:1px;width:${i%100===0?8:4}px`;
    ry.appendChild(tick);
    if(i%100===0&&i>0){
      const lbl=document.createElement('div');
      lbl.className='ruler-label';
      lbl.style.cssText=`top:${i+2}px;left:1px;transform:rotate(-90deg);transform-origin:left top`;
      lbl.textContent=i;
      ry.appendChild(lbl);
    }
  }
}

function openExportModal(){
  generateExportCode(state.codeTab||'html');
  document.getElementById('export-modal').classList.add('open');
}
function closeExportModal(){document.getElementById('export-modal').classList.remove('open')}

function switchCodeTab(tab,btn){
  state.codeTab=tab;
  document.querySelectorAll('#export-modal .code-tab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  generateExportCode(tab);
}

function generateExportCode(tab){
  const pre=document.getElementById('export-code');
  if(tab==='html')pre.textContent=generateHTMLSnippet();
  else pre.textContent=generateFullPage();
}

function generateHTMLSnippet(){
  if(state.elements.length===0)return'';
  let h=`<div style="position:relative;width:${state.canvasW}px;min-height:${state.canvasH}px;">\n`;
  state.elements.forEach(el=>{h+='  '+buildExportEl(el)+'\n'});
  h+='</div>';
  return h;
}

function buildExportEl(el){
  const sh=el.shadow?`box-shadow:${el.shadowX||0}px ${el.shadowY||4}px ${el.shadowBlur||12}px ${el.shadowSpread||0}px ${el.shadowColor||'rgba(0,0,0,0.2)'};`:'';
  let s=`position:absolute;left:${el.x}px;top:${el.y}px;width:${el.width}px;height:${el.height}px;z-index:${el.zIndex||1};opacity:${(el.opacity||100)/100};`;
  if(el.type==='text'||el.type==='heading'){
    s+=`font-size:${el.fontSize||14}px;font-weight:${el.fontWeight||400};color:${el.color||'#1e293b'};background:${el.bgColor||'transparent'};border-radius:${el.borderRadius||0}px;padding:${el.padding||0}px;text-align:${el.textAlign||'left'};line-height:${el.lineHeight||1.5};letter-spacing:${el.letterSpacing||0}px;`;
    return`<${el.type==='heading'?'h2':'p'} style="${s}">${escHtml(el.content||'')}</${el.type==='heading'?'h2':'p'}>`;
  }
  if(el.type==='button'){
    s+=`background:${el.bgColor||'#5b7cf6'};border-radius:${el.borderRadius||8}px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;${sh}`;
    return`<button style="${s}"><span style="font-size:${el.fontSize||14}px;font-weight:${el.fontWeight||600};color:${el.color||'#fff'};padding:0 ${el.padding||12}px;">${escHtml(el.content||'Button')}</span></button>`;
  }
  if(el.type==='image'){
    s+=`border-radius:${el.borderRadius||8}px;overflow:hidden;${sh}`;
    return el.src?`<div style="${s}"><img src="${escHtml(el.src)}" style="width:100%;height:100%;object-fit:${el.objectFit||'cover'};display:block;" alt=""></div>`:`<div style="${s};background:#e2e8f0;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:13px;">No image set</div>`;
  }
  if(el.type==='container'){
    s+=`background:${el.bgColor||'#f8fafc'};border-radius:${el.borderRadius||12}px;border:${el.borderWidth||1}px solid ${el.borderColor||'#e2e8f0'};padding:${el.padding||20}px;${sh}`;
    return`<div style="${s}"></div>`;
  }
  if(el.type==='divider'){
    s+=`background:${el.bgColor||'#e2e8f0'};border-radius:99px;border:none;`;
    return`<hr style="${s}">`;
  }
  if(el.type==='input'){
    s+=`border-radius:${el.borderRadius||8}px;border:${el.borderWidth||1}px solid ${el.borderColor||'#e2e8f0'};background:${el.bgColor||'#fff'};padding:0 ${el.padding||10}px;font-size:${el.fontSize||14}px;color:${el.color||'#1e293b'};outline:none;`;
    return`<input type="text" placeholder="${escHtml(el.placeholder||'')}" style="${s}">`;
  }
  if(el.type==='video'){
    s+=`border-radius:${el.borderRadius||8}px;overflow:hidden;${sh}`;
    if(!el.videoUrl)return`<div style="${s}background:#000;display:flex;align-items:center;justify-content:center;color:#555;font-size:13px;">No video set</div>`;
    if(el.videoUrl.startsWith('data:')||el.videoUrl.match(/\.mp4|webm|ogg/i)){
      return`<video src="${escHtml(el.videoUrl)}" style="${s}width:100%;height:100%;object-fit:cover;" controls></video>`;
    }
    const ytId=extractYoutubeId(el.videoUrl);
    return ytId?`<iframe src="https://www.youtube.com/embed/${ytId}" style="${s}width:100%;height:100%;border:none;" allowfullscreen></iframe>`:`<div style="${s}background:#000;display:flex;align-items:center;justify-content:center;color:#555;font-size:13px;">Video embed</div>`;
  }
  if(el.type==='icon'){
    s+=`background:${el.bgColor||'transparent'};border-radius:${el.borderRadius||0}px;padding:${el.padding||4}px;display:flex;align-items:center;justify-content:center;color:${el.color||'#5b7cf6'};`;
    return`<div style="${s}"><svg viewBox="0 0 24 24" style="width:100%;height:100%">${ICON_SET[el.iconKey||'star']||''}</svg></div>`;
  }
  if(el.type==='badge'){
    s+=`background:${el.bgColor||'rgba(91,124,246,0.12)'};border-radius:${el.borderRadius||99}px;display:inline-flex;align-items:center;justify-content:center;padding:0 ${el.padding||10}px;`;
    return`<span style="${s}font-size:${el.fontSize||12}px;font-weight:${el.fontWeight||600};color:${el.color||'#5b7cf6'};">${escHtml(el.content||'Badge')}</span>`;
  }
  if(el.type==='section'){
    s+=`background:${el.bgColor||'#f8fafc'};border-radius:${el.borderRadius||0}px;padding:${el.padding||40}px;${sh}`;
    return`<section style="${s}"></section>`;
  }
  if(el.type==='spacer'){
    return`<div style="${s}"></div>`;
  }
  return`<div style="${s}"></div>`;
}

function generateFullPage(){
  return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SamtrediaWebBuilder</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#ffffff;min-height:100vh;}
</style>
</head>
<body>
${generateHTMLSnippet()}
</body>
</html>`;
}

function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function copyExportCode(){
  const code=document.getElementById('export-code').textContent;
  navigator.clipboard.writeText(code).then(()=>showToast('Copied!')).catch(()=>{const ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();showToast('Copied!')});
}

function copyElementHtml(){
  const el=state.elements.find(e=>e.id===state.selectedId);
  if(!el){showToast('Select an element first');return}
  const code=buildExportEl(el);
  navigator.clipboard.writeText(code).then(()=>showToast('Element HTML copied!')).catch(()=>{showToast('Copy failed')});
}

function openPreview(){
  const html=generateFullPage();
  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  window.open(url,'_blank');
  setTimeout(()=>URL.revokeObjectURL(url),5000);
}

function openShortcutsModal(){document.getElementById('shortcuts-modal').classList.add('open')}
function closeShortcutsModal(){document.getElementById('shortcuts-modal').classList.remove('open')}

function openVidPicker(id){
  state.vidPickerTargetId=id;
  state.vidPickerDataUrl=null;
  document.getElementById('vid-file-input').value='';
  document.getElementById('vid-url-input').value='';
  document.getElementById('vid-upload-drop').style.display='flex';
  document.getElementById('vid-upload-preview').style.display='none';
  const urlPreview=document.getElementById('vid-url-preview');
  urlPreview.innerHTML='<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/></svg><span>Enter a YouTube URL above to preview</span>';
  switchVidTab('upload', document.getElementById('vid-tab-upload'));
  document.getElementById('vid-picker-modal').classList.add('open');
}

function closeVidPicker(){
  document.getElementById('vid-picker-modal').classList.remove('open');
  const player=document.getElementById('vid-upload-player');
  if(player){player.pause();player.src=''}
}

function switchVidTab(tab,btn){
  document.querySelectorAll('#vid-picker-modal .code-tab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  document.getElementById('vid-panel-upload').style.display=tab==='upload'?'block':'none';
  document.getElementById('vid-panel-url').style.display=tab==='url'?'block':'none';
}

function handleVidFileUpload(e){
  const file=e.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    state.vidPickerDataUrl=ev.target.result;
    document.getElementById('vid-upload-drop').style.display='none';
    const preview=document.getElementById('vid-upload-preview');
    preview.style.display='block';
    const player=document.getElementById('vid-upload-player');
    player.src=ev.target.result;
  };
  reader.readAsDataURL(file);
}

function previewYouTube(){
  const url=document.getElementById('vid-url-input').value.trim();
  if(!url){showToast('Enter a YouTube URL first');return}
  const ytId=extractYoutubeId(url);
  const preview=document.getElementById('vid-url-preview');
  if(ytId){
    state.vidPickerDataUrl=url;
    preview.innerHTML=`<iframe src="https://www.youtube.com/embed/${ytId}" style="width:100%;height:100%;border:none;border-radius:6px;" allowfullscreen></iframe>`;
  } else {
    preview.innerHTML='<span style="color:#f87171">Not a valid YouTube URL</span>';
  }
}

function confirmVideo(){
  const el=state.elements.find(e=>e.id===state.vidPickerTargetId);
  if(!el)return;
  const urlVal=document.getElementById('vid-url-input').value.trim();
  const src=state.vidPickerDataUrl||urlVal;
  if(!src){showToast('No video selected');return}
  el.videoUrl=src;
  saveHistory();
  renderElement(el);
  renderStylePanel();
  closeVidPicker();
  showToast('Video applied!');
}

document.getElementById('export-modal').addEventListener('click',e=>{if(e.target===document.getElementById('export-modal'))closeExportModal()});
document.getElementById('shortcuts-modal').addEventListener('click',e=>{if(e.target===document.getElementById('shortcuts-modal'))closeShortcutsModal()});
document.getElementById('img-picker-modal').addEventListener('click',e=>{if(e.target===document.getElementById('img-picker-modal'))closeImgPicker()});
document.getElementById('vid-picker-modal').addEventListener('click',e=>{if(e.target===document.getElementById('vid-picker-modal'))closeVidPicker()});

document.addEventListener('dragstart',e=>{
  const card=e.target.closest('.element-card');
  if(card)e.dataTransfer.setData('text/plain',card.dataset.type);
});

document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.isContentEditable)return;
  if(e.key==='?'){openShortcutsModal();return}
  if(e.key==='Escape'){deselectAll();hideContextMenu();return}
  if((e.metaKey||e.ctrlKey)&&e.key==='z'&&!e.shiftKey){e.preventDefault();undoAction();return}
  if((e.metaKey||e.ctrlKey)&&(e.key==='y'||(e.key==='z'&&e.shiftKey))){e.preventDefault();redoAction();return}
  if((e.metaKey||e.ctrlKey)&&e.key==='d'){e.preventDefault();if(state.selectedId)duplicateElement(state.selectedId);return}
  if((e.metaKey||e.ctrlKey)&&e.key==='c'){if(state.selectedId){state.clipboard=JSON.parse(JSON.stringify(state.elements.find(e=>e.id===state.selectedId)));showToast('Copied')}return}
  if((e.metaKey||e.ctrlKey)&&e.key==='v'){if(state.clipboard){const copy=JSON.parse(JSON.stringify(state.clipboard));copy.id=genId();copy.x+=16;copy.y+=16;saveHistory();state.elements.push(copy);state.selectedId=copy.id;state.selectedIds=[copy.id];renderCanvas();renderLayers();renderStylePanel();showToast('Pasted')}return}
  if(e.key==='Backspace'||e.key==='Delete'){if(state.selectedId){deleteElement(null);return}}
  if(e.key===' '){e.preventDefault();state.spaceDown=true;document.getElementById('canvas-area').style.cursor='grab';return}
  if(state.selectedId){
    const el=state.elements.find(e2=>e2.id===state.selectedId);
    if(!el||el.locked)return;
    const step=e.shiftKey?GRID:1;
    if(e.key==='ArrowLeft'){e.preventDefault();el.x-=step}
    else if(e.key==='ArrowRight'){e.preventDefault();el.x+=step}
    else if(e.key==='ArrowUp'){e.preventDefault();el.y-=step}
    else if(e.key==='ArrowDown'){e.preventDefault();el.y+=step}
    else return;
    saveHistory();
    const domEl=document.getElementById(el.id);
    if(domEl){domEl.style.left=el.x+'px';domEl.style.top=el.y+'px'}
    updatePosInputs(el);
  }
});

document.addEventListener('keyup',e=>{
  if(e.key===' '){state.spaceDown=false;document.getElementById('canvas-area').style.cursor='';state.isPanning=false}
});

document.addEventListener('wheel',e=>{
  if(e.ctrlKey||e.metaKey){
    e.preventDefault();
    adjustZoom(e.deltaY<0?0.1:-0.1);
  }
},{passive:false});

function autoSave(){
  try{localStorage.setItem('samtrediawebbuilder_state',JSON.stringify({elements:state.elements,canvasW:state.canvasW,canvasH:state.canvasH,idCounter:state.idCounter}));}catch(err){}
}

function loadSaved(){
  try{
    const saved=localStorage.getItem('samtrediawebbuilder_state');
    if(!saved)return;
    const data=JSON.parse(saved);
    if(data.elements&&data.elements.length>0){
      state.elements=data.elements;
      state.canvasW=data.canvasW||1920;
      state.canvasH=data.canvasH||1080;
      state.idCounter=data.idCounter||0;
      renderCanvas();renderLayers();renderStylePanel();
      const canvas=document.getElementById('canvas');
      canvas.style.width=state.canvasW+'px';
      canvas.style.height=state.canvasH+'px';
      showToast('Restored '+data.elements.length+' element'+(data.elements.length===1?'':'s')+' from autosave');
    }
  }catch(err){}
}

function debounce(fn,ms){let t;return(...args)=>{clearTimeout(t);t=setTimeout(()=>fn(...args),ms)}}

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),2200);
}

const canvas=document.getElementById('canvas');
canvas.style.width=state.canvasW+'px';
canvas.style.height=state.canvasH+'px';
renderCanvas();renderLayers();renderStylePanel();renderRulers();
loadSaved();
loadCanvasTheme();
setInterval(autoSave,30000);
setTimeout(fitCanvasToView,0);

window.addEventListener('load',()=>{
  setTimeout(fitCanvasToView,100);
});

function toggleMobileSidebar(side) {
  const left = document.getElementById('left-sidebar');
  const right = document.getElementById('right-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (side === 'left') {
    const isOpen = left.classList.contains('mobile-open');
    left.classList.toggle('mobile-open', !isOpen);
    right.classList.remove('mobile-open');
    overlay.classList.toggle('active', !isOpen);
  } else {
    const isOpen = right.classList.contains('mobile-open');
    right.classList.toggle('mobile-open', !isOpen);
    left.classList.remove('mobile-open');
    overlay.classList.toggle('active', !isOpen);
  }
}

function closeAllMobileSidebars() {
  document.getElementById('left-sidebar').classList.remove('mobile-open');
  document.getElementById('right-sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}
