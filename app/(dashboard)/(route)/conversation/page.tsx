"use client";
import ToolsNavigation from "@/components/dashboard/tools-navigation";
import { useEffect, useRef } from "react";

import { useChat } from "ai/react";
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import MarkdownResponse from "@/components/dashboard/markdown-response";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useProStore } from "@/stores/pro-store";

const ConversationPage = () => {
  const containerRef = useRef(null);
  const { handleOpenOrCloseProModal } = useProStore();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages,
  } = useChat({
    api: "/api/conversation",
  });

  useEffect(() => {
    if (error) {
      const errorParsed = JSON.parse(error?.message);
      if (errorParsed?.code === 403) {
        handleOpenOrCloseProModal();
      }
    }
  }, [error, handleOpenOrCloseProModal]);

  const handleClearChat = () => {
    setMessages([]);
  };
  return (
    <div className="h-full relative flex flex-col justify-between">
      <div
        ref={containerRef}
        className="overflow-y-auto space-y-10 scroll-smooth h-[calc(100vh-180px)]">
        {messages.length > 0 ? (
          <div>
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap py-4">
                {m.role === "user" ? (
                  <UserMessage>
                    <MarkdownResponse content={m.content} />
                  </UserMessage>
                ) : (
                  <AiResponse>
                    <MarkdownResponse content={m.content} />
                  </AiResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-20 text-right w-full pr-3">
              <Button size="sm" variant="outline" onClick={handleClearChat}>
                Clear chat
              </Button>
            </div>
          </div>
        ) : (
          <ToolsNavigation title="Conversation" />
        )}
      </div>
      <div className="mb-[13px]">
        <form
          onSubmit={isLoading ? stop : handleSubmit}
          className="flex items-center w-full relative">
          <Textarea
            placeholder="Do you have any question today?"
            value={input}
            onChange={handleInputChange}
            className="min-h-1 resize-none"
          />
          <Button
            type="submit"
            disabled={!input}
            className="absolute right-2 gradient-btn">
            {isLoading ? "Stop" : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
