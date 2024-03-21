const updateNotificationCompleted = async (
  notificationId: string | undefined,
  data: any
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/notifications/${notificationId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      console.log(await res.json());
    } else {
      throw new Error(
        `Failed response with notification with ID ${notificationId}. Status: ${res.status} ${res.statusText}`
      );
    }
  } catch (err: any) {
    console.log(
      `Error request with notification with ID ${notificationId}. Error: ${err.message}`
    );
  }
};

export { updateNotificationCompleted };
