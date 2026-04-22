// lib/sm2.js
// SuperMemo 2 (SM-2) algorithm — the same algorithm Anki uses.
//
// Reference: https://super-memory.com/english/ol/sm2.htm
//
// State per card:
//   - repetitions: int   (how many times in a row the card was answered correctly; resets to 0 on fail)
//   - interval: int      (number of days until the next review)
//   - easeFactor: float  (starts at 2.5, adjusts based on recall quality; floor 1.3)
//   - dueDate: string    (ISO date of the next review)
//
// Quality rating (what the student clicks):
//   0 = "Again"  — complete blackout (incorrect, couldn't recall at all)
//   3 = "Hard"   — correct with significant difficulty
//   4 = "Good"   — correct with some hesitation (default)
//   5 = "Easy"   — perfect recall, no hesitation
//
// This is the "viva-friendly" version: minimal, readable, with comments
// explaining WHY each step exists.

export const INITIAL_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

export function createInitialState() {
  return {
    repetitions: 0,
    interval: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    dueDate: new Date().toISOString().slice(0, 10),
    lastReview: null,
    totalReviews: 0,
    lapses: 0, // times forgotten after learning
  };
}

/**
 * Update a card's SM-2 state based on the student's recall quality.
 * @param {object} state  — previous state (or createInitialState() for new)
 * @param {number} quality — 0, 3, 4, or 5
 * @returns {object} new state
 */
export function review(state, quality) {
  if (![0, 3, 4, 5].includes(quality)) {
    throw new Error(`Invalid quality ${quality}. Use 0, 3, 4, or 5.`);
  }

  const newState = { ...state };
  newState.totalReviews = (state.totalReviews || 0) + 1;
  newState.lastReview = new Date().toISOString();

  if (quality < 3) {
    // Failed recall — restart learning sequence
    newState.repetitions = 0;
    newState.interval = 1; // review again tomorrow
    newState.lapses = (state.lapses || 0) + 1;
    // EF is NOT decreased below minimum for failures — we just restart
  } else {
    // Successful recall — advance through the spacing ladder
    if (state.repetitions === 0) {
      newState.interval = 1; // first correct → 1 day
    } else if (state.repetitions === 1) {
      newState.interval = 6; // second correct → 6 days (the SM-2 magic number)
    } else {
      // Third and beyond: multiply by ease factor
      newState.interval = Math.round(state.interval * state.easeFactor);
    }
    newState.repetitions = state.repetitions + 1;
  }

  // SM-2 ease factor adjustment formula:
  //   EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // Simplified: higher quality → EF goes up; lower quality → EF goes down
  const efDelta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
  newState.easeFactor = Math.max(MIN_EASE_FACTOR, state.easeFactor + efDelta);

  // Next due date = today + interval days
  const due = new Date();
  due.setDate(due.getDate() + newState.interval);
  newState.dueDate = due.toISOString().slice(0, 10);

  return newState;
}

/** Is this card due today or earlier? */
export function isDue(state) {
  if (!state?.dueDate) return true;
  return state.dueDate <= new Date().toISOString().slice(0, 10);
}

/** Sort cards so the most overdue appear first. */
export function sortByDue(cards) {
  return [...cards].sort((a, b) => {
    const aDue = a.state?.dueDate || "1970-01-01";
    const bDue = b.state?.dueDate || "1970-01-01";
    return aDue.localeCompare(bDue);
  });
}

/** Stats for a deck: how many new / learning / due / future */
export function getDeckStats(cards) {
  const today = new Date().toISOString().slice(0, 10);
  let neu = 0, learning = 0, due = 0, future = 0;
  for (const c of cards) {
    if (!c.state || c.state.totalReviews === 0) neu++;
    else if (c.state.repetitions < 2) learning++;
    else if (c.state.dueDate <= today) due++;
    else future++;
  }
  return { new: neu, learning, due, future, total: cards.length };
}
