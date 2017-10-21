const fs = require("fs");
const readline = require("readline");
const google = require("googleapis");
const googleAuth = require("google-auth-library");

const credentials = require("./client_secret.json");

const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
const tokenPath = "./token.json";

const auth = new googleAuth();
const oauth2Client = new auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});
console.log("Authorize this app by visiting this url: ", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter the code from that page here: ", code => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('Error while trying to retrieve access token', err);
      return;
    }
    console.log(token)
    fs.writeFile(tokenPath, JSON.stringify(token));
    console.log("Token stored to " + tokenPath);
  });
});
