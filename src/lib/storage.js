// localStorage persistence. One progress object per bank under a versioned key.
const PREFIX = "boatstudy.v1.";
const keyFor = (bankId) => `${PREFIX}progress.${bankId}`;

function emptyProgress() {
  return { cursor: 0, seen: {}, correct: {}, failed: [] };
}

export function loadProgress(bankId) {
  try {
    const raw = localStorage.getItem(keyFor(bankId));
    if (!raw) return emptyProgress();
    return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(bankId, progress) {
  try {
    localStorage.setItem(keyFor(bankId), JSON.stringify(progress));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function resetBank(bankId) {
  localStorage.removeItem(keyFor(bankId));
}

// Apply an answer to a progress object (pure; returns a new object).
export function applyAnswer(progress, qid, isCorrect) {
  const next = {
    ...progress,
    seen: { ...progress.seen },
    correct: { ...progress.correct },
    failed: progress.failed.slice(),
  };
  next.seen[qid] = (next.seen[qid] || 0) + 1;
  if (isCorrect) {
    next.correct[qid] = (next.correct[qid] || 0) + 1;
    next.failed = next.failed.filter((id) => id !== qid);
  } else if (!next.failed.includes(qid)) {
    next.failed.push(qid);
  }
  return next;
}

// Aggregate stats for the Stats page.
export function summarize(progress, total) {
  const answered = Object.keys(progress.seen).length;
  const mastered = Object.keys(progress.correct).length;
  return {
    total,
    answered,
    mastered,
    failed: progress.failed.length,
    cursor: progress.cursor,
  };
}
