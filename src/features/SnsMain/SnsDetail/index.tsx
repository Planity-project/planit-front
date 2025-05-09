import { SnsDetailStyled } from "./styled";
import { useRouter } from "next/router";
const SnsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <SnsDetailStyled>
      <div>{id}</div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
