(function(){
  var text = `Dear Anwani,

Thank you so much for having me over. You’re always a 5/5 host! And y(our) home is my favourite Airbnb in Cape Town 🥹  Clifton and Camps Bay have nothing on you!

I’m grateful that your door is always open to me. Always taking good care of me. Picking me up from the office, cooking for me, and running this life thing together. I truly believe God did the “Aaaah for you my child, only the best!” when He gave me you as a friend. Stay the kind-hearted and warm soul that you are.

I’m grateful for you, always.

— Your Bestie 🌸`;

  var el = document.getElementById("type");
  var caret = document.createElement("span"); caret.className = "caret";
  var node = document.createTextNode("");
  var strong = document.createElement("strong"); var sNode = document.createTextNode("");
  strong.appendChild(sNode); el.appendChild(strong); el.appendChild(node); el.appendChild(caret);
  var chars = Array.from(text); var i = 0;
  node.nodeValue = text; el.style.minHeight = el.offsetHeight + "px"; node.nodeValue = "";

  function tick(){
    if(i < chars.length){
      (i < 12 ? sNode : node).nodeValue += chars[i++];
      var c = chars[i-1];
      setTimeout(tick, c === "." || c === "," ? 500 : 70 + Math.random()*70);
    } else {
      setTimeout(function(){ document.getElementById("scratch").classList.add("on"); initScratch(); }, 500);
    }
  }
  setTimeout(tick, 600);

  function initScratch(){
    var cv = document.getElementById("cover"), box = document.getElementById("scratch");
    var dpr = window.devicePixelRatio || 1, w = box.clientWidth, h = box.clientHeight;
    cv.width = w*dpr; cv.height = h*dpr;
    var ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
    var cs = getComputedStyle(document.documentElement);
    var g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, cs.getPropertyValue("--cover-a").trim() || "#b9bbb4");
    g.addColorStop(1, cs.getPropertyValue("--cover-b").trim() || "#9ea099");
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.font = "14px 'Courier New', monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("scratch for a token of gratitude", w/2, h/2);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 34; ctx.lineCap = "round"; ctx.lineJoin = "round";
    var drawing = false, last = null, done = false, moves = 0;
    function pos(e){ var r = cv.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; }
    function check(){
      var d = ctx.getImageData(0,0,cv.width,cv.height).data, clear = 0, n = 0;
      for(var p = 3; p < d.length; p += 64){ n++; if(d[p] < 128) clear++; }
      if(clear/n > 0.5 && !done){ done = true; cv.classList.add("done"); }
    }
    cv.addEventListener("pointerdown", function(e){ drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId);
      ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(last.x+.1,last.y); ctx.stroke(); });
    cv.addEventListener("pointermove", function(e){
      if(!drawing) return; var p = pos(e);
      ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last = p;
      if(++moves % 8 === 0) check();
    });
    function end(){ if(drawing){ drawing = false; check(); } }
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
  }
})();