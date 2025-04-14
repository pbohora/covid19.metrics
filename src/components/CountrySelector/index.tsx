import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useGetCountriesQuery } from '../../state/countries/countriesApi';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';
import { setSelectedCountry } from '../../state/countries/selectedCountrySlice';
import Dropdown from '../Dropdown';

const CountrySelector: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCountry } = useAppSelector((state) => state.selectedCountry);
  const { data: countryData, isLoading, error } = useGetCountriesQuery({ order: 'name' });

  const countryOptions = useMemo(
    () =>
      countryData?.data?.map((country) => ({
        key: country.iso,
        label: country.name,
        value: country.iso,
      })),
    [countryData],
  );

  useEffect(() => {
    if (countryData?.data?.length && !selectedCountry) {
      const firstCountry = countryData.data[0];
      dispatch(setSelectedCountry(firstCountry));
    }
  }, [countryData, dispatch, selectedCountry]);

  return (
    <WithLoadingErrorWrapper loading={isLoading} error={error as ApiErrorResponse}>
      <Dropdown
        searchable
        options={countryOptions || []}
        defaultOption={
          selectedCountry
            ? { key: selectedCountry.iso, label: selectedCountry.name, value: selectedCountry.iso }
            : undefined
        }
        onChange={(option) => dispatch(setSelectedCountry({ iso: option.value, name: option.label }))}
      />
    </WithLoadingErrorWrapper>
  );
};

export default CountrySelector;
