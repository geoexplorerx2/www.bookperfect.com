import __stayListing from "./jsons/__stayListing.json";
import {
  DEMO_STAY_CATEGORIES,
} from "./taxonomies";
import { StayDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): any=> {


  const category = DEMO_STAY_CATEGORIES.filter(
    (taxonomy) => taxonomy.id === post.listingCategoryId
  )[0];


  return {
    ...post,
    id: `stayListing_${index}_`,
    priceIn: !index ? "$ 1001" : post.priceIn,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: category,
  };
});

export { DEMO_STAY_LISTINGS };
