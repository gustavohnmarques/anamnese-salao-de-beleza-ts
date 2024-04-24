import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Alert,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

export default function Menu(props: any): React.JSX.Element {    

    type RootStackParamList = {
        CorCabelo: { id: number } | undefined;
    };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Help"
                    onPress={() => Alert.alert('testando')}
                />

            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('CorCabelo', { id: 0 })} style={styles.botao}>
                <View >
                    <Text>Aqui abrir</Text>
                </View>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black'
    },
    botao: {
        height: 60,
        flex: 1,
        backgroundColor: 'blue'
    },
    preferences: {
        fontSize: 16,
        color: "#ccc",
        paddingTop: 10,
        fontWeight: "500",
        paddingLeft: 20,
    },
    switchText: {
        fontSize: 17,
        color: "",
        paddingTop: 10,
        fontWeight: "bold",
    },
});