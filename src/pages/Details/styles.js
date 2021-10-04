import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #191a30;
`;

export const Header = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 14px;
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
`;

export const HeaderButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, 0.8);
  border-radius: 23px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  /* border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px; */
`;

export const ButtonLink = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  right: 15px;
  background-color: #e72f49;
  width: 63px;
  height: 63px;
  border-radius: 35px;
  position: absolute;
  top: 300px;
  z-index: 99;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const ContentArea = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 20px;
`;

export const Rate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const GenresList = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
`;

export const Description = styled.Text`
  padding: 0px 14px 30px 14px;
  color: #fff;
  line-height: 20px;
`;
