'use client';
import type { TOCItemType, TableOfContents } from 'fumadocs-core/server';
import Link from 'next/link';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const TocItem = ({ item }: { item: TOCItemType }) => {
  // Recreate indentation logic
  const paddingMap: Record<number, string> = {
    1: 'pl-2',
    2: 'pl-4',
    3: 'pl-6',
    4: 'pl-8',
    5: 'pl-10',
    6: 'pl-12'
  };

  return (
    <Link 
      href={item.url} 
      className={`
        block 
        py-1 
        text-sm 
        transition-all 
        duration-200 
        hover:bg-accent 
        hover:text-accent-foreground 
        rounded-md 
        ${item.depth && paddingMap[item.depth] || ''}
      `}
    >
      {item.title}
    </Link>
  );
};

export const TableofContents = ({
  toc,
  className,
}: {
  toc: TableOfContents;
  className?: string;
}) => {
  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue="table-of-contents"
      className={className}
    >
      <AccordionItem value="table-of-contents">
        <AccordionTrigger className="rounded-lg">
          Table of Contents
        </AccordionTrigger>
        <AccordionContent className="space-y-1 pt-2">
          {toc.map((item, index) => (
            <TocItem key={`${item.url}-${index}`} item={item} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TableofContents;