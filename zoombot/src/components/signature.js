
const KJUR = require("jsrsasign");

export const generateZoomSignature = (apiKey, apiSecret, meetingNumber, role) => {

    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: "HS256", typ: "JWT" };

    const oPayload = {
      sdkKey: apiKey,
      appKey: apiKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      tokenExp: exp,
      
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    const signature = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      apiSecret
    );

    return signature;



};
    









