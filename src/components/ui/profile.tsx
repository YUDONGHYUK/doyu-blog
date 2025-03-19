'use client';

import TypeIt from 'typeit-react';

export default function Profile() {
  return (
    <div>
      <div>
        <TypeIt
          options={{ speed: 100 }}
          getBeforeInit={(instance: any) => {
            instance
              .type('안녕하세요.')
              .pause(500)
              .type(`<br>프론트엔드 개발자 <strong >유동혁</strong>입니다.`)
              .pause(750);
            return instance;
          }}
        />
        <div className="text-lg">
          <p>새로운 것을 배우고 익히는 것을 좋아하며,</p>
          <p>
            Notion과 블로그에 새롭게 배운 지식들을 기록하며 성장하고 있습니다.
          </p>
          <p>
            또한, 개발 중 마주친 문제는 적극적으로 해결하고 두려워하지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
