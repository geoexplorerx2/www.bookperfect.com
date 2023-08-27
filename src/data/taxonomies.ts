import __stayTaxonomies from "./jsons/__stayTaxonomies.json";
import { TaxonomyType } from "./types";

const DEMO_STAY_CATEGORIES: TaxonomyType[] = __stayTaxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
  listingType: "stay",
}));

export {
  DEMO_STAY_CATEGORIES,
};
