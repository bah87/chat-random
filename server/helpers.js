/**
 * Parses user message and implements basic slash commands from IRC
 * TODO: Improve with regex
 */
exports.ircHelper = body => {
  console.log("ircHelper called with: ", body);
  const command = body.slice(0, 6);

  let delay = 0;
  let newBody = body;
  let hop = false;
  if (command === "/delay") {
    const rest = body.slice(7).split(" ");
    delay = parseInt(rest[0]);
    newBody = rest.slice(1).join(" ");
  } else if (command === "/hop") {
    hop = true;
  }

  console.log("ircHelper returning: ", delay, newBody, hop);
  return { delay, newBody, hop };
};
