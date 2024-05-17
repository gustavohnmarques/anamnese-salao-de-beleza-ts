import { SelectProps } from './types';
import React from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import styled, { css } from "styled-components/native";

export default function InputSelect(props: SelectProps): React.JSX.Element {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Input>
                    <RNPickerSelect
                        style={{
                            placeholder: {
                                color: '#4f4953',
                            },
                        }}
                        value={field.value}
                        placeholder={props.label}
                        onValueChange={field.onChange}
                        items={props.items}
                    />
                </Input>
            )}
        />
    )
}


const Input = styled.View`    
    ${({ theme }) => css`        
        background-color: #e7e1eb;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        margin-bottom: 15px;
        border-bottom-width: 0.7px;
        border-bottom-color: rgb(102, 90, 111);
    `}
`

