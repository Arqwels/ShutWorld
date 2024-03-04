const path = require('path');
const assetsFolder = path.join(__dirname, '..', '..', 'upload');

class ImageController {
  async uploadImg(req, res) {
    try {
      const { nameImg } = req.files;
      nameImg.mv(path.join(assetsFolder, nameImg.name));
      res.status(200).json({ message: 'Good!' })
    } catch (error) {
      console.log(error);
    }
  }

  async sendImg(req, res) {
    try {
      const filename = req.params.filename;
      res.sendFile(path.join(assetsFolder, filename));
    } catch (error) {
      console.log(error);
    }
  }

  async sendImage(req, res) {
    try {
      // const { fileImage } = req.files;
      console.log(req.files);
      const kkkkl = req.body
      console.log(kkkkl);
      res.status(200).json({ message: 'Good!' })
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
