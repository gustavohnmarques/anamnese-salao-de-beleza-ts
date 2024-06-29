import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { PropsInputSearchModal } from "../../../types/InputSearchModal.type";
import { InputSearch } from "../../Inputs/InputSearch";
import {debounce} from 'lodash';
  

export default function Input(props: PropsInputSearchModal) {

    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);


    const handler = useCallback(debounce(text => {
      props.onChange(text)
    }, 500), []);
  
    const handleChange = (text: string) => {
      setSearchTerm(text);
    };

    useEffect(() => {
      if(searchTerm != undefined){
        handler(searchTerm);
      }      
    }, [searchTerm])

    
    return (
        <ContainerInput>
            <InputSearch label={props.label} value={searchTerm!} onChange={handleChange} onFocus={props.onFocus} />
        </ContainerInput>
    )
}

const ContainerInput = styled.View`        
    height: 80px;            
`