/* Air Tahiti Tools — Alpha Call-Up V1 */
(function(){
  const DATA={
    "ATR 42":[
      {code:"ROLAT",name:"Roll attitude",ata:"34",zone:"Cockpit / attitude",description:"Roll attitude de l’avion. Lecture possible via MCDU dans PARAM ALPHA CALL-UP."},
      {code:"PITAT",name:"Pitch attitude",ata:"34",zone:"Cockpit / attitude",description:"Pitch attitude de l’avion. Lecture possible via MCDU dans PARAM ALPHA CALL-UP."},
      {code:"HPV",name:"HP Bleed Valve position",ata:"36",zone:"Engine / bleed air",description:"Position de la HP Bleed Valve consultable dans la page Alpha Call-Up."}
    ],
    "ATR 72":[
      {code:"ROLAT",name:"Roll attitude",ata:"34",zone:"Cockpit / attitude",description:"Roll attitude de l’avion. Lecture possible via MCDU dans PARAM ALPHA CALL-UP."},
      {code:"PITAT",name:"Pitch attitude",ata:"34",zone:"Cockpit / attitude",description:"Pitch attitude de l’avion. Lecture possible via MCDU dans PARAM ALPHA CALL-UP."},
      {code:"HPV",name:"HP Bleed Valve position",ata:"36",zone:"Engine / bleed air",description:"Position de la HP Bleed Valve consultable dans la page Alpha Call-Up."}
    ]
  };

  let aircraft="ATR 42";
  let filter="";
  let sortMode="ata";

  const esc=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const root=document.querySelector("main");
  if(!root)return;

  root.innerHTML=`
    <section class="alpha-selector-card">
      <div class="alpha-section-title">✈️ Sélection avion</div>
      <div class="aircraft-tabs" role="tablist">
        <button class="aircraft-tab active" data-aircraft="ATR 42" role="tab"><span>✈️</span><strong>ATR 42</strong><small>42-600</small></button>
        <button class="aircraft-tab" data-aircraft="ATR 72" role="tab"><span>✈️</span><strong>ATR 72</strong><small>72-600</small></button>
      </div>
    </section>

    <section class="alpha-tools-card">
      <div class="alpha-section-title">🔎 Recherche</div>
      <div class="alpha-search-wrap"><span>⌕</span><input id="alphaSearch" type="search" placeholder="Rechercher un code, ATA ou zone…" autocomplete="off"></div>
      <div class="alpha-sort" aria-label="Classement">
        <button class="sort-btn active" data-sort="ata">ATA</button>
        <button class="sort-btn" data-sort="zone">Zone</button>
      </div>
    </section>

    <section class="alpha-results-card">
      <div class="alpha-results-head"><div><span class="alpha-kicker">ALPHA CALL-UP</span><h2 id="resultsTitle">ATR 42</h2></div><span id="resultCount" class="alpha-count"></span></div>
      <div id="alphaList" class="alpha-list"></div>
    </section>
  `;

  const list=document.getElementById("alphaList"), search=document.getElementById("alphaSearch"), title=document.getElementById("resultsTitle"), count=document.getElementById("resultCount");

  function render(){
    const q=filter.trim().toLowerCase();
    let rows=DATA[aircraft].filter(x=>!q||[x.code,x.name,x.ata,x.zone,x.description].join(" ").toLowerCase().includes(q));
    rows.sort((a,b)=>sortMode==="zone" ? a.zone.localeCompare(b.zone)||a.code.localeCompare(b.code) : a.ata.localeCompare(b.ata)||a.code.localeCompare(b.code));
    title.textContent=aircraft;
    count.textContent=`${rows.length} code${rows.length>1?'s':''}`;
    list.innerHTML=rows.length?rows.map(x=>`<article class="alpha-item"><div class="alpha-code">${esc(x.code)}</div><div class="alpha-item-main"><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p><div class="alpha-meta"><span>ATA ${esc(x.ata)}</span><span>${esc(x.zone)}</span></div></div></article>`).join(""):"<div class=\"alpha-empty\">Aucun résultat pour cette recherche.</div>";
  }

  document.querySelectorAll(".aircraft-tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".aircraft-tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");aircraft=btn.dataset.aircraft;render();}));
  document.querySelectorAll(".sort-btn").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".sort-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");sortMode=btn.dataset.sort;render();}));
  search.addEventListener("input",e=>{filter=e.target.value;render();});
  render();
})();
