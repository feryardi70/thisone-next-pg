"use server";

import bcrypt from "bcryptjs";

async function checkPass(password, dbpassword) {
  const match = await bcrypt.compare(password, dbpassword);

  if (match) {
    return true;
  } else {
    return false;
  }
}

export default checkPass;
