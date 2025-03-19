const Footer = () => {
    return (
      <footer className="flex justify-between items-center p-4 text-gray-500 text-sm b-[-5px]">
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <img src="/logo.png" alt="Enhancv Logo" className="h-5" />
        </div>
        <a
          href="https://www.enhancv.com"
          className="text-gray-400 hover:text-gray-600 transition"
        >
          www.enhancv.com
        </a>
      </footer>
    );
  };
  
  export default Footer;
  