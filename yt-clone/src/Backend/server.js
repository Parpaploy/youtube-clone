const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { swaggerSpec, swaggerUi } = require("./swagger");

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

/**
 * @swagger
 * /:
 *  get:
 *      summary: Retrieve a list of videos.
 *      responses:
 *          '200':
 *              description: A JSON array of videos.
 */
app.get("/", (req, res) => {
  const query = `SELECT vl.video_id, vl.video_title, vl.video_url, vl.video_thumbnail, vl.video_created_at,
    c.channel_id, c.channel_name, c.channel_profile_picture, 
    p.view_count 
    FROM videos_long vl 
    JOIN channels c ON vl.channel_id = c.channel_id 
    JOIN popular p ON vl.video_id = p.video_id`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } else {
      res.send(result);
    }
  });
});

/**
 * @swagger
 * /:
 *  get:
 *      summary: Retrieve a list of shorts.
 *      responses:
 *          '200':
 *              description: A JSON array of shorts.
 */
app.get("/short", (req, res) => {
  const query = `SELECT vs.video_id, vs.video_title, vs.video_url, vs.video_thumbnail, vs.video_created_at,
    c.channel_id, c.channel_name, c.channel_profile_picture, 
    p.view_count 
    FROM videos_short vs
    JOIN channels c ON vs.channel_id = c.channel_id 
    JOIN popular p ON vs.video_id = p.video_id`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } else {
      res.send(result);
    }
  });
});

/**
 * @swagger
 * /subscribe:
 *  get:
 *      summary: Retrieve a list of subscribed channels for user.
 *      parameters:
 *          - in: query
 *            name: user_id
 *            required: true
 *            description: The ID of the user.
 *            schema: string
 *      responses:
 *          '200':
 *              description: A JSON array of subscribed channels.
 */
app.get("/subscribe", (req, res) => {
  const user_id = req.query.user_id;
  if (!user_id) {
    res.status(400).send("กรุณาระบุ user_id");
    return;
  }

  const query = `SELECT u.user_id, u.user_profile_picture,
  c.channel_id, c.channel_name, c.channel_profile_picture
  FROM users u
  JOIN channel_subscribe cs ON u.user_id = cs.user_id
  JOIN channels c ON cs.channel_id = c.channel_id
  WHERE u.user_id = ?`;

  const values = [user_id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } else {
      res.send(result);
    }
  });
});

/**
 * @swagger
 * /result:
 *  get:
 *      summary: Search for videos based on query.
 *      parameters:
 *          - name: search_query
 *            in: query
 *            required: true
 *            description: The search query.
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: A JSON array of videos.
 */
app.get("/result", (req, res) => {
  try {
    const { search_query } = req.query;
    console.log(search_query);
    if (!search_query) {
      return res.status(400).send("กรุณาระบุคำค้นหา");
    }

    const query = `SELECT v.video_id, v.video_title, v.video_created_at, v.video_thumbnail, v.video_description,
c.channel_name AS channel_name, c.channel_profile_picture,
p.view_count
FROM videos_long v
JOIN channels c ON v.channel_id = c.channel_id
JOIN popular p ON v.video_id = p.video_id
WHERE v.video_title LIKE ? OR c.channel_name LIKE ?;
`;

    db.query(
      query,
      [`%${search_query}%`, `%${search_query}%`],
      (err, result) => {
        if (err) {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
          res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /watch:
 *  get:
 *      summary: Retrieve details of a specific video.
 *      parameters:
 *          - name: v
 *            in: query
 *            required: true
 *            description: The video ID.
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: A JSON array containing details of the video.
 */
app.get("/watch", (req, res) => {
  console.log(req.query);
  const { v } = req.query;
  if (!v) {
    res.status(400).send("Invalidvideo parameter");
    return;
  }

  const query = `
    SELECT 
    vl.video_id,
    vl.video_title,
    vl.video_description,
    vl.video_duration,
    vl.video_thumbnail,
    vl.video_url,
    vl.video_created_at,
    c.channel_name,
    c.channel_profile_picture,
    p.view_count,
    p.like_count,
    (SELECT COUNT(*) FROM channel_subscribe WHERE channel_id = vl.channel_id AND user_id = ?) AS is_subscribe,
    (
    SELECT GROUP_CONCAT(CONCAT(u.user_name, ': ', cm.comment_text) ORDER BY cm.comment_created_at SEPARATOR '\n')
    FROM comments cm
    JOIN users u ON cm.user_id = u.user_id
    WHERE cm.video_id = vl.video_id
    ) AS comments
FROM videos_long vl
JOIN channels c ON vl.channel_id = c.channel_id
JOIN popular p ON vl.video_id = p.video_id
WHERE vl.video_id = ?;
`;

  db.query(query, [v, v], (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } else {
      const video = result[0];
      const comments = video.comments.split("\n").map((comment) => {
        const [username, content] = comment.split(": ");
        return { [username]: { content } };
      });
      video.comments = comments;
      res.json([video]);
    }
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
