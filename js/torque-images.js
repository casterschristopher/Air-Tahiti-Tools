/* Air Tahiti Tools — extracted torque schematics V3 */
(function(){
  const apply=()=>{
    document.querySelectorAll('.setup-card').forEach(card=>{
      const n=card.dataset.setup;if(!n)return;
      const old=card.querySelector('svg');
      const img=card.querySelector('.extracted-torque-schematic');
      if(old){
        const el=document.createElement('img');
        el.src=`../assets/torque/setup${n}.webp?v=3`;
        el.alt=`Schéma du montage ${n}`;
        el.className='extracted-torque-schematic';
        old.replaceWith(el);
      }else if(img){
        img.src=`../assets/torque/setup${n}.webp?v=3`;
      }
    });
  };
  const style=document.createElement('style');
  style.textContent=`
    .setup-grid{align-items:start!important}
    .setup-card{height:auto!important;min-height:0!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:flex-start!important}
    .setup-card .extracted-torque-schematic{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;max-height:none!important;object-fit:contain!important;margin:0!important;padding:0!important}
    .setup-card .setup-name,.setup-card .setup-callout,.setup-card .setup-formula,.setup-card .setup-note{display:none!important}
    @media(max-width:560px){
      .setup-grid{grid-template-columns:1fr!important;gap:12px!important}
      .setup-card .extracted-torque-schematic{width:100%!important}
    }
  `;
  document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
