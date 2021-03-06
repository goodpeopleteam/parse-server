const admin = require('firebase-admin');

const env = process.env.ENVIRONMENT;
const serviceAccount = require(`../../../../[${env}]firebase-credentials.json`);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

function isValid(p) {
    return p.email && p.firstName && p.lastName;
}

function getProfileRef(email) {
    return db.collection('profiles').doc(email);
}

const addChatRoomToUser = async (conversationType, userProfile, recipientProfile, chatRoomRef) => {
    const chatRoomsRef = db
        .collection('profiles')
        .doc(userProfile.email)
        .collection(conversationType)
        .doc(recipientProfile.email);

    const now = Date.now();
    await chatRoomsRef.set({
        createdAt: now,
        modifiedAt: now,
        roomRef: chatRoomRef,
        recipientRef: getProfileRef(recipientProfile.email)
    });
};

const createChatRoom = async (conversationType, senderEmail, recipientEmail) => {
    const chatRooms = db
        .collection('conversations')
        .doc(conversationType)
        .collection('rooms');

    const senderRef = getProfileRef(senderEmail);
    const recipientRef = getProfileRef(recipientEmail);

    let participants = [senderRef, recipientRef];

    const room = await chatRooms.add({
        createdAt: Date.now(),
        participants: participants
    });

    room.collection('participants').doc(senderEmail).set({ ref: senderRef });
    room.collection('participants').doc(recipientEmail).set({ ref: recipientRef });

    return room;
};

const getChatRoom = async (conversationType, userEmail, recipientEmail) => {
    const chatRoom = db
        .collection('profiles')
        .doc(userEmail)
        .collection(conversationType)
        .doc(recipientEmail);

    return await chatRoom.get();
};

const createUser = async (p) => {
    if (!isValid(p)) {
        return;
    }

    const userRef = db
        .collection('profiles')
        .doc(p.email);

    await userRef
        .set(mapToFirebaseUser(p), { merge: true });

    return userRef;
};

const mapToFirebaseUser = p => {
    return {
        email: p.email,
        firstName: p.firstName,
        lastName: p.lastName,
        photoUrl: p.profilePictureUrl
    };
};

module.exports = {
    createUser,
    createChatRoom,
    addChatRoomToUser,
    getChatRoom
};