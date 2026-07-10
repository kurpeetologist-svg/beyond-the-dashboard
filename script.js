
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});

const navToggle = document.getElementById('navToggle');
const chapterNav = document.getElementById('chapterNav');
navToggle.addEventListener('click', () => chapterNav.classList.toggle('open'));
chapterNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => chapterNav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const ids = ['belonging','abundance','ritual','connection','place','peace'];

function updateScore(){
  let total = 0;
  ids.forEach(id => {
    const input = document.getElementById(id);
    const value = Number(input.value);
    total += value;
    document.getElementById(id + 'Out').textContent = value;
  });

  document.getElementById('score').textContent = total;
  document.getElementById('scoreFill').style.width = `${total}%`;

  let tier, note;
  if(total >= 95){
    tier = 'Signature Content';
    note = 'Highest-priority concept with strong flagship and long-tail potential.';
  } else if(total >= 90){
    tier = 'Breakout Candidate';
    note = 'High potential to outperform the channel average.';
  } else if(total >= 85){
    tier = 'Strong Performer';
    note = 'Likely to generate above-average engagement and repeat viewing.';
  } else if(total >= 80){
    tier = 'Reliable Upload';
    note = 'Expected to perform near the channel average with strong packaging.';
  } else if(total >= 70){
    tier = 'Moderate Risk';
    note = 'Strengthen the emotional narrative before production.';
  } else {
    tier = 'High Execution Risk';
    note = 'Rework the concept around belonging, connection, ritual, or peace.';
  }

  document.getElementById('tier').textContent = tier;
  document.getElementById('scoreNote').textContent = note;
}

ids.forEach(id => document.getElementById(id).addEventListener('input', updateScore));
updateScore();
