import styled from "styled-components";

const P = styled.p`
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Empty({ resourceName, children }) {
  return (
    <Div>{children ? children : <P>No {resourceName} could be found.</P>}</Div>
  );
}

export default Empty;
