// ... (imports)

const Footer = () => {
    // Get the current year for the copyright notice
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* ... (Sections 1 & 2) ... */}

                {/* 3. Contact Info/Brand Message */}
                <div className="footer-section contact-info">
                    <h4>Contact</h4>
                    <p>Email: support@anujestore.com</p>
                    <p>Ph: +91 98765 43210</p>
                    <p className="trust-message">
                        Anuj E-Store: Minimal. Reliable. Guaranteed.
                        <br/>
                        <span style={{fontSize: '0.8rem', color: '#aaa'}}>Serving Customers Since 2020</span> 
                    </p>
                </div>
            </div>

            {/* 4. Copyright Bar */}
            <div className="copyright-bar">
                <p>&copy; 2020 - {currentYear} Anuj E-Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
