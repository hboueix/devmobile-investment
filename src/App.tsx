import React, { useRef, useState } from 'react';
import { IonAlert, IonApp, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Controls from './components/Controls';

const App: React.FC = () => {

  const priceInput = useRef<HTMLIonInputElement>(null);
  const rentInput = useRef<HTMLIonInputElement>(null);
  const [result, setResult] = useState<number>();
  const [errorString, setErrorString] = useState<string>();
  const [segmentValue, setSegmentValue] = useState<'month' | 'year'>('month');

  const calculate = () => {
    const priceValue = priceInput.current!.value;
    const rentValue = rentInput.current!.value;

    if (!priceValue || !rentValue || priceValue <= 0 || rentValue <= 0) {
      setErrorString("Please enter valid inputs");
      return
    };

    const factor = segmentValue === 'month' ? 12 : 1;

    const renta = +rentValue * factor * 100 / +priceValue;

    setResult(renta)
  };

  const reset = () => {
    priceInput.current!.value = '';
    rentInput.current!.value = '';
    setResult(undefined);
  };

  const changeSegment = (event: CustomEvent) => {
    setSegmentValue(event.detail.value);
  }

  return (
    <React.Fragment>
      <IonAlert 
        isOpen={!!errorString}
        onDidDismiss={() => setErrorString(undefined)}
        message={errorString}
        buttons={['OK']}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Investment
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonSegment value={segmentValue} onIonChange={changeSegment}>
            <IonSegmentButton value='month'>
              <IonLabel>Month</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='year'>
              <IonLabel>Year</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonGrid>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Price
                  </IonLabel>
                  <IonInput ref={priceInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Rent {segmentValue === 'month' ? '(month)' : '(year)'}
                  </IonLabel>
                  <IonInput ref={rentInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <Controls onCalculate={calculate} onReset={reset}/>

            <IonRow>
              <IonCol>
                {result &&
                  <IonCard>
                    <IonCardContent className='ion-text-center'>
                      {result.toFixed(2)} %
                    </IonCardContent>
                  </IonCard>
                }
              </IonCol>
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  )
};

export default App;
