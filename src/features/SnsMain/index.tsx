import { Spin } from "antd";
import SnsPost from "@/components/SnsPost";
import { useEffect, useState } from "react";
import api from "@/util/api";
const SnsMain = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(4);
  const [limit, setLimit] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [lastFetchedPage, setLastFetchedPage] = useState<number>(0);

  const fetchData = async () => {
    if (loading || page === lastFetchedPage || !hasMore) return;

    setLoading(true);
    try {
      const res: any = api.get("/posts/list", { params: { page, limit } });

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
      console.error("포스트 로딩 실패", err);
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
      <SnsPost data={data} /> {loading && <Spin style={{ marginTop: 20 }} />}
    </>
  );
};

export default SnsMain;
