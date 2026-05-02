// MapDrop frontend — shared types
export type Category = {
  id: string;
  label: string;
  emoji: string;
};

export type Pin = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  note: string;
  neighborhood: string;
  address: string;
  lng: number;
  lat: number;
  hours: string;
  priceLevel: number;
};

export type MapMeta = {
  slug: string;
  title: string;
  subtitle: string;
  creator: { name: string; handle: string; avatar: string };
  saves: number;
  drops: number;
};

export type MapDetail = {
  meta: MapMeta;
  categories: Category[];
  pins: Pin[];
};
