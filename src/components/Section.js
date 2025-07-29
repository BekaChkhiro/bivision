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
            className={className}
            style={{
                maxWidth: '1250px',
                margin: '0 auto',
                boxSizing: 'border-box',
                ...props.style
            }}
            {...props}
        >
            <style jsx>{`
                section {
                    box-sizing: border-box;
                    max-width: 1250px !important;
                    margin: 0 auto !important;
                    width: 100% !important;
                }
                @media (max-width: 1250px) {
                    section {
                        padding: ${paddingLaptop};
                    }
                }
                @media (max-width: 1024px) {
                    section {
                        padding: ${paddingTablet};
                    }
                }
                @media (max-width: 768px) {
                    section {
                        padding: ${paddingMobile};
                    }
                }
            `}</style>
            {children}
        </section>
    );
};

export default Section;