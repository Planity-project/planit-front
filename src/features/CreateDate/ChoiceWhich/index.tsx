import { Input } from "antd";
import { ChioceWhiceStyled } from "./styled";
import { SearchOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { useEffect, useState } from "react";
import gps from "@/assets/images/gps.png";
import Image from "next/image";
import ShowWhich from "./ShowWhich";
const ChoiceWhich = () => {
  const [location, setLocation] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const example = [
    { country: "대한민국", name: "부산" },
    { country: "대한민국", name: "서울" },
    { country: "대한민국", name: "울산" },
    { country: "대한민국", name: "대구" },
    { country: "대한민국", name: "제주" },
    { country: "대한민국", name: "거제통영" },
    { country: "대한민국", name: "울릉도" },
  ];
  const search = (word: string) => {
    // api.post("/search", { word }).then((res) => {
    //   setLocation(res.data);
    // });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setInputValue(keyword);

    const filtered = example.filter((item) => item.name.includes(keyword));

    setLocation(filtered);
  };
  useEffect(() => {
    setLocation(example);
    // 또는 서버에서 받아올 경우 아래처럼 사용
    // api.get("/location").then((res) => {
    //   setLocation(res.data);
    // });
  }, []);
  return (
    <ChioceWhiceStyled>
      <div className="which-container">
        <div className="which-leftcontainer">
          <div className="which-mapcontainer">
            <div className="which-inputBox">
              <span className="which-inputicon">
                <SearchOutlined />
              </span>
              <Input
                placeholder="지역을 검색하세요"
                value={inputValue}
                onChange={onChange}
              />
            </div>
            <div className="which-mapBox">
              {location.map((x: any, i: number) => {
                return (
                  <div key={i} className="which-mapDiv">
                    <div className="which-gpsDiv">
                      <div className="which-gpsimg">
                        <Image src={gps} alt="" />
                      </div>
                      <div>
                        <div className="which-name">{x.name}</div>
                        <div className="which-country">{x.country}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="which-rightcontainer">
          <ShowWhich />
        </div>
      </div>
    </ChioceWhiceStyled>
  );
};

export default ChoiceWhich;
