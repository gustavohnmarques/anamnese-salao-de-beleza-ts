import { TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { atualizarCurvaturaCabeloNatural, deleteCurvaturaCabeloNatural, getCurvaturaCabeloNatural, novaCurvaturaCabeloNatural} from './useCurvaturaCabeloNatural';
import { ListaCurvaturaCabeloNatural } from './types';
import { CorCabeloNaturalItem } from '../../../components/Configs/CorCabeloNatural/CorCabeloNaturalItem';
import NovoItem, { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';
import React from 'react';
import Header from '../../../components/Header/Header';
import * as S from './styles'
import ListaVazia from '../../../components/Geral/ListaVazia/ListaVazia';
import { FlatList } from 'react-native-gesture-handler';



export default function CurvaturaCabeloNatural(): React.JSX.Element {

  const [listaCurvaturaCabeloNatural, setListaCurvaturaCabeloNatural] = useState<ListaCurvaturaCabeloNatural[] | null>(null);
  const [indexItemEditando, setIndexItemEditando] = useState<number | null>(null);

  const refInput = useRef<TextInput>(null);

  useEffect(() => {
    getCurvaturaCabeloNatural(setListaCurvaturaCabeloNatural);
  }, [])

  const handleDelete = async (id: Number) => {
    deleteCurvaturaCabeloNatural(id);
    setListaCurvaturaCabeloNatural(listaCurvaturaCabeloNatural!?.filter(item => item.id != id));
  }

  const handleEdit = (id: Number) => {
    const item = listaCurvaturaCabeloNatural!.findIndex(item => item.id == id);
    setIndexItemEditando(item >= 0 ? item : null);
    refInput.current?.focus();
  }

  const handleNovoItem = async (props: Cadastro) => {
    //Verificar se algum item está sendo editado
    if (indexItemEditando != null) {
      atualizarCurvaturaCabeloNatural({ descricao: props.descricao, id: listaCurvaturaCabeloNatural![indexItemEditando].id });
    } else {
      novaCurvaturaCabeloNatural(props);
    }
    getCurvaturaCabeloNatural(setListaCurvaturaCabeloNatural);
    cancelarEdicaoItem(); //Limpar item editado no momento
  }

  const novoItemJaExiste = (value: string) => {
    const validacao = listaCurvaturaCabeloNatural?.findIndex(item => item?.descricao == value.trim());
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
      <Header tipo='voltar' titulo='Curvatura de cabelo natural' />
      <S.Container>
        <NovoItem funcaoRetorno={handleNovoItem} funcaoValidacao={novoItemJaExiste} valor={indexItemEditando != null ? listaCurvaturaCabeloNatural![indexItemEditando]?.descricao ?? '' : ''} refInput={refInput} funcaoCancelar={cancelarEdicaoItem} />

        {listaCurvaturaCabeloNatural != null &&
          <>
            {listaCurvaturaCabeloNatural.length > 0 ?
              <FlatList
                data={listaCurvaturaCabeloNatural}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
              />
              :
              <ListaVazia mensagem='Nenhuma curvatura de cabelo natural cadastrada' />
            }
          </>
        }

      </S.Container>
    </>

  )
}