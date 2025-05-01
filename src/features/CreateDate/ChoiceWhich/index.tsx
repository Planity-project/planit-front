import { Input } from "antd";
import { ChioceWhiceStyled } from "./styled";

const ChoiceWhich = () => {
  return (
    <ChioceWhiceStyled>
      <div>
        <div>
          <div className="which-inputBox">
            <Input />
          </div>
        </div>
        <div>GPS</div>
      </div>
    </ChioceWhiceStyled>
  );
};

export default ChoiceWhich;
