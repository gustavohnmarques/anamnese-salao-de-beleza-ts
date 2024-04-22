
import { TextInput, View } from 'react-native';
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { InputTexto } from '../../Inputs/Inputs';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { HelperText } from 'react-native-paper';

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
    if(props.funcaoCancelar != undefined){
      props.funcaoCancelar()
    }
  }

  return (
    <>
      <View style={[styles.container, { height: errors?.descricao != undefined ? 100 : 80 }, { ...props.style }]}>
        <View style={[styles.novoItem]}>
          <InputTexto label='Descrição' name={'descricao'} control={control} error={errors.descricao != undefined} refInput={props.refInput} />

          {edicaoItem &&
            <TouchableOpacity style={styles.containerBtnCancelar} onPress={cancelarEdicao}>
              <View style={styles.btnCancelar}>
                <Icon name={'remove'} size={26} color="#fff" />
              </View>
            </TouchableOpacity>
          }


          <TouchableOpacity style={styles.containerBtn} onPress={handleSubmit(handleCadastro)}>
            <View style={styles.btnConfirmar}>
              <Icon name={edicaoItem ? 'check' : 'plus'} size={26} color="#fff" />
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
  
  containerBtnCancelar: {
    width: 70,
    height: '100%',
    paddingLeft: 15,
  } as ViewStyle,

  btnCancelar: {
    height: 55,
    backgroundColor: '#ff5f56',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  } as ViewStyle,

  btnConfirmar: {
    height: 55,
    backgroundColor: '#579d83',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  } as ViewStyle,

});
