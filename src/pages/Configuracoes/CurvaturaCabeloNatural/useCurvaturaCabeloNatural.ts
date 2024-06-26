import { useState } from 'react';
import { DATABASE_NAME } from '../../../config/Constants';
import { ListaCurvaturaCabeloNatural, AtualizarCurvaturaCabeloNatural } from './types';
import SQLite from 'react-native-sqlite-storage';
import { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';

const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });

export async function getCurvaturaCabeloNatural(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM curvatura_cabelo_natural ORDER BY id DESC', [],
                (tx, results) => {
                    let lista: ListaCurvaturaCabeloNatural[] = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        lista.push(results.rows.item(i));
                    }                    
                    FuncRetorno(lista);
                }
            );
        });
    } catch (error) {
        console.error(error)
    }

}

export async function deleteCurvaturaCabeloNatural(id: Number) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM curvatura_cabelo_natural WHERE id = ?', [id],
                (tx, results) => {
                     
                }
            );
        });
    } catch (error) {
        console.error(error)
    }

}

export async function novaCurvaturaCabeloNatural(props: Cadastro) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO curvatura_cabelo_natural (descricao) VALUES (?)', [props.descricao.trim()],
                (tx, results) => {
                    
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}

export async function atualizarCurvaturaCabeloNatural(props: AtualizarCurvaturaCabeloNatural) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE curvatura_cabelo_natural set descricao = ? WHERE id = ?', [props.descricao.trim(), props.id],
                (tx, results) => {
                       
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}