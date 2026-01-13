import multer from "multer";
import cors from "cors";

const upload = multer({
  limits: { fileSize: 300 * 1024 * 1024 }
});

export default function handler(req, res) {
  cors()(req, res, () => {

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    upload.single("video")(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message });

      const video = req.file;
      const caption = req.body.caption;

      if (!video) {
        return res.status(400).json({ error: "No video uploaded" });
      }

      console.log("Video received:", video.originalname);
      console.log("Caption:", caption);

      // TikTok API goes here later

      res.json({ success: true });
    });
  });
}
