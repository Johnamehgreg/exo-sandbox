import { env } from "@/env";
import { TextInput } from "@mantine/core";
import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { ChatBaseProps } from "./base-input";


interface Props extends ChatBaseProps {
    setLocationGeometric?: Dispatch<SetStateAction<{ latitude: string | null; longitude: string | null; }>>
    setDisableSendLocation: Dispatch<SetStateAction<boolean>>
    isSubmittingChatInput: boolean
}

const LocationInput = ({ setLocationGeometric, handleKeyDown, onChange, setDisableSendLocation,isSubmittingChatInput }: Props) => {
    const { ref } = usePlacesWidget({
        apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
            if (place.geometry.location.lat()) {
                setDisableSendLocation(false)
                onChange?.(place.formatted_address)
                setLocationGeometric?.({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                })
            }
        },
        options: {
            types: ['address'],
            componentRestrictions: {
                country: 'us' // restrict to USA
            },
        },
    });

    const handleOnKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleKeyDown?.(e as unknown as KeyboardEvent<HTMLTextAreaElement>);
        }
    }
    return (
        <TextInput
            ref={ref as unknown as RefObject<HTMLInputElement>}
            onKeyDown={handleOnKeyDownChange}
            disabled={isSubmittingChatInput}
        />
    )
}

export default LocationInput