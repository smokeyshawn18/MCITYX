export function ratePlayer(player) {
  const { position, age, injured, careerStats, seasonStats } = player;

  // Convert DOB → age in years
  const getAge = (dob) => {
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };
  const ageYears = getAge(age);

  // Goalkeeper path
  if (position === "GK") return rateGoalkeeper(player, ageYears);

  const attackers = ["AM", "FW", "CM", "ST", "DM", "LW", "RW"];
  const defenders = ["CB", "LB", "RB", "LWB", "RWB"];

  const isAttacker = attackers.includes(position);
  const isDefender = defenders.includes(position);

  // Per-game contribution (goals + assists)
  const season =
    seasonStats.appearances > 0
      ? (seasonStats.goals + seasonStats.assists) / seasonStats.appearances
      : 0;
  const career =
    careerStats.appearances > 0
      ? (careerStats.goals + careerStats.assists) / careerStats.appearances
      : 0;

  // Weighted performance (season matters more)
  const perf = season * 0.65 + career * 0.35;
  const perfScore = Math.min(1, perf / 0.7); // cap at ~0.7 G+A per game

  // Age factor (prime: 24–29)
  const ageScore =
    ageYears >= 23 && ageYears <= 29
      ? 1
      : ageYears >= 21 && ageYears <= 32
      ? 0.85
      : 0.65;

  // Injury penalty
  const injuryPenalty = injured ? -0.15 : 0;

  // Final score 0–1
  const score = perfScore * 0.65 + ageScore * 0.25 + 0.1 + injuryPenalty;

  // Map to rating
  let rating = 4.6 + Math.max(0, Math.min(1, score)) * 3.65;

  // Enforce baselines
  if (isDefender) rating = Math.max(6.8, rating);
  else if (isAttacker) rating = Math.max(5.5, rating);

  return +rating.toFixed(1);
}

function rateGoalkeeper(player, ageYears) {
  const { seasonStats, careerStats, injured } = player;

  // Clean sheets per game
  const seasonCS =
    seasonStats.appearances > 0
      ? seasonStats.cleanSheets / seasonStats.appearances
      : 0;
  const careerCS =
    careerStats.appearances > 0
      ? careerStats.cleanSheets / careerStats.appearances
      : 0;

  // Goals conceded per game (lower = better)
  const seasonGC =
    seasonStats.appearances > 0
      ? seasonStats.goalsConceded / seasonStats.appearances
      : 2;
  const careerGC =
    careerStats.appearances > 0
      ? careerStats.goalsConceded / careerStats.appearances
      : 2;

  // Performance score
  const csScore = seasonCS * 0.7 + careerCS * 0.3;
  const gcScore =
    Math.max(0, 1 - seasonGC / 3) * 0.7 + Math.max(0, 1 - careerGC / 3) * 0.3;

  const perf = csScore * 0.5 + gcScore * 0.5;

  // Age factor for GKs (prime 26–34)
  const ageScore =
    ageYears >= 26 && ageYears <= 34
      ? 1
      : ageYears >= 23 && ageYears <= 37
      ? 0.85
      : 0.65;

  const injuryPenalty = injured ? -0.15 : 0;

  const score = perf * 0.65 + ageScore * 0.25 + 0.1 + injuryPenalty;

  // GK rating baseline → 6.9–10
  let rating = 5.5 + Math.max(0, Math.min(1, score)) * 3.1;

  return +rating.toFixed(1);
}
