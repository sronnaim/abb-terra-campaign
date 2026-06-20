'use client';

import {useLocale} from 'next-intl';

export default function Test() {
  const locale = useLocale();

  return <div>{locale}</div>;
}