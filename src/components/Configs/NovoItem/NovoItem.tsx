
import { TextInput, View } from 'react-native';
import {  ViewStyle } from "react-native";
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { HelperText } from 'react-native-paper';
import * as S from './styles'
import { useTheme } from '../../../contexts/theme';
import React from 'react'
import InputTexto from '../../inputs/InputTexto';

export type Cadastro = {
  descricao: string,
};

export type NovoItem = {
  funcaoRetorno: (props: Cadastro) => void,
  funcaoValidacao?: (value: string) => boolean,
  funcaoCancelar?: () => void,
  style?: ViewStyle,
  valor?: string,
  refInput?: React.RefObject<TextInput>,
};

export default function NovoItem(props: NovoItem): React.JSX.Element {

  const {getTheme} = useTheme();

  const [edicaoItem, setEdicaoItem] = useState<boolean>(false);

  const formType = object({
    descricao: string().min(5, 'Informe uma descrição.').required('Informe uma descrição.').test('itemDuplicado', "A descrição informada já existe.", function (value) {
      //Verificar se existe função de validação
      if (props.funcaoValidacao != undefined) {        
        return props.funcaoValidacao(value);
      }
      return true;
    }),
  })


  const { control, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm<Cadastro>({
    resolver: yupResolver(formType),
    defaultValues: {
      descricao: '',
    },
  })

  const handleCadastro = (data: Cadastro) => {
    props.funcaoRetorno(data);
    reset();
    setEdicaoItem(false)
  }

  useEffect(() => {
    if (props.valor != '') {
      setValue('descricao', props?.valor ?? '')
      setEdicaoItem(true)
    }
  }, [props])

  const cancelarEdicao = () => {
    reset();
    setEdicaoItem(false)
    if (props.funcaoCancelar != undefined) {
      props.funcaoCancelar()
    }
  }

  return (
    <>
      <S.Container style={[{ height: errors?.descricao != undefined ? 100 : 80 }, { ...props.style }]}>
        <S.NovoItem>
          <InputTexto label='Descrição' name={'descricao'} control={control} error={errors.descricao != undefined} refInput={props.refInput} />

          {edicaoItem &&
            <S.ContainerBtnCancelar onPress={cancelarEdicao}>
              <S.BtnCancelar>
                <Icon name={'remove'} size={26} color="#fff" />
              </S.BtnCancelar>
            </S.ContainerBtnCancelar>
          }


          <S.ContainerBtnCancelar onPress={handleSubmit(handleCadastro)}>
            <S.BtnConfirmar>
              <Icon name={edicaoItem ? 'check' : 'plus'} size={26} color="#fff" />
            </S.BtnConfirmar>
          </S.ContainerBtnCancelar>
        </S.NovoItem>
        {errors.descricao?.message && <HelperText type="error" visible={errors.descricao != undefined} style={{color: getTheme().colors.danger100 }}>
          {errors.descricao?.message}
        </HelperText>}
      </S.Container>
    </>

  )
}
