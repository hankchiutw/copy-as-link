'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import icon32 from '~assets/icon-32.png';
import CopyAsLinkMessage from '~contents/CopyAsLinkMessage';

const crxUrl =
  'https://chromewebstore.google.com/detail/copy-as-link/ggjdfhajjlfhmmkfnlfgbeeoepdnnlij';

export default function Component() {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      getSelection().addRange(range);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src={icon32}
              alt="copy as link"
              className="h-6 w-6 text-primary"
            />
            <span className="text-xl font-bold text-primary">Copy as Link</span>
          </div>
          <Button variant="outline">
            <a href={crxUrl} target="_blank">
              Install Extension
            </a>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-primary">Copy as Link</h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Copy the selected text as a link to the current page&apos;s URL
          </p>
          <Button size="lg" className="text-lg px-8">
            <a href={crxUrl} target="_blank">
              Add to Chrome
            </a>
          </Button>
        </section>

        <section className="grid md:grid-cols-1 gap-8 mb-16 text-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle className="flex items-center space-x-2">
                <Copy className="h-6 w-6 text-primary" />
                <span ref={titleRef}>Try on this page without installing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Select any text on this page and click the small icon at
              bottom-right of the selection!
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Ready to Simplify Your Link Sharing?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Install Copy as Link now and experience effortless link sharing
            across all your platforms.
          </p>
          <Button size="lg" className="text-lg px-8">
            <a href={crxUrl} target="_blank">
              Add to Chrome
            </a>
          </Button>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 Copy as Link. All rights reserved.</p>
      </footer>
      <CopyAsLinkMessage></CopyAsLinkMessage>
    </div>
  );
}
