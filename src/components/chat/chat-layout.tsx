'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { generateAIResponse } from '@/ai/flows/generate-response';
import type { Language } from '@/lib/languages';
import { useToast } from '@/hooks/use-toast';
import { LanguageSelector } from '../language-selector';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
}

const LOCAL_STORAGE_KEY = 'bahasai-chat-history';

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<Language>('Bahasa Indonesia');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Store last 10 Q&A pairs (20 messages total)
      const recentMessages = messages.slice(-20);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentMessages));
    }
  }, [messages, isMounted]);

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages((prev) => [...prev, { ...message, id: uuidv4() }]);
  };

  const handleSendMessage = async (content: string) => {
    addMessage({ role: 'user', content });
    setIsLoading(true);

    try {
      const result = await generateAIResponse({ question: content, language });
      addMessage({
        role: 'assistant',
        content: result.response,
        translation: result.englishResponse,
      });
    } catch (error) {
      console.error('AI response error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a response from the AI. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-2xl bg-card/50 backdrop-blur-sm border-white/10 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <CardTitle className="font-headline text-xl text-white">AI Tutor</CardTitle>
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
          />
      </CardContent>
      <div className="p-4 border-t border-white/10">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
}
