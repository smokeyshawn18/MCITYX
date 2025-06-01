// utils/playerRating.js

/**
 * Calculate player rating based on season stats.
 * Returns rating on a 6.0 - 10.0 scale.
 * @param {Object} player - Player object with seasonStats
 * @returns {number} rating
 */
export function calculatePlayerRating(player) {
  const stats = player.seasonStats;
  if (!stats.appearances || stats.appearances === 0) return 6.5;

  const weights = {
    goals: 0.25,
    assists: 0.15,
    appearances: 0.02,
  };

  const avgGoals = stats.goals / stats.appearances;
  const avgAssists = stats.assists / stats.appearances;

  let rating = 6.5;
  rating += avgGoals * weights.goals * 10;
  rating += avgAssists * weights.assists * 10;
  rating += stats.appearances * weights.appearances;

  rating = Math.max(6.0, Math.min(10.0, rating));

  return Number(rating.toFixed(2));
}

/**
 * Map over players and add rating property.
 * @param {Array} players
 * @returns {Array} players with rating
 */
export function calculateRatingsForPlayers(players) {
  return players.map((player) => ({
    ...player,
    rating: calculatePlayerRating(player),
  }));
}
