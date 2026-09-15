/* ==========================================================
   AIR TAHITI TOOLS — APP.JS
========================================================== */
(function(){
"use strict";
const STORAGE_KEY="att-theme",DEFAULT_THEME="dark";
function getStoredTheme(){const v=localStorage.getItem(STORAGE_KEY);return ["light","dark","system"].includes(v)?v:DEFAULT_THEME}
function getEffectiveTheme(theme){if(theme!=="system")return theme;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}
function applyTheme(theme){
const effective=getEffectiveTheme(theme);
document.body.classList.remove("theme-light","theme-dark");
document.body.classList.add(`theme-${effective}`);
document.documentElement.dataset.themePreference=theme;
/* Keep the home page's own background system intact. */
if(!location.pathname.includes("/pages/")) return;
const root=document.documentElement;
root.style.setProperty("--att-bg-image",`url("${new URL(effective==="dark"?"assets/menu/air-tahiti-night-background.jpg?v=7":"assets/menu/air-tahiti-home.jpg?v=10",location.href).href}")`);
}
window.ATTools=window.ATTools||{};
window.ATTools.getThemePreference=getStoredTheme;
window.ATTools.setThemePreference=function(theme){
const normalized=["system","light","dark"].includes(theme)?theme:DEFAULT_THEME;
localStorage.setItem(STORAGE_KEY,normalized);
applyTheme(normalized);
window.dispatchEvent(new CustomEvent("att:themechange",{detail:{preference:normalized,theme:getEffectiveTheme(normalized)}}));
};
function installGlobalPageStyles(){
const style=document.createElement("style");
style.id="att-global-page-fixes";
style.textContent=`
body.page-enter,body.page-exit{transform:none!important}
body.page-enter>*,body.page-exit>*{will-change:transform,opacity}
body.page-enter> *{opacity:0;transform:translateX(46px)}
body.page-enter.page-enter-active> *{opacity:1;transform:translateX(0);transition:transform .42s cubic-bezier(.22,.61,.36,1),opacity .30s ease}
body.page-exit> *{opacity:0;transform:translateX(-46px);transition:transform .30s cubic-bezier(.55,.06,.68,.19),opacity .24s ease}
body::before{z-index:-2!important;pointer-events:none!important}
body.theme-light::before{background-image:var(--att-bg-image)!important;background-color:#eaf5f8!important;background-position:center top!important;background-size:cover!important;background-repeat:no-repeat!important}
body.theme-dark::before{background-image:var(--att-bg-image)!important;background-color:#07111f!important;background-position:center top!important;background-size:cover!important;background-repeat:no-repeat!important}
.store-app,.alpha-app{background:transparent!important}
`;
document.head.appendChild(style);
}
function initialize(){
installGlobalPageStyles();
applyTheme(getStoredTheme());
const media=window.matchMedia("(prefers-color-scheme: dark)");
const handle=()=>{if(getStoredTheme()==="system")applyTheme("system")};
if(media.addEventListener)media.addEventListener("change",handle);else if(media.addListener)media.addListener(handle);
document.body.classList.add("page-enter");
requestAnimationFrame(()=>document.body.classList.add("page-enter-active"));
window.addEventListener("pageshow",()=>document.body.classList.add("page-enter-active"));
document.addEventListener("click",function(e){
const link=e.target.closest("a[href]");if(!link)return;
const href=link.getAttribute("href");
if(!href||href==="#"||link.target==="_blank"||href.startsWith("http")||href.startsWith("mailto:")||href.startsWith("tel:"))return;
e.preventDefault();
document.body.classList.remove("page-enter-active");document.body.classList.add("page-exit");
setTimeout(()=>{window.location.href=href},280);
});
const back=document.querySelector(".back-button");
if(back){back.onclick=function(e){e.preventDefault();document.body.classList.remove("page-enter-active");document.body.classList.add("page-exit");setTimeout(()=>history.back(),280)}}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize,{once:true});else initialize();
})();
