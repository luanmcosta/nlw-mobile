import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity 
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { theme } from '../../theme';
import { styles } from './styles';

import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button/indes';
import { Copyright } from '../Copyright';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType,
    onFeedbackCanceled: () => void,
    onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent} : Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [comment, setComment] = useState('');
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendFeedback] = useState(false);

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then((uri => setScreenshot(uri)))
        .catch(e => console.log(e))
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }
    
    async function handleSendFeedback(){

        if(isSendingFeedback)
            return;
        setIsSendFeedback(true);

        const screenshotBase64 = screenshot  && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try{
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            });
            onFeedbackSent();
        }catch (error) {
            console.log(error);
            setIsSendFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
        
            <View style={styles.header} >
            
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                    />
                    
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                onChangeText={setComment}
                autoCorrect={false}
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando?"
                placeholderTextColor={theme.colors.text_secondary}
            />
        
            <View style={styles.footer}>
                <ScreenshotButton 
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />

                <Button isLoading={isSendingFeedback} onPress={handleSendFeedback}/>

            </View>
            
            <Copyright />
        </View>
        );
    }