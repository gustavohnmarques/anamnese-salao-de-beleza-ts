import { useState } from 'react';
import { DATABASE_NAME } from '../../../config/Constants';
import { ListaCorCabeloNatural } from './types';
import SQLite from 'react-native-sqlite-storage';
import { Cadastro } from '../../../components/Configs/CorCabeloNatural/NovoItem';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });


export async function getCoresCabeloNatural(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM cores_cabelo_natural ORDER BY id DESC', [],
                (tx, results) => {
                    console.log(results.rows.length)
                    let lista: ListaCorCabeloNatural[] = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        lista.push(results.rows.item(i));
                    }
                    console.log(lista);
                    FuncRetorno(lista);
                }
            );
        });
    } catch (error) {
        console.log(error)
    }

}

export async function deleteCorCabeloNatural(id: Number) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM cores_cabelo_natural WHERE id = ?', [id],
                (tx, results) => {
                    console.log(results)        
                }
            );
        });
    } catch (error) {
        console.log(error)
    }

}

export async function novaCorCabeloNatural(props: Cadastro) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO cores_cabelo_natural (descricao) VALUES (?)', [props.descricao],
                (tx, results) => {
                    console.log(results)        
                }
            );
        });
    } catch (error) {
        console.log(error)
    }

}