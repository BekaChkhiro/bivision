import { registerBlockType } from '@wordpress/blocks';
import Edit from './components/Edit';
import Save from './components/Save';
import './frontend.css';

registerBlockType('bevision/partners', {
    title: 'Partners',
    icon: 'groups',
    category: 'bevision',
    attributes: {
        titlePart1: {
            type: 'string',
            source: 'html',
            selector: '.partners-title-part1',
            default: '100+ companies'
        },
        titlePart1Link: {
            type: 'string',
            source: 'attribute',
            selector: '.partners-title-link',
            attribute: 'href',
            default: '#'
        },
        titlePart2: {
            type: 'string',
            source: 'html',
            selector: '.partners-title-part2',
            default: ' trust us with their data'
        },
        subtitle: {
            type: 'string',
            source: 'html',
            selector: '.partners-subtitle',
            default: 'ჩვენი პარტნიორები'
        },
        logos: {
            type: 'array',
            default: []
        }
    },
    edit: Edit,
    save: Save
});
