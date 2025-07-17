import TitleSection from './TitleSection';
import Carousel from './Carousel';
import Section from '../../../../components/Section';

export default function Save({ attributes }) {
    return (
        <Section 
            className="partners-section partners-block"
            paddingDesktop="60px 20px 0px 20px"
            paddingLaptop="60px 20px 20px 20px"
            paddingTablet="60px 20px 0 20px"
            paddingMobile="60px 20px 0 20px"
            style={{ marginTop: '60px', paddingTop: '60px' }}
        >
            <TitleSection 
                titlePart1={attributes.titlePart1}
                titlePart1Link={attributes.titlePart1Link}
                titlePart2={attributes.titlePart2}
                subtitle={attributes.subtitle}
                isEditor={false}
            />
            <Carousel logos={attributes.logos} />
        </Section>
    );
}
