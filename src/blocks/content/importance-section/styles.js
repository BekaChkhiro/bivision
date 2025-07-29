export const blockStyle = `
    /* Font family assignments for importance section */
    .importance-section__subtitle {
        font-family: 'medium' !important;
    }

    .importance-section__title {
        font-family: 'bold' !important;
    }

    .accordion-title {
        font-family: 'bold' !important;
    }

    .accordion-content,
    .accordion-content p {
        font-family: 'roman' !important;
    }

    .importance-section {
        color: #fff;
        padding: 60px;
    }

    .importance-section__header {
        text-align: center;
        margin-bottom: 60px;
    }

    .importance-section__subtitle {
        color: var(--Malina, #2FCA02);
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin-bottom: 5px;
    }

    .importance-section__title {
        color: var(--Dark-Blue, #221A4C);
        text-align: center;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0;
    }

    

    .importance-section__content-wrapper {
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    
    .importance-section__content {
        flex: 0 0 50%;
    }

    .accordion-item {
        margin-bottom: 24px;
        border: none;
        background: transparent;
        padding-left: 20px;
        position: relative;
    }

    .accordion-item.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--Malina, #2FCA02);
        border-radius: 2px;
    }

    .accordion-header {
        padding: 0;
        background: transparent;
        cursor: pointer;
        display: block;
    }

    .accordion-title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        transition: color 0.3s ease;
    }

    .accordion-item.active .accordion-title {
        color: var(--Malina, #2FCA02);
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .accordion-content {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
        opacity: 0;
        margin-top: 0;
    }

    .accordion-item.active .accordion-content {
        max-height: 1000px;
        opacity: 1;
        margin-top: 10px;
    }

    .accordion-content p {
        color: var(--Grey, #8399AF);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0 0 10px 0;
    }

    .accordion-image-upload {
        margin-top: 15px;
        padding: 10px;
        border: 1px dashed #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .accordion-image-upload p {
        margin: 0 0 10px;
        font-size: 12px;
        font-weight: 600;
        color: #333;
    }

    .accordion-icon {
        display: none;
    }
    
    .importance-section__accordion-controls {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
    }
    
    .add-accordion-button {
        color: var(--Malina, #2FCA02) !important;
        background-color: #f5fcf1 !important;
        border: 1px solid var(--Malina, #2FCA02) !important;
        border-radius: 4px;
        padding: 5px 10px !important;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
    }
    
    .accordion-item-controls {
        position: absolute;
        right: 10px;
        top: 0;
        display: flex;
        gap: 5px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    .accordion-item:hover .accordion-item-controls {
        opacity: 1;
    }
    
    .move-accordion-button {
        padding: 4px !important;
        min-width: 24px;
        height: 24px;
        border-radius: 3px;
        color: #221A4C !important;
        border: 1px solid #e2e4e7 !important;
        background: #fff !important;
    }
    
    .move-accordion-button:hover:not(:disabled) {
        background: #f3f4f5 !important;
        box-shadow: inset 0 0 0 1px #e2e4e7;
    }
    
    .move-accordion-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
    
    .remove-accordion-button {
        padding: 4px !important;
        min-width: 24px;
        height: 24px;
        border-radius: 3px;
        color: #dc3545 !important;
        border: 1px solid #dc3545 !important;
        background: #fff !important;
    }
    
    .remove-accordion-button:hover:not(:disabled) {
        background: #dc3545 !important;
        color: #fff !important;
        box-shadow: inset 0 0 0 1px #dc3545;
    }
    
    .importance-section__image {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .importance-section__image img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .importance-section__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }

    /* Hide accordion mobile images on desktop */
    .accordion-mobile-only {
        display: none;
    }
    
    @media (max-width: 768px) {
        .importance-section {
            margin-bottom: 0px !important;
            padding: 60px 20px !important;
        }

        .importance-section__header {
            margin-bottom: 40px;
        }

        .importance-section__content-wrapper {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .importance-section__content,
        .importance-section__image {
            width: 100%;
            flex: none;
        }

        /* Hide the main image section on mobile */
        .importance-section__image {
            display: none;
        }

        /* Show accordion mobile images on mobile */
        .accordion-mobile-only {
            display: block;
        }

        .accordion-item.active .accordion-title {
            font-size: 20px;
        }

        .accordion-item {
            margin-bottom: 16px;
            padding-left: 15px;
        }

        /* Remove green left border on mobile */
        .accordion-item.active::before {
            display: none;
        }

        /* Style for accordion mobile images */
        .accordion-mobile-image {
            margin-top: 15px;
            text-align: center;
        }

        .accordion-mobile-image img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }
    }
`;