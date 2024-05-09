import { useState } from 'react';
import { DATABASE_NAME } from '../../../config/Constants';
import { ListaTipoRaiz, atualizarTipoRaizProps } from './types';
import SQLite from 'react-native-sqlite-storage';
import { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });


export async function getTipoRaiz(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM cores_cabelo_natural ORDER BY id DESC', [],
                (tx, results) => {
                    let lista: ListaTipoRaiz[] = [];
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

export async function deleteTipoRaiz(id: Number) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM cores_cabelo_natural WHERE id = ?', [id],
                (tx, results) => {

                }
            );
        });
    } catch (error) {
        console.error(error)
    }

}

export async function novoTipoRaiz(props: Cadastro) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO cores_cabelo_natural (descricao) VALUES (?)', [props.descricao.trim()],
                (tx, results) => {

                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}

export async function atualizarTipoRaiz(props: atualizarTipoRaizProps) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE cores_cabelo_natural set descricao = ? WHERE id = ?', [props.descricao.trim(), props.id],
                (tx, results) => {

                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}