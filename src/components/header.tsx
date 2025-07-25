'use client';

import { Languages } from 'lucide-react';
import Image from 'next/image';
import { TranslationTool } from '@/components/translation-tool';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-10 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="BahasAI Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold font-headline text-white">
              Bahas<span className="text-primary">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
            <TranslationTool />
          </div>
        </div>
      </div>
    </header>
  );
}
