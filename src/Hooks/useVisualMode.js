import { useState } from 'react'; 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      //Removes the last item in the history arrray
      history.pop()
      const expectedMode = history[history.length - 1]
      //Updates the mode
      setMode(expectedMode)
      //Updates the history
      setHistory([...history])
    }
    //
    setMode(newMode)
    setHistory(previousHistory => [...previousHistory, newMode])
  }

  function back() {
    if (history.length < 2) {return} 
    //Removes the last item in the array
    history.pop()
    const expectedMode = history[history.length - 1]
    //Updates the mode
    setMode(expectedMode)
    //Updates the hisotry
    setHistory([...history])
  }
  return { mode, transition, back }
}