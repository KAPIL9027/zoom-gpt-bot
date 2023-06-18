const KJUR = require('jsrsasign')
const express = require('express')
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
dotenv.config();
app.use(express.json());

function generateSignature(key, secret, meetingNumber, role) {

  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: key,
    appKey: key,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, secret)
  return sdkJWT
}

console.log()

app.post('/getSignature',async (req,res)=>{

    const signature = generateSignature(process.env.ZOOM_MEETING_SDK_KEY_OR_CLIENT_ID, process.env.ZOOM_MEETING_SDK_SECRET_OR_CLIENT_SECRET, req.body.meetingNumber, 0);
    res.status(201).json({signature});
})


app.listen('5000',(req,res)=>{
    console.log('Server started on the port 5000');
})