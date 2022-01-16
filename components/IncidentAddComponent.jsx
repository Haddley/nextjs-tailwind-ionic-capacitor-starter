import { IonToggle, IonMenu, IonApp, IonContent, IonRouterOutlet, IonSplitPane, IonPage, IonButton, IonButtons, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonModal, IonTextarea, IonTitle, IonToolbar, IonRadio } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Tabs from './pages/Tabs';

import { useState, useRef } from 'react';

import { format, parseISO } from 'date-fns';

import {MapSection} from './Map'

/*window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});*/

const IncidentAddComponent = () => {

  const formatDate = (value) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;

  const getDateNowISOString = () => {
    return (new Date(Date.now() - tzoffset)).toISOString()
  }

  const [selectedDate, setSelectedDate] = useState(getDateNowISOString()); //'2012-12-15T13:47:20.789'
  const [submittedBy, setSubmittedBy] = useState('');
  const [name, setName] = useState('');
  const [commendationComments, setCommendationComments] = useState('');
  const [attachedFile, setAttachedFile] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState('');

  const [showModal, setShowModal] = useState(false);

  // state
  const [confidential, setConfidential] = useState(false)
  const [reportedBy, setReportedBy] = useState(localStorage.getItem('name'));
  const [briefDescription, setBriefDescription] = useState(localStorage.getItem(''));


  const taskForm = useRef(null);


  const onSubmitClick = async () => {

    if (taskForm?.current?.reportValidity()) {
      console.log(selectedDate);
      console.log(submittedBy);
      console.log(name);
      console.log(commendationComments);
      console.log(attachedFile);
      console.log(attachedPhoto);

      const result = await addCommendation({
        selectedDate: selectedDate,
        submittedBy: submittedBy,
        name: name,
        commendationComments: commendationComments,
        attachedFile: attachedFile,
        attachedPhoto: attachedPhoto
      })

      console.log("addCommendation result", result)

        ;

      //reset state
      setSelectedDate(getDateNowISOString());
      setSubmittedBy('')
      setName('')
      setCommendationComments('');
      setAttachedFile('');
      setAttachedPhoto('');

      //reset form values
      taskForm?.current?.reset();

      history.push('/page/Commendations');

      webWorker.postMessage('startReplicateTo');
    }
  }

  const fileListToBase64 = async (fileList) => {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = ev => {
          resolve((ev) ? (ev.target ? (ev.target.result) : undefined) : undefined)
        }
        reader.readAsDataURL(file)
      })
    }
    // here will be array of promisified functions
    const promises = []

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]))
    }

    // array with base64 strings
    return await Promise.all(promises)
  }

  const fileOnChange = async (e) => {
    let fileList = e.target.files;
    const base64 = await fileListToBase64(fileList)
    console.log(base64)
    if (base64.length > 0) {
      setAttachedFile(String(base64[0]))
    } else {
      setAttachedFile('')
    }
  }

  const fileOnPhoto = async (e) => {
    let fileList = e.target.files;
    const base64 = await fileListToBase64(fileList)
    console.log(base64)
    if (base64.length > 0) {
      setAttachedPhoto(String(base64[0]))
    } else {
      setAttachedPhoto('')
    }
  }


  return (
    <IonApp>
      <IonSplitPane contentId="main">


        {/*--  the side menu  --*/}
        <Menu />


        <IonPage id="main">
          <IonHeader>
            <IonToolbar color="primary">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Add an incident</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
            {/* 
        https://ionicframework.com/docs/api/input
        https://ionicframework.com/docs/api/datetime
        https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/
         */}

            <form className="ion-padding" ref={taskForm}>

              <h1>confidential {confidential.toString()}</h1>

              <IonItemDivider>Confidential?</IonItemDivider>
              <IonItem>
                <IonToggle value={confidential} onIonChange={() => setConfidential(!confidential)}></IonToggle>
              </IonItem>

              <IonItemDivider>Reported By</IonItemDivider>
              <IonItem>
                <IonInput disabled={confidential} required={true} value={reportedBy} placeholder="Submitted by" onIonChange={e => setReportedBy(e.detail.value)} ></IonInput>
              </IonItem>

              <IonItemDivider>Brief Description</IonItemDivider>
              <IonItem>
                <IonTextarea required={true} placeholder="Brief Description" value={briefDescription} onIonChange={e => setBriefDescription(e.detail.value)}></IonTextarea>
              </IonItem>


              <IonItemDivider>Location</IonItemDivider>
              <IonItem>
                <MapSection /> {/* include it here */}
              </IonItem>


              <IonItemDivider>Attach File</IonItemDivider>
              <IonItem>
                <input type="file" id="fileInput" onChange={e => fileOnChange(e)}></input>
              </IonItem>

              <IonItemDivider>Take Photo</IonItemDivider>
              <IonItem>
                <input type="file" id="pictureInput" accept="image/*" capture="camera" onChange={e => fileOnPhoto(e)}></input>
              </IonItem>

              <IonButton onClick={() => onSubmitClick()}
                color="primary"
                expand="block" >Submit</IonButton>

            </form>

          </IonContent>
        </IonPage>

      </IonSplitPane>
    </IonApp>
  );
};

export default IncidentAddComponent;
