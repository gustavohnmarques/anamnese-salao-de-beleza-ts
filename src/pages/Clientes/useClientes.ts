import { useState } from 'react';

import SQLite from 'react-native-sqlite-storage';
import { DATABASE_NAME } from '../../config/Constants';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });


export async function getAlergia(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM alergia ORDER BY id DESC', [],
                (tx, results) => {                    
                    //let lista: ListaAlergia[] = [];
                    // for (let i = 0; i < results.rows.length; ++i) {
                    //     lista.push(results.rows.item(i));
                    // }                    
                    // FuncRetorno(lista);
                }
            );
        });
    } catch (error) {
        console.error(error)
    }

}
