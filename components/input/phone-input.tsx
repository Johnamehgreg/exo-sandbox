import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { CountryType } from '@/types/country';
import {
  Box,
  Button,
  Flex,
  Input,
  InputBase,
  Menu,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { GetCountries } from 'react-country-state-city';
import { IMaskInput } from 'react-imask';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  iso2?: string;
  onChangesIso2?: (value: string) => void;
  error?: string;
}

export const PhoneInput: React.FC<Props> = ({
  value,
  error,
  label,
  onChange,
  iso2,
  onChangesIso2,
  placeholder,
  disabled,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [countriesList, setCountriesList] = useState<CountryType[]>([]);
  const [queryText, setQueryText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryType>({});

  useEffect(() => {
    GetCountries().then((result: CountryType[]) => {
      setCountriesList(result);
    });
  }, []);

  const filteredCountry = useMemo(() => {
    if (queryText) {
      const lowerCaseQuery = queryText.toLowerCase();
      return countriesList.filter((item) => {
        const { name, capital, region, subregion, phone_code } = item;
        return (
          name?.toLowerCase().includes(lowerCaseQuery) ||
          subregion?.toLowerCase().includes(lowerCaseQuery) ||
          capital?.toLowerCase().includes(lowerCaseQuery) ||
          region?.toLowerCase().includes(lowerCaseQuery) ||
          `${phone_code}`?.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
    return countriesList;
  }, [countriesList, queryText]);

  useEffect(() => {
    if (iso2) {
      const selectedCountryCode = countriesList.find(
        (country) => country?.iso2 === iso2.toLocaleUpperCase()
      );
      setSelectedCountry(selectedCountryCode!);
    }
  }, [iso2, value, countriesList]);

  const handleOnChange = (textVal: string) => {
    const value = textVal?.replace(/\D/g, '');
    onChange?.(value ? `+${value}` : '');
  };

  const options = filteredCountry?.map((item: CountryType) => (
    <Menu.Item
      key={item.id}
      onClick={() => {
        setSelectedCountry(item);
        onChangesIso2?.(item.iso2 as string);
        onChange?.('');
      }}
    >
      <Flex align={'self-start'} gap={'sm'}>
        <Text>{item.emoji}</Text>
        <Flex direction={'column'}>
          <Text fz={'0.8rem'}>{item.name}</Text>
          <Text c={'gray'} fz={'xs'}>
            +{item.phone_code}
          </Text>
        </Flex>
      </Flex>
    </Menu.Item>
  ));
  return (
    <Input.Wrapper mb={error ? 'md' : ''} className="items-center">
      <Input.Label
        style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          marginBottom: '0.3rem',
        }}
      >
        {label}
      </Input.Label>
      <Flex>
        <Menu withArrow width={200}>
          <Menu.Target>
            <Button
              px={'xs'}
              variant="white"
              className="!h-[40px] rounded-l-[8px] rounded-r-none border-[1px] border-r-0 border-[#DFE0E2] bg-[#FAFAFB] text-black transition-all"
            >
              <Flex gap={'xs'} align={'center'}>
                <Text fw={400} fz={'14px'}>
                  {selectedCountry?.emoji || '🇺🇸'}
                </Text>
                <Text fw={400} fz={'14px'}>
                  +{selectedCountry?.phone_code || 1}
                </Text>
                <IconDropDown
                  style={{
                    transform: 'scale(0.8)',
                  }}
                />
              </Flex>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <TextInput
              size="'xs"
              value={queryText}
              placeholder="Search..."
              mb={'md'}
              onChange={(e) => setQueryText(e.target.value.trim())}
            />
            <Box mah={'150px'} className="overflow-y-scroll">
              {options}
            </Box>
            {filteredCountry.length === 0 && (
              <Text c={'gray'} size="xs" m={'sm'}>
                No country found
              </Text>
            )}
          </Menu.Dropdown>
        </Menu>
        <InputBase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPaste={(e: any) => {
            handleOnChange(e?.target?.value);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onBlurCapture={(e: any) => {
            handleOnChange(e?.target?.value);
          }}
          disabled={disabled}
          component={IMaskInput}
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            handleOnChange(e?.target?.value);
          }}
          classNames={{
            input: `rounded-l-none rounded-r-[8px]  ${
              error && 'border-[var(--mantine-color-error-color-3)]'
            }`,
          }}
          mask={`+${selectedCountry?.phone_code || 1} (000) 000-0000`}
          placeholder={placeholder}
          style={{
            flex: 1,
          }}
        />
      </Flex>

      <Input.Error
        mt={'0.3rem'}
        style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          borderRadius: '0.375rem',
        }}
      >
        {error}
      </Input.Error>
    </Input.Wrapper>
  );
};
