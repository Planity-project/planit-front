import React, { useEffect, useState } from "react";
import api from "@/util/api";
import { resolve } from "path";
interface CreateDaysProps {
  selectedPlace: string | null; // selectedPlace는 장소의 이름
}

const CreateDays: React.FC<CreateDaysProps> = ({ selectedPlace }) => {
  const [places, setPlaces] = useState<any[]>([]); // 장소들을 담을 상태
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (!selectedPlace) {
        console.log("null");
        return;
      }

      setLoading(true);

      try {
        console.log("요청 보냄");
        const res = await api.get("/map/nearby", {
          params: { address: selectedPlace }, // 요청 양식
        });
        console.log(res.data, "장소 목록 test");
        setPlaces(res.data.locations);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [selectedPlace]); // selectedPlace가 바뀔 때마다 새로운 요청을 보냄

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>{places.length === 0 ? <p>장소 못부름</p> : <p>콘솔로 확인</p>}</div>
  );
};

export default CreateDays;
