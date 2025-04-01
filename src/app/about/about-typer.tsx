'use client';

import TypeIt from 'typeit-react';

export default function AboutTyper() {
  return (
    <p className="min-h-[35.5px] md:min-h-[42.5px]">
      <TypeIt
        options={{ speed: 100 }}
        getBeforeInit={(instance: any) => {
          instance.type(`프론트엔드 개발자 유동혁입니다.`).pause(750);
          return instance;
        }}
      />
    </p>
  );
}
