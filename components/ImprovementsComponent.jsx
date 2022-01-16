import { IonList, IonIcon, IonFabButton, IonFab, IonRefresher, IonRefresherContent, IonMenu, IonApp, IonContent, IonRouterOutlet, IonSplitPane, IonPage, IonButton, IonButtons, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonModal, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Tabs from './pages/Tabs';

import { useState, useRef } from 'react';

import { format, parseISO } from 'date-fns';

import CommendationListItem from './CommendationListItem'

/*window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});*/

const ImprovementsComponent = () => {


  const [commendations, setCommendations] = useState([]);

  useIonViewWillEnter(async () => {
    const commendations = await getCommendations();
    setCommendations(commendations);
  });

  const deleteCommendation2 = async (guid) => {
    const existing = commendations.find((todo) => todo.guid === guid)
    if (existing) {
      /*await deleteCommendation(existing)
      // refresh from db
      const todos = await getCommendations();
      setCommendations(todos);*/

      const updatedList = await deleteAndGetCommendations(commendations, existing)
      setCommendations(updatedList);
      // syn in background
      webWorker.postMessage('startReplicateTo');
    }
  }

  const refresh = async (e) => {
    await replicate();

    // refresh from db
    const todos = await getCommendations();
    setCommendations(todos);
    e.detail.complete();
  };




  return (
    <IonApp>
      <IonSplitPane contentId="main">


        {/*--  the side menu  --*/}
        <Menu />


        <IonPage id="main">
          <IonHeader>
            <IonToolbar color="success">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Commendation</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>

            <IonRefresher slot="fixed" onIonRefresh={refresh}>
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

            {/*-- fab placed to the (vertical) center and end --*/}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton routerLink={'/page/CommendationAdd'} routerDirection="none">
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>

            <IonList>
              {commendations.map(m => <CommendationListItem key={m.guid} commendation={m} deleteCommendation={deleteCommendation2} />)}
            </IonList>


          </IonContent>
        </IonPage>

      </IonSplitPane>
    </IonApp>
  );
};

export default ImprovementsComponent;
