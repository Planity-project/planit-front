import { Button, Input } from "antd";
import { ChioceWhiceStyled } from "./styled";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import gps from "@/assets/images/gps.png";
import Image from "next/image";
import ShowWhich from "../../../components/ShowWhich";
import api from "@/util/api";
import { RSC_HEADER } from "next/dist/client/components/app-router-headers";
import { ScheduleType } from "..";

interface ChoiceWhichProps {
  setSelectedPlace: (place: string) => void;
  onNext: () => void;
  setChoiceWhich: (place: []) => void;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
}

const ChoiceWhich = ({
  setSelectedPlace,
  onNext,
  setChoiceWhich,
  setSchedule,
}: ChoiceWhichProps) => {
  const [location, setLocation] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [array, setArray] = useState<any[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setInputValue(keyword);
    const filtered = array.filter((item: any) => item.name.includes(keyword));
    setLocation(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<any>("location/findAll");
        const arr = res.data;
        setArray(arr);
        setLocation(arr);
        setChoiceWhich(arr[0]);
        setSelectedLocation(arr[0]);
        setSelectedPlace(arr[0].name);
        setSchedule((prev) => {
          return {
            ...prev,
            dataPlace: [],
          };
        });
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
                      setChoiceWhich(x);
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
