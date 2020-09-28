import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline } from 'ionicons/icons';
import React from 'react';

const Controls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
	return (
		<IonRow className='ion-margin'>
          <IonCol className='ion-text-left'>
            <IonButton onClick={props.onCalculate}>
              <IonIcon slot='start' icon={calculatorOutline} />             
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className='ion-text-right'>
            <IonButton onClick={props.onReset} fill='outline'>Reset</IonButton>
          </IonCol>
        </IonRow>
	)
};

export default Controls;