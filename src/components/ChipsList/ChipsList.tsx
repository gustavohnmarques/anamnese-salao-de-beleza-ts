import React, { useCallback, useEffect } from "react";
import * as S from './styles';
import { FlatList } from "react-native";
import { Chip } from "react-native-paper";
import { Props } from "./types";


export default function ChipsList(props: Props) {

  const renderItemAlergia = (item: any) => (
    <Chip key={item.item.id} closeIcon="close" onClose={() => console.log('Pressed')}>{item.item.label}</Chip>
  );

  return (
    <S.Container key={props.items.length} >
      <FlatList       
        key={props.items.length} 
        data={props.items}
        renderItem={renderItemAlergia}
        keyExtractor={(item, index) => index.toString()}
        style={{ flexGrow: 0 }}        
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

