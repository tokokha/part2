const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        border: '5px solid green'
      }
    
    if (message === null) {
      return null
    }
  
    return (
      <div className='error' style={notificationStyle}>
        {message}
      </div>
    )
}

export default Notification