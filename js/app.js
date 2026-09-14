/* ==========================================================
   AIR TAHITI TOOLS — APP.JS
========================================================== */
(function(){
"use strict";
const STORAGE_KEY="att-theme",DEFAULT_THEME="dark";
function getStoredTheme(){const v=localStorage.getItem(STORAGE_KEY);return ["light","dark","system"].includes(v)?v:DEFAULT_THEME}
function getEffectiveTheme(theme){if(theme!=="system")return theme;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}
function applyTheme(theme){const effective=getEffectiveTheme(theme);document.body.classList.remove("theme-light","theme-dark");document.body.classList.add(`theme-${effective}`);document.documentElement.dataset.themePreference=theme}
window.ATTools=window.ATTools||{};
window.ATTools.getThemePreference=getStoredTheme;
window.ATTools.setThemePreference=function(theme){const normalized=["system","light","dark"].includes(theme)?theme:DEFAULT_THEME;localStorage.setItem(STORAGE_KEY,normalized);applyTheme(normalized);window.dispatchEvent(new CustomEvent("att:themechange",{detail:{preference:normalized,theme:getEffectiveTheme(normalized)}}))};
function initialize(){applyTheme(getStoredTheme());const media=window.matchMedia("(prefers-color-scheme: dark)");const handle=()=>{if(getStoredTheme()==="system")applyTheme("system")};if(media.addEventListener)media.addEventListener("change",handle);else if(media.addListener)media.addListener(handle);
/* Shared slide transition for every internal page */
document.body.classList.add("page-enter");requestAnimationFrame(()=>document.body.classList.add("page-enter-active"));
window.addEventListener("pageshow",()=>document.body.classList.add("page-enter-active"));
document.addEventListener("click",function(e){const link=e.target.closest("a[href]");if(!link)return;const href=link.getAttribute("href");if(!href||href==="#"||link.target==="_blank"||href.startsWith("http")||href.startsWith("mailto:")||href.startsWith("tel:"))return;e.preventDefault();document.body.classList.remove("page-enter-active");document.body.classList.add("page-exit");setTimeout(()=>{window.location.href=href},280)});
const back=document.querySelector(".back-button");if(back){back.onclick=function(e){e.preventDefault();document.body.classList.remove("page-enter-active");document.body.classList.add("page-exit");setTimeout(()=>history.back(),280)}}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize,{once:true});else initialize();
})();
