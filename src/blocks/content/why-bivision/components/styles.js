/**
 * Block styles exported as a constant
 */
export const blockStyle = `
    /* Font family assignments for why-bivision block */
    .why-bivision__main-title {
        font-family: 'bold' !important;
    }

    .why-bivision__about p {
        font-family: 'roman' !important;
    }

    .stat-item h3 {
        font-family: 'medium' !important;
    }

    .stat-item p {
        font-family: 'roman' !important;
    }

    .wp-block-bevision-why-bivision {
        display: block;
        padding-top: 60px;
    }

    .why-bivision {
        display: flex;
        flex-direction: column;
        padding: 40px 0 50px 0;
        background-color: #22194b;
        color: #fff;
        position: relative;
        overflow: hidden;
    }

    .why-bivision__background {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--background-size, 10%);
        height: var(--background-height, 100%);
        opacity: 0.2;
        pointer-events: none;
    }

    .why-bivision__background2 {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 150px;
        opacity: var(--background-opacity2, 0.2);
        pointer-events: none;
    }

    .why-bivision__background img,
    .why-bivision__background2 img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .bivision__container {
        max-width: 1250px !important;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
        gap: 25px;
        position: relative;
        z-index: 1;
        align-items: stretch;
        height: auto;
    }
    
    .why-bivision__media-column {
        flex: 1;
        display: flex;
        width: 50%;
        position: relative;
        min-height: 100%;
    }

    .why-bivision__media-column img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .why-bivision__media-column .image-button {
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .why-bivision__media-column .image-button img {
        display: block;
    }

    .why-bivision__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
        justify-content: space-between;
        width: 50%;
    }

    .why-bivision__text-content {
        background: #6653C6;
        border-radius: 20px !important;
        padding: 40px;
    }

    .why-bivision__text-content {
        background: #6653C6;
        border-radius: 20px !important;
        padding: 20px;
    }

    .why-bivision__about p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 0;
        color: #fff;
        opacity: 0.9;
        margin: 0px;
    }

    .why-bivision__stats {
        display: flex;
        flex-direction: row;
        gap: 25px;
        flex-wrap: nowrap;
        width: 100%;
    }

    .why-bivision__stats .stat-item {
        background-color: #2a215f !important;
        padding: 20px;
        border-radius: 20px;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 6px;
        flex: 1;
        width: calc(33.333% - 0.667rem);
    }

    .why-bivision__stats .stat-item img {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 24px;
        height: 24px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        object-fit: contain;
    }

    .why-bivision__stats .stat-item .editor-post-featured-image__toggle {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 8px;
        margin: 0;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
    }

    .why-bivision__stats .stat-item .editor-post-featured-image__toggle img {
        position: static;
        width: 24px;
        height: 24px;
        padding: 0;
        background: none;
    }

    .why-bivision__stats .stat-item h3 {
        color: var(--White, #FFF);
        font-size: 40px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0;
    }

    .why-bivision__stats .stat-item p {
        color: var(--White, #FFF);
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        .why-bivision {
            padding: 30px 15px 30px 15px;
            overflow: hidden;
            width: 100%;
        }

        .bivision__container {
            flex-direction: column;
            padding: 0;
        }

        .why-bivision__media-column,
        .why-bivision__content {
            width: 100%;
        }

        .why-bivision__media-column {
            height: 300px;
            position: relative;
        }

        .why-bivision__content {
            margin-top: 20px;
        }

        .why-bivision__stats {
            flex-direction: column;
        }

        .why-bivision__stats .stat-item {
            width: 100%;
        }

        .why-bivision__main-title {
            font-size: 40px;
            text-align: center;
            margin-bottom: 30px;
        }
    }
`;
