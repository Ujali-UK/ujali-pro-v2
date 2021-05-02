import { database } from './firbase-config';

export const nameShortner = (name, length) => {
  if (name && length) {
    const splitName = name.split('');
    if (splitName.length > length) {
      return `${splitName.splice(0, length).join('')}...`;
    } else {
      return name;
    }
  } else {
    return null;
  }
};

export const getFacilitatorUtil = async (user: string) => {
  await database
    .collection('facilitators')
    .where('ownerUID', '==', user)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        doc.data();
      });
    })
    .then(data => {
      return data;
      // console.log("data from helper", data)
    });
};
