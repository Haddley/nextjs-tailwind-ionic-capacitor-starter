import React from 'react'

import { useState } from 'react';
import { IonSelect, IonSelectOption, IonToggle, IonMenu, IonApp, IonContent, IonRouterOutlet, IonSplitPane, IonPage, IonButton, IonButtons, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonModal, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import Menu from './Menu';

function UserAdministrationComponent() {

    const [name, setName] = useState('');
    const [primaryLocation, setPrimaryLocation] = useState('');
    const [role, setRole] = useState('');
    const [accessLevel, setAccessLevel] = useState('');
    const [enableUser, setEnableUser] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');

    return (<>


        <IonApp>
            <IonSplitPane contentId="main">


                {/*--  the side menu  --*/}
                <Menu />


                <IonPage id="main">
                    <IonHeader>
                        <IonToolbar color="warning">
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>User Administration</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>

                        <form className="ion-padding">

                            <IonItem>
                                <IonInput required={true} value={name} placeholder="Name" onIonChange={e => setName(e.detail.value)} ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Primary Location</IonLabel>
                                <IonSelect value={primaryLocation} placeholder="Select One" onIonChange={e => setPrimaryLocation(e.detail.value)}>
                                    <IonSelectOption value="placeholder1">Placeholder 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonInput required={true} value={role} placeholder="Role / Job Title" onIonChange={e => setRole(e.detail.value)} ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Access Level</IonLabel>
                                <IonSelect value={accessLevel} placeholder="Select One" onIonChange={e => setAccessLevel(e.detail.value)}>
                                    <IonSelectOption value="placeholder1">Placeholder 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                            <IonLabel>Enable User</IonLabel>
                                <IonToggle value={enableUser} onIonChange={(e) => setEnableUser(e.detail.value)}></IonToggle>
                            </IonItem>

                            <IonItem>
                                <IonInput required={true} value={mobilePhone} placeholder="Mobile Phone" onIonChange={e => setMobilePhone(e.detail.value)} ></IonInput>
                            </IonItem>

                            <IonButton onClick={() => onSubmitClick()}
                color="primary"
                expand="block" >Submit</IonButton>

                        </form>

                    </IonContent>

                </IonPage>

            </IonSplitPane>
        </IonApp>

    </>
    )
}

export default UserAdministrationComponent
