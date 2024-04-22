
import { Alert, Button, FlatList, Text, View } from 'react-native';
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { InputTexto } from '../../Inputs/Inputs';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';
import { HelperText } from 'react-native-paper';

export type Cadastro = {
  descricao: string,
};

export type NovoItem = {
  funcaoRetorno: (props: Cadastro) => void,
  funcaoValidacao?: (value: string) => boolean,
  style?: ViewStyle,
};

export default function NovoItem(props: NovoItem): React.JSX.Element {

  const formType = object({
    descricao: string().min(5, 'Informe uma descrição.').required('Informe uma descrição.').test('itemDuplicado', "A descrição informada já existe.", function(value){
      //Verificar se existe função de validação
      if(props.funcaoValidacao != undefined){
        return props.funcaoValidacao(value);
      }
      return true;
    }),
  })


  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<Cadastro>({
    resolver: yupResolver(formType),
    defaultValues: {
      descricao: '',
    },
  })

  const handleCadastro = (data: Cadastro) => {        
    props.funcaoRetorno(data);
    reset();
  }

  return (
    <>
      <View style={[styles.container, { height: errors?.descricao != undefined ? 100 : 80 }, {...props.style}]}>
        <View style={[styles.novoItem]}>
          <InputTexto label='Descrição' name={'descricao'} control={control} error={errors.descricao != undefined} />
          <TouchableOpacity style={styles.containerBtn} onPress={handleSubmit(handleCadastro)}>
            <View style={styles.btnConfirmar}>
              <Icon name="plus" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        {errors.descricao?.message && <HelperText type="error" visible={errors.descricao != undefined}>
          {errors.descricao?.message}
        </HelperText>}
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  } as ViewStyle,

  novoItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 65,

  } as ViewStyle,

  input: {
    flexDirection: 'row',
    flex: 1
  } as ViewStyle,

  containerBtn: {
    width: 120,
    height: '100%',
    paddingLeft: 15,
  } as ViewStyle,

  btnConfirmar: {
    height: 60,
    backgroundColor: '#579d83',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  } as ViewStyle,

});
