import React, { FC, ReactNode, useState } from "react";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import NextPrev from "../../lib/NextPrev/NextPrev";
import BlogCard from "../StayCard/BlogCard";
import StayCard from "../StayCard/StayCard";
import TravelBlogHeader from "./TravelBlogHeader";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import PrevNext from '../PrevNext';
import blog from '../../images/blog.png';
import bookmark from '../../images/bookmark.png';
import ShortCutRouting from "../ShortcutRouting/ShortrcutRouting";


// limit demo listing
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);


interface TravelBlogProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  customStyle?: any;
  customStyles?: any;
};

const TravelBlog: FC<TravelBlogProps> = ({
  gridClass = "",
  heading,
  subHeading,
  customStyle,
  customStyles = ""
}) => {

  // TODO: design blog card
  const renderCard = (stay: StayDataType) => {
    return <BlogCard key={stay.id} data={stay} />;
  };
  
  const [hover, setHover] = useState<any>(false);
  const [id, setId] = useState<any>();

  const handleMouseEnter = (data: any) => {
    setHover(true);
    setId(data);
  };

  const handleMouseLeave = (data: any) => {
    setHover(false);
    setId(data);
  };

  let history = useHistory();

  return (
    <>
      {/* new section in travel guide ( check description ) */}
      {/* {history.location.pathname == '/travelguide' ?<ShortCutRouting/>: ''} */}

      {/* new section in travel guide ( check description ) */}
      <div className={`travel-blog relative  sm:mt-0 px-5 sm:px-[10.1vw] ${customStyles}`}>

        <TravelBlogHeader subHeading={subHeading} heading={heading} />
        <PrevNext data={DEMO_DATA} />
      </div>
    </>

  );
};

export default TravelBlog;
