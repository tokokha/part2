const Notification = ({ message, style }) => {
    const notificationStyleGood = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        border: '5px solid green'
      }
    const notificationStyleBad = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16,
        border: '5px solid green'
    }
    
    let notificationStyle = null

    if (style === 'good') {
        notificationStyle = notificationStyleGood
    } else if (style === 'bad') {
        notificationStyle = notificationStyleBad
    } else {
        notificationStyle = null
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