import { useState } from 'react';
import { DATABASE_NAME } from '../../../config/Constants';
import { ListaCorCabeloNatural } from './types';
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);



const connectToDatabase = async () => {
    return openDatabase(
        { name: DATABASE_NAME, createFromLocation: 1 },
        () => { },
        (error) => {
            console.error(error)
            throw Error("Could not connect to database")
        }
    )
}

export const getTableNames = async (): Promise<string[]> => {
    try {
        const db = openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });
        const tableNames: string[] = []
        const results = await db.executeSql(
            "SELECT * FROM cores_cabelo_natural"
        ).then((res) => {
            console.log(res)
        });
        // results?.forEach((result) => {
        //     for (let index = 0; index < result.rows.length; index++) {
        //         tableNames.push(result.rows.item(index))
        //     }
        // })
        return tableNames
    } catch (error) {
        console.error(error)
        throw Error("Failed to get table names from database")
    }
}

// export async function getCoresCabeloNatural() {

//     return new Promise(async (resolve, reject) => {
//         const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { })
//         db.transaction(
//             (tx) => {
//                 tx.executeSql("SELECT * FROM cores_cabelo_natural", [],
//                     (tx, results) => {
//                         let lista: ListaCorCabeloNatural[] = [];
//                         for (let i = 0; i < results.rows.length; ++i) {
//                             lista.push(results.rows.item(i));
//                         }
//                         resolve(lista);
//                     },
//                     function (error) {
//                         reject(false);
//                         throw new Error(
//                             'Error: ' + error
//                         );
//                     });
//             },
//             function (error) {
//                 reject(undefined);
//                 throw new Error('error: ' + error.message);
//             },
//             function () {
//                 console.log('ok');
//             }
//         )
//     });

// }