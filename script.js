
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


const earningsInputs = {
  yt: document.getElementById('ytRevenue'),
  fb: document.getElementById('fbRevenue'),
  sponsor: document.getElementById('sponsorRevenue'),
  affiliate: document.getElementById('affiliateRevenue'),
  cost: document.getElementById('costRate'),
  tax: document.getElementById('taxRate')
};

const fxRate = 61.53;

function money(value){
  return new Intl.NumberFormat('en-US', {
    style:'currency',
    currency:'USD',
    maximumFractionDigits:0
  }).format(value);
}

function peso(value){
  return '₱' + new Intl.NumberFormat('en-PH', {
    maximumFractionDigits:0
  }).format(value);
}

function compactPeso(value){
  if(value >= 1_000_000){
    return 'approximately ₱' + (value / 1_000_000).toFixed(2) + ' million';
  }
  return 'approximately ' + peso(value);
}

function updateEarnings(){
  if(!earningsInputs.yt) return;

  const yt = Number(earningsInputs.yt.value);
  const fb = Number(earningsInputs.fb.value);
  const sponsor = Number(earningsInputs.sponsor.value);
  const affiliate = Number(earningsInputs.affiliate.value);
  const costRate = Number(earningsInputs.cost.value) / 100;
  const taxRate = Number(earningsInputs.tax.value) / 100;

  const monthly = yt + fb + sponsor + affiliate;
  const annual = monthly * 12;
  const annualCosts = annual * costRate;
  const taxable = annual - annualCosts;
  const annualTax = taxable * taxRate;
  const annualNet = taxable - annualTax;
  const monthlyNet = annualNet / 12;

  document.getElementById('ytRevenueOut').textContent = money(yt);
  document.getElementById('fbRevenueOut').textContent = money(fb);
  document.getElementById('sponsorRevenueOut').textContent = money(sponsor);
  document.getElementById('affiliateRevenueOut').textContent = money(affiliate);
  document.getElementById('costRateOut').textContent = Math.round(costRate*100) + '%';
  document.getElementById('taxRateOut').textContent = Math.round(taxRate*100) + '%';

  document.getElementById('monthlyGross').textContent = money(monthly);
  document.getElementById('monthlyGrossPhp').textContent = 'approximately ' + peso(monthly * fxRate);
  document.getElementById('annualGross').textContent = money(annual);
  document.getElementById('monthlyNet').textContent = money(monthlyNet);

  document.getElementById('annualCosts').textContent = money(annualCosts);
  document.getElementById('annualCostsPhp').textContent = compactPeso(annualCosts * fxRate);
  document.getElementById('annualTax').textContent = money(annualTax);
  document.getElementById('annualTaxPhp').textContent = compactPeso(annualTax * fxRate);
  document.getElementById('annualNet').textContent = money(annualNet);
  document.getElementById('annualNetPhp').textContent = compactPeso(annualNet * fxRate);

  const items = [
    ['yt', yt],
    ['fb', fb],
    ['sponsor', sponsor],
    ['affiliate', affiliate]
  ];

  items.forEach(([id, value]) => {
    const share = monthly > 0 ? Math.round((value / monthly) * 100) : 0;
    document.getElementById(id + 'Share').textContent = money(value) + ' · ' + share + '%';
    document.getElementById(id + 'Bar').style.width = share + '%';
  });

  let scenario = 'Expected scenario';
  let status = 'Expected current run rate based on public audience data and modeled commercial assumptions.';
  if(monthly < 5000){
    scenario = 'Conservative scenario';
    status = 'A lower-revenue month with limited sponsorship activity or weaker platform monetization.';
  } else if(monthly >= 12000){
    scenario = 'High-performance scenario';
    status = 'A strong commercial month supported by major brand activity and above-average platform performance.';
  }
  document.getElementById('scenarioPill').textContent = scenario;
  document.getElementById('earningsStatus').textContent = status;
}

Object.values(earningsInputs).forEach(input => {
  if(input) input.addEventListener('input', updateEarnings);
});
updateEarnings();
