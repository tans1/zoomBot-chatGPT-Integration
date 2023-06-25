import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import { ZoomMtg } from '@zoomus/websdk';
import { generateZoomSignature } from './signature';
import SpeechText from './speechController';



function Meeting() {
  
  const meetingURL = "https://us05web.zoom.us/j/4030915746?pwd=VTEwck53a3ZrYWJpaFZ6eTV2OGlHZz09"
  


  useEffect(() => {
    const passWord = meetingURL.split("?")[1].split("=")[1];
    const meetingNumber = meetingURL.split("?")[0].split("/")[4];

    const signature = async () => {
      return await generateZoomSignature(
        "AoAAJGHxRxmuTb1z5bH4hg",
        "lQIwr8UDZKk19WWbjKli9uIrqZ1FnzMe",
        meetingNumber,
        0
      );
    }

    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      success: async (success) => {

        const generatedSignature = await signature();

        ZoomMtg.join({
          signature: generatedSignature,
          sdkKey: "AoAAJGHxRxmuTb1z5bH4hg",
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: 'ZoomBOT',
          success: (success) => {

            const micContainer = document.createElement("div");
            micContainer.setAttribute("id", "custom-foot-bar");

            document.getElementsByClassName("footer__btns-container")[0].appendChild(micContainer);
            ReactDOM.render(
              <SpeechText />,
              document.getElementById("custom-foot-bar")
            );
          },
          error: (error) => {
            console.log('Failed to join the meeting.', error);
          },
        });
      },
      error: (error) => {
        console.log('Failed to initialize the Zoom Web SDK.', error);
      },
    });
  }, [meetingURL]);


  return (<></>);

}

export default Meeting;

