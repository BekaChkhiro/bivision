import TitleSection from './TitleSection';
import Carousel from './Carousel';

export default function Save({ attributes }) {
    return (
        <div 
            className="partners-section partners-block"
            style={{ 
                maxWidth: '1250px',
                margin: '0 auto',
            }}
        >
            <TitleSection 
                titlePart1={attributes.titlePart1}
                titlePart1Link={attributes.titlePart1Link}
                titlePart2={attributes.titlePart2}
                subtitle={attributes.subtitle}
                isEditor={false}
            />
            <Carousel logos={attributes.logos} />
        </div>
    );
}
