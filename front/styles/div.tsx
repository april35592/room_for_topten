import styled from '@emotion/styled';

export const Width100 = styled.div`
  width: 100%;
`;

export const SpaceAround = styled(Width100)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SpaceBetween = styled(Width100)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled(AlignCenter)`
  flex-direction: column;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 100px);

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
