import React from 'react';
import * as S from './styles'

export type Props = {
    mensagem?: string,
}

export default function ListaVazia(props: Props): React.JSX.Element {

    return (
        <S.Container>
            <S.Mensagem>
                {props.mensagem ?? 'Nenhum item cadastrado'}
            </S.Mensagem>
        </S.Container>
    )
}