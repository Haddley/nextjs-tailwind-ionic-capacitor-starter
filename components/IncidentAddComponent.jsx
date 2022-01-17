import { IonListHeader, IonRadioGroup, IonList, IonSelectOption, IonSelect, IonToggle, IonMenu, IonApp, IonContent, IonRouterOutlet, IonSplitPane, IonPage, IonButton, IonButtons, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonModal, IonTextarea, IonTitle, IonToolbar, IonRadio, IonRow, IonCol } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Tabs from './pages/Tabs';

import { useState, useRef } from 'react';

import { format, parseISO } from 'date-fns';

import { MapSection } from './Map'

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
  const [briefDescription, setBriefDescription] = useState();
  // location
  const [incidentType, setIncidentType] = useState();
  const [severity, setSeverity] = useState();
  const [activityType, setActivityType] = useState();
  const [submissionDate, setSubmissionDate] = useState();
  const [incidentDate, setIncidentDate] = useState();
  const [incidentTime, setIncidentTime] = useState();
  const [contractorCompanyName, setContractorCompanyName] = useState();
  const [who, setWho] = useState()
  const [personalDetails, setPersonalDetails] = useState()
  const [personalGender, setPersonalGender] = useState()
  const [personalDateOfBirth, setPersonalDateOfBirth] = useState()
  const [personalAge, setPersonalAge] = useState()

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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const calculateAge = (value) => {
    try {
      return getAge(value)
    } catch (e) {

    }
  }

  const setPersonalDateOfBirthAndAge = (value) => {
    setPersonalDateOfBirth(value);
    setPersonalAge(calculateAge(value))
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


              <IonItemDivider>Incident Type</IonItemDivider>
              <IonItem>
                <IonLabel>Incident Type</IonLabel>
                <IonSelect value={incidentType} placeholder="Select One" onIonChange={e => setIncidentType(e.detail.value)}>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider>Severity</IonItemDivider>
              <IonItem>
                <IonLabel>Severity</IonLabel>
                <IonSelect value={severity} placeholder="Select One" onIonChange={e => setSeverity(e.detail.value)}>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider>Activity Type</IonItemDivider>
              <IonItem>
                <IonLabel>Activity Type</IonLabel>
                <IonSelect value={activityType} placeholder="Select One" onIonChange={e => setActivityType(e.detail.value)}>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider>Track Map</IonItemDivider>
              <IonItem>

              </IonItem>

              <IonItemDivider>Submission Date</IonItemDivider>
              <IonItem>
                <IonLabel>Submission Date</IonLabel>
                <IonDatetime presentation="datetime" value={submissionDate} onIonChange={ev => { setSubmissionDate(ev.detail.value) }}></IonDatetime>
              </IonItem>

              <IonItemDivider>Incident Date</IonItemDivider>
              <IonItem>
                <IonLabel>Incident Date</IonLabel>
                <IonDatetime presentation="date" value={incidentDate} onIonChange={ev => { setIncidentDate(ev.detail.value) }}></IonDatetime>
              </IonItem>

              <IonItemDivider>Incident Time</IonItemDivider>
              <IonItem>
                <IonLabel>Incident Time</IonLabel>
                <IonDatetime display-format="h:mm A" picker-format="h:mm A" presentation="time" value={incidentTime} onIonChange={ev => { setIncidentTime(ev.detail.value) }}></IonDatetime>
              </IonItem>


              <IonItemDivider>Who</IonItemDivider>
              <IonItem>

                <IonRadioGroup value={who} onIonChange={(ev) => setWho(ev.detail.value)}>
                  <IonRow>
                    <IonCol>
                      <IonLabel>
                        Guest
                      </IonLabel>
                      <IonRadio value="guest" />
                    </IonCol>

                    <IonCol>
                      <IonLabel>
                        Staff
                      </IonLabel>
                      <IonRadio value="staff" />
                    </IonCol>

                    <IonCol>
                      <IonLabel>
                        Contractor
                      </IonLabel>
                      <IonRadio value="contractor" />
                    </IonCol>

                    <IonCol>
                      <IonLabel>
                        Tenancy
                      </IonLabel>
                      <IonRadio value="tenancy" />
                    </IonCol>

                  </IonRow>
                </IonRadioGroup>

              </IonItem>

              <IonItem>
                <IonInput disabled={!(who === "contractor")} required={true} value={contractorCompanyName} placeholder="Contractor Company Name" onIonChange={e => setContractorCompanyName(e.detail.value)} ></IonInput>
              </IonItem>


              <IonItemDivider>Personal Details</IonItemDivider>

              <IonItem>
                <IonLabel>Name</IonLabel>
                <IonInput required={true} value={personalDetails} placeholder="Name" onIonChange={e => setPersonalDetails(e.detail.value)} ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonSelect value={personalGender} placeholder="Select One" onIonChange={e => setPersonalGender(e.detail.value)}>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Date of Birth</IonLabel>
                <IonDatetime presentation="date" value={personalDateOfBirth} onIonChange={ev => { setPersonalDateOfBirthAndAge(ev.detail.value) }}></IonDatetime>
              </IonItem>

              <IonItem>
                <IonLabel>Age</IonLabel>
                <IonInput disabled={true} value={personalAge} placeholder="Age" ></IonInput>
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
