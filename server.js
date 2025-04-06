const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Gmail App Password setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mananbagrecha57@gmail.com',
    pass: 'mtnt tgjs zfjj frjh' // Replace with a secure method in production
  }
});

app.post('/checkout', async (req, res) => {
    const { cart, totalPrice } = req.body;
  
    const formatted = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    const content = `Order Summary:\n${formatted}\nTotal: ₹${totalPrice}`;
  
    const mailOptions = {
      from: 'mananbagrecha57@gmail.com',
      to: 'mananbagrecha57@gmail.com',
      subject: 'New Order from Swiggy Clone',
      text: content
    };
  
    try {
      console.log('⏳ Sending email...');
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent.');
  
      res.status(200).json({ message: 'Order submitted!' });
    } catch (error) {
      console.error('❌ Error sending email:', error);
      res.status(500).json({ error: 'Failed to send order email.' });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
