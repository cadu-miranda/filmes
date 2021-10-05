import styled from "styled-components/native";

export const Container = styled.View`
  padding: 14px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${(props) => props.size}px;
  font-weight: bold;
`;

export const RateContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 8px 0;
`;

export const Rate = styled.Text`
  color: #fff;
  font-size: 12px;
  padding-left: 4px;
`;

export const ActionContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const DetailsButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 30px;
  background-color: #e72f49;
  border-radius: 30px;
`;

export const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 30px;
`;
