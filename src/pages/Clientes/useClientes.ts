import SQLite from 'react-native-sqlite-storage';
import { DATABASE_NAME } from '../../config/Constants';
import { SelectProps } from '../../types/InputSelect.type';
import { CamposVisiveisClientes } from '../../types/CamposVisiveisClientes.type';


const db = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });

export const campos = [
    { name: 'nome', label: 'Nome', tipo: 'texto'},
    { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'dataNascimento'},
    { name: 'email', label: 'E-mail', tipo: 'texto'},
    { name: 'celular', label: 'Celular', tipo: 'celular'},
    { name: 'cidade', label: 'Cidade', tipo: 'texto'},
    { name: 'endereco', label: 'Endereço', tipo: 'texto'},
    { name: 'corCabeloNatural', label: 'Cor de cabelo natural', tipo: 'select'},
    { name: 'curvaturaNatural', label: 'Curvatura natural', tipo: 'select'},
    { name: 'tipoRaiz', label: 'Tipo de raiz', tipo: 'select'},
]

export async function getCoresCabeloNatural(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT id AS value, descricao AS label, id AS key FROM cores_cabelo_natural ORDER BY id DESC', [],
                (tx, results) => {
                    let lista: SelectProps[] = [];
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

export async function getTipoRaiz(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT id AS value, descricao AS label, id AS key FROM tipo_raiz ORDER BY id DESC', [],
                (tx, results) => {
                    let lista: SelectProps[] = [];
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

export async function getCurvaturaCabeloNatural(FuncRetorno: Function) {
    try {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT id AS value, descricao AS label, id AS key FROM curvatura_cabelo_natural ORDER BY id DESC', [],
                (tx, results) => {
                    let lista: SelectProps[] = [];
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

