import React, { useRef } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { ChatTeardropDots} from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet';

import { styles } from './styles';
import { theme } from '../../theme';
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Options } from '../Options';
import { Form } from '../Form';

import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {

  const bottomSheetRef = useRef<BottomSheet>(null);


  function handleOpen(){
    bottomSheetRef.current?.expand();
  }
  
  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
        >
          <ChatTeardropDots 
          size={24} 
          color={theme.colors.text_on_brand_color}
          weight="bold" />
      </TouchableOpacity>

      <BottomSheet 
        ref={bottomSheetRef} 
        snapPoints={[1, 320]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Form feedbackType="OTHER" />
      </BottomSheet>

    </>
  );
}


export default gestureHandlerRootHOC(Widget);