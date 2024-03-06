const path = require('path');
const assetsFolder = path.join(__dirname, '..', '..', 'upload');

class ImageController {


  async sendImg(req, res) {
    try {
      const filename = req.params.filename;
      console.log(123);
      res.sendFile(path.join(assetsFolder, filename));
    } catch (error) {
      console.log(error);
    }
  }





}

module.exports = new ImageController();
