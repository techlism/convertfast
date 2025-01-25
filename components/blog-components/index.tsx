import { Card, Cards } from 'fumadocs-ui/components/card';
import { PreWithCopy } from './pre';
import { CustomCallout } from './callout';
import { createHeadingComponent } from './heading';
import { CustomImage } from './image';
import { CustomLink } from './link';
import { CustomTable } from './table';

const customMdxComponents = {
  pre: PreWithCopy,
  Card,
  Cards,
  a: CustomLink,
  img: CustomImage,
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
  table: CustomTable,
  Callout: CustomCallout
};

export default customMdxComponents;