import { env } from "@/env";
import {
  Center,
  Flex,
  Loader,
  Popover,
  ScrollArea,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
// import { env } from "@src/utils/env";
import React, { useCallback, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

interface PlacePrediction {
  place_id: string;
  description: string;
}

interface PlaceDetails {
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}
interface props {
  onSelectLocation: ({
    address,
    lng,
    lat,
  }: {
    address: string;
    lng: number;
    lat: number;
  }) => void;
  value: string;
}

const PlacesAutocomplete: React.FC<props> = ({ onSelectLocation, value: textValue }) => {
  const [value, setValue] = useState(textValue);
  const [opened, setOpened] = useState(false);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    options: {
      types: ["address"],
      componentRestrictions: {
        country: "us", // restrict to USA
      },
    },
  });

  // Function to handle place selection
  const handlePlaceSelect = useCallback(
    (placeId: string, address: string) => {
      if (placesService) {
        placesService.getDetails(
          {
            placeId: placeId,
          },
          (placeDetails: PlaceDetails) => {
            const lat = placeDetails.geometry.location.lat();
            const lng = placeDetails.geometry.location.lng();
            onSelectLocation({ lat, lng, address: address });
            setOpened(false);
          }
        );
      }
    },
    [placesService, onSelectLocation, setOpened]
  );

  return (
    <div>
      <Popover
        transitionProps={{ transition: "fade-down", duration: 200 }}
        width={250}
        position="bottom"
        withArrow
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <TextInput
            value={value}
            onFocus={() => {
              if (value.length > 0) {
                setOpened(true);
              }
            }}
            placeholder="Address"
            classNames={{
              root: "relative w-full",
              input:
                "h-9 !text-[14px] text-end px-0 text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 rounded-none !border-transparent  italic",
            }}
            onChange={(evt) => {
              setValue(evt.target.value);
              if (evt.target.value.trim().length === 0) {
                setOpened(false);
              } else {
                setOpened(true);
                getPlacePredictions({ input: evt.target.value });
              }
            }}
          />
        </Popover.Target>
        <Popover.Dropdown className="px-0 ">
          <ScrollArea className="h-[100px] overflow-y-auto">
            {isPlacePredictionsLoading && (
              <Center>
                <Loader size={"xs"} />
              </Center>
            )}
            <Flex className="flex-col divide-y-[1px] divide-gray-100 divide-solid">
              {placePredictions.map((item: PlacePrediction) => (
                <UnstyledButton
                  onClick={() => {
                    setValue(item.description);
                    handlePlaceSelect(item.place_id, item.description);
                  }} // Handle click on a prediction
                  key={item.place_id}
                  className="hover:bg-gray-50 p-2"
                >
                  <Text className="text-[13px] text-gray-700 font-normal">
                    {item.description}
                  </Text>
                </UnstyledButton>
              ))}
            </Flex>
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default PlacesAutocomplete;
