import { Card, Cards } from 'fumadocs-ui/components/card';
import { PreWithCopy } from './Pre';
import { CustomCallout } from './Callout';
import { createHeadingComponent } from './Heading';
import { CustomImage } from './Image';
import { CustomLink } from './Link';
import { CustomTable } from './Table';

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