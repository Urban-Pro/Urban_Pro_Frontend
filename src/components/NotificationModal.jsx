import React, { useState } from 'react';
import useProyectos from '../hooks/useProyectos'

const NotificationModal = ({onClose, email, typeAccount, emailCreador}) => {

    const { AdminModel } = useProyectos();

    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    const handleSendNotification = async () => {
        await AdminModel({ to: emailCreador, subject, message, email, emailCreador,  typeAccount})
    };

  return (
    <div className=' border rounded-md border-pink-300 p-3  '>
      <div className="notifications">
        {notifications.map(notification => (
          <div key={notification.id} className="notification">
            <h4>{notification.subject}</h4>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      <div className="modal">
        <div className="modal-content flex flex-col text-black font-medium">
          <h1>Enviar notificación</h1>
          <label htmlFor="subject">Asunto:</label>
          <input type="text" id="subject" className='bg-pink-100 border border-black rounded-md' value={subject} onChange={(e) => setSubject(e.target.value)} />

          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" className='bg-pink-100 border border-black rounded-md' value={message} onChange={(e) => setMessage(e.target.value)} />

          <button onClick={handleSendNotification}>Enviar</button>
        </div>
      </div>
      
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default NotificationModal;