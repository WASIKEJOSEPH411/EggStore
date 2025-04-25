
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();
const router = express.Router();

// Get M-Pesa Access Token
const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (err) {
    console.error("Access token error:", err.response?.data || err.message);
    throw err;
  }
};

// STK Push Endpoint
router.post("/stkpush", async (req, res) => {
  let { phone, amount } = req.body;

  //  Validate and sanitize phone numbe
  if (!phone || !/^(?:2547\d{8})$/.test(phone)) {
    return res.status(400).json({
      error: "Invalid phone number. Must start with 2547 and be 12 digits.",
    });
  }

  // Fallback amount
  if (!amount || isNaN(amount)) amount = 1;

  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  try {
    const token = await getAccessToken();

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "EggStore",
        TransactionDesc: "Payment for ALISWA SHOP",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("STK Push Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "STK Push failed",
      details: err.response?.data || err.message,
    });
  }
});

// Callback URL (for receiving M-Pesa payment results)
router.post("/callback", (req, res) => {
  console.log("M-Pesa Callback:", JSON.stringify(req.body, null, 2));
  res.status(200).send("Callback received");
});


export default router;
