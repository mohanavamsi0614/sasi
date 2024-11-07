const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Finger = require("./db");
const nodemailer=require("nodemailer")
const cors=require("cors")
app.use(cors())
const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "mohanavamsi16@outlook.com",
      pass: process.env.PASS,
    },
  });
 
app.use(express.json());
app.get("/add", async (req, res) => {
    try {
        const { email, finger_id, time } = req.params;

        const finge = await Finger.findOne({ email });

        if (finge) {
            finge.times.push(time);
            await finge.save();
            var welcome = {
                from: "mohanavamsi14@gmail.com",
                to: email,
                subject: "finger",
                html: "<h1>Added your attrndence</h1>",
              }; 
              await transporter.sendMail(welcome)
            res.send("Time added to existing email");
        } else {
            const newFinger = new Finger({
                email,
                finger_id,
                times: [time]
            });
            var welcome = {
                from: "mohanavamsi14@gmail.com",
                to: email,
                subject: "finger",
                html: "<h1>Added your attrndence</h1>",
              }; 
              await transporter.sendMail(welcome)
            await newFinger.save();
            res.send("New email created and time added");
        }
    } catch (error) {
        res.status(500).send("Error processing request: " + error.message);
    }
});

const r = async () => {
    await mongoose.connect("mongodb+srv://mohanavamsi14:vamsi@cluster0.bk07f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
};

app.listen(6500, () => {
    r();
    console.log("Server running on port 6500");
});

