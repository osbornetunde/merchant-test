import cardValidator from "card-validator";

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

cardValidator.creditCardType.addCard({
  niceType: "VERVE",
  type: "verve",
  patterns: [50],
  gaps: [4, 8, 12, 16],
  lengths: [18, 19],
  code: {
    name: "CVV",
    size: 3,
  },
});

export const validateCardNumber = (value) => {
  const numberValidation = cardValidator.number(value);
  return numberValidation.isValid || "Card number is not valid";
};

export const validateExpiryDate = (value) => {
  const expirationDateValidation = cardValidator.expirationDate(value);
  return expirationDateValidation.isValid || "Card has expired";
};
