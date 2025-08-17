export function ratePlayer(player) {
  const { position, age, injured, careerStats, seasonStats } = player;

  // Positions that rely heavily on goals/assists
  const attackingRoles = ["AM", "FW", "CM", "DM", "ST", "LW", "RW"];
  const isAttacker = attackingRoles.includes(position);

  // Slightly more generous weights
  const goalWeight = isAttacker ? 0.9 : 0.5;
  const assistWeight = isAttacker ? 0.8 : 0.7;

  // Contribution per appearance (avoid NaN)
  const seasonInvolvement =
    seasonStats.appearances > 0
      ? (seasonStats.goals * goalWeight + seasonStats.assists * assistWeight) /
        seasonStats.appearances
      : 0;

  const careerInvolvement =
    careerStats.appearances > 0
      ? (careerStats.goals * goalWeight + careerStats.assists * assistWeight) /
        careerStats.appearances
      : 0;

  // Cap scores to max 1
  const seasonScore = Math.min(1, seasonInvolvement);
  const careerScore = Math.min(1, careerInvolvement);

  // Age peak: 24–29 = full score, decent outside range
  let ageScore = 0.4;
  if (age >= 24 && age <= 29) ageScore = 1;
  else if (age >= 21 && age <= 32) ageScore = 0.7;

  // Smaller injury penalty (not too punishing)
  const injuryPenalty = injured ? -0.3 : 0;

  // Weighted total (max ≈ 3.7)
  const rawScore =
    seasonScore * 1.6 + careerScore * 1.2 + ageScore * 0.6 + injuryPenalty;

  // Normalize into 0–4 range
  const normalized = Math.max(0, Math.min(4, rawScore));

  // Map to 6.2–10 scale (baseline 6.2 instead of 6.0)
  const finalScore = 6.2 + (normalized / 4) * (10 - 6.2);

  return parseFloat(finalScore.toFixed(1));
}
