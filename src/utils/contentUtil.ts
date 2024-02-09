/* eslint-disable import/no-extraneous-dependencies */
import * as DOMPurify from 'dompurify';
import { ReactElement } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { isDefined } from './valueUtil';
import { getAppDataById } from './appDataUtil';

const contentSource = getAppDataById('content');

// eslint-disable-next-line arrow-body-style
export const filterContent = (content: string, args: any) : string => {
    return content.replace(/{(\w+)}/g, (match, word) => (isDefined(args[word]) && args[word] !== null ? args[word] : ''));
};

export const sanitizeContent = (html: string): { __html: string } => ({
    __html:
        typeof html !== 'undefined'
            ? DOMPurify.sanitize(html, {
                ADD_ATTR: ['href', 'target'],
            }) : '',
});

export const getDynamicContent = (contentKey?: string, args?: string[]): any => {
    let content = contentSource;
    if (!contentKey) {
        return [];
    }

    contentKey.split('.').forEach(key => {
        content = content[key];
    });

    if (content && args) {
        content = filterContent(content, args);
    }

    return content;
};

export const getStaticContent = (contentNode: any): ReactElement[] => {
    const contentString = sanitizeContent(isDefined(contentNode).toString());
    if (contentString) {
        return ReactHtmlParser(contentNode);
    }

    return [];
};
