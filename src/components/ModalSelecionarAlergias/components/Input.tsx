import React, { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components/native";
import { PropsInputSearchModal } from "../../../types/InputSearchModal.type";
import { InputSearch } from "../../Inputs/InputSearch";


const debounce = (func: Function, delay: number) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
  
    return (...args: any) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  

export default function Input(props: PropsInputSearchModal) {

    const [searchTerm, setSearchTerm] = useState<string>("");


    const debouncedSearch = debounce(props.onChange(searchTerm), 500);

    const handleSearch = (text: string) => {
      setSearchTerm(text);      
      debouncedSearch(text);
    };

    
    return (
        <ContainerInput>
            <InputSearch label={props.label} value={searchTerm} onChange={handleSearch} onFocus={props.onFocus} />
        </ContainerInput>
    )
}

const ContainerInput = styled.View`        
    height: 80px;            
`