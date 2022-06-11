import bcrypt from "bcrypt";

const { hash, compare } = bcrypt;

export const hashPassword = async (rawPassword) =>
  new Promise((resolve, reject) => {
    hash(rawPassword, 10).then(resolve).catch(reject);
  });

export const matchPassword = async (raw, encrypted) =>
  new Promise((resolve, reject) => {
    compare(raw, encrypted).then(resolve).catch(reject);
  });
