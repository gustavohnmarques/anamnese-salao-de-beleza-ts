import { DB } from "./Database";

type Props = {
    function: Function,
    search?: String
}

export async function getAlergias(props: Props) {    
    try {
        DB.transaction(function (tx) {
            tx.executeSql(
                `SELECT descricao AS label, id AS value, id AS key FROM alergia ${props.search != undefined ? `WHERE descricao LIKE "%${props.search.toLocaleLowerCase().trim()}%"` : ''} ORDER BY id DESC`, [],
                (tx, results) => {                    
                    let lista = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        lista.push(results.rows.item(i));
                    }
                    props.function(lista);
                }
            );
        });
    } catch (error) {
        console.error(error)
    }
}

