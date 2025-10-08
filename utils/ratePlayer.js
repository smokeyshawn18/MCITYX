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

  // Position groups
  const attackers = ["ST", "FW", "LW", "RW", "AM"];
  const midfielders = ["CM", "DM", "CAM"];
  const defenders = ["CB", "LB", "RB", "LWB", "RWB"];

  const isAttacker = attackers.includes(position);
  const isMidfielder = midfielders.includes(position);
  const isDefender = defenders.includes(position);

  // Per-game G+A
  const season =
    seasonStats.appearances > 0
      ? (seasonStats.goals + seasonStats.assists) / seasonStats.appearances
      : 0;
  const career =
    careerStats.appearances > 0
      ? (careerStats.goals + careerStats.assists) / careerStats.appearances
      : 0;

  // Base performance (season weighted more)
  let perf = season * 0.7 + career * 0.2;

  // ⚽ Position-based impact multipliers
  if (isDefender) perf *= 1.8; // defenders scoring → big impact
  else if (isMidfielder) perf *= 1;
  else perf *= 0.5; // attackers normal

  // Cap performance to avoid huge spikes
  const perfScore = Math.min(1, perf / 0.8); // 0.8 G+A per game ≈ elite

  // Age factor (prime 24–29, flexible band)
  const ageScore =
    ageYears >= 24 && ageYears <= 29
      ? 1
      : ageYears >= 21 && ageYears <= 32
      ? 0.85
      : 0.65;

  // Injury penalty
  const injuryPenalty = injured ? -0.15 : 0;

  // Defensive reliability bonus (if data exists)
  const defenseReliability =
    isDefender && seasonStats.tackles && seasonStats.interceptions
      ? Math.min(
          1,
          (seasonStats.tackles + seasonStats.interceptions) /
            (seasonStats.appearances * 3)
        ) * 0.15 // max +0.15 bonus
      : 0;

  // Combine all
  const score =
    perfScore * 0.5 + ageScore * 0.3 + 0.1 + injuryPenalty + defenseReliability;

  // Rating map 4.8–9.8
  let rating = 4.8 + Math.max(0, Math.min(1, score)) * 4.8;

  // Enforce baselines
  if (isDefender) rating = Math.max(6.8, rating);
  else if (isMidfielder) rating = Math.max(6.0, rating);
  else if (isAttacker) rating = Math.max(5.5, rating);

  return +rating.toFixed(1);
}

function rateGoalkeeper(player, ageYears) {
  const { seasonStats, careerStats, injured } = player;

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

  const csScore = seasonCS * 0.7 + careerCS * 0.3;
  const gcScore =
    Math.max(0, 1 - seasonGC / 3) * 0.7 + Math.max(0, 1 - careerGC / 3) * 0.3;

  const perf = csScore * 0.6 + gcScore * 0.4;

  const ageScore =
    ageYears >= 26 && ageYears <= 34
      ? 1
      : ageYears >= 23 && ageYears <= 37
      ? 0.85
      : 0.65;

  const injuryPenalty = injured ? -0.15 : 0;

  const score = perf * 0.65 + ageScore * 0.25 + 0.1 + injuryPenalty;

  let rating = 5.8 + Math.max(0, Math.min(1, score)) * 3.6;

  return +rating.toFixed(1);
}
