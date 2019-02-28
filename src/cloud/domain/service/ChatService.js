const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const ProfileService = require('../service/ProfileService');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://goodpeople-dev.firebaseio.com"
});

const db = admin.firestore();

function isValid(p) {
    return p.email && p.firstName && p.lastName;
}

const addChatRoomToUser = async (userProfile, recipientProfile, chatRoomRef) => {
    const chatRoomsRef = db
        .collection('users')
        .doc(userProfile.email)
        .collection('chatRooms')
        .doc(recipientProfile.email);

    await chatRoomsRef.set({
        title: `${recipientProfile.firstName} ${recipientProfile.lastName}`,
        roomAvatar: recipientProfile.profilePictureUrl,
        ref: chatRoomRef
    });
};

const getUserChatRooms = async (userId) => {
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

const createChatRoom = async (senderEmail, recipientEmail) => {
    const chatRooms = db
        .collection('chatRooms');

    const senderRef = db.collection('users').doc(senderEmail);
    const recipientRef = db.collection('users').doc(recipientEmail);

    let participants = [senderRef, recipientRef];

    return await chatRooms.add({
        createdAt: FieldValue.serverTimestamp(),
        participants: participants
    });
};

const getChatRoom = async (userEmail, recipientEmail) => {
    const chatRoom = db
        .collection('users')
        .doc(userEmail)
        .collection('chatRooms')
        .doc(recipientEmail);

    return await chatRoom.get();
};

const createUser = async (p) => {
    if (!isValid(p)) {
        return;
    }

    const userRef = db
        .collection('users')
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
    getUserChatRooms,
    getChatRoom
};