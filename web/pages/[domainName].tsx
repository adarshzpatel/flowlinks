import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Builder/Card";
import Button from "../components/ui/Button";
import ShowcaseFooter from "../components/ui/ShowcaseFooter";
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
    <div  style={
      data &&
      data.styles["background"] && {
        backgroundImage: data.styles["background"],
      }} 
    className=' flex justify-center  w-screen h-screen items-center'>
      {exists ? (
          <Card
            minted={false}
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
        <div className='flex flex-col justify-between space-y-8 items-center p-8 bg-zinc-800 rounded-lg'>
          <div className='max-w-xs text-center text-zinc-300 text-xl'>
            This domain has not been claimed yet , you can be the first one to
            claim it
          </div>
          <Button variant='success' onClick={() => router.push("builder")}>
            Claim Your Flowlink
          </Button>
        </div>
      )}
      {exists && 
      <div className="absolute bottom-4 ">
        <Link href={'/'}>
          <ShowcaseFooter/>
        </Link>
      </div>}
    </div>
  );
};

export default FlowLinkShowcasePage;
