const el = id => document.getElementById(id);
const menus = {
  user: [['菜品浏览', 'Dishes'], ['推荐', 'Recommendations'], ['凭证上传', 'Upload receipt'],
    ['我的评价', 'My reviews'], ['反馈', 'Feedback'], ['个人中心', 'Profile']],
  staff: [['菜品管理', 'Manage dishes'], ['凭证审核', 'Review receipts'], ['反馈处理', 'Manage feedback']]
};
let language = 0;
let role = '';
let page = 0;
let state = 'guest';

const messages = {
  guest: ['请选择本地测试身份', 'Select a local test identity'],
  loading: ['正在验证身份…', 'Checking identity…'],
  denied: ['身份验证失败或权限不足', 'Authentication failed or access denied'],
  offline: ['无法连接本地服务', 'Local server unavailable'],
  user: ['用户端', 'User portal'],
  staff: ['食堂工作者管理端', 'Staff portal']
};

function render() {
  document.documentElement.lang = language ? 'en' : 'zh-CN';
  el('title').textContent = language ? 'Campus Dining' : '校园餐饮';
  el('language').textContent = language ? '中文' : 'English';
  el('identity-label').textContent = language ? 'Local test identity' : '本地测试身份';
  ['Signed out', 'User A', 'User B', 'Staff'].forEach((name, i) => {
    el('identity').options[i].text = language ? name : ['未登录', '普通用户 A', '普通用户 B', '食堂工作者'][i];
  });
  el('status').textContent = messages[state][language];
  const items = menus[role] || [];
  el('menu').replaceChildren(...items.map((label, i) => {
    const button = document.createElement('button');
    button.textContent = label[language];
    button.setAttribute('aria-pressed', String(page === i));
    button.onclick = () => { page = i; render(); };
    return button;
  }));
  el('panel').hidden = !items.length;
  el('heading').textContent = items[page]?.[language] || '';
  el('placeholder').textContent = language ? 'Module pending integration.' : '模块待接入。';
}

el('identity').onchange = () => {
  const id = el('identity').value;
  role = id === 'staff-demo-001' ? 'staff' : id ? 'user' : '';
  state = role || 'guest';
  page = 0;
  render();
};
el('language').onclick = () => { language = 1 - language; render(); };
render();

