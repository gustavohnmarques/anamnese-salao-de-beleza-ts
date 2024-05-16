import { useState } from 'react';
import { DATABASE_NAME } from '../../../config/Constants';
import { AtualizarAlergiaProps, ListaAlergia } from './types';
import SQLite from 'react-native-sqlite-storage';
import { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });


export async function getAlergia(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM alergia ORDER BY id DESC', [],
                (tx, results) => {                    
                    let lista: ListaAlergia[] = [];
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

export async function deleteAlergia(id: Number) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM alergia WHERE id = ?', [id],
                (tx, results) => {
                     
                }
            );
        });
    } catch (error) {
        console.error(error)
    }

}

export async function novaAlergia(props: Cadastro) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO alergia (descricao) VALUES (?)', [props.descricao.trim()],
                (tx, results) => {
                    
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}

export async function atualizarAlergia(props: AtualizarAlergiaProps) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE alergia set descricao = ? WHERE id = ?', [props.descricao.trim(), props.id],
                (tx, results) => {
                       
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}