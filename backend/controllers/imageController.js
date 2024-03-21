const Image = require('../models/imagesModel');
const imagesService = require('../service/imagesService');

class ImageController {
  async uploadImg(req, res) {
    try {
      const result = await imagesService.uploadImage(req.file);
      if (result) {
        return res.status(400).json({ status: false, message: result.message });
      }

      res.status(201).json({ status: true, message: 'Фото умешно загружено!' });
    } catch (error) {
      res.status(500).json({ status: true, message: 'Ошибка при загрузке фото!' });
    }
  }

  async gettingPhoto(req, res) {
    try {
      const image = await Image.findByPk(req.params.id);
      if (!image) {
        return res.status(404).json({ status: false, message: 'Фото не найдено!'});
      }
      res.setHeader('Content-Type', 'image/jpeg');
      res.status(200).send(image.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера при получении фото!');
    }
  }
}

module.exports = new ImageController();
