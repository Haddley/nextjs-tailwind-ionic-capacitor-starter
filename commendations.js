import PouchDB from 'pouchdb-browser'

// const remotedburl = 'http://admin:password@52.224.254.27:5984/commendationsdb'
// const remotedburl = 'http://admin:password@192.168.0.3:3000/commendationsdb'


// const localburl = 'commendationsdb'



const localburl =  'http://localhost:3000/commendationsdb'

const db = new PouchDB(localburl)


function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/*export interface Commendation {
    guid: string;

    selectedDate:string;
    submittedBy:string;
    name:string;
    commendationComments:string;
    attachedFile:string;
    attachedPhoto:string;

    _id: string,
    _rev: string
}*/

export const getCommendations = async () => {
    const commendations = await db.allDocs({
        include_docs: true,
        attachments: false
    })
    return commendations.rows.map((row) => row.doc)
}

/*export const setCompleted = async (existing: Todo, completed: boolean) => {
    try {
        await db.put({
            ...existing,
            completed
        })
        await replicateTo()
    }
    catch (err) {
        console.log("err", err)
    }
}*/

export const deleteCommendation = async (existing) => {
    try {
        await db.remove(
            existing._id,
            existing._rev
        )
        // await replicateTo()
    }
    catch (err) {
        console.log("err", err)
    }
}

export const addCommendation = async (commendation) => {
    try {
        const guid = createGuid();
        const postresult = await db.post({
            ...commendation,
            guid: guid
        })
        // await replicateTo()
        console.log("add")
    }
    catch (err) {
        console.log("err", err)
    }
}

export const deleteAndGetCommendations = async (old, existing) => {
    try {
        await db.remove(
            existing._id,
            existing._rev
        )
        // await replicateTo()
        return old.filter(next=>next.guid !== existing.guid)
    }
    catch (err) {
        console.log("err", err)
    }
}


export const replicate = async () => {
    debugger
    await replicateFrom()
    await replicateTo()
}

const replicateFrom = async () => {
    try {
        // const result = await db.replicate.from(remotedburl)
        //console.log("result", result)
    }
    catch (err) {
        console.log("err", err)
    }
}

const replicateTo = async () => {
    try {
        // const result = await db.replicate.to(remotedburl)
        // console.log("result", result)
    }
    catch (err) {
        console.log("err", err)
    }
}