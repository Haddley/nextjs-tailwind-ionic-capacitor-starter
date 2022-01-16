import {
  IonCheckbox,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';

import { IonItemSliding, IonItemOptions } from '@ionic/react';
// import { Commendation } from '../commendations';


// import './CommendationListItem.css';

import { format, parseISO } from 'date-fns';


/*interface CommendationListItemProps {
  commendation: Commendation;
  deleteCommendation: any;
}*/

const formatDate = (value) => {
  return format(parseISO(value), 'MMM dd yyyy');
};

const CommendationListItem= ({ commendation, deleteCommendation }) => {
  return (
    <IonItemSliding key={commendation.guid} id={commendation.guid}>

      <IonItem key={commendation.guid}>
        <IonLabel className='ion-text-wrap'>
          {commendation.commendationComments}
        </IonLabel>
        <IonLabel className='ion-text-wrap'>
          {commendation.name}
        </IonLabel>
        <IonLabel className='ion-text-wrap'>
          {formatDate(commendation.selectedDate)}
        </IonLabel>
        <IonThumbnail>
          <img src={commendation.attachedPhoto} />
        </IonThumbnail>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption onClick={() => deleteCommendation(commendation.guid)}>Delete</IonItemOption>
      </IonItemOptions>

    </IonItemSliding>
  );
};

export default CommendationListItem;