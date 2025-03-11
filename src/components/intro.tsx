'use client';

import TypeIt from 'typeit-react';
import { Heading } from './ui/heading';

export default function Intro() {
  return (
    <div className="mt-10 tb-12">
      <div className="w-full">
        <div className="space-y-4">
          <Heading as="h1">Donghyuk Yu</Heading>
          <Heading as="h5">
            배움을 즐기고 두려워하지 않는 프론트엔드 개발자입니다.
          </Heading>
        </div>
        <p className="h-4">
          <TypeIt
            options={{ speed: 100 }}
            getBeforeInit={(instance: any) => {
              instance.type(
                'React를 통해 개발하고 있으며, Next.js와 Typescript에 관심이 많습니다.'
              );

              return instance;
            }}
          />
        </p>
      </div>
    </div>
  );
}
