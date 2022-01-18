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

export const nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean"
]

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
  const [property, setProperty] = useState();
  const [who, setWho] = useState()
  const [personalDetails, setPersonalDetails] = useState()
  const [personalGender, setPersonalGender] = useState()
  const [personalDateOfBirth, setPersonalDateOfBirth] = useState()
  const [personalAge, setPersonalAge] = useState()
  const [personalNationality, setPersonalNationality] = useState()
  const [personalPhone, setPersonalPhone] = useState()
  const [personalEmail, setPersonalEmail] = useState()
  const [personalAddress, setPersonalAddress] = useState()
  const [personalAddressLine2, setPersonalAddressLine2] = useState()

  const [incidentDetails, setIncidentDetails] = useState()
  const [lugeHelmet, setLugeHelmet] = useState()
  const [lugeHeight, setLugeHeight] = useState() 
  const [lugeClothingDescription, setLugeClothingDescription] = useState()
  const [lugeCartNumber, setLugeCartNumber] = useState()
  const [lugeTicketType, setLugeTicketType] = useState()
  const [lugeNumberOfRides, setLugeNumberOfRides] = useState()
  const [lugeWeather, setLugeWeather] = useState()
  const [lugeIncidentCause, setLugeIncidentCause] = useState()
  const [lugeIncidentOutcome, setLugeIncidentOutcome] = useState()
  const [lugeCorner, setLugeCorner] = useState()

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
                  <IonSelectOption value="harm">Harm</IonSelectOption>
                  <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider>Severity</IonItemDivider>
              <IonItem>
                <IonLabel>Severity</IonLabel>
                <IonSelect value={severity} placeholder="Select One" onIonChange={e => setSeverity(e.detail.value)}>
                  <IonSelectOption value="insignificant">Insignificant</IonSelectOption>
                  <IonSelectOption value="minor">Minor</IonSelectOption>
                  <IonSelectOption value="moderate">Moderate</IonSelectOption>
                  <IonSelectOption value="major">Major</IonSelectOption>
                  <IonSelectOption value="critical">Critical</IonSelectOption>

                </IonSelect>
              </IonItem>

              <IonItemDivider>Activity Type</IonItemDivider>
              <IonItem>
                <IonLabel>Activity Type</IonLabel>
                <IonSelect value={activityType} placeholder="Select One" onIonChange={e => setActivityType(e.detail.value)}>
                  <IonSelectOption value="general">General</IonSelectOption>
                  <IonSelectOption value="luge">Luge</IonSelectOption>
                  <IonSelectOption value="MTB">MTB</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider>Track Map</IonItemDivider>
              <IonItem>
                {/* Work in progress */}
              </IonItem>







              <IonItemDivider>General Information</IonItemDivider>

              <IonItemDivider>Submission Date</IonItemDivider>
              <IonItem>
                <IonLabel>Submission Date</IonLabel>
                <IonDatetime disabled={true} presentation="datetime" value={submissionDate} onIonChange={ev => { setSubmissionDate(ev.detail.value) }}></IonDatetime>
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

              {/* Contractor Company Name Input is required only when "who" is "staff" */}
              {(who === "contractor") ? (<IonItem>
                <IonInput required={true} value={contractorCompanyName} placeholder="Contractor Company Name" onIonChange={e => setContractorCompanyName(e.detail.value)} ></IonInput>
              </IonItem>) : ''}

              {/* Property (Tenancy) is required only when "who" is "tenancy" */}
              {(who === "tenancy") ? (<IonItem>
                <IonLabel>Property (Tenancy)</IonLabel>
                <IonSelect value={property} placeholder="Select One" onIonChange={e => setProperty(e.detail.value)}>
                  <IonSelectOption value="placeholder1">Placeholder 1</IonSelectOption>
                  <IonSelectOption value="placeholder2">Placeholder 1</IonSelectOption>
                </IonSelect>
              </IonItem>) : ''}



              {/* Personal Detais Section is required unless "who" is "staff" */}
              {(who != "staff") ? (<>

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

                <IonItem>
                  <IonLabel>Nationality</IonLabel>
                  <IonSelect value={personalNationality} placeholder="Select One" onIonChange={e => setPersonalNationality(e.detail.value)}>
                    {nationalities.map((nationality, index) => (<IonSelectOption key={index} value={nationality}>{nationality}</IonSelectOption>))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel>Phone</IonLabel>
                  <IonInput value={personalPhone} placeholder="Name" onIonChange={e => setPersonalPhone(e.detail.value)} ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Email</IonLabel>
                  <IonInput value={personalEmail} placeholder="Name" onIonChange={e => setPersonalEmail(e.detail.value)} ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Address</IonLabel>
                  <IonInput value={personalAddress} placeholder="Name" onIonChange={e => setPersonalAddress(e.detail.value)} ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Address Line 2</IonLabel>
                  <IonInput value={personalAddressLine2} placeholder="Name" onIonChange={e => setPersonalAddressLine2(e.detail.value)} ></IonInput>
                </IonItem>

              </>) : ''
              }

              <IonItemDivider>Incident Details</IonItemDivider>
              <IonItem>
                <IonTextarea required={true} placeholder="Incident Details" value={incidentDetails} onIonChange={e => setIncidentDetails(e.detail.value)}></IonTextarea>
              </IonItem>





              {(activityType === "luge")
                ? (<>
                  <IonItemDivider>Luge Rider & Track Details</IonItemDivider>

                  <IonItem>
                    <IonLabel>Helmet</IonLabel>
                    <IonSelect value={lugeHelmet} placeholder="Select One" onIonChange={e => setLugeHelmet(e.detail.value)}>
                      <IonSelectOption value="blue">Blue</IonSelectOption>
                      <IonSelectOption value="green">Green</IonSelectOption>
                      <IonSelectOption value="orange">Orange</IonSelectOption>
                      <IonSelectOption value="red">Red</IonSelectOption>
                      <IonSelectOption value="yellow">Yellow</IonSelectOption>
                      <IonSelectOption value="none">None</IonSelectOption>
                    </IonSelect>
                  </IonItem>


                  <IonItem>
                    <IonLabel>Height (cm)</IonLabel>
                    <IonInput value={lugeHeight} placeholder="Name" onIonChange={e => setLugeHeight(e.detail.value)} ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonTextarea required={true} placeholder="Clothing Description" value={lugeClothingDescription} onIonChange={e => setLugeClothingDescription(e.detail.value)}></IonTextarea>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Cart Number</IonLabel>
                    <IonSelect value={lugeCartNumber} placeholder="Select One" onIonChange={e => setLugeCartNumber(e.detail.value)}>
                      {[...Array(1000).keys()].map((cartnumber, index) => (<IonSelectOption key={index} value={cartnumber}>{cartnumber}</IonSelectOption>))}
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Ticket Type</IonLabel>
                    <IonSelect value={lugeTicketType} placeholder="Select One" onIonChange={e => setLugeTicketType(e.detail.value)}>
                      <IonSelectOption value="single">Single</IonSelectOption>
                      <IonSelectOption value="double">Double</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Number of Rides</IonLabel>
                    <IonSelect value={lugeNumberOfRides} required={true} placeholder="Number of Rides" onIonChange={e => setLugeNumberOfRides(e.detail.value)}>
                      {[...Array(5).keys()].map((cartnumber, index) => (<IonSelectOption key={index} value={cartnumber}>{cartnumber}</IonSelectOption>))}
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Weather</IonLabel>
                    <IonSelect value={lugeWeather} placeholder="Select Weather" onIonChange={e => setLugeWeather(e.detail.value)}>
                      <IonSelectOption value="dry">Dry</IonSelectOption>
                      <IonSelectOption value="wet">Wet</IonSelectOption>
                      <IonSelectOption value="other">Other</IonSelectOption>
                    </IonSelect>
                  </IonItem>



                  <IonItem>
                    <IonLabel>Incident Cause</IonLabel>
                    <IonSelect value={lugeIncidentCause} placeholder="Select Incident Cause" onIonChange={e => setLugeIncidentCause(e.detail.value)}>
                      <IonSelectOption value="collision">Collision</IonSelectOption>
                      <IonSelectOption value="racing">Racing</IonSelectOption>
                      <IonSelectOption value="rideError">Ride Error</IonSelectOption>
                      <IonSelectOption value="speeding">Speeding</IonSelectOption>
                      <IonSelectOption value="other">Other</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Incident Outcome</IonLabel>
                    <IonSelect value={lugeIncidentOutcome} placeholder="Select Incident Outcome" onIonChange={e => setLugeIncidentOutcome(e.detail.value)}>
                      <IonSelectOption value="placeholder1">Placeholder 1</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Corner?</IonLabel>
                    <IonSelect value={lugeCorner} placeholder="Select Incident Cause" onIonChange={e => setLugeCorner(e.detail.value)}>
                      <IonSelectOption value="entry">Entry</IonSelectOption>
                      <IonSelectOption value="apex">Apex</IonSelectOption>
                      <IonSelectOption value="exit">Exit</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                </>) : ''

              }



              {/* HTB specific incident information */}



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
