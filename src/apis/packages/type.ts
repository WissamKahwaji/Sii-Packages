export type Package = {
  _id?: string;
  title_en: string;
  title_ar: string;
  price: number;
  features: Feature[];
  categoryId: string;
};

export type Category = {
  _id?: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  packages: Package[];
  samples: Samples[];
};

export type Feature = {
  title_en: string;
  tital_ar: string;
};

export type Samples = {
  name: string;
  samples: SampleInfo[];
};

export type SampleInfo = {
  img: string;
  link: string;
  secondLink: string;
};
