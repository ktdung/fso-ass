import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const { message, durationInSeconds } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  setTimeout(() => {
    dispatch(clearNotification());
  }, durationInSeconds * 1000);

  if (!message) {
    return null;
  }
  return <div style={style}>{message}</div>;
};

export default Notification;
