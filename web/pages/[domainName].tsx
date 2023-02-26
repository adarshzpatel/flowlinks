import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Builder/Card";
import { checkIsAvailable, getFlowLinkByDomainName } from "../flow/scripts";
import { useControls } from "../store/useControls";

type Props = {};

const FlowLinkShowcasePage = (props: Props) => {
  const router = useRouter();
  const slug = router?.query?.domainName as string;
  const domainName = slug?.substring(1);
  const [data, setData] = useState<any>();
  const [exists, setExists] = useState<boolean>(false);

  //State for card inputs
  const { setDisplayName, setUserName, setTitle } = useControls();

  // If domainName is not prefixed with @ , then add it
  useEffect(() => {
    if (slug) {
      if (!slug?.startsWith("@")) {
        router.push("@" + slug);
      }
    }
  }, [slug]);

  // Fetch FlowLinkData
  useEffect(() => {
    const getData = async () => {
      try {
        //Check if domain Name is available to take or not
        const isAvailable = await checkIsAvailable(domainName);
        setExists(!isAvailable);
        // if taken , it means nft exists and we can get the data
        if (!isAvailable) {
          const res = await getFlowLinkByDomainName(domainName);
          console.log(res);
          setData(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (domainName) {
      getData();
    }
  }, [domainName]);

  return (
    <div className='flex justify-center items-center'>
      <div
        style={
          data &&
          data.styles["background"] && {
            backgroundImage: data.styles["background"],
          }
        }
        className='p-16 bg-zinc-800 mt-10 rounded-lg'
      >
        {exists ? (
          <Card
            displayName={data && data.displayName}
            theme={data ? data.styles["theme"] : ""}
            username={data ? data.domainName : ""}
            bio={data ? data.bio : ""}
            title={data ? data.title : ""}
            twitter={data ? data.socialLinks["twitter"] : ""}
            github={data ? data.socialLinks["github"] : ""}
            linkedin={data ? data.socialLinks["linkedIn"] : ""}
            instagram={data ? data.socialLinks["instagram"] : ""}
            youtube={data ? data.socialLinks["youtube"] : ""}
            gmail={data ? data.socialLinks["mail"] : ""}
            otherLinks={data ? data.otherLinks : [{}]}
            avatarStyle={data ? data.styles["avatar"] : ""}
            avatar={data ? data.avatar : ""}
            cover={data ? data.cover : ""}
          />
        ) : (
          "This domain has not been claimed yet , you can be the first one to claim it"
        )}
      </div>
    </div>
  );
};

export default FlowLinkShowcasePage;
// socialLinks
