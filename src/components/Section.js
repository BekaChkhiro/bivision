import React from 'react';

const Section = ({ 
    children, 
    className = '', 
    paddingDesktop = '0 20px',
    paddingLaptop = '0 20px',
    paddingTablet = '0 20px',
    paddingMobile = '0 20px',
    ...props 
}) => {

    return (
        <section
            className={`section-wrapper ${className}`}
            style={{
                maxWidth: '1250px',
                margin: '0 auto',
                boxSizing: 'border-box',
                ...props.style
            }}
            {...props}
        >
            <style jsx>{`
                .section-wrapper {
                    box-sizing: border-box;
                    max-width: 1250px !important;
                    margin: 0 auto !important;
                    width: 100% !important;
                    padding: ${paddingDesktop};
                }
                @media (max-width: 1250px) {
                    .section-wrapper {
                        padding: ${paddingLaptop};
                    }
                }
                @media (max-width: 1024px) {
                    .section-wrapper {
                        padding: ${paddingTablet};
                    }
                }
                @media (max-width: 768px) {
                    .section-wrapper {
                        padding: ${paddingMobile};
                    }
                }
            `}</style>
            {children}
        </section>
    );
};

export default Section;