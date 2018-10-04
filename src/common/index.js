export const margin = { top: 50, right: 0, bottom: 100, left: 30 };
export const width = 960 - margin.left - margin.right;
export const height = 430 - margin.top - margin.bottom;
export const gridSize = Math.floor(width / 24);
export const buckets = 9;
export const colors = [ "#ffffff", "#cc0099", "#ff6600"]; // alternatively colorbrewer.YlGnBu[9]
export const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
export const times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];