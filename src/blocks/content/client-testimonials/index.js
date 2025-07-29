import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Import components
import Edit from './components/Edit';
import Save from './components/Save';

registerBlockType('bevision/client-testimonials', {
    title: __('Client Testimonials', 'bevision'),
    icon: 'groups',
    category: 'bevision',
    attributes: {
        subtitle: {
            type: 'string',
            default: 'CLIENTS'
        },
        title: {
            type: 'string',
            default: 'They lead with data'
        },
        orderBy: {
            type: 'string',
            default: 'custom' // Options: 'custom', 'name', 'position', 'date'
        },
        selectedTestimonials: {
            type: 'array',
            default: [0, 1, 2] // Default: all testimonials are selected (indexes)
        },
        testimonials: {
            type: 'array',
            default: [
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                },
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                },
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                }
            ]
        }
    },

    edit: Edit,
    save: Save
});
