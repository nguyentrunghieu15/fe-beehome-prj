import type { Component } from "vue";

export interface SidebarItem {
    path?: string;
    label: string;
    extendText?: string;
    icon?: string;
    child?: SidebarItem[];
}
