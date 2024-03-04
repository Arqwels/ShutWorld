const path = require('path');
const assetsFolder = path.join(__dirname, '..', '..', 'upload');

const absoluteFol = path.join(__dirname, '..', '..');

class ImageController {


  async sendImg(req, res) {
    try {
      const filename = req.params.filename;
      console.log(assetsFolder);
      res.sendFile(path.join(assetsFolder, filename));
    } catch (error) {
      console.log(error);
    }
  }


  


  async getDataRank(req, res) {
    try {
      console.log(req.body);
      res.status(200).json({ message: 'Good!2' })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImageController();
