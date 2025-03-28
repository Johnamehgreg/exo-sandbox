import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Pagination,
  Text,
} from '@mantine/core';

interface Props {
  page?: number;
  pageSize?: number;
  setPageSize?: (page: number) => void;
  total: number;
  onChange?: (value: number) => void;
  showPageItem?: boolean;
}
export const PaginationCard: React.FC<Props> = ({
  pageSize,
  onChange,
  total,
  setPageSize,
  page,
  showPageItem,
}) => {
  function isEven(number: number) {
    if (number % (pageSize || 10) === 0) {
      return true;
    }
    return false;
  }

  const calTotalNumber = () => {
    const totalNumber = total | 0;
    if (isEven(total)) return totalNumber / (pageSize || 10);
    if (!isEven(total)) return totalNumber / (pageSize || 10) + 1;
    return totalNumber;
  };
  if ((total || 0) > 10)
    return (
      <Box>
        <Flex className={'items-center justify-between bg-white py-[14px]'}>
          <Group>
            <Text className="text-[14px] font-normal">Result per page</Text>
            <Menu withArrow>
              <Menu.Target>
                <Button
                  size="xs"
                  rightSection={<IconDropDown />}
                  variant="default"
                >
                  {pageSize}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {['10', '20', '30', '40', '50'].map((item) => {
                  return (
                    <Menu.Item
                      onClick={() => {
                        setPageSize?.(parseInt(item || ''));
                      }}
                      key={item}
                    >
                      {item}
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Pagination.Root
            value={page}
            onChange={(val) => onChange?.(val)}
            total={calTotalNumber()}
            size={'sm'}
            classNames={{
              control: 'h-[32px] rounded-[4px] !min-w-[32px]',
            }}
          >
            <Group gap={4} justify="center">
              <Pagination.Previous className="pagination-card-item" />
              {showPageItem ? (
                <>
                  <Box className="hidden gap-2 sm:flex">
                    <Pagination.Items />
                  </Box>
                  <Card className="active-pagination-card-item flex sm:hidden">
                    <Text className="text-[14px] font-normal">{page}</Text>
                  </Card>
                </>
              ) : (
                <Card className="active-pagination-card-item">
                  <Text className="text-[14px] font-normal">{page}</Text>
                </Card>
              )}

              <Pagination.Next className="pagination-card-item" />
            </Group>
          </Pagination.Root>
        </Flex>
      </Box>
    );
};
