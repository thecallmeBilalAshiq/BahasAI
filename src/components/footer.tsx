'use client';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BahasAI by BIAL ASHIQ. Built with Next.js and Firebase.</p>
        </div>
      </div>
    </footer>
  );
}
