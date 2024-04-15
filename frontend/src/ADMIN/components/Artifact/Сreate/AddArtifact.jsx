import WrapperComponent from "../../../../pages/WrapperComponent";
import { useNavigate } from "react-router-dom";
import st from '../../../Admin.module.scss';
import { createRef, useState } from "react";
import AdminService from "../../../../service/AdminService";

const AddArtifact = () => {
  const navigate = useNavigate();

  // Фото
  const fileInput = createRef();

  // ID артефакта
  const [ idArtifact, setIdArtifact ] = useState('');

  // Name артефакта
  const [ nameArtifact, setNameArtifact ] = useState('');

  // Price артефакта
  const [ priceArtifact, setPriceArtifact ] = useState('');

  // MaxCount артефакта
  const [ maxCountArtifact, setMaxCountArtifact ] = useState('1');

  // Description артефакта
  const [ descriptionArtefact, setDescriptionArtifact ] = useState('');

  // Выбранное изображение
  const [selectedImage, setSelectedImage] = useState(null);




  // Состояние для idArtifact
  const changeIdArtifact = (event) => {
    setIdArtifact(event.target.value);
  }

  // Состояние для nameArtifact
  const changeNameArtifact = (event) => {
    setNameArtifact(event.target.value);
  }

  // Состояние для priceArtifact
  const changePriceArtifact = (event) => {
    setPriceArtifact(event.target.value);
  }

  // Состояние для maxCountArtifact
  const changeMaxCountArtifact = (event) => {
    setMaxCountArtifact(event.target.value);
  }

  // Состояние для descriptionArtefact
  const changeDescriptionArtefact = (event) => {
    setDescriptionArtifact(event.target.value);
  }

  // Обработчик изменения файла
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // Форма для отправки
  const handlerSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('photo', fileInput.current.files[0]);
    formData.append('idName', idArtifact);
    formData.append('name', nameArtifact);
    formData.append('price', priceArtifact);
    formData.append('maxCount', maxCountArtifact);
    formData.append('description', descriptionArtefact);

    console.log(645564456);
    try {
      const result = await AdminService.addArtifact(formData);

      console.log(3434534);
      console.log(result);
      alert(result.data.message)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WrapperComponent>
      <div className={st.wrap}>
        <h2>Добавление нового артефакта.</h2>
        <form onSubmit={handlerSubmit} className={st.form}>

          <label className={st.labelTitle}>Введите ID артефакта.</label>
          <input 
            type="text"
            name="idArtifact"
            value={idArtifact}
            onChange={changeIdArtifact}
            placeholder="Введите уникальный id для артефакта"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Введите название артефакта.</label>
          <input 
            type="text"
            name="nameArtifact"
            value={nameArtifact}
            onChange={changeNameArtifact}
            placeholder="Введите название артефакта"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Введите цену артефакта.</label>
          <input 
            type="text"
            name="priceArtifact"
            value={priceArtifact}
            onChange={changePriceArtifact}
            placeholder="Введите цену артефакта"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Введите максимальное кол-во артефактов.</label>
          <input 
            type="text"
            name="maxCountArtifact"
            value={maxCountArtifact}
            onChange={changeMaxCountArtifact}
            placeholder="Максимальное кол-во которое можно купить"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Введите описание артефакта.</label>
          <textarea 
            name="description"
            rows="5"
            value={descriptionArtefact}
            onChange={changeDescriptionArtefact}
            placeholder="Придумайте интересное описание для артефакта"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Фото для артефакта.</label>
          <input
            type="file"
            name="photo"
            ref={fileInput}
            className={st.fileInput}
            onChange={handleFileChange}
          />
          {selectedImage && (
            <div className={st.selectedImageContainer}>
              <img src={selectedImage} alt="Selected" className={st.selectedImage} />
            </div>
          )}
          
          <button type="submit" className={st.submitBtn}>Добавить</button>
        </form>
      </div>
      <div className={st.goBack}>
        <button onClick={() => navigate(-1)} className={st.goBackBtn}>Назад</button>
      </div>
    </WrapperComponent>
  );
};

export default AddArtifact;