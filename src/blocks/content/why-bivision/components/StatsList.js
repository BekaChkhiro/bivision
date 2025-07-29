import StatItem from './StatItem';

/**
 * StatsList Component for displaying all stats
 * 
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Set attributes function (optional for save view)
 * @param {boolean} props.isEdit - True if in edit mode, false if in save mode
 * @returns {JSX.Element} Stats list component
 */
const StatsList = ({ attributes, setAttributes, isEdit = false }) => {
    // Define handlers for edit mode
    const handleYearsIconSelect = (media) => {
        setAttributes({
            yearsIconId: media.id,
            yearsIconUrl: media.url
        });
    };

    const handleClientsIconSelect = (media) => {
        setAttributes({
            clientsIconId: media.id,
            clientsIconUrl: media.url
        });
    };

    const handleNpsIconSelect = (media) => {
        setAttributes({
            npsIconId: media.id,
            npsIconUrl: media.url
        });
    };

    return (
        <div className="why-bivision__stats-container">
            <div className="why-bivision__stats">
                <StatItem 
                    iconUrl={attributes.yearsIconUrl}
                    iconId={attributes.yearsIconId}
                    value={attributes.yearsOnMarket}
                    label={attributes.yearsLabel}
                    onIconSelect={isEdit ? handleYearsIconSelect : undefined}
                    onValueChange={isEdit ? (yearsOnMarket) => setAttributes({ yearsOnMarket }) : undefined}
                    onLabelChange={isEdit ? (yearsLabel) => setAttributes({ yearsLabel }) : undefined}
                    isEdit={isEdit}
                />
                <StatItem 
                    iconUrl={attributes.clientsIconUrl}
                    iconId={attributes.clientsIconId}
                    value={attributes.clientsCount}
                    label={attributes.clientsLabel}
                    onIconSelect={isEdit ? handleClientsIconSelect : undefined}
                    onValueChange={isEdit ? (clientsCount) => setAttributes({ clientsCount }) : undefined}
                    onLabelChange={isEdit ? (clientsLabel) => setAttributes({ clientsLabel }) : undefined}
                    isEdit={isEdit}
                />
                <StatItem 
                    iconUrl={attributes.npsIconUrl}
                    iconId={attributes.npsIconId}
                    value={attributes.npsScore}
                    label={attributes.npsLabel}
                    onIconSelect={isEdit ? handleNpsIconSelect : undefined}
                    onValueChange={isEdit ? (npsScore) => setAttributes({ npsScore }) : undefined}
                    onLabelChange={isEdit ? (npsLabel) => setAttributes({ npsLabel }) : undefined}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
};

export default StatsList;
