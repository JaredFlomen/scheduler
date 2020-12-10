import React, { useState } from 'react'; 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) { 
    if (replace) {
      history.pop()
      const expectedMode = history[history.length - 1]
      setMode(expectedMode)
      setHistory(history)
    }
    setMode(newMode)
    setHistory(previousHistory => [...previousHistory, newMode])
  }

  function back() {
    if (history.length > 1) {
      history.pop()
      const expectedMode = history[history.length - 1]
      setMode(expectedMode)
      setHistory(history)
    }
  }
  
  return { mode, transition, back }
}