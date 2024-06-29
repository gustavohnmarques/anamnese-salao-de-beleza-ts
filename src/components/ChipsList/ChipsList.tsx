import React from "react";
import * as S from './styles';
import { FlatList } from "react-native";
import { Chip } from "react-native-paper";
import { Props } from "./types";


export default function ChipsList(props: Props) {

  const renderItemAlergia = (item: any) => (
    <Chip closeIcon="close" onClose={() => props.onClose(item.item.id)}>{item.item.label}</Chip>
  );

  return (
    <S.Container >
      <FlatList       
        data={props.items}
        renderItem={renderItemAlergia}
        keyExtractor={(item, index) => index.toString()}        
        horizontal        
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          gap: 10,
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap',
          alignItems: 'center',          
        }}
      />
    </S.Container>
  )
}

