import styled from 'styled-components';
import Button from 'renderer/components/ui/Button';
import useEditor from 'renderer/hooks/states/useEditor';
import usePractice from 'renderer/hooks/states/usePractice';

import parseText from './parseText';

/*
// This program calculates the nth Fibonacci number recursively
package main // declares that this file is part of the main package, which is the entry point for the program

import "fmt" // imports the "fmt" package, which provides functions for formatting and printing strings

// The fibonacci function recursively calculates the nth Fibonacci number
func fibonacci(n int) int {
    if n <= 1 { // if n is less than or equal to 1
        return n // return n
    }
    return fibonacci(n-1) + fibonacci(n-2) // otherwise, recursively call the fibonacci function with n-1 and n-2 and return their sum
}

// main function goes here
func main() {
    n := 10 // set the value of n to 10
    // Call the fibonacci function and print the result to the console
    // The %d and %s are placeholders for the values of n and fibonacci(n), respectively
    fmt.Printf("The %dth Fibonacci number is %d", n, fibonacci(n))
}
*/

const TypingControllerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  background-color: var(--theme-bg-light);
  border-bottom: 1px solid var(--theme-bg-lighter);
`;

export default function TypingController() {
  const { mode, editingText, setPlayData, setMode, setEditingText } =
    useEditor();
  const { updateCurrentPractice, savePractice } = usePractice();

  const handlePlayPractice = () => {
    if (editingText) {
      const { text, blocks } = parseText(editingText);
      setPlayData({ processedText: text, blocks });
      setMode('play');
    }
  };

  const handleEditPractice = () => {
    setMode('edit');
  };

  const handleNewPractice = () => {
    setMode('edit');
    setEditingText('');
    updateCurrentPractice(null);
  };

  const handleSavePractice = () => {
    savePractice();
  };

  return (
    <TypingControllerWrapper>
      <Button onClick={handleNewPractice}>New</Button>
      {mode === 'edit' && <Button onClick={handleSavePractice}>Save</Button>}
      {mode !== 'edit' && <Button onClick={handleEditPractice}>Edit</Button>}
      {mode !== 'play' && <Button onClick={handlePlayPractice}>Play</Button>}
    </TypingControllerWrapper>
  );
}
