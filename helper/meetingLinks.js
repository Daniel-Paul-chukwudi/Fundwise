
meetingLinks = [
    "https://meet.google.com/cwp-iriu-hct",
    "https://meet.google.com/fah-obkk-hmv",
    "https://meet.google.com/seq-hicy-ftq",
    "https://meet.google.com/psn-dtiy-xrn",
    "https://meet.google.com/vof-dtdb-yti"
]

// const { google } = require("googleapis");
// const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// const auth = new google.auth.GoogleAuth({
//   keyFile: "path-to-your-service-account.json",
//   scopes: SCOPES,
// });

// async function createGoogleMeetLink(email, summary = "Meeting with YATiCare") {
//   const authClient = await auth.getClient();
//   const calendar = google.calendar({ version: "v3", auth: authClient });

//   const event = {
//     summary,
//     start: {
//       dateTime: new Date(Date.now() + 5 * 60000).toISOString(), // 5 mins from now
//       timeZone: "Africa/Lagos",
//     },
//     end: {
//       dateTime: new Date(Date.now() + 35 * 60000).toISOString(), // 30 mins duration
//       timeZone: "Africa/Lagos",
//     },
//     attendees: [{ email }],
//     conferenceData: {
//       createRequest: {
//         requestId: `meet-${Date.now()}`,
//         conferenceSolutionKey: { type: "hangoutsMeet" },
//       },
//     },
//   };

//   const response = await calendar.events.insert({
//     calendarId: "primary",
//     resource: event,
//     conferenceDataVersion: 1,
//   });

//   const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;
//   console.log("Google Meet Link:", meetLink);
//   return meetLink;
// }

module.exports = meetingLinks