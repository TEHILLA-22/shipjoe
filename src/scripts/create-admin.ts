import argon2 from "argon2";

async function main() {
  const email = "admin@shipjoe.com";
  const password = "victory";

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
  });

  console.log({
    email,
    passwordHash,
  });
}

void main();