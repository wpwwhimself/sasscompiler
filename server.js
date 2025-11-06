import express from "express";
import bodyParser from "body-parser";
import sass from "sass";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: "1mb" }));

// Endpoint to compile SCSS
app.post("/compile-scss", (req, res) => {
  const { scss, options } = req.body;

  if (!scss) {
    return res.status(400).json({ error: "Missing 'scss' in request body" });
  }

  try {
    const result = sass.compileString(scss, options || {});
    res.type("text/css").send(result.css);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ SCSS compiler service running on port ${PORT}`);
});
