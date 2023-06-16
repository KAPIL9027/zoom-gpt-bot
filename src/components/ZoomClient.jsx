import React from 'react'
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
const ZoomClient = () => {

    const client = ZoomMtgEmbedded.createClient()
    let authEndpoint = ''
    let sdkKey = 'y6XHYlYmQFmraSa7pAepfg'
    let signature='Bt3BCyHLSKiV5FLEaxcr2fFxN4cuhmGO'
    let meetingNumber = '2874532767'
    let passWord = ''
    let role = 0
    let userName = 'React'
    let userEmail = ''
    let registrantToken = ''
    let zakToken = ''

//   function getSignature(e) {
//     e.preventDefault();

//     fetch(authEndpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         meetingNumber: meetingNumber,
//         role: role
//       })
//     }).then(res => res.json())
//     .then(response => {
//       startMeeting(response.signature)
//     }).catch(error => {
//       console.error(error)
//     })
//   }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });

    client.join({
    	sdkKey: sdkKey,
        signature:signature,
    	meetingNumber: meetingNumber,
    	password: passWord,
    	userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken
    })
  }
  return (
    <div className="zoom-client">
       <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={startMeeting}>Join Meeting</button>
      </main>
    </div>
  )
}

export default ZoomClient
