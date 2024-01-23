const postVKController = require('../../controllers/postVKController');

// module.exports = async (req, res) => {
//   try {
//     await postVKController.savePost();
//     console.log("Данные о постах ВК были получены!");
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('⛔ Ошибка:', error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const handler = async (req, res) => {
  try {
    console.log("123!!--")
    return res.status(200).json({ success: "Всё ништяк!" })
  } catch (error) {
    return res.status(500).json({ error: "Error! 500 =/" })
  }
}

export default handler;