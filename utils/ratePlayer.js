export function ratePlayer(player) {
  const { position, age, injured, careerStats, seasonStats } = player;

  // Special rating system for goalkeepers
  if (position === "GK") {
    return rateGoalkeeper(player);
  }

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

// Special function to rate goalkeepers based on clean sheets and goals conceded
function rateGoalkeeper(player) {
  const { age, injured, seasonStats, careerStats } = player;

  // Calculate clean sheet percentage (higher is better)
  const seasonCleanSheetRatio =
    seasonStats.appearances > 0
      ? seasonStats.cleanSheets / seasonStats.appearances
      : 0;

  const careerCleanSheetRatio =
    careerStats.appearances > 0
      ? careerStats.cleanSheets / careerStats.appearances
      : 0;

  // Calculate goals conceded per game (lower is better)
  const seasonConcededRatio =
    seasonStats.appearances > 0
      ? seasonStats.goalsConceded / seasonStats.appearances
      : 0;

  const careerConcededRatio =
    careerStats.appearances > 0
      ? careerStats.goalsConceded / careerStats.appearances
      : 0;

  // Convert goals conceded to a positive score (invert the ratio)
  // Assuming 0 goals/game = 1.0 score, 3 goals/game = 0.0 score
  const seasonConcededScore = Math.max(0, 1 - seasonConcededRatio / 3);
  const careerConcededScore = Math.max(0, 1 - careerConcededRatio / 3);

  // Age peak for goalkeepers: 26-33 = full score
  let ageScore = 0.4;
  if (age >= 26 && age <= 33) ageScore = 1;
  else if (age >= 23 && age <= 36) ageScore = 0.8;

  // Smaller injury penalty
  const injuryPenalty = injured ? -0.3 : 0;

  // Weighted total - giving more weight to clean sheets and goals conceded
  const rawScore =
    seasonCleanSheetRatio * 0.4 +
    careerCleanSheetRatio * 0.8 +
    seasonConcededScore * 1.2 +
    careerConcededScore * 0.5 +
    ageScore * 0.6 +
    injuryPenalty;

  // Normalize into 0-4 range
  const normalized = Math.max(0, Math.min(4, rawScore));

  // Map to 6.2-10 scale
  const finalScore = 6.2 + (normalized / 4) * (10 - 6.2);

  return parseFloat(finalScore.toFixed(1));
}
