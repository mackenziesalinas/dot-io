import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import type {TrainingStoreModel}  from '../../../../src/models/trainingStore';

function ChordTextInput(): ReactElement {
  const setStoreText = useStoreActions((store : any) => store.setTypedTrainingText);

  const textTyped = useStoreState((store : any) => store.typedTrainingText);
  const inputRef = useRef<HTMLInputElement>(null);
  const regenerateTrainingText = useStoreActions(
    (store : any) => store.resetTrainingText,
  );
  const restartMode = useStoreState((store) => store.restartTestMode);
  const setRestartTestMode = useStoreActions((store) => store.setRestartTestMode,);

  const setTextPromptUnFocused = useStoreActions(
    (store) => store.setTextPromptUnFocused,
  );

 
  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario);  const displayHUD = useHUD();
    const isShowingPortal = useStoreState(
      (store) => store.isDisplayingChordEditModal,
    );


    const set = useStoreActions((store : any) => store.setCompareText);
    const setS = useStoreState((store : any) => store.compareText);
    const indexOfTargetChord = useStoreState(
      (store : any) => store.currentSubindexInTrainingText,
    );
    const setCurrentSubindexInTrainingText = useStoreActions((store : any) => store.setCurrentSubindexInTrainingText);


 

  const { parentProps, Popper } = usePopover(
    'Generate a new set of training text.',
  );
  const [firstTyped, setFirstTyped] = useState(true); //This is used to see if the first word has been typed
  const yer = restartMode;
  
 

  return (
    <div className="w-full flex flex-row items-end mt-6 justify-center">
      {Popper}
      <span
        className={`mb-2 mr-2 text-white font-semibold ${
          !displayHUD && 'hidden'
        }`}
      >
        
      </span>

      {firstTyped ? sessionStorage.setItem('timeThat', JSON.stringify(performance.now())) : ''}

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="relative bg-transparent caret-transparent focus:outline-none w-0  text-white font-bold text-center max-w-[60vw] border-b-2 border-solid border-transparent"
        ref={inputRef}
        id="txt_Name"
        autoFocus
        onBlurCapture={() => setTextPromptUnFocused(true)}
        onFocus={() => isShowingPortal == true ? document.getElementById('txt_Name')?.focus() : document.getElementById('txt_Name')?.focus()}
        value={textTyped}
        onChange={(e) => {
          {(yer==true) && (firstTyped == false) ? [setFirstTyped(true),setRestartTestMode(false)]: ''}//THis conditional resets the variables necessary if the refresh method is called
          {firstTyped ? [sessionStorage.setItem('timeThat', JSON.stringify(performance.now())), setFirstTyped(false)] : console.log('first typed sexy')}// This here logs the time that the first letter was pressed and sets the state variable to false
          setStoreText(e.target.value);
          {set(e.target.value)}
          {console.log("ghj " +setS + " " + e.target.value + ' '+ textTyped)}

        }}
    
      />  
    </div>
    
  );
}

export default ChordTextInput;
