import React, { FC } from "react";
import { Link } from "react-router-dom";
import convertNumbThousand from "../../common/convertNumberThousand";
import { TaxonomyType } from "../../data/types";
import CImage from "../../lib/CImage/CImage";

export interface CardCategory2Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail, listingType } = taxonomy;
  return (
    <div>
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-4 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <CImage
          src={thumbnail}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-2 truncate text-center">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {convertNumbThousand(count || 0)}
          {` `}
          {(!listingType || listingType === "stay") && "properties"}
          {listingType === "car" && "cars"}
          {listingType === "experiences" && "experiences"}
        </span>
      </div>
    {/* </Link> */}
    </div>
  );
};

export default CardCategory2;
