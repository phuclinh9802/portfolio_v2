import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
`;

const SubTitle = styled.h4`
  font-size: 1.2em;
  font-weight: 400;
  color: white;
  margin-top: 0px;
`;

export default function Overlay() {
  return (
    <Container>
      <Title>Spin Me!</Title>
      <SubTitle>Try it, it is really fun!!!</SubTitle>
    </Container>
  );
}
