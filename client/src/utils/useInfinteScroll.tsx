import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Filter } from "models";

export default function useInfiniteScroll(query: Filter, pageNumber: number, url: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setdata] = useState<any[]>([]); //put any to make generic for now
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setdata([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    // let cancel
    query.pageNumber = pageNumber;
    axios({
      method: "GET",
      url: url,
      params: query,
      //   cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then((res: AxiosResponse) => {
        setdata((prevdata: Array<any>) => [...prevdata, ...res.data.events]);
        setHasMore(res.data.more);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(true);
      });
  }, [query, pageNumber]);

  return { loading, error, data, hasMore };
}
