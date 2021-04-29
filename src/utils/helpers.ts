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
