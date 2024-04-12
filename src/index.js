import { JSDOM } from "jsdom";

export function normalizeURL(url) {
    let url_obj = new URL(url);
    let normalized_path = url_obj.pathname.replace(/\/+$/, '');
    return `${url_obj.host}${normalized_path}`;
}

export function get_URLs_from_HTML(html_body, base_url) {
    let dom = new JSDOM(html_body);
    let tag_elements = dom.window.document.querySelectorAll("a");
    let tag_array = Array.from(tag_elements);
    return tag_array.map(tag => `${base_url}${tag.href}`);
}
