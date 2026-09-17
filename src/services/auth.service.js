const REGISTER_API =
  "https://atologistinfotech.com/api/register.php";

export async function registerUser(payload) {
  const body = new URLSearchParams();

  body.append("firstname", payload.firstname);
  body.append("lastname", payload.lastname);
  body.append("email", payload.email);
  body.append("encryptpassword", payload.encryptpassword);
  body.append("mobile", payload.mobile);
  body.append("dob", payload.dob);

  const response = await fetch(REGISTER_API, {
    method: "POST",
    body,
  });

  let responseData = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const error = new Error(
      responseData?.message ||
      `Registration failed with status ${response.status}`
    );

    error.status = response.status;
    error.data = responseData;

    throw error;
  }

  return {
    status: response.status,
    data: responseData,
  };
}


export async function registerUserWithGoogle(credential) {
  const body = new URLSearchParams();

  body.append("provider", "google");
  body.append("credential", credential);

  const response = await fetch(REGISTER_API, {
    method: "POST",
    body,
  });

  let responseData = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const error = new Error(
      responseData?.message ||
        `Google registration failed with status ${response.status}`
    );

    error.status = response.status;
    error.data = responseData;

    throw error;
  }

  return {
    status: response.status,
    data: responseData,
  };
}