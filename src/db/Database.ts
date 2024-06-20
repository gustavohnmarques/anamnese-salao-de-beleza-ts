import SQLite from 'react-native-sqlite-storage';
import { DATABASE_NAME } from '../config/Constants';


export const DB = SQLite.openDatabase({ name: DATABASE_NAME, createFromLocation: 1 }, () => { }, () => { });