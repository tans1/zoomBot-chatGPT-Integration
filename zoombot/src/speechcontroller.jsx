import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import styles from "./speechStyle.css"
import {chatgptReaponse} from "chatGPT_controller"

function SpeechText() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [reading, setReading] = useState(false);

  useEffect(() => {
    if (reading === true) {
      setReading(true);
    } else {
      setReading(false);
    }
  }, [reading]);


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser does not support Speech Recognition.
      </div>
    );
  }

  const handleListing = () => {
    setListening(true);
    setReading(false);

    console.log("listening")

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const StopListening = () => {
    setListening(false);

    console.log("stoped listening")

    if (!listening) {
      SpeechRecognition.stopListening();
    }
  };

  const respondRequest = async () => {

    setListening(false);
    
    console.log(transcript);

    const result = await chatgptReaponse(transcript);

    setReading(true);

    var synthesis = window.speechSynthesis;
    if ("speechSynthesis" in window) {
      var voice = synthesis
        .getVoices()
        .filter(function (voice) {
          return voice.lang === "en";
        })[0];

      var utterance = new SpeechSynthesisUtterance(result);
      utterance.voice = voice;
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
      utterance.volume = 1;

      synthesis.speak(utterance);
      setReading(false);
    } else {
      console.log("Text-to-speech not supported.");
    }
    resetTranscript();

  };

  const StopReading = () => {
    setReading(false);
    if (!reading) {
      window.speechSynthesis.StopReading();
    }
  };

  return (
    <div className="sound_controller" style={styles}>
      <div className={`mic-container`}
        onClick={listening ? StopListening : handleListing}>
        {listening && <div className="recording"></div>}
        <span className="material-symbols-outlined mic-icon">mic</span>
      </div>

      <div
        className={`play-container`}
        onClick={reading ? StopReading : respondRequest}
      >
        {reading ?
         
         <> <div className="reading"></div>
            <span className="material-symbols-outlined play-icon">pause</span> </>:
            <span className="material-symbols-outlined play-icon">play_arrow</span> 
        }
      </div>
    </div>
  );
}

export default SpeechText;
