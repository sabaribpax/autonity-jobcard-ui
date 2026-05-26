const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.zohoProxy = onRequest({ cors: true, invoker: 'public' }, async (request, response) => {
  try {
    const apiRes = await fetch("https://www.zohoapis.in/creator/custom/autonity/getLiveJobCards?publickey=hndKfqAt3sns41W96ugad40RQ");
    if (!apiRes.ok) {
        throw new Error(`HTTP error! status: ${apiRes.status}`);
    }
    const data = await apiRes.json();
    response.status(200).json(data);
  } catch (error) {
    logger.error("Error fetching from Zoho", error);
    response.status(500).send({ error: "Failed to fetch data", details: error.message });
  }
});
