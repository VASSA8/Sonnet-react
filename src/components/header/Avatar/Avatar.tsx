import './avatar.css'

const Avatar = () => {
  return (
    <div className="container">
      <img 
        src="/avatar-defolt.jpg" 
        className="avatar-logo"
        alt="Аватар"
      />
      <div className='urName'>Гость</div> 
    </div>
  )
}

export default Avatar