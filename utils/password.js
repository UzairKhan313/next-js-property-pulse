export const generatePassword = () => {
  const password =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  return password;
};
