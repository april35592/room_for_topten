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

export const Main = styled(SpaceBetween)`
  height: calc(100vh - 100px);
  flex-direction: column;
`;
