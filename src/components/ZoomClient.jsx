import {useState} from 'react'
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
const ZoomClient = () => {
    const [meetingId,setMettingId] = useState('')
    const [password,setPassword] = useState('')
    const [userEmail,setUserEmail] = useState('')

    const client = ZoomMtgEmbedded.createClient()
    let authEndpoint = 'http://localhost:5000/getSignature'
    let sdkKey = 'y6XHYlYmQFmraSa7pAepfg'
    let role = 0
    let userName = 'React'
    let registrantToken = ''
    let zakToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingId,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

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
      signature,
    	meetingNumber: meetingId,
    	password: password,
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
        <div>
          <label>MettingId</label>
          <input type='text' value={meetingId} onChange={(e)=>{setMettingId(e.target.value)}}/>
        </div>
        <div>
          <label>Passcode</label>
          <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  )
}

export default ZoomClient
