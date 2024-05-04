import { StackNavigationProp } from "@react-navigation/stack"

export type StackList = {
    Home: undefined;
    CorCabelo: undefined;    
};



export type MenuItemProps = {    
    titulo: string,
    icone?: string,
    tela?: string,
    filho: boolean,
    filhos?: MenuItemProps[]
}

