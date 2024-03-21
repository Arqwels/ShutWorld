const path = require('path');
const fs = require('fs');
const Image = require('../../models/imagesModel');
const imagesService = require('../../service/imagesService');

class ImageController {
  async uploadImg(req, res) {
    try {
      const result = await imagesService.uploadImage(req.file);
      console.log(result.id);
      // const { originalname, buffer } = req.file;
      // // Проверяем, что файл имеет допустимое расширение
      // const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      // const fileExtension = originalname.substring(originalname.lastIndexOf('.')).toLowerCase();

      // if (!allowedExtensions.includes(fileExtension)) {
      //   return res.status(400).json({ status: false, message: 'Расширение файла не подходит!'});
      // }

      

      // await Image.create({ filename: originalname, data: buffer });
      res.status(201).send('Фото умешно загружено!');
    } catch (error) {
      console.log(345345345);
      console.error(error);
      res.status(500).send('Ошибка сервера');
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
