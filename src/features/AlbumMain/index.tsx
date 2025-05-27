import { AlbumMainStyled } from "./styled";
import { Button, Spin } from "antd";
import SnsPost from "@/components/SnsPost";
import AlbumCreate from "../AlbumCreate";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";

const AlbumMain = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [lastFetchedPage, setLastFetchedPage] = useState<number>(0);
  const { user } = useUser();

  const fetchData = async () => {
    if (loading || page === lastFetchedPage || !hasMore) return;

    setLoading(true);
    try {
      const res = await api.get("/album/allData", {
        params: { page, limit, userId: user?.id },
      });

      const newItems = res.data.items;
      const totalItems = res.data.total;

      setData((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const uniqueItems = newItems.filter(
          (item: any) => !existingIds.has(item.id)
        );
        return [...prev, ...uniqueItems];
      });

      setTotal(totalItems);
      setLastFetchedPage(page);

      if (page * limit >= totalItems) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("앨범 로딩 실패", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 스크롤이 바닥 근처일 때만
      if (
        scrollTop + windowHeight >= documentHeight - 50 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <AlbumMainStyled>
        <div className="AlbumMain-wrap">
          <div className="AlbumMain-title">추억을 저장하고 공유해보세요</div>

          <div className="AlbumMain-btnDiv">
            <Button onClick={() => setModal(true)}>생성하기</Button>
          </div>

          <div className="AlbimMain-container">
            {data.length === 0 && !loading ? (
              <div className="AlbumMain-noData">새로운 앨범을 시작해보세요</div>
            ) : (
              <>
                <SnsPost data={data} variant="album" />
                {loading && <Spin style={{ marginTop: 20 }} />}
              </>
            )}
          </div>

          <AlbumCreate modal={modal} setModal={setModal} />
        </div>
      </AlbumMainStyled>
      {!hasMore && !loading && <Footer />}
    </>
  );
};

export default AlbumMain;
