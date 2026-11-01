const nav=document.getElementById("practicalNav"), search=document.getElementById("search"), detail=document.getElementById("detail"), welcome=document.getElementById("welcome");
let active="1";
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderNav(query=""){nav.innerHTML="";PRACTICALS.filter(p=>(p.num+" "+p.title+" "+p.short).toLowerCase().includes(query.toLowerCase())).forEach(p=>{const b=document.createElement("button");b.className="nav-item"+(p.num===active?" active":"");b.type="button";b.innerHTML=`<span class="nav-num">${esc(p.num)}</span><span class="nav-copy"><strong>${esc(p.title)}</strong><small>${esc(p.short)}</small></span>`;b.onclick=()=>show(p.num);nav.appendChild(b);});if(!nav.children.length)nav.innerHTML='<p style="color:var(--muted);padding:8px">No practical found.</p>';}
function section(title,content){return `<section class="section"><h2>${title}</h2>${content}</section>`}
function list(items,ordered=false){const tag=ordered?"ol":"ul";return `<${tag}>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</${tag}>`}
function codeBox(c){return `<div class="codebox"><div class="codehead"><span>${esc(c.label||"Commands / code")}</span><button class="copy-btn" type="button" data-copy="${encodeURIComponent(c.code)}">Copy</button></div><pre><code>${esc(c.code)}</code></pre></div>`}
function show(num){const p=PRACTICALS.find(x=>x.num===num);if(!p)return;active=num;welcome.classList.add("hidden");detail.classList.remove("hidden");renderNav(search.value);let html=`<div class="detail-head"><div class="eyebrow">PRACTICAL ${esc(p.num)}</div><h1>${esc(p.title)}</h1><p>${esc(p.aim)}</p></div>`;
html+=section("Aim",`<p>${esc(p.aim)}</p>`);
html+=section("Theory",p.theory.map(t=>`<p>${esc(t)}</p>`).join(""));
html+=section("Procedure",list(p.procedure,true));
html+=section("Python code or commands",p.commands.length?p.commands.map(codeBox).join(""):'<p class="callout">No code or command is required for this practical summary. Follow the exact activity assigned by your instructor.</p>');
html+=section("Expected output",`<div class="output">${esc(p.output)}</div>`);
if(p.note)html+=section("Important note",`<div class="callout">${esc(p.note)}</div>`);
if(p.num==="5")html+=section("Original PDF",`<p>Open the manual to compare the Wireshark and Nemesis pages.</p><div class="pdf-actions"><a class="btn primary" href="assets/EH-practicals.pdf" target="_blank" rel="noopener">Open PDF ↗</a><a class="btn" href="assets/EH-practicals.pdf" download>Download PDF ↓</a></div>`);
detail.innerHTML=html;window.scrollTo({top:0,behavior:"smooth"});}
search.addEventListener("input",()=>renderNav(search.value));
document.addEventListener("click",async e=>{const b=e.target.closest("[data-copy]");if(!b)return;const text=decodeURIComponent(b.dataset.copy);try{await navigator.clipboard.writeText(text);b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",1200);}catch{const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",1200);}});
document.getElementById("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾";});
renderNav();
