const fs = require("fs");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync("private.key");

const payload = {
  ref: "agent-01",
  domainRef: "domain-01",
  aor: "sip:1001@sip.local",
  aorLink: "sip:asterisk@sip.local",
  domain: "sip.local",
  privacy: "NONE",
  allowedMethods: ["INVITE", "REGISTER"]
};

const signOptions = { expiresIn:  "1h", algorithm:  "RS256" };
const token = jwt.sign(payload, privateKey, signOptions);

console.log("Token: " + token);