
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




// Actionable Content Intelligence
const contentThemes = [
  {
    name: 'Cooking with family & shared meals',
    descriptor: 'Food + familiar relationships + generosity',
    signal: 96,
    role: 'core',
    job: 'Loyalty engine',
    interpretation: 'Best anchor for comments, shares, repeat viewing, and emotional attachment.'
  },
  {
    name: 'Provincial life & community',
    descriptor: 'Local routines + place + human connection',
    signal: 91,
    role: 'core',
    job: 'Retention engine',
    interpretation: 'Builds the most defensible identity and strongest sense of homecoming.'
  },
  {
    name: 'Family moments & personal milestones',
    descriptor: 'Familiar personalities + emotional stakes',
    signal: 87,
    role: 'core',
    job: 'Conversation engine',
    interpretation: 'Encourages higher-quality comments and strengthens parasocial familiarity.'
  },
  {
    name: 'Solo travel & exploration',
    descriptor: 'Novelty + destination interest + independence',
    signal: 84,
    role: 'growth',
    job: 'Discovery engine',
    interpretation: 'Expands reach and attracts new viewers, then needs a loyalty-building follow-up.'
  },
  {
    name: 'Everyday lifestyle & routines',
    descriptor: 'Calm utility + familiarity + consistency',
    signal: 76,
    role: 'support',
    job: 'Frequency support',
    interpretation: 'Maintains publishing consistency but benefits from a stronger emotional story.'
  },
  {
    name: 'Sponsor-first or product-led stories',
    descriptor: 'Commercial message without a native ritual',
    signal: 63,
    role: 'support',
    job: 'Revenue layer',
    interpretation: 'Most effective when embedded inside trusted family, food, travel, or household rituals.'
  }
];

const ranking = document.getElementById('themeRanking');
if (ranking) {
  ranking.innerHTML = contentThemes.map(theme => `
    <article class="theme-row" data-role="${theme.role}">
      <div class="theme-name">
        <strong>${theme.name}</strong>
        <span>${theme.descriptor}</span>
      </div>
      <div class="theme-bar" aria-label="${theme.signal} out of 100">
        <i style="--signal:${theme.signal}%"></i>
      </div>
      <div class="theme-score">${theme.signal}<small>/100</small></div>
      <div class="theme-job">
        <strong>${theme.job}</strong>
        ${theme.interpretation}
      </div>
    </article>
  `).join('');
}

const mixPlans = {
  balanced: {
    label: 'Balanced portfolio',
    recommendation: 'Protect the family-and-community core while reserving enough travel content to keep introducing the channel to new viewers.',
    mix: [
      ['Family cooking & shared meals', 40, 'anchor'],
      ['Provincial & community life', 20, 'anchor'],
      ['Solo travel & exploration', 20, 'discovery'],
      ['Family moments & milestones', 10, 'anchor'],
      ['Sponsor-led experiments', 10, 'support']
    ]
  },
  growth: {
    label: 'Audience-growth portfolio',
    recommendation: 'Increase discovery-led travel, but pair every travel upload with a family, meal, or homecoming story within the following seven days.',
    mix: [
      ['Solo travel & exploration', 30, 'discovery'],
      ['Family cooking & shared meals', 30, 'anchor'],
      ['Provincial & community life', 20, 'anchor'],
      ['Family moments & milestones', 10, 'anchor'],
      ['Sponsor-led experiments', 10, 'support']
    ]
  },
  loyalty: {
    label: 'Audience-loyalty portfolio',
    recommendation: 'Concentrate the slate around repeated rituals, familiar personalities, community, and shared meals. Use travel sparingly as contrast.',
    mix: [
      ['Family cooking & shared meals', 40, 'anchor'],
      ['Provincial & community life', 30, 'anchor'],
      ['Family moments & milestones', 10, 'anchor'],
      ['Solo travel & exploration', 10, 'discovery'],
      ['Sponsor-led experiments', 10, 'support']
    ]
  },
  revenue: {
    label: 'Revenue portfolio',
    recommendation: 'Increase brand integrations without turning the channel sponsor-first. Place commercial messages inside the highest-trust family, food, travel, and household formats.',
    mix: [
      ['Family cooking & shared meals', 30, 'anchor'],
      ['Provincial & community life', 20, 'anchor'],
      ['Sponsor-integrated stories', 20, 'support'],
      ['Solo travel & exploration', 20, 'discovery'],
      ['Family moments & milestones', 10, 'anchor']
    ]
  }
};

const contentMix = document.getElementById('contentMix');
const uploadSlate = document.getElementById('uploadSlate');
const mixRecommendation = document.getElementById('mixRecommendation');
const mixGoalLabel = document.getElementById('mixGoalLabel');
const goalTabs = document.querySelectorAll('.goal-tab');

function allocateTenUploads(mix) {
  const raw = mix.map(([label, percent, type]) => ({
    label,
    type,
    count: Math.floor(percent / 10),
    remainder: (percent / 10) - Math.floor(percent / 10)
  }));

  let assigned = raw.reduce((sum, item) => sum + item.count, 0);
  raw
    .slice()
    .sort((a, b) => b.remainder - a.remainder)
    .forEach(item => {
      if (assigned < 10) {
        const target = raw.find(entry => entry.label === item.label);
        target.count += 1;
        assigned += 1;
      }
    });

  return raw;
}

function renderMix(goal = 'balanced') {
  const plan = mixPlans[goal];
  if (!plan || !contentMix || !uploadSlate) return;

  mixGoalLabel.textContent = plan.label;
  mixRecommendation.textContent = plan.recommendation;

  contentMix.innerHTML = plan.mix.map(([label, percent]) => `
    <div class="mix-row">
      <strong>${label}</strong>
      <div class="mix-track"><i style="--mix:${percent}%"></i></div>
      <small>${percent}%</small>
    </div>
  `).join('');

  const allocation = allocateTenUploads(plan.mix);
  uploadSlate.innerHTML = allocation.flatMap(item =>
    Array.from({ length: item.count }, () =>
      `<span class="upload-chip ${item.type}" title="${item.label}">${item.label.replace(' & ', ' + ')}</span>`
    )
  ).join('');
}

goalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    goalTabs.forEach(button => button.classList.remove('active'));
    tab.classList.add('active');
    renderMix(tab.dataset.goal);
  });
});
renderMix();
