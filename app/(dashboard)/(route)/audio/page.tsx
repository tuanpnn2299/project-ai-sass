"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { useProStore } from "@/stores/pro-store";
import { toast } from "@/components/ui/use-toast";
import ToolsNavigation from "@/components/dashboard/tools-navigation";
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { url } from "inspector";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PHOTO_AMOUNT_OPTIONS, PHOTO_RESOLUTION_OPTIONS } from "@/contant";

interface MessageType {
  id: string;
  content: string;
  role: "user" | "assistant";
}

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required",
  }),
});

const AudioPage = () => {
  const { handleOpenOrCloseProModal } = useProStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const hanldeScrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessages((current) => [
        ...current,
        {
          id: uuidv4(),
          role: "user",
          content: `${values.prompt}`,
        },
        {
          id: uuidv4(),
          role: "assistant",
          content: "",
        },
      ]);
      hanldeScrollToBottom();
      form.reset();

      const { data } = await axios.post("/api/audio", values);

      setMessages((current) => {
        const newMessages = [...current];
        newMessages[newMessages.length - 1].content = data.audio;
        return newMessages;
      });
      hanldeScrollToBottom();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        handleOpenOrCloseProModal();
      } else {
        setMessages([]);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-full relative flex flex-col justify-between">
      <div
        ref={containerRef}
        className="h-[calc(100vh-180px)] relative overflow-y-auto space-y-10 scroll-smooth">
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <UserMessage>{m.content}</UserMessage>
                ) : (
                  <AiResponse>
                    {m.content ? (
                      <div
                        className={cn(
                          "block mb-4 space-y-4",
                          "lg:flex lg:flex-wrap lg:items-center lg:space-x-4 lg:space-y-0"
                        )}>
                        <audio src={m.content} controls autoPlay />
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </AiResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-0 text-right w-full pr-3">
              <Button size="sm" variant="outline" onClick={handleClearChat}>
                Clear chat
              </Button>
            </div>
          </>
        ) : (
          <ToolsNavigation title="Audio" />
        )}
      </div>
      <div className="mb-[13px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center w-full relative">
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-1 resize-none"
                      placeholder="Guitar solo"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="absolute right-2 flex items-center space-x-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="gradient-btn">
                <Send />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AudioPage;
