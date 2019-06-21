const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const ProfileService = require('../service/ProfileService');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
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

    const serverTimestamp = FieldValue.serverTimestamp();
    await chatRoomsRef.set({
        createdAt: serverTimestamp,
        modifiedAt: serverTimestamp,
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
        createdAt: FieldValue.serverTimestamp(),
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

const addMessageToChatRoom = async (chatRoomPath, senderEmail, message) => {
    const sentAt = Date.parse(message.sent_at);
    const chatRoom = db.doc(chatRoomPath);

    const messagesCollection = chatRoom
        .collection('messages');

    const messageReference = await messagesCollection
        .doc(sentAt.toString());

    return await messageReference.set({
        'idFrom': senderEmail,
        'timestamp': sentAt,
        'content': message.parts[0].body,
        'type': 0
    }, { merge: true });
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
    addMessageToChatRoom,
    getChatRoom
};