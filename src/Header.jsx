const Header = ({ user }) => {
  const { name, url } = user;
  return (
    <header className="header">
      <div className="logo-container">
        <h3 className="logo">Edvora</h3>
      </div>
      <nav className="profile-container">
        <h4 className="user-name">{name}</h4>
        <img src={url} alt="#" className="profile-pic" />
      </nav>
    </header>
  );
};
export default Header;
