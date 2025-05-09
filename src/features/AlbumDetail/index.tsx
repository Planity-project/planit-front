import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
const AlbumDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AlbumDetailStyled>
      <div>{id}</div>
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
