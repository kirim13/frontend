function AlertNotification() {
  async function getData() {
    const setTime = "03:01";
    try {
      const response = await fetch(
        "http://localhost:3001/notifications/clsfk0i7i0000taxq9vhhy0hk",
        {
          method: "GET",
        }
      );
      const user = await response.json();
      console.log(user);
      if (setTime === user.time) {
        console.log("ALERT");
      }
    } catch (err) {
      console.error(err);
    }
  }
  getData();
  return <div>Alert Notifications</div>;
}

export default AlertNotification;
