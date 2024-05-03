import { Alert, Button, FlatList, Text, View } from 'react-native';
import { InputCelular, InputDataNascimento, InputTexto } from '../../components/Inputs/Inputs';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser, Input } from './Types';
import { object, string, number } from 'yup';
import * as S from './styles';
import Header from '../../components/Header/Header';


export function RenderizarInputs(inputs: any): React.JSX.Element {
  
  function renderItem(item: any): React.JSX.Element {
    return item.item;
  }

  return (
    <FlatList
      data={inputs}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 15 }}
      columnWrapperStyle={{ gap: 15 }}
      numColumns={3}
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
    <InputTexto label='Nome' name={'nome'} control={control} />,
    <InputDataNascimento label='Data de nascimento' name={'dataNascimento'} control={control} />,
    <InputTexto label='E-mail' name={'email'} control={control} />,
    <InputCelular label='Telefone' name={'telefone'} control={control} />,
    <InputTexto label='Cidade' name={'cidade'} control={control} />,
    <InputTexto label='Endereço' name={'endereco'} control={control} />,
    <InputTexto label='Bairro' name={'bairro'} control={control} />,
  ];

  return (
    <S.Container>
      <S.Title>Testando aqui</S.Title>
    </S.Container>
  )
}