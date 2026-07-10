
const sliders = ["belonging", "abundance", "ritual", "connection", "place", "peace"];

function updateForecast() {
  let total = 0;
  sliders.forEach(id => {
    const el = document.getElementById(id);
    const value = Number(el.value);
    total += value;
    document.getElementById(`${id}Value`).textContent = value;
  });

  document.getElementById("totalScore").textContent = total;
  document.getElementById("meterFill").style.width = `${total}%`;

  let label, copy;
  if (total >= 95) {
    label = "Signature Content";
    copy = "Highest-priority concept. Strong potential for flagship performance, loyalty, and long-tail value.";
  } else if (total >= 90) {
    label = "Breakout Candidate";
    copy = "Very high potential to outperform the channel average. Prioritize production and cross-platform promotion.";
  } else if (total >= 85) {
    label = "Strong Performer";
    copy = "Likely to generate above-average engagement and repeat viewing when packaged effectively.";
  } else if (total >= 80) {
    label = "Reliable Upload";
    copy = "Expected to perform near the channel average. Optimize the title, thumbnail, and opening sequence.";
  } else if (total >= 70) {
    label = "Moderate Risk";
    copy = "The concept may satisfy existing viewers but needs a stronger emotional narrative before production.";
  } else {
    label = "High Execution Risk";
    copy = "Rework the concept by strengthening belonging, human connection, ritual, or emotional resolution.";
  }

  document.getElementById("forecastLabel").textContent = label;
  document.getElementById("forecastCopy").textContent = copy;
}

sliders.forEach(id => document.getElementById(id).addEventListener("input", updateForecast));
updateForecast();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("open")));

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("progressBar").style.width = `${(scrollTop / scrollHeight) * 100}%`;
});
