const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const ProfileService = require('../service/ProfileService');

const serviceAccount = require("../../../../firestore-test-c98c5-firebase-adminsdk-8ew9t-6534eb3770.json");

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-test-c98c5.firebaseio.com"
});

const db = admin.firestore(firebaseApp);

let addChatRoomToUser = async (userProfile, recipientProfile, chatRoomRef) => {
    const userRef = db.collection('users').doc(userProfile.email);

    const userData = (await userRef.get()).data();

    const chatRooms = userData.chatRooms || [];
    chatRooms.push({
        title: `${recipientProfile.firstName} ${recipientProfile.lastName}`,
        ref: chatRoomRef
    });

    await userRef.update({
        chatRooms: chatRooms
    });
};

let getUserChatRooms = async (userId) => {
    const profile = await ProfileService.getByUserId(userId);

    const userDoc = await db
        .collection('users')
        .doc(profile.email)
        .get();

    const data = await userDoc.data();
    const chatRooms = data.chatRooms;

    return chatRooms.map(x => {
        return {
            id: x.ref.id,
            title: x.title
        }
    })
};

let createChatRoom = async (senderEmail, recipientEmail) => {
    const chatRooms = db
        .collection('chatRooms');

    const senderRef = db.collection('users').doc(senderEmail);
    const recipientRef = db.collection('users').doc(recipientEmail);

    let participants = [senderRef, recipientRef];

    return await chatRooms.add({
        createdAt: FieldValue.serverTimestamp(),
        participants: participants
    })
};

let createUser = async (senderProfile) => {
    const userRef = db
        .collection('users')
        .doc(senderProfile.email);

    await userRef
        .set(mapToFirebaseUser(senderProfile), {merge: true});

    return userRef;
};

let mapToFirebaseUser = (senderProfile) => {
    return {
        email: senderProfile.email,
        firstName: senderProfile.firstName,
        lastName: senderProfile.lastName
    };
};

module.exports = {
    createUser,
    createChatRoom,
    addChatRoomToUser,
    getUserChatRooms
};