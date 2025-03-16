import React from "react";
import "./Footer.css"; // Import styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Egg Store</h3>
          <p>Providing fresh eggs, quality chicken products, and refreshing drinks with guaranteed freshness.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 Carwash, Roysambu, near the Police Station</p>
          <p>🛒 Shop Number: S31</p>
          <p>📞 Call/WhatsApp: <a href="tel:+254711692522">0711 692 522</a></p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Egg Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
