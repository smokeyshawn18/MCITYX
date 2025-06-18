export function ratePlayer(player) {
  const { position, age, injured, careerStats, seasonStats } = player;

  const isAttacker = ["AM", "FW", "ST", "LW", "RW"].includes(position);
  const goalWeight = isAttacker ? 0.6 : 0.4;
  const assistWeight = isAttacker ? 0.4 : 0.6;

  const seasonInvolvement =
    (seasonStats.goals * goalWeight + seasonStats.assists * assistWeight) /
      seasonStats.appearances || 0;
  const careerInvolvement =
    (careerStats.goals * goalWeight + careerStats.assists * assistWeight) /
      careerStats.appearances || 0;

  const seasonScore = Math.min(1, seasonInvolvement); // 0–1
  const careerScore = Math.min(1, careerInvolvement); // 0–1

  let ageScore = 0;
  if (age >= 24 && age <= 28) ageScore = 1;
  else if (age >= 21 && age <= 30) ageScore = 0.5;

  const injuryPenalty = injured ? -0.5 : 0;

  // Total raw score out of 3.5
  const rawScore =
    seasonScore * 1.5 + careerScore * 1 + ageScore * 0.5 + injuryPenalty;

  // Normalize rawScore to 0–4
  const normalized = Math.max(0, Math.min(4, rawScore));

  // Map to 6–10 scale
  const finalScore = 6 + (normalized / 4) * 4;

  return parseFloat(finalScore.toFixed(1));
}
