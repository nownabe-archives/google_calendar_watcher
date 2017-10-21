const google = require("googleapis");
const GoogleAuth = require("google-auth-library");

const credentials = require("./client_secret.json");
const token = require("./token.json");

function listCalendars(params) {
  const calendar = google.calendar("v3");

  return new Promise((resolve, reject) => {
    calendar.calendarList.list(params, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

const googleAuth = new GoogleAuth();
const auth = new googleAuth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);
auth.credentials = token;

exports.watchGoogleCalendar = (req, res) => {
  const sendError = () => res.send("error");
  const sendOk = () => res.send("ok");

  console.log(req.body);

  listCalendars({auth}).then(response => {
    console.log(response);
    sendOk();
  }).catch((err) => {
    console.error(err);
    sendError()
  });
};
