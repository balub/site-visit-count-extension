'use strict';

// TODO: add the website to the internal history of visited sites
// Here I need to get the URL of the current tab and add it to the history list saved in storage
// If this is a new site, I need to create a new entry in the history list
// If this is an existing site, I need to send a message to the content script to do the required shit

const HISTORY = 'HISTORY';

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, async function (tab) {
    if (!tab.url) return;

    if (!(await isSiteVisited(tab.url))) addSiteToHistory(tab.url);
    console.log('Site already visited');
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, change, tab) => {
  if (tab.active && change.url) {
    if (!tab.url) return;

    if (!(await isSiteVisited(tab.url))) addSiteToHistory(tab.url);
    console.log('Site already visited');
  }
});

const addSiteToHistory = async (currentSite: string) => {
  const history = await getHistoryList();
  chrome.storage.local.set({ HISTORY: [...history, currentSite] });
};

const getHistoryList = async () => {
  const res = await chrome.storage.local.get(['HISTORY']);
  return res.HISTORY;
};

const isSiteVisited = async (currentSite: string) => {
  const history = await getHistoryList();
  if (history && !history.includes(currentSite)) return false;
  return true;
};
