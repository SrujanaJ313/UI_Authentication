import { passwordPatterns } from "./constants";
export const validatePassword = (password) => {
if(!password){
    return 'Password is required';
}
  const errors = [];
  for (const key in passwordPatterns) {
    if (!passwordPatterns[key].pattern.test(password)) {
      errors.push({
        description: passwordPatterns[key].message,
        errorCode: "red",
      });
    } else {
      errors.push({
        description: passwordPatterns[key].message,
        errorCode: "green",
      });
    }
  }

  return errors;
};
