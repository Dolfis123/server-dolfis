const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const moment = require("moment-timezone");
const session = require("express-session");
const ketDomisiliUsaha = require("./routes/ketDomisiliUsahaRoute");
const ucapanSowiRoute = require("./routes/ucapanSowiRoute");
const loginRoute = require("./routes/loginRoute");
const newsRoutes = require("./routes/beritaRoute");
const employeeRoutes = require("./routes/employeeRoute");
const persyaratanLayananRoute = require("./routes/persyaratanLayananRoute");
const app = express();
const PORT = 5050;

const requireLogin = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ Status: "Error", Error: "Unauthorized" });
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ Status: "Error", Error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

const corsOptions = {
  origin: ["https://dolfis.store", "*"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/images", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/public/images", express.static("public/images"));
app.use("/public/uploads", express.static("public/uploads"));

app.use(ketDomisiliUsaha);
app.use(ucapanSowiRoute);
app.use(loginRoute);
app.use(newsRoutes);
app.use("/api", employeeRoutes);
app.use("/api", persyaratanLayananRoute);

app.use("/admin", requireLogin, (req, res, next) => {
  next();
});

app.get("/server", (req, res) => {
  console.log("dari frontend");
  res.send("Dari server");
});

// Tambahkan di bagian rute backend
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ Status: "Error", Error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Hapus cookie session
    return res.json({ Status: "Success", Message: "Logout successful" });
  });
});
app.listen(PORT, () => {
  console.log("Server running: ", PORT);
});
