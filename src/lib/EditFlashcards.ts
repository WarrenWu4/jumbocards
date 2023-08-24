import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

// add a new flashcard set
export default async function addFlashcards () {
    try {
        const tempData = {
            title: "Untitled",
            desc: "Insert description here",
            numStudied: 0,
            numCards: 2,
            cards: [{0:"", 1:""}, {0:"", 1:""}],
            boxes: {box1: [0, 1], box2:[], box3:[], box4:[], box5:[]}
        }
        const userId = auth.currentUser!.uid
        const docRef = await addDoc(collection(db, `/users/${userId}/sets/`), tempData)
        return {status: "200 SUCCESS", docId: docRef.id, data: tempData}
    } catch(e) {
        console.log("Error occurred adding flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}

interface FlashcardData {
    title: string;
    desc: string;
    numStudied: number;
    numCards: number;
    cards: string[][];
    boxes: Map<string, number[]>
}

// update an existing flashcard set
export async function updateFlashcards (setId:string, flashData:FlashcardData) {
    try {
        const userId = auth.currentUser!.uid
        await setDoc(doc(db, `/users/${userId}/sets/${setId}`), {
            title: flashData.title,
            desc: flashData.desc,
            numStudied: flashData.numStudied,
            numCards: flashData.numCards,
            cards: flashData.cards,
            boxes: flashData.boxes
        })
        return {status: "200 SUCCESS"}
    } catch(e) {
        console.log("Error occurred updating flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}