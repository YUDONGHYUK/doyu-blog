'use client';

import TypeIt from 'typeit-react';

export default function HomeTyper() {
  return (
    <TypeIt
      options={{ speed: 100 }}
      getBeforeInit={(instance: InstanceType<typeof TypeIt>) => {
        instance.type(
          'React를 통해 개발하고 있으며, Next.js와 Typescript에 관심이 많습니다.'
        );

        return instance;
      }}
    />
  );
}
