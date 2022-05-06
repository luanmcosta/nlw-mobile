import React from 'react';
import { 
    View,
    Image,
    TouchableOpacity,
    Text

} from 'react-native';
import { Copyright } from '../Copyright';


import sucessImg from './../../assets/success.png';

import { styles } from './styles';

export function Success() {
  return (
    <View style={styles.container}>
        <Image 
            source={sucessImg}
            style={styles.image}
        />

        <Text style={styles.title}>
            Agradecemos o feedback
        </Text>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>
                Quero enviar outro
            </Text>
        </TouchableOpacity>

        <Copyright />
    </View>
  );
}