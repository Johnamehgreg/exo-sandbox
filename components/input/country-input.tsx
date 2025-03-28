import { Box, Combobox, Flex, Input, Text, TextInput } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import { GetCountries } from 'react-country-state-city';
import { InputBase, useCombobox } from '@mantine/core';
import { CountryType } from '@/types/country';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';

interface Props {
  value?: string;
  onChange?: (value: CountryType) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string | null | undefined | React.ReactNode;
  mb?: string;
}

export const CountryInput: React.FC<Props> = ({
  value,
  error,
  mb,
  label,
  onChange,
  placeholder,
  disabled,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [countriesList, setCountriesList] = useState<CountryType[]>([]);
  const [queryText, setQueryText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryType>({});
  const filteredCountry = useMemo(() => {
    if (queryText) {
      const lowerCaseQuery = queryText.toLowerCase();
      return countriesList.filter((item) => {
        const { name, capital, region, subregion } = item;
        return (
          name?.toLowerCase().includes(lowerCaseQuery) ||
          subregion?.toLowerCase().includes(lowerCaseQuery) ||
          capital?.toLowerCase().includes(lowerCaseQuery) ||
          region?.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
    return countriesList;
  }, [countriesList, queryText]);

  const options = filteredCountry?.map((item: CountryType) => (
    <Combobox.Option mb={'xs'} value={item.iso2 || ''} key={item.id}>
      <Flex align={'center'} gap={'sm'}>
        <Text>{item.emoji}</Text>
        <Text className="!text-[14px]">{item.name}</Text>
      </Flex>
    </Combobox.Option>
  ));

  useEffect(() => {
    GetCountries().then((result: CountryType[]) => {
      setCountriesList(result);
    });
  }, []);
  return (
    <Box mb={mb || 'md'}>
      <Combobox
        disabled={disabled}
        store={combobox}
        onOptionSubmit={(value) => {
          const filCountry = countriesList.find((obj) => obj.iso2 === value);
          onChange?.(filCountry!);
          setSelectedCountry(filCountry!);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            error={error}
            mb={'md'}
            label={label}
            component="button"
            type="button"
            pointer
            rightSection={
              <IconDropDown
                style={{
                  transform: 'scale(0.8)',
                }}
              />
            }
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {value || selectedCountry?.name || (
              <Input.Placeholder>{placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <TextInput
            size="'xs"
            value={queryText}
            mb={'md'}
            placeholder="Search..."
            onChange={(e) => setQueryText(e.target.value.trim())}
          />
          <Combobox.Options
            mah={'150px'}
            style={{
              overflow: 'scroll',
            }}
          >
            {options}
          </Combobox.Options>
          {filteredCountry.length === 0 && (
            <Text c={'gray'} size="xs" m={'sm'}>
              No country found
            </Text>
          )}
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
};
