import { connectDB } from "../db/client.js";

export const profilePictureUpload = (req, res) => {
    if (req.file) {
        res.send(`<div><h2>Here's the picture:</h2><img width="500" src='/uploads/${req.file.filename}'/></div>`);
    } else {
        res.send("No file uploaded.");
    }
};

export const getImagesUploaded = async (req, res) => {
    try {
        const result = await connectDB.query('SELECT * FROM pictures');
        let html = '<h2>Uploaded Pictures</h2><ul>';
        // Assuming pic_id is used as a unique identifier for the image
        result.rows.forEach(pic => {
          html += `<li><a href="/image/${pic.pic_id}" target="_blank">${pic.name}</a></li>`;
        });
        html += '</ul>';
        res.send(html);
      } catch (error) {
        console.error('Database Query Error:', error);
        res.status(500).send('Error retrieving pictures from database');
      }
};