export function selectTable(tabId){
    return {
        type: 'TABLE_SELECTED',
        payload: tabId
    }
}

export function showTabs (...tabIds) {
    const tabsToShow = {}
    tabIds.forEach (e => tabsToShow[e] = true)
    return {
        type: 'TABLE_SHOWED',
        payload: tabsToShow
    }
}