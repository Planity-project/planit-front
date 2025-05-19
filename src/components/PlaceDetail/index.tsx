interface PlaceDetailProps {
  place: {
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
    <div>
      <p>{place.imageSrc}</p>
      <p>제목: {place.title}</p>
      <p>카테고리: {place.category}</p>
      <p>주소: {place.address}</p>
      <p>전화번호: {place.tel}</p>
    </div>
  );
};

export default PlaceDetail;
