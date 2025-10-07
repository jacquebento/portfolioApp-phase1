const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

const app = express();

// Apply Helmet middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"], // allow React/CDN scripts
        styleSrc: ["'self'", "'unsafe-inline'"],          // allow inline styles
        imgSrc: ["'self'", "data:", "https:"],            // allow local + remote images
        connectSrc: ["'self'"],                           // restrict API requests
      },
    },
    frameguard: { action: "deny" },   // X-Frame-Options: DENY
    xssFilter: true,                  // sets X-XSS-Protection
    hidePoweredBy: true,              // removes X-Powered-By header
    noSniff: true,                    // X-Content-Type-Options: nosniff
    hsts: { maxAge: 31536000 },       // Strict-Transport-Security (1 year)
  })
);

// Example route
app.get("/", (req, res) => {
  res.send("This is the HTTPS server");
});

// Load SSL cert + key
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(3001, () => {
  console.log("HTTPS server running at https://localhost:3001");
});

//5 routes
//GET/posts - cache for 5 minutes
app.get('/posts', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  res.json({ posts: ["Post 1", "Post 2"] });
});

//GET/posts/:id - cache for 5 minutes
app.get('/posts/:id', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json({ id: req.params.id, content: "This is a single post." });
});

//Post/posts - new blog posts -  no cache
app.post('/posts', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ message: "Post created successfully!" });
});

//GET/profile/:username - user profile display -  cache for 2 minutes
app.get('/profile/:username', (req, res) => {
  res.set('Cache-Control', 'public, max-age=120');
  res.json({ username: req.params.username, bio: "Developer bio" });
});

//POST/contact - let users send message to the owner - no cache
app.post('/contact', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ message: "Your message has been sent!" });
});

