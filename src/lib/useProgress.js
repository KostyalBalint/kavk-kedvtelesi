import { useCallback, useEffect, useState } from "react";
import {
  applyAnswer,
  loadProgress,
  resetBank as resetBankStorage,
  saveProgress,
} from "./storage";

// Per-bank progress hook backed by localStorage.
export function useProgress(bankId) {
  const [progress, setProgress] = useState(() => loadProgress(bankId));

  // Reload when the bank changes.
  useEffect(() => {
    setProgress(loadProgress(bankId));
  }, [bankId]);

  const recordAnswer = useCallback(
    (qid, isCorrect) => {
      setProgress((prev) => {
        const next = applyAnswer(prev, qid, isCorrect);
        saveProgress(bankId, next);
        return next;
      });
    },
    [bankId]
  );

  const setCursor = useCallback(
    (cursor) => {
      setProgress((prev) => {
        const next = { ...prev, cursor };
        saveProgress(bankId, next);
        return next;
      });
    },
    [bankId]
  );

  const reset = useCallback(() => {
    resetBankStorage(bankId);
    setProgress(loadProgress(bankId));
  }, [bankId]);

  return { progress, recordAnswer, setCursor, reset };
}
