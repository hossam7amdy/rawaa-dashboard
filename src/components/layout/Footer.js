const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return <p>{`Made with 💝 by Right Corner team ©️ ${year}`}</p>;
};

export default Footer;
