/* Air Tahiti Tools — Torque input + LIGHT theme fix V2 */
(function(){
  function apply(){
    const real=document.getElementById('realTorque');
    if(real){
      const group=real.closest('.calc-grid');
      const wrap=real.closest('.input-with-unit');
      if(group)group.classList.add('torque-main-calc');
      if(wrap)wrap.classList.add('torque-main-input');
    }
    const dims=document.getElementById('dimensions');
    if(dims)dims.classList.add('torque-dimensions');

    let style=document.getElementById('torque-input-fix-style');
    if(!style){
      style=document.createElement('style');
      style.id='torque-input-fix-style';
      document.head.appendChild(style);
    }
    style.textContent=`
      /* ---------- CALCULATOR LAYOUT ---------- */
      .torque-main-calc{display:block!important;width:100%!important}
      .torque-main-calc>.input-group{width:100%!important;max-width:none!important}
      .torque-main-input{display:grid!important;grid-template-columns:minmax(0,1fr) 96px!important;width:100%!important;min-width:0!important;gap:0!important}
      .torque-main-input #realTorque{display:block!important;width:100%!important;min-width:0!important;height:54px!important;padding:0 16px!important;border-radius:12px 0 0 12px!important;box-sizing:border-box!important;font-size:1.15rem!important}
      .torque-main-input #torqueUnit{display:block!important;width:100%!important;min-width:0!important;height:54px!important;margin:0!important;padding:0 8px!important;border-radius:0 12px 12px 0!important;box-sizing:border-box!important}
      .torque-dimensions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;margin-top:14px!important;width:100%!important}
      .torque-dimensions .input-group{min-width:0!important}

      /* ---------- LIGHT MODE: WHITE CONTROLS + BLACK TEXT ---------- */
      body.theme-light .torque-card,
      body:not(.theme-dark) .torque-card{color:#0f172a!important}
      body.theme-light .card-title,
      body:not(.theme-dark) .card-title{color:#0f172a!important}
      body.theme-light .card-subtitle,
      body:not(.theme-dark) .card-subtitle{color:#334155!important}
      body.theme-light .input-group label,
      body:not(.theme-dark) .input-group label{color:#0f172a!important;font-weight:700!important}
      body.theme-light .input-group input,
      body.theme-light .input-group select,
      body:not(.theme-dark) .input-group input,
      body:not(.theme-dark) .input-group select{background:#fff!important;color:#0f172a!important;border:2px solid #cbd5e1!important;-webkit-text-fill-color:#0f172a!important}
      body.theme-light .input-group input::placeholder,
      body:not(.theme-dark) .input-group input::placeholder{color:#64748b!important;opacity:1!important;-webkit-text-fill-color:#64748b!important}
      body.theme-light .input-unit,
      body:not(.theme-dark) .input-unit{background:#fff!important;color:#0f172a!important;border:2px solid #cbd5e1!important;-webkit-text-fill-color:#0f172a!important}
      body.theme-light .result-card,
      body:not(.theme-dark) .result-card{background:#fff!important;border:1px solid #d7e0e8!important}
      body.theme-light .result-label,
      body:not(.theme-dark) .result-label{color:#0f172a!important}
      body.theme-light .result-value,
      body:not(.theme-dark) .result-value{color:#0f172a!important}
      body.theme-light .result-unit,
      body:not(.theme-dark) .result-unit{color:#334155!important}
      body.theme-light .calc-title,
      body:not(.theme-dark) .calc-title{color:#0f172a!important}
      body.theme-light .dimension-help,
      body:not(.theme-dark) .dimension-help{color:#334155!important}
      body.theme-light .formula-title,
      body:not(.theme-dark) .formula-title{color:#334155!important}
      body.theme-light .selection-pill,
      body:not(.theme-dark) .selection-pill{color:#0f172a!important}
      body.theme-light .setup-name,
      body:not(.theme-dark) .setup-name{color:#0f172a!important}
      body.theme-light .setup-formula,
      body:not(.theme-dark) .setup-formula{color:#334155!important}
      body.theme-light .setup-note,
      body:not(.theme-dark) .setup-note{color:#475569!important}
      body.theme-light .warning-box,
      body:not(.theme-dark) .warning-box{color:#0f172a!important}
      body.theme-light .warning-box p,
      body:not(.theme-dark) .warning-box p{color:#0f172a!important}

      /* Keep dark mode untouched. */
      @media(max-width:560px){
        .torque-dimensions{grid-template-columns:1fr!important}
        .torque-main-input{grid-template-columns:minmax(0,1fr) 86px!important}
      }
    `;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  setTimeout(apply,300);
  setTimeout(apply,1000);
})();
