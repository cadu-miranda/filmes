import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #141a29;
`;

export const SearchContainer = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding: 0 14px;
  margin-top: 22px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.4);
  width: 85%;
  height: 50px;
  border-radius: 50px;
  padding: 8px 15px;
  font-size: 18px;
  color: #fff;
`;

export const SearchButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 50px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 20px 14px 8px 14px;
`;

export const BannerButton = styled.TouchableOpacity``;

export const Banner = styled.Image`
  height: 150px;
  border-radius: 6px;
  margin: 0 14px;
`;

export const MovieSlider = styled.FlatList`
  height: 250px;
  padding: 0 14px;
`;
