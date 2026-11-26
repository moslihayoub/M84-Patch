async function toggleApexOnTab(tab) {
  if (!tab?.id || !tab.url || /^(chrome|edge|about|chrome-extension):/i.test(tab.url)) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'APEXUI_TOGGLE' });
  } catch (_) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['m84-patch-content.js']
    });
  }
}

chrome.action.onClicked.addListener(tab => {
  toggleApexOnTab(tab);
});

chrome.commands.onCommand.addListener(async command => {
  if (command !== 'toggle-apexui') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  toggleApexOnTab(tab);
});
