/* script.js — small polished interactivity
   - typing effect
   - smooth nav links
   - reveal skill bars on scroll
   - simple keyboard focus for project cards
*/

// Typing effect for short lines to add personality
const lines = [
  "I build interfaces that people enjoy using.",
  "I care about accessibility, performance & clear UX.",
  "HTML • CSS • JavaScript • Java • React (learning)"];
const typingEl = document.getElementById('typing');
let line = 0, pos = 0, forward = true;

function typeLoop(){
  if(!typingEl) return;
  const current = lines[line];
  if(forward){
    pos++;
    typingEl.textContent = current.slice(0,pos);
    if(pos === current.length) { forward = false; setTimeout(typeLoop, 1200); return; }
  } else {
    pos--;
    typingEl.textContent = current.slice(0,pos);
    if(pos === 0){ forward = true; line = (line+1) % lines.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, forward ? 45 : 20);
}
typeLoop();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Reveal skill bars when visible
const skillFills = document.querySelectorAll('.skill-fill');
function revealSkills(){
  const trigger = window.innerHeight * 0.9;
  skillFills.forEach(fill=>{
    const top = fill.getBoundingClientRect().top;
    if(top < trigger){
      fill.style.width = fill.style.width || fill.getAttribute('style').match(/width:(\d+%)/)?.[1] || '70%';
      // If no inline width present, read from dataset or keep default 70%
    }
  });
}
window.addEventListener('scroll', revealSkills);
window.addEventListener('load', ()=>{
  // set initial widths from inline style in HTML for progressive enhancement
  document.querySelectorAll('.skill .skill-fill').forEach(el=>{
    // If width already set as style attribute, keep it. Otherwise set default 70%
    if(!el.style.width){
      const ws = el.getAttribute('style') || '';
      const match = ws.match(/width:?\s*(\d+%)/);
      if(match) el.style.width = match[1];
    }
  });
  revealSkills();
});

// Keyboard focus for project cards: when Enter pressed, open first action
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('keydown', e=>{
    if((e.key === 'Enter' || e.key === ' ') ){
      e.preventDefault();
      const link = card.querySelector('.proj-actions a');
      if(link) link.click();
    }
  });
});

// Small accessibility helper: allow outlines when using keyboard
document.body.addEventListener('keydown', (e)=>{
  if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
});
