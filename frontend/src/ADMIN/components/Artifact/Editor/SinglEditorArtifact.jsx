import { useNavigate, useParams } from "react-router-dom"
import WrapperComponent from "../../../../pages/WrapperComponent"
import { useEffect, useState } from "react";
import ArtifactService from "../../../../service/ArtifactService";
import { PRODUCTION_SERVER_URL, SERVER_URL } from "../../../../utils/env";
import st from "../Artifact.module.scss";
import InputFromForm from "./InputFromForm";
import AdminService from "../../../../service/AdminService";

const SinglEditorArtifact = () => {
  const { artifactId } = useParams();
  const navigate = useNavigate();
  const [ imageId, setImageId ] = useState();
  const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_SERVER_URL : SERVER_URL;
  const [ id, setId ] = useState();

  // ID 
  const [ idName, setIdName ] = useState(artifactId);

  // Название артефакта
  const [ name, setName ] = useState('');

  // Цена артефакта
  const [ price, setPrice ] = useState('');

  // Максимальное кол-во
  const [ maxCount, setMaxCount ] = useState();

  // Описание артефакта
  const [ description, setDescription ] = useState('');

  const formSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      id: id,
      idName: idName,
      name: name,
      price: price,
      maxCount: maxCount,
      description: description
    };

    try {
      await AdminService.updateArtifact(requestData);
      alert("Данные успешно обновленны!");
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtifactService.getOneArtifact({ params: { idName: artifactId } })
        setId(response.data.id);

        setIdName(response.data.idName);
        setName(response.data.name);
        setPrice(response.data.price);
        setMaxCount(response.data.maxCount);
        setDescription(response.data.description);

        setImageId(response.data.imageId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [artifactId]);

  return (
    <WrapperComponent>
      <h2 className={st.snglEditTitle}>Изменение артефакта - {artifactId}</h2>
      <div className={st.bodyForm}>
        <form onSubmit={formSubmit} className={st.snglEditFrom}>
          <InputFromForm 
            id={'idName'}
            labelText={'ID:'}
            className={st.input}
            type={'text'}
            value={idName}
            onChange={(e) => setIdName(e.target.value)}
            required
          />

          <InputFromForm 
            id={'name'}
            labelText={'Название артефакта:'}
            className={st.input}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />

          <InputFromForm 
            id={'price'}
            labelText={'Цена артефакта:'}
            className={st.input}
            type={'text'}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <InputFromForm 
            id={'maxCount'}
            labelText={'Максимальное кол-во:'}
            className={st.input}
            type={'text'}
            value={maxCount}
            onChange={(e) => setMaxCount(e.target.value)}
            required
          />

          <label className={st.label}>Введите описание артефакта.</label>
          <textarea 
            name="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Придумайте интересное описание для артефакта"
            className={st.input}
            required
          />

          <button type='submit' className={st.submitEdit}>Отправить</button>
        </form>
        
        <img src={`${baseURL}api/images/${imageId}`} alt="Artifact" className={st.Image} />
      </div>

      <div className={st.goBack}>
        <button onClick={() => navigate(-1)} className={st.goBackBtn}>Назад</button>
      </div>
    </WrapperComponent>
  );
};

export default SinglEditorArtifact;