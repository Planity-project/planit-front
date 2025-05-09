import { MyinfoStyled } from "./styled";
import Image from "next/image";
interface infoprops {
  user: any;
}
const Myinfo = ({ user }: infoprops) => {
  return (
    <MyinfoStyled>
      <div className="myinfo-wrap">
        <div className="myinfo-userprofile">
          <div>
            <div className="myinfo-useremail">email {user?.email}</div>
            <div className="myinfo-logtype">연동계정 {user?.type}</div>
          </div>
          <div>
            <Image src={"/defaultImage"} alt="profile" />
          </div>
        </div>
        <div>nickname : {user?.nickname}</div>
      </div>
    </MyinfoStyled>
  );
};

export default Myinfo;
