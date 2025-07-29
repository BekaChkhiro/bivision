import { registerBlockType } from '@wordpress/blocks';
import Edit from './components/Edit';
import Save from './components/Save';

registerBlockType('bevision/importance-section', {
    title: 'Importance Section',
    icon: 'chart-bar',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        subtitle: {
            type: 'string',
            default: 'Importance of BeVision'
        },
        title: {
            type: 'string',
            default: 'Why BeVision is Important'
        },
        accordionItems: {
            type: 'array',
            default: [
                {
                    title: 'Mission Statement',
                    content: 'Our mission is to provide innovative solutions that meet the needs of our clients and exceed their expectations.',
                    imageUrl: '',
                    imageId: undefined
                },
                {
                    title: 'Vision',
                    content: 'We strive to be a leader in the industry by delivering exceptional quality and service that sets a standard for our competitors.',
                    imageUrl: '',
                    imageId: undefined
                },
                {
                    title: 'Core Values',
                    content: 'We are guided by our core values of integrity, excellence, innovation, and customer-centricity in everything we do.',
                    imageUrl: '',
                    imageId: undefined
                }
            ]
        }
    },
    edit: Edit,
    save: Save
});