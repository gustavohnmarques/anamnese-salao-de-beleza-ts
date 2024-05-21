import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { atualizarCorCabeloNatural, deleteCorCabeloNatural, getCoresCabeloNatural, novaCorCabeloNatural } from './useCorCabeloNatural';
import { CorCabeloNaturalItem } from '../../../components/Configs/CorCabeloNatural/CorCabeloNaturalItem';
import NovoItem, { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';
import React from 'react';
import Header from '../../../components/Header/Header';
import * as S from './styles'
import ListaVazia from '../../../components/Geral/ListaVazia/ListaVazia';
import Skeleton from './componentes/Skeleton';
import { ListaCorCabeloNatural } from '../../../types/ListaCorCabeloNatural.type';



export default function CorCabeloNatural(): React.JSX.Element {

  const [listaCorCabelo, setListaCorCabelo] = useState<ListaCorCabeloNatural[] | null>(null);
  const [indexItemEditando, setIndexItemEditando] = useState<number | null>(null);

  const refInput = useRef<TextInput>(null);

  useEffect(() => {
    getCoresCabeloNatural(setListaCorCabelo);
  }, [])

  const handleDelete = async (id: Number) => {
    deleteCorCabeloNatural(id);
    setListaCorCabelo(listaCorCabelo!?.filter(item => item.id != id));
  }

  const handleEdit = (id: Number) => {
    const item = listaCorCabelo!.findIndex(item => item.id == id);
    setIndexItemEditando(item >= 0 ? item : null);
    refInput.current?.focus();
  }

  const handleNovoItem = async (props: Cadastro) => {
    //Verificar se algum item está sendo editado
    if (indexItemEditando != null) {
      atualizarCorCabeloNatural({ descricao: props.descricao, id: listaCorCabelo![indexItemEditando].id });
    } else {
      novaCorCabeloNatural(props);
    }
    getCoresCabeloNatural(setListaCorCabelo);
    cancelarEdicaoItem(); //Limpar item editado no momento
  }

  const novoItemJaExiste = (value: string) => {
    const validacao = listaCorCabelo?.findIndex(item => item?.descricao == value.trim());
    console.log('essa validação', validacao)
    if (validacao == undefined || validacao >= 0) {
      //Verificar se está editando e não validar com o mesmo item
      if (indexItemEditando != null && validacao == indexItemEditando) {
        return true;
      }
      return false;
    }
    return true
  }

  const cancelarEdicaoItem = () => {
    setIndexItemEditando(null); //Limpar item editado no momento
    refInput.current?.blur();
  }

  function renderItem(item: any): React.JSX.Element {
    return <CorCabeloNaturalItem {...item.item} handleDelete={handleDelete} handleEdit={handleEdit} key={String(item.id)} />
  }

  return (
    <>
      <Header tipo='voltar' titulo='Cor de cabelo natural' />
      <S.Container>
        <NovoItem funcaoRetorno={handleNovoItem} funcaoValidacao={novoItemJaExiste} valor={indexItemEditando != null ? listaCorCabelo![indexItemEditando]?.descricao ?? '' : ''} refInput={refInput} funcaoCancelar={cancelarEdicaoItem} />

        {listaCorCabelo != null &&
          <>
            {listaCorCabelo.length > 0 ?
              <FlatList
                data={listaCorCabelo}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
              />
              :
              <ListaVazia mensagem='Nenhuma cor de cabelo natural cadastrada' />
            }
          </>
        }

      </S.Container>
    </>

  )
}