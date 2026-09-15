/* Air Tahiti Tools — Calculators V1 */
(function(){
  const display=document.getElementById('display');
  if(!display)return;
  let current='0', stored=null, operator=null, resetNext=false;
  const render=()=>display.textContent=current;
  const clean=n=>{const v=Number(n);return Number.isFinite(v)?String(Math.round(v*1e12)/1e12):'0'};
  function input(n){if(resetNext){current='0';resetNext=false}if(n==='.'&&current.includes('.'))return;current=current==='0'&&n!=='.'?n:current+n;render()}
  function calc(){if(stored===null||operator===null)return;const a=Number(stored),b=Number(current);let r=0;if(operator==='+')r=a+b;if(operator==='−')r=a-b;if(operator==='×')r=a*b;if(operator==='÷')r=b===0?NaN:a/b;current=Number.isFinite(r)?clean(r):'Erreur';stored=null;operator=null;resetNext=true;render()}
  function setOp(op){if(current==='Erreur')return;if(stored!==null&&!resetNext)calc();stored=Number(current);operator=op;resetNext=true}
  function percent(){if(current==='Erreur')return;current=clean(Number(current)/100);render()}
  function clear(){current='0';stored=null;operator=null;resetNext=false;render()}
  document.querySelectorAll('[data-num]').forEach(b=>b.addEventListener('click',()=>input(b.dataset.num)));
  document.querySelectorAll('[data-op]').forEach(b=>b.addEventListener('click',()=>setOp(b.dataset.op)));
  document.querySelector('[data-action="equals"]').addEventListener('click',calc);
  document.querySelector('[data-action="clear"]').addEventListener('click',clear);
  document.querySelector('[data-action="percent"]').addEventListener('click',percent);
  document.querySelector('[data-action="back"]').addEventListener('click',()=>{if(resetNext||current==='Erreur'){clear();return}current=current.length>1?current.slice(0,-1):'0';render()});
  const factors={'mm-in':1/25.4,'in-mm':25.4,'kg-lb':2.2046226218,'lb-kg':1/2.2046226218};
  const labels={'mm-in':'mm → in','in-mm':'in → mm','kg-lb':'kg → lb','lb-kg':'lb → kg'};
  document.querySelectorAll('[data-conv]').forEach(b=>b.addEventListener('click',()=>{
    const key=b.dataset.conv;const raw=prompt('Valeur à convertir :');if(raw===null)return;const n=Number(String(raw).replace(',','.'));const out=document.getElementById('quickResult');
    if(!Number.isFinite(n)){out.textContent='Valeur invalide.';return}out.textContent=`${n} ${labels[key].split(' → ')[0]} = ${clean(n*factors[key])} ${labels[key].split(' → ')[1]}`;
  }));
  document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;const k=e.key;if(/[0-9.]/.test(k))input(k);else if(['+','-','*','/'].includes(k))setOp(k==='-'?'−':k==='*'?'×':k==='/'?'÷':k);else if(k==='Enter'||k==='=')calc();else if(k==='Escape')clear();else if(k==='Backspace'){if(current.length>1)current=current.slice(0,-1);else current='0';render()}});
  render();
})();