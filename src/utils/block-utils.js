import { registerBlockType } from '@wordpress/blocks';

/**
 * Helper function to register a custom block with extended functionality
 * @param {string} blockName - Name of the block to register
 * @param {object} settings - Basic block settings
 * @param {object} customAttributes - Additional block attributes (optional)
 * @param {object} extendedComponents - Additional components to merge (optional)
 * @returns {object} Registered block object
 */
export const registerCustomBlock = (blockName, settings, customAttributes = {}, extendedComponents = {}) => {
    const defaultSettings = {
        category: 'bevision',
        supports: {
            align: true,
            html: false
        }
    };

    // Merge attributes
    const attributes = {
        ...settings.attributes,
        ...customAttributes
    };

    // Merge components and settings
    const mergedSettings = {
        ...defaultSettings,
        ...settings,
        attributes,
        ...extendedComponents
    };

    // Register the block with merged settings
    return registerBlockType(`bevision/${blockName}`, mergedSettings);
};