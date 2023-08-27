import { TaxonomyType } from "./types";
import singapore from '../images/amusement_park.png'
import rome from '../images/tripidea.png'
import spain from '../images/spain.png'
import paris from '../images/paris_view.png'

export const SamplePopularDestinations: TaxonomyType[] = [
    {
      id: "1",
      href: "/listing-stay",
      name: "Rome",
      taxonomy: "category",
      count: 188288,
      thumbnail: rome,
    },
    {
      id: "222",
      href: "/listing-stay",
      name: "singapore",
      taxonomy: "category",
      count: 188288,
      thumbnail: singapore
    },
    {
      id: "222",
      href: "/listing-stay",
      name: "Spain",
      taxonomy: "category",
      count: 188288,
      thumbnail: spain
    },
    {
      id: "222",
      href: "/listing-stay",
      name: "Parins",
      taxonomy: "category",
      count: 188288,
      thumbnail: paris
    }
  ];
  