import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const ScrollIndicator = () => {
  const [progressWidth, setProgressWidth] = useState(0);

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0) {
      setProgressWidth(0);
      return;
    }

    const percent: number =
      (Math.floor(window.scrollY) /
        (document.body.scrollHeight - window.innerHeight)) *
      100;

    setProgressWidth(percent);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <ScrollBar percent={progressWidth} />
    </Container>
  );
};

export default ScrollIndicator;

const Container = styled.div``;

const ScrollBar = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 0.2rem;
  background-color: #5dade2;
`;
