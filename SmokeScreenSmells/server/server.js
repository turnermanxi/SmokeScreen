require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Client, Environment } = require('square');
const axios = require('axios');
const path = require('path');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: ' https://thawing-wave-12596-662ff1110970.herokuapp.com/', 
    methods: ['GET', 'POST'], 
    credentials: true,
  }));

app.use(express.json());


app.use('/images', express.static(path.join(__dirname, '/images')));


console.log("Serving images from:", path.join(__dirname, '/images'));


const products = [
    { id: 1, name: 'Pink Puffer', price: 8.99, image: '/images/pinkpuffer.png', sceneId: 'Pinkpuffer', weightOz: 1 },
    { id: 2, name: 'Mean Green', price: 8.99, image: '/images/meangreen.png', sceneId: 'Meangreen', weightOz: 1 },
    { id: 3, name: 'Blue Monsoon', price: 8.99, image: '/images/bluemonsoon.png', sceneId: 'Bluemonsoon', weightOz: 1 },
    { id: 20, name: 'Discreet Linen', price: 2.99, image: '/images/discreetlinen.png', sceneId: 'Smokebomb', weightOz: 0.3 },
    { id: 22, name: 'Blossom Distraction', price: 2.99, image: '/images/blossomdistraction.png', sceneId: 'Smokebombp', weightOz: 0.3 },
    { id: 23, name: 'Weeki Teaki', price: 2.99, image: '/images/weakiteaki.png', sceneId: 'Smokebombb', weightOz: 0.3 },
    { id: 27, name: 'Rolling Tray', price: 17.99, image: '/images/rollingtrayred.png', sceneId: 'Rollingtrayred', weightOz: 2 }
];

const blogs = [
    {
        id: 1,
        title: 'Why Smokescreens Work So Well',
        excerpt: 'Discover the science and ingenuity behind our patented 2nd hand smoke filter...',
        content: '<p>Smokescreens use cutting-edge technology to...</p>',
        image: '/images/blog1.jpg',
        slug: 'why-smokescreens-work-so-well',
        publishedAt: '2024-10-01',
    },
    {
        id: 2,
        title: 'How to Use Smokescreens Effectively',
        excerpt: 'Maximize your experience with our step-by-step guide...',
        content: '<p>Step 1: Open the filter...</p>',
        image: '/images/blog2.jpg',
        slug: 'how-to-use-smokescreens',
        publishedAt: '2024-10-15',
    },
    // Add more blog posts here
];


// Initialize Square Client
const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
});

// Fetch all products endpoint
app.get('/api/products', (req, res) => {
    res.json(products);
});


app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});


app.get('/api/blogs/:slug', (req, res) => {
    const { slug } = req.params;
    const blog = blogs.find(b => b.slug === slug);
    if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blog);
});

app.post('/api/newsletter/subscribe', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    try {
      // Ensure the data center and API key are properly loaded from environment variables
      const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
      const apiKey = process.env.MAILCHIMP_API_KEY;
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  
      if (!dataCenter || !apiKey || !audienceId) {
        return res.status(500).json({ error: 'Mailchimp configuration is missing' });
      }
  
      // Construct the Mailchimp API URL
      const mailchimpUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
  
      // Make the API request to Mailchimp
      const mailchimpResponse = await axios.post(
        mailchimpUrl,
        {
          email_address: email,
          status: 'subscribed', // 'subscribed' for active users, 'pending' for double opt-in
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Mailchimp requires Bearer token for authentication
          },
        }
      );
  
      res.status(200).json({
        success: true,
        message: 'Subscription successful',
        data: mailchimpResponse.data,
      });
    } catch (error) {
      console.error('Mailchimp API Error:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to subscribe to the newsletter.',
        error: error.response?.data || error.message,
      });
    }
  });
  


  // UPS Rates API Endpoint
  app.post('/api/shipping/ups', async (req, res) => {
    console.log('Step 1: Incoming request:', req.body);
  
    const { destinationZip, weightOz } = req.body;
  
    try {
      const weightLbs = (weightOz / 16).toFixed(2); // Convert ounces to pounds
      console.log('Step 2: Converted weight (lbs):', weightLbs);
  
      const accessToken = await getAccessToken();
      if (!accessToken) {
        console.error('Step 3 Error: Failed to retrieve Access Token');
        return res.status(500).json({ error: 'Failed to obtain Access Token' });
      }
      console.log('Step 3: Access Token retrieved:', accessToken);
  
      const upsEndpoint = 'https://onlinetools.ups.com/rating/v1/rates'; // Sandbox endpoint
  
      const jsonRequest = {
        RateRequest: {
          Request: {
            TransactionReference: {
              CustomerContext: "Test Rate Request",
            },
            RequestAction: "Rate",
            RequestOption: "Shop",
          },
          Shipment: {
            Shipper: {
              Address: {
                PostalCode: process.env.ORIGIN_ZIP, 
                CountryCode: "US",
              },
            },
            ShipTo: {
              Address: {
                PostalCode: destinationZip,
                CountryCode: "US",
              },
            },
            Package: {
              PackagingType: {
                Code: "02", 
              },
              PackageWeight: {
                UnitOfMeasurement: {
                  Code: "LBS", 
                },
                Weight: weightLbs,
              },
            },
          },
        },
      };
  
      console.log('Step 5: JSON Request Payload:', jsonRequest);
  
      const upsResponse = await axios.post(upsEndpoint, jsonRequest, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Use Bearer token for authorization
        },
        timeout: 15000, 
      });
  
      console.log('Step 6: UPS Response:', upsResponse.data);
  
      const ratedShipment = upsResponse.data?.RateResponse?.RatedShipment;
      if (!ratedShipment || !ratedShipment[0]?.TotalCharges?.MonetaryValue) {
        console.error('No shipping rates available:', upsResponse.data);
        return res.status(400).json({ error: 'No shipping rates available.' });
      }
  
      const totalCost = parseFloat(ratedShipment[0]?.TotalCharges?.MonetaryValue);
      return res.json({ provider: 'UPS', shippingCost: totalCost });
    } catch (error) {
      console.error('Step 7 Error:', error.response?.data || error.message);
      return res.status(500).json({ error: 'Failed to fetch shipping rates.' });
    }
  });

  async function getAccessToken() {
    try {
      const data = qs.stringify({
        grant_type: 'client_credentials',
      });
  
      
      const auth = 'Basic ' + Buffer.from(`${process.env.UPS_CLIENT_ID}:${process.env.UPS_CLIENT_SECRET}`).toString('base64');
      console.log('Authorization Header:', auth);
  
      const response = await axios.post(
        'https://www.ups.com/security/v1/oauth/token', 
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth, 
          },
        }
      );
  
      console.log('Access Token Response:', response.data);
      return response.data.access_token; 
    } catch (error) {
      if (error.response) {
        console.error('Error obtaining Access Token:', JSON.stringify(error.response.data, null, 2));
        console.error('Error status:', error.response.status);
      } else {
        console.error('Error obtaining Access Token:', error.message);
      }
      return null;
    }
  }
  

// Payment Processing Endpoint
app.post('/api/payments', async (req, res) => {
    const { amount, currency = 'USD', sourceId } = req.body;
    const idempotencyKey = uuidv4();

    try {
        const response = await squareClient.paymentsApi.createPayment({
            sourceId,
            idempotencyKey,
            amountMoney: {
                amount: Math.round(amount * 100), // Amount in cents
                currency
            }
        });

        res.json({
            success: true,
            payment: response.result
        });

    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on  https://thawing-wave-12596-662ff1110970.herokuapp.com/${PORT}`);
});

