export function ratePlayer(player) {
  const { position, age, injured, careerStats, seasonStats } = player;

  if (position === "GK") return rateGoalkeeper(player);

  const attackers = ["AM", "FW", "CM", "DM", "ST", "LW", "RW"];
  const defenders = ["CB", "LB", "RB", "LWB", "RWB"];

  const isAttacker = attackers.includes(position);
  const isDefender = defenders.includes(position);

  // Contribution per game
  const season =
    seasonStats.appearances > 0
      ? (seasonStats.goals + seasonStats.assists) / seasonStats.appearances
      : 0;
  const career =
    careerStats.appearances > 0
      ? (careerStats.goals + careerStats.assists) / careerStats.appearances
      : 0;

  // Normalize (cap at 0.6 g+a per game = world class)
  const perf = 0.6 * (season * 0.6 + career * 0.4);
  const perfScore = Math.min(1, perf / 0.6);

  // Age factor
  const ageScore =
    age >= 24 && age <= 29 ? 1 : age >= 21 && age <= 32 ? 0.8 : 0.6;

  // Injury penalty
  const injuryPenalty = injured ? -0.2 : 0;

  // Combine (0–1 scale)
  const score = perfScore * 0.6 + ageScore * 0.3 + 0.1 + injuryPenalty;

  // Map to 5.5–9.0
  let rating = 5.5 + Math.max(0, Math.min(1, score)) * 3.5;

  // Minimums - more reasonable for variation
  if (isDefender) rating = Math.max(6.0, rating);
  else if (isAttacker) rating = Math.max(6.0, rating);

  return +rating.toFixed(1);
}

function rateGoalkeeper(player) {
  const { age, injured, seasonStats, careerStats } = player;

  const seasonCS =
    seasonStats.appearances > 0
      ? seasonStats.cleanSheets / seasonStats.appearances
      : 0;
  const careerCS =
    careerStats.appearances > 0
      ? careerStats.cleanSheets / careerStats.appearances
      : 0;

  const seasonGC =
    seasonStats.appearances > 0
      ? seasonStats.goalsConceded / seasonStats.appearances
      : 2;
  const careerGC =
    careerStats.appearances > 0
      ? careerStats.goalsConceded / careerStats.appearances
      : 2;

  const perf =
    (seasonCS * 0.8 + careerCS * 0.4) * 0.6 +
    (Math.max(0, 1 - seasonGC / 3) * 0.6 +
      Math.max(0, 1 - careerGC / 3) * 0.4) *
      0.4;

  const ageScore =
    age >= 26 && age <= 34 ? 1 : age >= 23 && age <= 37 ? 0.8 : 0.6;
  const injuryPenalty = injured ? -0.2 : 0;

  const score = perf * 0.6 + ageScore * 0.3 + 0.1 + injuryPenalty;

  let rating = 5.6 + Math.max(0, Math.min(1, score)) * 3.4;
  rating = Math.max(6.8, rating); // GK baseline like defenders

  return +rating.toFixed(1);
}
