// TODO: custom header request
async function post(url: string, body?: any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return await normalizeResponse(res);
  } catch (e: any) {
    // TODO: send error to log service
    throw new Error(e.message);
  }
}

async function normalizeResponse(res: Response) {
  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    // send error to log service
    
    if (res.status === 400) {
      throw new Error("Bad Request");
    }
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    // status 500 and rest
    throw new Error(
      "The service is temporary unavailable, please try again later."
    );
  }

  const data = (await res.json?.()) || {};

  return data;
}

export { post };
