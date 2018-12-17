/**
 * Parses user message and implements basic slash commands from IRC
 * TODO: Improve with regex
 */
exports.ircHelper = body => {
  console.log("ircHelper called with: ", body);

  let delay = 0;
  let newBody = body;
  if (body.slice(0, 6) === "/delay") {
    const rest = body.slice(7).split(" ");
    delay = parseInt(rest[0]);
    newBody = rest.slice(1).join(" ");
  }

  console.log("ircHelper returning: ", delay, newBody);
  return { delay, newBody };
};
