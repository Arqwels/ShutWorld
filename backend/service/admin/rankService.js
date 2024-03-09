const fs = require('fs');
const path = require('path');
const assetsFolder = path.join(__dirname, '..', '..', 'upload');

class RankService {
  async imageUpload(nameImg) {
    console.log(nameImg);
    if (!nameImg) {
      return { error: 'Файл не загружен' };
    }
    const fileName = nameImg.name;
    const filePath = path.join(assetsFolder, fileName);
    // Проверяем наличие файла
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      console.log("Фото с именем", fileName, "уже существует в папке", assetsFolder);
      return { error: 'Файл с таким именем уже существует' };
    } catch (err) {
      // Файл не найден, можно загружать
      nameImg.mv(filePath);
      console.log("Фото загружено в", filePath);
      return { success: true, fileName: fileName }; // Возвращаем относительный путь файла
    }
  }

  async imageDelete(nameImg) {
    if (!nameImg) {
      return { error: 'Файл не загружен' };
    }
    const filePath = path.join(assetsFolder, nameImg);
    try {
      await fs.promises.unlink(filePath);
      return { success: true, message: `Файл ${nameImg} успешно удалён` };
    } catch (error) {
      return { success: false, message: `Ошибка при удалении файла ${nameImg}`, error: error };
    }
  }
}

module.exports = new RankService();
