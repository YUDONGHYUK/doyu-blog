'use client';

import TypeIt from 'typeit-react';

export default function AboutTyper() {
  return (
    <TypeIt
      options={{ speed: 100 }}
      getBeforeInit={(instance: any) => {
        instance
          .type('안녕하세요.')
          .pause(500)
          .type(`<br>프론트엔드 개발자 유동혁입니다.`)
          .pause(750);
        return instance;
      }}
    />
  );
}
