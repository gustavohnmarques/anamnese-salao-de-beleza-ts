import { Alert, Button, View } from 'react-native';
import { Input } from '../../components/inputs';


function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input onChange={(valor: string) => {console.log(valor)}} value='123' label='Informe seu nome' icon={'eye'} onChangeIcon={() => Alert.alert('aaa')} /> 
      </View>
    );
  }

export default HomeScreen;