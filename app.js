const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const screens={};$$('.screen').forEach(s=>screens[s.id]=s);let current='intro';
function show(id){if(current===id)return;screens[current]?.classList.remove('active');screens[id].classList.add('active');current=id;window.scrollTo(0,0);if(id==='fall')startWarp();if(id==='galaxy')startGalaxy();if(id==='constellation')buildConstellation();if(id==='finale')startBurst();if(id==='ending')startEndingUniverse()}
function tone(freq=520,dur=.18,type='sine'){try{const A=new (window.AudioContext||window.webkitAudioContext)(),o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,A.currentTime);g.gain.exponentialRampToValueAtTime(.08,A.currentTime+.015);g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+dur);o.connect(g).connect(A.destination);o.start();o.stop(A.currentTime+dur+.02)}catch(e){}}
$$('[data-action]').forEach(b=>b.addEventListener('click',()=>{tone();const a=b.dataset.action;if(a==='enter'){show('fall');setTimeout(()=>show('galaxy'),3100)}if(a==='story')show('story');if(a==='nextStory')nextStory();if(a==='finale')show('finale');if(a==='ending')show('ending');if(a==='replay'){show('intro')}}));
const space=$('#space'),ctx=space.getContext('2d');let stars=[];function resize(){space.width=innerWidth*devicePixelRatio;space.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:180},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:Math.random(),s:Math.random()*1.5+.2,a:Math.random()}))}resize();addEventListener('resize',resize);function spaceLoop(t){ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){s.y+=.035*(1+s.z*2);if(s.y>innerHeight)s.y=0;ctx.globalAlpha=.18+s.a*.5;ctx.beginPath();ctx.arc(s.x,s.y,s.s*s.z+0.2,0,7);ctx.fillStyle='#fff';ctx.fill()}requestAnimationFrame(spaceLoop)}spaceLoop();
let warpRAF;function startWarp(){const c=$('#warp'),x=c.getContext('2d');c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const W=innerWidth,H=innerHeight;const ps=Array.from({length:1000},()=>({a:Math.random()*Math.PI*2,r:Math.random()*Math.max(W,H),z:Math.random()}));const t0=performance.now();function loop(t){if(current!=='fall'){cancelAnimationFrame(warpRAF);return}x.fillStyle='rgba(2,1,6,.2)';x.fillRect(0,0,W,H);const cx=W/2,cy=H/2;for(const p of ps){p.r+=3+p.z*11;p.z=Math.min(1,p.z+.002);if(p.r>Math.max(W,H)*1.2){p.r=1;p.z=0}const px=cx+Math.cos(p.a)*p.r,py=cy+Math.sin(p.a)*p.r*.68;const prevR=p.r-8-p.z*18;const qx=cx+Math.cos(p.a)*prevR,qy=cy+Math.sin(p.a)*prevR*.68;x.strokeStyle=`rgba(255,${120+Math.floor(p.z*100)},${190+Math.floor(p.z*60)},${.08+p.z*.65})`;x.lineWidth=.4+p.z*1.5;x.beginPath();x.moveTo(qx,qy);x.lineTo(px,py);x.stroke()}const prog=Math.min(1,(t-t0)/3000);x.fillStyle=`rgba(255,210,235,${Math.max(0,prog*prog*.9)})`;x.beginPath();x.arc(cx,cy,Math.max(0,260*(1-prog)),0,7);x.fill();warpRAF=requestAnimationFrame(loop)}loop(t0)}
let galRAF;function startGalaxy(){const c=$('#galaxyCanvas'),x=c.getContext('2d');c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const W=innerWidth,H=innerHeight,cx=W*.66,cy=H*.48;const pts=[];for(let i=0;i<4200;i++){const a=Math.random()*Math.PI*2,rr=Math.pow(Math.random(),.65)*Math.min(W,H)*.45;pts.push({a,r:rr,s:Math.random()*1.4+.15,arm:Math.sin(a*3+rr*.015),q:Math.random()})}const heart=[];for(let i=0;i<2300;i++){const t=Math.random()*Math.PI*2,u=Math.random();const X=16*Math.pow(Math.sin(t),3),Y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);heart.push({x:X*9+((Math.random()-.5)*u*2),y:-Y*9+((Math.random()-.5)*u*2),a:Math.random()*.6+.4})}let rot=0;function loop(){if(current!=='galaxy'){cancelAnimationFrame(galRAF);return}x.fillStyle='rgba(2,1,7,.25)';x.fillRect(0,0,W,H);const g=x.createRadialGradient(cx,cy,0,cx,cy,Math.min(W,H)*.55);g.addColorStop(0,'rgba(255,130,193,.16)');g.addColorStop(.3,'rgba(139,68,154,.08)');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(0,0,W,H);rot+=.0017;for(const p of pts){const rr=p.r;const aa=p.a+rot*(1.4-rr/(W*.5));const spread=Math.sin(p.arm*8+rr*.04)*rr*.07;const px=cx+Math.cos(aa)*(rr+spread),py=cy+Math.sin(aa)*(rr+spread)*.43;x.globalAlpha=.1+p.q*.7;x.fillStyle=p.q>.85?'#fff':'#eeb9dd';x.beginPath();x.arc(px,py,p.s,0,7);x.fill()}x.save();x.translate(cx,cy);x.rotate(-.08);for(const h of heart){x.globalAlpha=h.a*.72;x.fillStyle='#ff76b7';x.beginPath();x.arc(h.x,h.y,Math.random()*1.2+.4,0,7);x.fill()}x.restore();x.globalAlpha=1;const glow=x.createRadialGradient(cx,cy,0,cx,cy,150);glow.addColorStop(0,'rgba(255,120,186,.2)');glow.addColorStop(1,'transparent');x.fillStyle=glow;x.beginPath();x.arc(cx,cy,160,0,7);x.fill();galRAF=requestAnimationFrame(loop)}loop()}
const stories=[
['✦','CAPÍTULO 02 · 01','O começo','A gente se conheceu há pouco tempo. E mesmo assim, já dá para perceber que você tem um jeito próprio de ocupar os lugares por onde passa.','fotos/foto1.jpg'],
['☾','CAPÍTULO 02 · 02','Alguns detalhes chamam atenção','Tem coisas que a gente percebe sem procurar: um sorriso, uma expressão, um jeito de falar. O resto vai aparecendo aos poucos.','fotos/foto2.jpg'],
['✧','CAPÍTULO 02 · 03','Sem tentar definir','Nem tudo precisa virar alguma coisa imediatamente. Às vezes, é mais interessante simplesmente deixar o tempo mostrar quem está do outro lado.','fotos/foto3.jpg'],
['∞','CAPÍTULO 02 · 04','Uma pessoa, vários detalhes','Cada foto mostra um momento. E cada momento deixa uma pequena pista sobre a pessoa que existe por trás da imagem.','fotos/foto4.jpg'],
['✦','CAPÍTULO 02 · 05','E ainda tem muito por descobrir','Cinco fotos são pouco para conhecer alguém. Talvez seja justamente essa a graça: ainda existem muitas conversas, histórias e detalhes para descobrir.','fotos/foto5.jpg']
];
let si=0;
function nextStory(){
  if(si===stories.length-1){tone(880,.28,'triangle');setTimeout(()=>show('constellation'),260);return}
  si++;
  const [ic,ch,ti,tx,img]=stories[si];
  const card=$('#storyCard');
  card.style.transform='translateY(12px) scale(.98)';
  card.classList.add('photo-changing');
  setTimeout(()=>{
    $('#storyIcon').textContent=ic;
    $('#storyChapter').textContent=ch;
    $('#storyTitle').textContent=ti;
    $('#storyText').textContent=tx;
    $('#storyPhoto').src=img;
    $('#storyCount').textContent=`${si+1} / ${stories.length}`;
    card.style.transform='none';
    setTimeout(()=>card.classList.remove('photo-changing'),120);
  },180);
  tone(620+si*90,.2)
}
function buildConstellation(){}
let burstRAF;function startBurst(){const c=$('#burstCanvas'),x=c.getContext('2d');c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const W=innerWidth,H=innerHeight,cx=W/2,cy=H/2;const ps=Array.from({length:2600},()=>newBurstParticle(cx,cy,W,H));const t0=performance.now();function loop(t){if(current!=='finale'){cancelAnimationFrame(burstRAF);return}const elapsed=t-t0;x.fillStyle='rgba(3,1,8,.105)';x.fillRect(0,0,W,H);const glow=x.createRadialGradient(cx,cy,0,cx,cy,Math.min(W,H)*.58);glow.addColorStop(0,'rgba(255,255,255,.18)');glow.addColorStop(.08,'rgba(255,147,202,.15)');glow.addColorStop(.38,'rgba(180,70,150,.055)');glow.addColorStop(1,'transparent');x.fillStyle=glow;x.fillRect(0,0,W,H);for(const p of ps){p.age=(elapsed-p.start)/1000;if(p.age<0)continue;p.r+=p.speed*(1+p.age*.035);if(p.r>p.maxR){Object.assign(p,newBurstParticle(cx,cy,W,H,true));p.start=elapsed-200-Math.random()*900}const tw=.45+.55*Math.sin(elapsed*.004+p.twinkle);x.globalAlpha=(.18+p.brightness*.72)*tw;x.fillStyle=p.brightness>.84?'#fff':'#ff8fca';x.beginPath();x.arc(cx+Math.cos(p.angle)*p.r,cy+Math.sin(p.angle)*p.r*.72,p.size*(1+Math.min(p.age,1)*.8),0,7);x.fill()}x.globalAlpha=1;burstRAF=requestAnimationFrame(loop)}loop(t0)}
function newBurstParticle(cx,cy,W,H,recycle=false){const a=Math.random()*Math.PI*2;return{a,r:recycle?Math.random()*16:Math.random()*Math.min(W,H)*.06,speed:1.5+Math.random()*7,maxR:Math.max(W,H)*(.48+Math.random()*.8),size:.25+Math.random()*1.8,brightness:Math.random(),twinkle:Math.random()*20,start:recycle?0:Math.random()*1200}}
let endingRAF;
function startEndingUniverse(){
  const c=$('#endingCanvas'),x=c.getContext('2d',{alpha:true});
  const dpr=Math.min(window.devicePixelRatio||1,1.5);
  c.width=Math.floor(innerWidth*dpr);c.height=Math.floor(innerHeight*dpr);
  x.setTransform(dpr,0,0,dpr,0,0);
  const W=innerWidth,H=innerHeight,cx=W/2,cy=H*.48;
  // Feito para celular: poucos elementos, muita sensação de profundidade.
  const mobile=W<700;
  const count=mobile?620:1050;
  const ps=Array.from({length:count},()=>({
    a:Math.random()*Math.PI*2,r:Math.random()*28,
    s:.55+Math.random()*(mobile?4.2:5.4),
    max:Math.max(W,H)*(.38+Math.random()*1.05),
    size:.35+Math.random()*(mobile?1.35:1.65),
    alpha:.12+Math.random()*.62,
    phase:Math.random()*6.28,
    depth:.35+Math.random()*.9
  }));
  const t0=performance.now();
  function loop(t){
    if(current!=='ending'){cancelAnimationFrame(endingRAF);return}
    const e=(t-t0)/1000;
    x.globalCompositeOperation='source-over';
    x.fillStyle='rgba(3,1,8,.16)';x.fillRect(0,0,W,H);

    // Núcleo suave: pré-renderizado pelo próprio canvas, sem filter/blur por partícula.
    const glow=x.createRadialGradient(cx,cy,0,cx,cy,Math.min(W,H)*.64);
    glow.addColorStop(0,'rgba(255,255,255,.065)');
    glow.addColorStop(.055,'rgba(255,126,190,.085)');
    glow.addColorStop(.22,'rgba(215,59,145,.028)');
    glow.addColorStop(1,'rgba(0,0,0,0)');
    x.fillStyle=glow;x.fillRect(0,0,W,H);

    // Partículas difusas: poucas, maiores e translúcidas.
    x.globalCompositeOperation='lighter';
    for(const p of ps){
      p.r+=p.s*(.72+p.depth*.16);
      if(p.r>p.max){p.r=2+Math.random()*24;p.a=Math.random()*6.28;p.max=Math.max(W,H)*(.4+Math.random()*1.05)}
      const a=p.a+Math.sin(e*.48+p.phase)*.045;
      const px=cx+Math.cos(a)*p.r;
      const py=cy+Math.sin(a)*p.r*.70;
      const tw=.34+.66*(.5+.5*Math.sin(e*2.1+p.phase));
      const alpha=p.alpha*.22*tw;
      x.globalAlpha=alpha;
      x.fillStyle=p.depth>.92?'#fff':'#ff75b9';
      x.beginPath();x.arc(px,py,p.size*(1+p.depth*.35),0,Math.PI*2);x.fill();
      if(p.depth>.8 && p.r>25){
        x.globalAlpha=alpha*.28;x.fillRect(px-p.size*.45,py-p.size*.45,p.size*.9,p.size*.9);
      }
    }

    // Raios nítidos: só uma fração das partículas, mantendo leitura perfeita.
    x.globalCompositeOperation='source-over';
    for(let i=0;i<ps.length;i+=3){
      const p=ps[i],a=p.a+Math.sin(e*.48+p.phase)*.045;
      const px=cx+Math.cos(a)*p.r,py=cy+Math.sin(a)*p.r*.70;
      const tail=5+p.r*.018;
      const tx=cx+Math.cos(a)*Math.max(0,p.r-tail),ty=cy+Math.sin(a)*Math.max(0,p.r-tail)*.70;
      const tw=.28+.5*(.5+.5*Math.sin(e*2.6+p.phase));
      x.globalAlpha=p.alpha*.34*tw;x.strokeStyle=p.depth>.88?'rgba(255,238,248,.9)':'rgba(255,142,195,.72)';x.lineWidth=p.size*.72;
      x.beginPath();x.moveTo(tx,ty);x.lineTo(px,py);x.stroke();
    }
    x.globalAlpha=1;
    endingRAF=requestAnimationFrame(loop);
  }
  x.clearRect(0,0,W,H);loop(t0);
}
