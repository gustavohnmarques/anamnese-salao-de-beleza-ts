import SQLite from 'react-native-sqlite-storage';
import { DATABASE_NAME } from '../../../config/Constants';
import { CamposVisiveisClientes } from '../../../types/CamposVisiveisClientes.type';
import { AtualizarCampoVisivel } from './types';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });

export async function getCamposVisiveisClientes(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM campos_visiveis_cad_cliente LIMIT 1', [],
                (tx, results) => {                    
                    let lista: CamposVisiveisClientes[] = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        lista.push(results.rows.item(i));
                    }                                     
                    FuncRetorno(lista[0]);
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}


export async function updateCampoVisivelClientes(props: AtualizarCampoVisivel) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                `UPDATE campos_visiveis_cad_cliente set ${props.campo} = ?`, [props.valor],
                (tx, results) => {
                       
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}