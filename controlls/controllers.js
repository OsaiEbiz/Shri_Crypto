import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const decryptData = (data) => {
  try {
    const key = Buffer.from(process.env.CRYPTO_KEY, 'utf8');
    const iv = Buffer.from(process.env.CRYPTO_IV, 'utf8');
    const encryptedData = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv(process.env.ALGO, key, iv);
    let decrypt = decipher.update(encryptedData, 'base64', 'utf8');
    decrypt += decipher.final('utf8');
    return decrypt;
  } catch (error) {
    console.log(`Error in decryptData - ${error}`);
  }
};

const encryptData = (input) => {
  try {
    const key = Buffer.from(process.env.CRYPTO_E_KEY, 'utf8');
    const iv = Buffer.from(process.env.CRYPTO_E_IV, 'utf8');
    const cipher = crypto.createCipheriv(process.env.ALGO, key, iv);
    let encrypted = cipher.update(input, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } catch (error) {
    console.log(`Error in encryptData - ${error}`);
  }
};

export const updation = async (req, res) => {
  try {
    const fixedPayload = {
      name: process.env.Name,
      pwd: process.env.Pwd
    };
    const payload = JSON.stringify(fixedPayload);

    const fetchApiResponse = await axios.post(`https://cossvr.novactech.in/ServiceGateway/auth`, payload, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!fetchApiResponse || !fetchApiResponse.data) {
      return res.send({ status: 400, response: "Authentication failed" });
    }
    const authToken = fetchApiResponse.data;
    const input = req.body;
    if (Object.keys(input).length === 0) {
      return res.send({ status: 400, response: "Invalid Data" });
    }
    const requestId = input.RequestID;
    const requestIdPrefix = requestId.substring(0, requestId.indexOf("_"));
    const modifiedPayload = { ...input, RequestID: requestIdPrefix };
    const encryptedInput = await encryptData(JSON.stringify(modifiedPayload));
    const updatePayload = { req: encryptedInput };

    const updateApiResponse = await axios.post(`https://cossvr.novactech.in/ServiceGateway/RaiseMyRequest/DepositStatusUpdation`, updatePayload, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
    });
    const decryptedResponse = decryptData(updateApiResponse.data);
    const parsedData = JSON.parse(decryptedResponse);

    if (parsedData.statusCode === "200") {
      return res.send({ status: 200, response: decryptedResponse });
    } else {
      return res.send({ status: 400, response: decryptedResponse });
    }
  } catch (error) {
    console.log(`Error in updation process - ${error}`);
    return res.send({ status: 400, response: error.message || error.toString() });
  }
};
