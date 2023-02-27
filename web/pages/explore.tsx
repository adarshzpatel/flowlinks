import React, { useEffect, useState } from "react";
import { getAllFlowLinks } from "../flow/scripts";
import Spinner from "../components/ui/Spinner";
import { FlowLinkResponse } from "../flow/types";
import { DEFAULT_AVATAR } from "../components/Builder/Card";
import Link from "next/link";

type Props = {};

const Explore = (props: Props) => {
  const [flowLinks, setFlowLinks] = useState<FlowLinkResponse[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await getAllFlowLinks();
      console.log(res);
      setFlowLinks(res);
    };
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="section_height flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-4  grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
      {flowLinks?.map((item) => (
        <Link
        href={`/@${item?.domainName}`}
          key={`explore-${item.id}`}
          className="bg-gray-800/50 flex hover:scale-105 duration-200 ease-out items-center gap-4 border border-gray-700 p-4 rounded-xl"
        >
          <img
            src={item?.avatar || DEFAULT_AVATAR}
            className="h-20  aspect-square rounded-lg w-20 bg-white overflow-hidden"
            alt=""
          />
          <div>
            <div className="text-2xl text-flow-400 heading font-semibold tracking-wider">@{item?.domainName}</div>
            <div className=" text-gray-600 font-semibold">Owned by <span className="text-gray-500 heading"> {item?.owner} </span></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Explore;
