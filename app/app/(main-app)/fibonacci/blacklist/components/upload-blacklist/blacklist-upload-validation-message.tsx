import { cn } from "@/lib/utils";
import { IconInfoCircle } from "@/public/assets/svg/icon-info-circle";
import { IconWarningTriangle } from "@/public/assets/svg/icon-warning-triangle";
import { Flex, Text } from "@mantine/core";

type UploadValidationVariant = 'info' | 'error';

type Props = {
    variant?: UploadValidationVariant;
    message: string;
}

const messageStyles = {
    info: 'text-gray-800 bg-gray-100',
    error: 'text-error-600 bg-error-50',
} as const;

const messageIcons = {
    info: IconInfoCircle,
    error: IconWarningTriangle,
} as const;


const BlacklistUploadValidationMessage = ({ message, variant = 'info' }: Props) => {
    const Icon = messageIcons[variant];
    return (
        <Flex className={cn('items-center py-2 pl-4 pr-[41px] rounded-md gap-x-1.5 w-full', messageStyles[variant])}>
            <Icon />
            <Text className="text-[14px] leading-[21px]">{message}</Text>
        </Flex>
    )
}

export default BlacklistUploadValidationMessage