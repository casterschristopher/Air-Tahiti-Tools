/* Air Tahiti Tools — Torque input layout fix V1 */
(function(){
  function apply(){
    const real=document.getElementById('realTorque');
    if(!real)return;
    const group=real.closest('.calc-grid');
    const wrap=real.closest('.input-with-unit');
    if(group)group.classList.add('torque-main-calc');
    if(wrap)wrap.classList.add('torque-main-input');
    const dims=document.getElementById('dimensions');
    if(dims)dims.classList.add('torque-dimensions');
    let style=document.getElementById('torque-input-fix-style');
    if(!style){
      style=document.createElement('style');
      style.id='torque-input-fix-style';
      style.textContent=`
        .torque-main-calc{display:block!important;width:100%!important}
        .torque-main-calc>.input-group{width:100%!important;max-width:none!important}
        .torque-main-input{display:grid!important;grid-template-columns:minmax(0,1fr) 96px!important;width:100%!important;min-width:0!important;gap:0!important}
        .torque-main-input #realTorque{display:block!important;width:100%!important;min-width:0!important;height:54px!important;padding:0 16px!important;border-radius:12px 0 0 12px!important;box-sizing:border-box!important;font-size:1.15rem!important}
        .torque-main-input #torqueUnit{display:block!important;width:100%!important;min-width:0!important;height:54px!important;margin:0!important;padding:0 8px!important;border-radius:0 12px 12px 0!important;box-sizing:border-box!important}
        .torque-dimensions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;margin-top:14px!important;width:100%!important}
        .torque-dimensions .input-group{min-width:0!important}
        @media(max-width:560px){.torque-dimensions{grid-template-columns:1fr!important}.torque-main-input{grid-template-columns:minmax(0,1fr) 86px!important}}
      `;
      document.head.appendChild(style);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  setTimeout(apply,300);
  setTimeout(apply,1000);
})();
