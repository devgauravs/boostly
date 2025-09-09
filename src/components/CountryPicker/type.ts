export type SelectCountryType = {
  flag: string;
  dial_code: string;
};

export type CountryListItem = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

export type CountryProps = {
  onSelectCountry?: (country: string) => void;
  value?: string;
  enable?: boolean;
};
