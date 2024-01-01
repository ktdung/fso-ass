const Notification = ({ message }) => {
  if (message === null) {
    return;
  }

  return (
    <div className={`notificaiton ${message.type}`}>
      {message.title}
    </div>
  );
};

export default Notification;
