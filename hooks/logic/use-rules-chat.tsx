import {
  Box, Text
} from "@mantine/core";

import { useEffect, useRef, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";

import { v4 as uuidv4 } from "uuid";
import { MessageModel } from "@/types/general";
import { useGetAiSession } from "@/hooks/query/ai-session";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { messageSchema } from "@/lib/validator/auth";
import { useRules } from "@/hooks/mutate/use-rules";
import { RulesTabType } from "@/app/app/(main-app)/fibonacci/rules/components/extras";
const initialValues: { description: string } = {
  description: "",
};


export const useRulesChat = () => {
  const [conversation, setConversation] = useState<MessageModel[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const { onCreateRule, isLoading: isLoadingCreateRule } = useRules();
  const [isSuccess, setIsSuccess] = useState(false);
  const { session } = useGetAiSession();

  const ruleId = uuidv4();

  const onScroll = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const form = useForm({
    initialValues,
    validate: yupResolver(messageSchema),
  });

  const handleSendMessage = (message: string) => {
    if (!session) {
      // Handle missing session
      const errorMessage: MessageModel = {
        ruleId: `${ruleId}${new Date().toISOString()}`,
        description: (
          <Text className="text-[14px] leading-[21px] font-normal text-text">
            Unable to create rule now. Please try again.
          </Text>
        ),
        sender: "fibonacci",
      };
      setConversation([...conversation, errorMessage]);
      onScroll();
      return;
    }
    setIsSuccess(false);
    const newMessage: MessageModel = {
      ruleId: `${ruleId}${new Date().toISOString()}`,
      description: message,
      sender: "user",
    };
    setConversation([...conversation, newMessage]);
    onCreateRule({
      cb(data) {
        setTimeout(() => {
          const newMessage: MessageModel = {
            ruleId: `${ruleId}${new Date().toISOString()}`,
            description: (
              <>
                {data?.ruleCreated ? (
                  <Box className="text-[14px] leading-[21px] font-normal text">
                    <Text>Awesome! The following rule has been created:</Text>
                    <Text>
                      You can head on to the{" "}
                      <Link
                        href={`${routes.fibonacci.rules}?tab=${RulesTabType.All_Rules}`}
                        className="underline"
                      >
                        All Rules section
                      </Link>{" "}
                      and make this rule active
                    </Text>
                  </Box>
                ) : (
                  <Box>{data?.answer}</Box>
                )}
              </>
            ),
            sender: "fibonacci",
          };
          setIsSuccess(true);
          setConversation((con) => [...con, newMessage]);
          onScroll();
        }, 400);
      },
      errorCb() {
        setTimeout(() => {
          const newMessage: MessageModel = {
            ruleId: `${ruleId}${new Date().toISOString()}`,
            description: (
              <Text className="text-[14px] leading-[21px] font-normal text-text">
                This doesn't look like a rule. Can you be more specific?
              </Text>
            ),
            sender: "fibonacci",
          };
          setConversation((con) => [...con, newMessage]);
          onScroll();
        }, 400);
      },
      values: { description: message || "", session },
    });
    onScroll();
    form.reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent default behavior if the Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedDescription = form.values.description.trim();
      if (trimmedDescription.length > 0 && !isLoadingCreateRule) {
        handleSendMessage(trimmedDescription);
        return;
      }
      form.reset(); // Reset the form only if no valid input
    }
  };

  useEffect(() => {
    if (conversation.length > 1 || isSuccess) {
      onScroll();
    }
  }, [conversation, isSuccess]);
  return {
    handleKeyDown,
    conversation,
    isLoadingCreateRule,
    onScroll,
    form,
    handleSendMessage,
    conversationEndRef,
    session,
    setConversation,
    onCreateRule
  }
}