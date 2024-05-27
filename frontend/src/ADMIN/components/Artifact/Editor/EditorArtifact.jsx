import { Link, useNavigate } from "react-router-dom";
import WrapperComponent from "../../../../pages/WrapperComponent"
import st from '../../../Admin.module.scss';
import { useEffect, useState } from "react";
import ArtifactService from "../../../../service/ArtifactService";
import { ADMIN_SINGLE_EDIT_ARTIFACT } from "../../../../utils/consts";
import AdminService from "../../../../service/AdminService";

const EditorArtifact = () => {
  const navigate = useNavigate();
  const [ artifacts, setArtifacts ] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ArtifactService.getAllArtifact();
      setArtifacts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Ошибочка в получении артефактов:', error);
    }
  }

  const deleteArtifact = async (idNameArtifact) => {
    alert("Вы уверены, что хотите удалить артефакт?");
    const response = await AdminService.deleteArtifact(idNameArtifact);
    if(response.status === 200) {
      alert(response.data.message);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <WrapperComponent>
      <section className={st.editorDonate}>
        <h2>Редактирование данных о артефактах.</h2>

        <ul className={st.listData}>
          {artifacts.map(artifact => (
            <div key={artifact.id} className={st.listDataBody}>
              <li>ID: {artifact.idName}</li>
              <li>Название артефакта: {artifact.name}</li>
              <li>Цена артефакта: {artifact.price}₽</li>
              <li>Максимальное кол-во: {artifact.maxCount}</li>
              <li>Описание артефакта: {artifact.description}</li>

              <div className={st.editorBtns}>
                <Link to={`${ADMIN_SINGLE_EDIT_ARTIFACT.replace(':artifactId', artifact.idName)}`} className={`${st.btn} ${st.editBtn}`}>Редактирование</Link>
                <button onClick={() => deleteArtifact(artifact.idName)} className={`${st.btn} ${st.deleteBtn}`}>Удалить</button>
              </div>
            </div>
          ))}
        </ul>

        <div className={st.goBack}>
          <button onClick={() => navigate(-1)} className={st.goBackBtn}>Назад</button>
        </div>
      </section>
    </WrapperComponent>
  )
}

export default EditorArtifact