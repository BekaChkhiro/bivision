import { RichText } from '@wordpress/block-editor';

export default function TitleSection({ 
    titlePart1, 
    titlePart1Link, 
    titlePart2, 
    subtitle, 
    setAttributes,
    isEditor = true 
}) {
    if (isEditor) {
        return (
            <>
                <div className="flex justify-center flex-wrap gap-2.5 md:gap-[10px] text-center mb-4">
                    <RichText
                        tagName="a"
                        href={titlePart1Link}
                        value={titlePart1}
                        onChange={(value) => setAttributes({ titlePart1: value })}
                        placeholder="Title Part 1"
                        className="text-[#6653C6] text-base md:text-lg font-normal inline no-underline"
                    />
                    <RichText
                        tagName="span"
                        value={titlePart2}
                        onChange={(value) => setAttributes({ titlePart2: value })}
                        placeholder="Title Part 2"
                        className="text-[#8399AF] text-base md:text-lg font-normal inline"
                    />
                </div>
                <RichText
                    tagName="p"
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                    placeholder="Subtitle"
                    className="text-[#8399AF] text-base md:text-lg text-center font-normal mb-4 md:mb-3"
                />
            </>
        );
    } else {
        return (
            <>
                <div className="partners-title-container flex justify-center flex-wrap gap-2.5 md:gap-[10px] text-center mb-4 md:mb-3">
                    <a 
                        href={titlePart1Link}
                        className="partners-title-link text-[#6653C6] text-base md:text-lg font-normal inline no-underline"
                    >
                        <RichText.Content
                            tagName="span"
                            className="partners-title-part1 text-[#6653C6] text-base md:text-lg font-normal inline"
                            value={titlePart1}
                        />
                    </a>
                    <RichText.Content
                        tagName="span"
                        className="partners-title-part2 text-[#8399AF] text-base md:text-lg font-normal inline"
                        value={titlePart2}
                    />
                </div>
                <RichText.Content
                    tagName="p"
                    className="partners-subtitle text-[#8399AF] text-base md:text-lg text-center font-normal mb-4 md:mb-3"
                    value={subtitle}
                />
            </>
        );
    }
}
