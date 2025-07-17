export default function Grid({ logos }) {
    return (
        <div className="partners-section grid">
            <div className="partners-grid">
                {logos.map((logo, index) => (
                    <div key={index} className="partner-logo-container">
                        <img 
                            className="partner-logo"
                            src={logo.url} 
                            alt={logo.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
