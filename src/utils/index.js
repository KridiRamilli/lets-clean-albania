export const displayUserName = (user) => {
  if (!user) return "";
  let { displayName } = user;
  let [name, lname] = displayName.split(" ");
  let userName = `#${name.toLowerCase()}${lname.toLowerCase()}`;
  return userName;
};

export const getInitials = (displayName) => {
  if (displayName) {
    const userName = displayName.split(" ");
    let [name = "", lname = " "] = userName;
    let initials = name[0].toUpperCase() + lname[0].toUpperCase();
    return initials;
  }
};

export const isSameUser = (currentUser, author) => {
  return currentUser.uid === author.id;
};

export const progressPercentage = (progress) => {
  progress = Math.ceil(progress);
  if (progress > 100) {
    return 100;
  }
  return progress;
};

export const uniqueId = (() => {
  let num = 0;
  return (prefix) => {
    prefix = String(prefix) || "";
    num++;
    return prefix + num;
  };
})();
