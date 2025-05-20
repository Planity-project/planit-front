import { PlaceDetailStyled } from "./styled";
interface PlaceDetailProps {
  place?: {
    title: string;
    category: string;
    tel: string;
    lat: string;
    lon: string;
    address: string;
    imageSrc?: string;
  };
}

const PlaceDetail = ({ place }: PlaceDetailProps) => {
  return (
    <PlaceDetailStyled>
      <div className="placedetail-wrap">
        <div className="placedetail-imgDiv">
          <img
            src={place?.imageSrc}
            className="placedetail-img"
            alt={`${place?.title}`}
          />
        </div>
        <div className="placedetail-textDiv">
          <div className="placedetail-title">
            이름: {place?.title}
            <div className="placedetail-category">{place?.category}</div>
          </div>

          <div className="placedetail-address">주소: {place?.address}</div>
          {place?.tel && (
            <div className="placedetail-tel">전화번호: {place?.tel}</div>
          )}
        </div>
      </div>
    </PlaceDetailStyled>
  );
};

export default PlaceDetail;
