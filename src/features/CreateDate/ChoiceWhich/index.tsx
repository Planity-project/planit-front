import { Button, Input } from "antd";
import { ChioceWhiceStyled } from "./styled";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import gps from "@/assets/images/gps.png";
import Image from "next/image";
import ShowWhich from "./ShowWhich";
import api from "@/util/api";
import { RSC_HEADER } from "next/dist/client/components/app-router-headers";

interface ChoiceWhichProps {
  setSelectedPlace: (place: string) => void;
  onNext: () => void;
}

const ChoiceWhich = ({ setSelectedPlace, onNext }: ChoiceWhichProps) => {
  const [location, setLocation] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  const example = [
    { country: "대한민국", name: "부산", lat: 35.1796, lng: 129.0756 },
    { country: "대한민국", name: "서울", lat: 37.5665, lng: 126.978 },
    { country: "대한민국", name: "울산", lat: 35.5384, lng: 129.3114 },
    { country: "대한민국", name: "대구", lat: 35.8722, lng: 128.6025 },
    { country: "대한민국", name: "제주", lat: 33.4996, lng: 126.5312 },
    { country: "대한민국", name: "거제통영", lat: 34.8805, lng: 128.6216 },
    { country: "대한민국", name: "울릉도", lat: 37.4847, lng: 130.8987 },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setInputValue(keyword);
    const filtered = example.filter((item) => item.name.includes(keyword));
    setLocation(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("location/findAll");
        const arr = res.data;

        setLocation(arr);
        setSelectedLocation(arr[0]);
        setSelectedPlace(arr[0].name);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
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
              {location.map((x, i) => {
                const isSelected = selectedLocation?.name === x.name;
                return (
                  <div
                    key={i}
                    className={`which-mapDiv ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedLocation(x);
                      setSelectedPlace(x.name); // ⬅ 선택 시 상위로 전달
                    }}
                  >
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
            <div className="which-btnDiv">
              <Button type="primary" onClick={onNext}>
                선택
              </Button>
            </div>
          </div>
        </div>
        <div className="which-rightcontainer">
          {selectedLocation && (
            <ShowWhich selectedLocation={selectedLocation} />
          )}
        </div>
      </div>
    </ChioceWhiceStyled>
  );
};

export default ChoiceWhich;
