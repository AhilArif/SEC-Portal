const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Form = mongoose.model("Form");
const Notification = mongoose.model("Notification");
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
// 
require('dotenv').config();
// 
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


// nodemailer
async function mailer(recieveremail, code) {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "bscs2012372@szabist.pk", // generated ethereal user
            pass: "lgovjmmputavceum", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'bscs2012372@szabist.pk', // sender address
        to: `${recieveremail}`, // list of receivers
        subject: "Signup Verification", // Subject line
        text: `Your Verification Code is ${code}`, // plain text body
        html: `<b>Your Verification Code is ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

//

router.post('/signup', async (req, res) => {
    // console.log('sent by client - ', req.body);
    const { name, email, password } = req.body;


    const user = new User({
        name,
        email,
        password,
    })

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ message: "A Verification Code is been send to your email!", token });
    }
    catch (err) {
        console.log(err);
    }

})


router.post('/verify', (req, res) => {
    console.log('sent by client - ', req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password ) {
        return res.status(422).json({ error: "Please add all the fields" });
    }


    User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" });
            }
            try {

                let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                let user = [
                    {
                        name,
                        email,
                        password,
                        VerificationCode
                    }
                ]
                await mailer(email, VerificationCode);
                res.send({ message: "Verification Code Sent to your Email", udata: {
                    name,
                    email,
                    password,
                    VerificationCode
                } });
            }
            catch (err) {
                console.log(err);
            }
        })


})



router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }
    const savedUser = await User.findOne({ email: email })

    if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
    }

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Password matched");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            else {
                console.log('Password does not match');
                return res.status(422).json({ error: "Invalid Credentials" });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/form', async (req, res) => {
    const { eventname, eventdate, eventlocation, budget, expenses, revenue } = req.body;

    if (!eventname || !eventdate || !eventlocation || !budget || !expenses || !revenue) {
        return res.status(422).json({ error: "All fields are required." });
    }

    try {
        const form = new Form({
            eventname,
            eventdate,
            eventlocation,
            budget,
            expenses,
            revenue
        });

        await form.save();
        res.status(201).json({ message: "Form submitted successfully" });
        console.log("form recived");
    } catch (error) {
        res.status(500).json({ error: "An error occurred while submitting the form" });
        console.log("form not saved");
    }
});

//show all users funtion
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//delete funtion user
router.delete('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
// find & update user by using email funtion
router.put('/users/update-email-password', async (req, res) => {
    const { email, newEmail, newPassword } = req.body;
  
    console.log("Received request to update user:");
    console.log("Current Email:", email);
    console.log("New Email:", newEmail);
    console.log("New Password:", newPassword);
  
    if (!email || !newEmail || !newPassword) {
      console.log("Missing fields");
      return res.status(422).json({ error: "Please provide current email, new email, and new password" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log("User found:", user);
  
      // Hash the new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 8);
  
      // Update user details
      user.email = newEmail;
      user.password = hashedPassword; // Replace old hash with new one
  
      // Save the updated user to the database
      await user.save();
  
      console.log("User updated successfully");
  
      res.json({ message: "User email and password updated successfully" });
    } catch (error) {
      console.log("Error occurred while updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });


//show all forms
router.get('/form', async (req, res) => {
    try {
        const forms = await Form.find({});
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Fetch all notifications for admin to review

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});


//suggestion save and reject and sends notification
router.put('/forms/:id', async (req, res) => {
    const { id } = req.params;
    const { status, suggestion } = req.body;

    try {
        const updatedForm = await Form.findByIdAndUpdate(
            id,
            { status, suggestion },
            { new: true }
        );

        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // Create a notification for the user with the specific userId
        await Notification.create({
            userId: new ObjectId("66cb78df3ad27c860f700871"), // The userId you provided
            message: `Your form has been ${status}. Feedback: ${suggestion}`,
            type: status,
        });

        console.log(`Form ${id} updated to status: ${status}`);
        res.json(updatedForm);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'Error updating form' });
    }
});

router.get('/notification', async (req, res) => {
    const userId = "66cb78df3ad27c860f700871"; // The userId you provided

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
        const notifications = await Notification.find({ userId: new mongoose.Types.ObjectId(userId) });
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});


//Search request
router.get('/search', async (req, res) => {
    try {
      const query = req.query.query;
      const forms = await Form.find({ eventname: new RegExp(query, 'i') });
      res.json({ forms });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).send('Error occurred while searching.');
    }
  });
  

module.exports = router;