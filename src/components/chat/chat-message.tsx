'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Bot, User, Volume2, Loader2, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from './chat-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isAssistant = message.role === 'assistant';
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleTTS = async () => {
    if (audio) {
      audio.play();
      return;
    }
    setIsSpeaking(true);
    try {
      const result = await generateAudioFromText({ text: message.content });
      if (result.media) {
        const newAudio = new Audio(result.media);
        setAudio(newAudio);
        newAudio.play();
      }
    } catch (error) {
      console.error('TTS generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: 'Failed to generate audio. Please try again.',
      });
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 my-4',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8 border border-white/20">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'p-3 rounded-lg max-w-sm sm:max-w-md md:max-w-lg shadow-md relative group',
          isAssistant
            ? 'bg-secondary text-secondary-foreground rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-tr-none'
        )}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          <div>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.translation && showTranslation && (
              <div className="border-t mt-2 pt-2 border-white/20 text-muted-foreground">
                <p className="whitespace-pre-wrap text-sm">{message.translation}</p>
              </div>
            )}
          </div>
        )}
        {isAssistant && !isLoading && (
          <div className="absolute -bottom-4 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-white"
                    onClick={handleTTS}
                    disabled={isSpeaking}
                  >
                    {isSpeaking ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    <span className="sr-only">Speak</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Text-to-Speech</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {message.translation && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-white"
                      onClick={() => setShowTranslation(!showTranslation)}
                    >
                      <Languages className="h-4 w-4" />
                      <span className="sr-only">Toggle Translation</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showTranslation ? 'Hide' : 'Show'} Translation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8 border border-white/20">
          <AvatarFallback className="bg-transparent">
            <User className="h-5 w-5 text-accent" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
