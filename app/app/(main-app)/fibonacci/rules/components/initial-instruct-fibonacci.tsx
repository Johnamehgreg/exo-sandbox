import { ActionIcon, Box, Flex, Text, Textarea } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { RulesTabType } from './extras';
import { v4 as uuidv4 } from 'uuid';
import { IconSend } from '@/public/assets/svg/icon-send';
import {
  CreateRuleResponseModel,
  MessageModel,
  RulesModel,
} from '@/types/general';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { messageSchema } from '@/lib/validator/auth';
import { IconInstructorChart } from '@/public/assets/svg/bar-instructor-chat';

type Props = {
  onCreateRule: ({
    values,
    cb,
    errorCb,
  }: {
    values?: RulesModel;
    cb?: (res: CreateRuleResponseModel) => void;
    errorCb?: (message: string) => void;
  }) => void;
  isLoadingCreateRule: boolean;
  setConversation: Dispatch<SetStateAction<MessageModel[]>>;
  session?: string;
};

const initialValues: { description: string } = {
  description: '',
};

const InitialInstructFibonacci = ({
  onCreateRule,
  isLoadingCreateRule,
  setConversation,
  session,
}: Props) => {
  const ruleId = uuidv4();

  const form = useForm({
    initialValues,
    validate: yupResolver(messageSchema),
  });

  const handleSendMessage = (message: string) => {
    const newMessage: MessageModel = {
      ruleId: `${ruleId}${new Date().toISOString()}`,
      description: message,
      sender: 'user',
    };
    setConversation([newMessage]);
    onCreateRule({
      cb(data: CreateRuleResponseModel) {
        setTimeout(() => {
          const newMessage: MessageModel = {
            ruleId: `${ruleId}${new Date().toISOString()}`,
            description: (
              <>
                {data?.ruleCreated ? (
                  <Box className="text text-[14px] font-normal leading-[21px]">
                    <Text>Awesome! The following rule has been created:</Text>
                    <Text>
                      You can head on to the{' '}
                      <Link
                        href={`${routes?.fibonacci.rules}?tab=${RulesTabType.All_Rules}`}
                        className="underline"
                      >
                        All Rules section
                      </Link>{' '}
                      and make this rule active
                    </Text>
                  </Box>
                ) : (
                  <Box>{data?.answer}</Box>
                )}
              </>
            ),
            sender: 'fibonacci',
          };
          setConversation((con) => [...con, newMessage]);
        }, 400);
      },
      errorCb() {
        setTimeout(() => {
          const newMessage: MessageModel = {
            ruleId: `${ruleId}${new Date().toISOString()}`,
            description: (
              <Text className="text-[14px] font-normal leading-[21px] text-text">
                This don&#39;t look like a rule. Can you be more specific?
              </Text>
            ),
            sender: 'fibonacci',
          };
          setConversation((con) => [...con, newMessage]);
        }, 400);
      },
      values: {
        description: message || '',
        session: session!,
      },
    });
    form.reset();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (form.values.description.trim().length > 0 && !isLoadingCreateRule) {
        return handleSendMessage(form.values.description);
      }
    }
  };

  return (
    <Box>
      <Flex className="flex-col items-center justify-center gap-y-4">
        <IconInstructorChart className="h-6 w-6" />
        <Text className="max-w-[572px] text-center font-twk text-base text-text">
          <TypeAnimation
            cursor={false}
            sequence={[
              `👋 Hey there! I’m Fibonacci, your guide to creating custom
            transaction instructions. Let’s get started on setting up the
            perfect rule for you!`,
            ]}
            wrapper="span"
            speed={90}
          />
        </Text>
      </Flex>
      <Box maw={760} className="mx-auto px-4">
        <form
          className=""
          onSubmit={form.onSubmit(() =>
            handleSendMessage(form.values.description)
          )}
        >
          <Box className="py-6">
            <Flex className="dashboard-border h-[74px] w-full items-center justify-end gap-1 rounded-[8px] bg-[#F8FAFC80] pr-4">
              <Textarea
                placeholder="Ask me anything"
                onKeyDown={(event) => handleKeyDown(event)}
                classNames={{
                  input: '!border-0 bg-[#F8FAFC80]',
                }}
                className="w-full"
                value={form.values.description}
                onChange={(e) => {
                  form.setValues({
                    description: e.target.value,
                  });
                }}
              />
              <Flex className={`${isLoadingCreateRule && 'opacity-50'}`}>
                <ActionIcon
                  type="submit"
                  disabled={isLoadingCreateRule}
                  bg="transparent"
                >
                  <IconSend />
                </ActionIcon>
              </Flex>
              {/* </Flex> */}
            </Flex>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default InitialInstructFibonacci;
