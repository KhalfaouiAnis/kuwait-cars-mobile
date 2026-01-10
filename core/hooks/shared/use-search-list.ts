import { useEffect, useState } from "react";

export default function useListSearch(list: any[], term: string) {
  const [data, setData] = useState(list);

  useEffect(() => {
    const newData = data.filter((item) => item.label === term);
    setData(newData);
  }, [term, data]);

  return data;
}
