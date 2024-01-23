const postVKController = require('../controllers/postVKController');

module.exports = async (req, res) => {
  try {
    await postVKController.savePost();
    console.log("Данные о постах ВК были получены!");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('⛔ Ошибка:', error);
    res.status(500).send("Internal Server Error");
  }
};
