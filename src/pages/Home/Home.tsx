import { Alert, Button, FlatList, Text, View } from 'react-native';
import { InputTexto } from '../../components/Inputs/Inputs';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser, Input } from './Types';
import { object, string, number } from 'yup';



export function RenderizarInputs(inputs: any): React.JSX.Element {

  function renderItem(item: any): React.JSX.Element {
    console.log(item)
    return item.item;
  }

  return (
    <FlatList
      data={inputs}
      renderItem={renderItem}
      numColumns={1}
    />

  )
}

export default function Home(): React.JSX.Element {
  const formType = object({
    nome: string().min(5, 'Informe corretamente o nome.').required('Informe corretamente o nome.'),
    dataNascimento: string().min(10, 'Informe corretamente a data de nascimento.').required('Informe corretamente a data de nascimento.'),
    email: string().email('Informe corretamente o e-mail.').required('Informe corretamente o e-mail.'),
    telefone: string().min(17, 'Informe corretamente o telefone.').required('Informe corretamente o telefone.'),
    cidade: number(),
    endereco: string(),
    bairro: string(),
  })

  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<CreateUser>({
    resolver: yupResolver(formType),
    defaultValues: {
      nome: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      cidade: undefined,
      endereco: undefined,
      bairro: undefined,
    },
  })

  const listaFormulario = [
    <InputTexto control={control} name={'nome'} />,
    <InputTexto control={control} name={'nome'}  />,
    <InputTexto control={control} name={'nome'} />,
    <InputTexto control={control} name={'nome'} />,
  ];

  console.log('iniciando', control)

  return (
    <View>
      {RenderizarInputs(listaFormulario)}
      <Text>AQUI MEU DEUS</Text>
    </View>
  )
}