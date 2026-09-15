/* Air Tahiti Tools — extracted torque schematics V1 */
(function(){
  const apply=()=>document.querySelectorAll('.setup-card').forEach(card=>{
    const n=card.dataset.setup;if(!n)return;
    const old=card.querySelector('svg');
    if(old){const img=document.createElement('img');img.src=`../assets/torque/setup${n}.webp?v=1`;img.alt=`Schéma du montage ${n}`;img.className='extracted-torque-schematic';old.replaceWith(img)}
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  const s=document.createElement('style');s.textContent='.setup-card .extracted-torque-schematic{display:block;width:100%;height:auto;margin:0;border-radius:8px}.setup-card{padding:5px!important}.setup-card.selected{outline:3px solid #1687dc;outline-offset:-3px}';document.head.appendChild(s);
})();
