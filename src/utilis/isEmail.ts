export const isEmail = (email: string) => {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && true;
};
