export type PropsSubitem = {    
    titulo: string,
    subtitulo: string,
    tela: string,    
}
  
export type Props = {    
    titulo: string,
    itens: PropsSubitem[],  
}