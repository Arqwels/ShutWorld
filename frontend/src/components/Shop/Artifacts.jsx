import { Fragment, useEffect, useState } from "react"
import { SERVER_URL, PRODUCTION_SERVER_URL } from "../../utils/env";
import AbsentRank from "../../assets/images/ShopPage/absent-product.png";
import st from "./ShopStyles.module.scss";
import ArtifactService from "../../service/ArtifactService";
import ModalArtifact from "./Modals/ModalArtifactsShop";
import SortCustomRadio from "./Inputs/SortCustomRadio";

const Artifact = () => {
  const [ modals, setModals ] = useState([]);
  const [ artifacts, setArtifacts ] = useState([]);
  const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_SERVER_URL : SERVER_URL;

  const openModal = (index) => {
    const newModal = { index, isOpen: true };
    setModals([...modals, newModal]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (index) => {
    const updatedModals = modals.filter((_, i) => i !== index);
    setModals(updatedModals);
    document.body.style.overflow = '';
  };

  // Сортировка
  const [ sortOpen, setSortOpen ] = useState(false);
  const [ sortingStatus, setSortingStatus ] = useState('сначала новинки');

  // Функция для сортировки артефактов
  const sortArtifacts = (artifacts, sortingStatus) => {
    switch (sortingStatus) {
      case 'сначала новинки':
        return [...artifacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'сначала старые':
        return [...artifacts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'сначала дорогие':
        return [...artifacts].sort((a, b) => b.price - a.price);
      case 'сначала недорогие':
        return [...artifacts].sort((a, b) => a.price - b.price);
      default:
        return artifacts;
    }
  };

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await ArtifactService.getAllArtifact();
        const sortedArtifacts = sortArtifacts(response.data, sortingStatus);
        setArtifacts(sortedArtifacts);
      } catch (error) {
        console.error("Ошибочка при получении Рангов:", error);
      }
    };
    fetchArtifact();
  }, [sortingStatus]);

  return (
    <Fragment>
      <div className={st.donate}>
        <div className={st.titleCard}>
          <h2>Артефакты</h2>
          <div className={st.sortBody}>
            <button onClick={() => setSortOpen(!sortOpen)}>Сортировка: <span>{sortingStatus}</span></button>
            
            {sortOpen && (
            <ul className={st.listSort}> 
              <li>
                <SortCustomRadio 
                  id="newest"
                  name="sorting"
                  value="newest"
                  label="сначала новинки"
                  checked={sortingStatus === 'сначала новинки'}
                  onChange={() => setSortingStatus('сначала новинки')}
                />
              </li>
              <li>
                <SortCustomRadio 
                  id="oldest"
                  name="sorting"
                  value="oldest"
                  label="сначала старые"
                  checked={sortingStatus === 'сначала старые'}
                  onChange={() => setSortingStatus('сначала старые')}
                />
              </li>
              <li>
                <SortCustomRadio 
                  id="expensive"
                  name="sorting"
                  value="expensive"
                  label="сначала дорогие"
                  checked={sortingStatus === 'сначала дорогие'}
                  onChange={() => setSortingStatus('сначала дорогие')}
                />
              </li>
              <li>
                <SortCustomRadio 
                  id="inexpensive"
                  name="sorting"
                  value="inexpensive"
                  label="сначала недорогие"
                  checked={sortingStatus === 'сначала недорогие'}
                  onChange={() => setSortingStatus('сначала недорогие')}
                />
              </li>
            </ul>
            )}
          </div>
        </div>
        <div className={st.wrapCard}>

          {artifacts.length > 0 ? (
            artifacts.map(artifact => (
              <div key={artifact.id} className={st.card}>
                <img src={`${baseURL}api/images/${artifact.imageId}`} alt="Artifact" />
                <div className={st.cardText}>
                  <h2>{artifact.name} <br/>от <span>{artifact.price}</span>₽</h2>
                  <button onClick={() => openModal(artifact.id, "Artifacts")} className={st.btn}>Приобрести</button>
                </div>
              </div>
            ))
          ) : (
            <div className={`${st.card} ${st.absentCards}`}>
              <img src={AbsentRank} alt="Rank" />
              <div className={st.cardText}>
                <h2>Товар отсутствует</h2>
              </div>
            </div>
          )}
        </div>
      </div>

      {modals.map((modal, index) => {
        const artifact = artifacts.find(artifact => artifact.id === modal.index);          

        return (
          <ModalArtifact 
            key={index}
            isOpen={modal.isOpen}
            descriptionTitle={artifact.name}
            descriptionText={artifact.description}
            priceOnePiece={artifact.price}
            maxCount={artifact.maxCount}
            onClose={() => closeModal(index)}
          />
        );
      })}
    </Fragment>
  )
}

export default Artifact;