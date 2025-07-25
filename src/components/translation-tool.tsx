'use client';

import { useState } from 'react';
import { Languages, Loader2, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { translateText } from '@/ai/flows/translate-text';
import { ALL_LANGUAGES } from '@/lib/languages';
import type { LanguageCode } from '@/lib/languages';
import { Label } from './ui/label';

export function TranslationTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceLang, setSourceLang] = useState<LanguageCode>('en');
  const [targetLang, setTargetLang] = useState<LanguageCode>('id');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim() || sourceLang === targetLang) return;

    setIsTranslating(true);
    setTranslatedText('');
    try {
      const result = await translateText({
        text: inputText,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Translation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Translation Error',
        description: 'Failed to translate text. Please try again.',
      });
    } finally {
      setIsTranslating(false);
    }
  };
  
  const swapLanguages = () => {
    const currentSource = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(currentSource);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Translate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Language Translator</DialogTitle>
          <DialogDescription>
            Translate text between supported languages.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="grid gap-2">
            <Label htmlFor="source-language">From</Label>
            <Select value={sourceLang} onValueChange={(v: LanguageCode) => setSourceLang(v)}>
              <SelectTrigger id="source-language">
                <SelectValue placeholder="Source Language" />
              </SelectTrigger>
              <SelectContent>
                {ALL_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <Button variant="outline" size="icon" onClick={swapLanguages} className="self-center">
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="grid gap-2">
            <Label htmlFor="target-language">To</Label>
            <Select value={targetLang} onValueChange={(v: LanguageCode) => setTargetLang(v)}>
              <SelectTrigger id="target-language">
                <SelectValue placeholder="Target Language" />
              </SelectTrigger>
              <SelectContent>
                {ALL_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Translation will appear here..."
              readOnly
              value={translatedText}
              className="min-h-[150px] bg-muted/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleTranslate} disabled={isTranslating || !inputText.trim() || sourceLang === targetLang}>
            {isTranslating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Languages className="mr-2 h-4 w-4" />
            )}
            Translate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
