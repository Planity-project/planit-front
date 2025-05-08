import AlbumTitle from "./AlbumTitle";
import { AlbumCreateStyled } from "./styled";
interface albumprops {
  modal: boolean;
  setModal: any;
}
const AlbumCreate = ({ modal, setModal }: albumprops) => {
  return (
    <AlbumCreateStyled $modal={modal}>
      <div className="AlbumCreate-modal">
        <div
          className="AlbumTitle-closeBtn"
          onClick={() => {
            setModal(false);
          }}
        >
          &times;
        </div>
        <AlbumTitle setModal={setModal} />
      </div>
    </AlbumCreateStyled>
  );
};

export default AlbumCreate;
