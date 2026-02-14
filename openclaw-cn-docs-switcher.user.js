// ==UserScript==
// @name         快速跳到 OpenClaw 文档的中文版本
// @namespace    https://github.com/viko16
// @version      1.1.0
// @description  自动检测 OpenClaw 文档的中文版本，只有存在时才显示切换按钮
// @author       viko16
// @match        https://docs.openclaw.ai/*
// @grant        GM_xmlhttpRequest
// @connect      docs.openclaw.ai
// @run-at       document-end
// @homepageURL  https://github.com/viko16/openclaw-cn-docs-switcher
// @supportURL   https://github.com/viko16/openclaw-cn-docs-switcher/issues
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  const CN_PREFIX = '/zh-CN';
  let switchBtn = null;
  let currentTargetUrl = '';

  // 1. 初始化按钮元素（初始状态为隐藏）
  function initButton() {
    if (document.getElementById('openclaw-cn-switcher')) return;

    switchBtn = document.createElement('div');
    switchBtn.id = 'openclaw-cn-switcher';
    switchBtn.style.cssText = `
      position: fixed;
      top: 12px;
      right: 0;
      z-index: 200;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #25c2a0;
      padding: 10px 20px;
      display: none;
      transition: opacity 0.2s ease;
      user-select: none;
    `;

    switchBtn.innerHTML = `
      <span style="display:flex; align-items:center; gap:4px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"></path><path d="M4 14l6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="M22 22l-5-10-5 10"></path><path d="M14 18h6"></path></svg>
        中文
      </span>
    `;

    switchBtn.onmouseover = () => {
      switchBtn.style.opacity = '0.7';
    };
    switchBtn.onmouseout = () => {
      switchBtn.style.opacity = '1';
    };

    switchBtn.onclick = () => {
      if (currentTargetUrl) {
        window.location.href = currentTargetUrl;
      }
    };

    document.body.appendChild(switchBtn);
  }

  // 2. 核心检测逻辑
  function checkAndShow() {
    const path = window.location.pathname;

    // 如果已经在中文版，直接隐藏
    if (path.startsWith(CN_PREFIX)) {
      if (switchBtn) switchBtn.style.display = 'none';
      return;
    }

    // 构造目标 URL
    const targetUrl =
      window.location.origin +
      CN_PREFIX +
      path +
      window.location.search +
      window.location.hash;

    // 发起 HEAD 请求检测有效性
    GM_xmlhttpRequest({
      method: 'HEAD',
      url: targetUrl,
      onload(response) {
        if (!switchBtn) initButton();

        if (response.status === 200) {
          currentTargetUrl = targetUrl;
          switchBtn.style.display = 'block';
          console.log('[OpenClaw-CN] 中文文档存在，按钮已显示');
        } else {
          switchBtn.style.display = 'none';
          console.log(`[OpenClaw-CN] 中文文档不可用 (HTTP ${response.status})`);
        }
      },
      onerror() {
        if (switchBtn) switchBtn.style.display = 'none';
      },
    });
  }

  // 3. 路由监听 (处理 SPA 跳转)
  function setupRouterObserver() {
    window.addEventListener('popstate', checkAndShow);

    const originalPush = history.pushState;
    history.pushState = function () {
      originalPush.apply(this, arguments);
      checkAndShow();
    };

    const originalReplace = history.replaceState;
    history.replaceState = function () {
      originalReplace.apply(this, arguments);
      checkAndShow();
    };
  }

  // 4. 启动
  initButton();
  setupRouterObserver();
  checkAndShow();
})();
