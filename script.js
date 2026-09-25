const examples=[
  "You are stupid. Everyone is laughing at you. Nobody wants you here.",
  "Hi! I disagree with your post, but I respect your opinion."
];

const harmfulTerms=[
  "stupid","idiot","loser","hate you","shut up","nobody wants you",
  "kill yourself","worthless","ugly","moron","dumb","fool","trash"
];

const message=document.getElementById("message");
const charCount=document.getElementById("charCount");
message.addEventListener("input",()=>charCount.textContent=message.value.length+" characters");

function useExample(i){message.value=examples[i];message.dispatchEvent(new Event("input"));analyzeMessage()}

function analyzeMessage(){
  const text=message.value.trim().toLowerCase();
  const result=document.getElementById("result");
  if(!text){
    result.innerHTML='<div class="result-empty"><div class="result-icon">✍️</div><h3>Enter a message first</h3><p>Type or paste a message to begin the educational analysis.</p></div>';
    return;
  }
  const found=harmfulTerms.filter(t=>text.includes(t));
  const score=Math.min(98, found.length*22 + (text.includes("!")?4:0));
  if(found.length){
    result.innerHTML=`<div class="result-warn"><div class="pill">⚠️ Potentially harmful pattern</div><div class="score">${score}%</div><h3>Review this message carefully</h3><p>Our simple demo detector found ${found.length} potentially harmful term(s): <b>${found.join(", ")}</b>.</p><ul><li>Do not retaliate or continue an escalating argument.</li><li>Save evidence if the message is part of repeated harassment.</li><li>Block or report the account using the platform's tools when appropriate.</li></ul></div>`;
  }else{
    result.innerHTML='<div class="result-good"><div class="pill">✓ No obvious harmful pattern detected</div><div class="score">Low</div><h3>Still use good judgment</h3><p>The demo detector did not find the listed harmful patterns. Context matters, so this result is not proof that a message is safe.</p><ul><li>Consider tone and the surrounding conversation.</li><li>Respect privacy and personal boundaries.</li></ul></div>';
  }
}

function saveReport(e){
  e.preventDefault();
  const date=document.getElementById("date").value;
  const platform=document.getElementById("platform").value;
  const incident=document.getElementById("incident").value.trim();
  localStorage.setItem("cybersafeIncident",JSON.stringify({date,platform,incident}));
  document.getElementById("saved").textContent="✓ Safety note saved on this device.";
}

document.getElementById("date").value=new Date().toISOString().slice(0,10);
