export const PAGE_CSS = `
html.apexui-on[data-apexm="pin"] body *:not(#apexui-host):not(#apexui-host *){cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M4 24V13a9 9 0 119 9H4z' fill='%23f59e0b' stroke='%23111' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13 9.5v7M9.5 13h7' stroke='%23111' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E") 4 24,crosshair!important}
html.apexui-on[data-apexm="zone"] body *:not(#apexui-host):not(#apexui-host *),
html.apexui-on[data-apexm="shape"] body *:not(#apexui-host):not(#apexui-host *){cursor:crosshair!important}
html.apexui-on[data-apexm="text"] body *:not(#apexui-host):not(#apexui-host *){cursor:text!important}
`;

export const SHADOW_CSS = `
:host{all:initial;position:fixed;inset:0;z-index:2147483640;pointer-events:none;font:12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e4e4e7}
*,*::before,*::after{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
button,input,select,textarea{font:inherit;color:inherit}

.ax-tab{pointer-events:auto;position:fixed;right:0;top:45%;z-index:2147483640;writing-mode:vertical-rl;background:#18181b;color:#fff;border:1px solid #3f3f46;border-right:0;border-radius:10px 0 0 10px;padding:14px 8px;font:600 12px/1 system-ui;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35);display:flex;align-items:center;gap:6px;transition:background .15s}
.ax-tab:hover{background:#27272a}
.ax-tab .ax-dot{width:7px;height:7px;border-radius:50%;background:#0d99ff;display:inline-block}
.ax-root.on .ax-tab{display:none}

.ax-top{pointer-events:auto;position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483642;display:none;align-items:center;gap:4px;padding:5px 6px;border-radius:12px;background:rgba(24,24,27,.96);backdrop-filter:blur(10px);color:#e4e4e7;border:1px solid #3f3f46;box-shadow:0 12px 32px rgba(0,0,0,.45);max-width:calc(100vw - 32px);flex-wrap:nowrap;overflow-x:auto}
.ax-root.on .ax-top{display:flex}
.ax-brand{font:700 11px/1 system-ui;letter-spacing:.04em;color:#7dd3fc;padding:0 6px 0 2px;white-space:nowrap;user-select:none}
.ax-grip{cursor:grab;color:#71717a;display:flex;padding:0 3px;align-items:center}
.ax-grip:active{cursor:grabbing}

.ax-subbar{pointer-events:auto;position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:2147483642;display:none;align-items:center;gap:4px;padding:4px 8px;border-radius:10px;background:rgba(24,24,27,.96);border:1px solid #3f3f46;box-shadow:0 8px 24px rgba(0,0,0,.35)}
.ax-subbar.show{display:flex}

.ax-pan{pointer-events:auto;position:fixed;top:12px;right:12px;bottom:12px;width:276px;z-index:2147483641;display:none;flex-direction:column;background:rgba(24,24,27,.97);backdrop-filter:blur(12px);color:#e4e4e7;border:1px solid #3f3f46;border-radius:16px;box-shadow:0 18px 48px rgba(0,0,0,.5);overflow-y:auto;overflow-x:hidden}
.ax-root.on .ax-pan{display:flex}
.ax-root.on .ax-pan.hid{display:none}
.ax-pan>*{flex:none}

.ax-b{background:transparent;color:#e4e4e7;border:0;border-radius:7px;padding:6px 9px;cursor:pointer;white-space:nowrap;font-size:12px;transition:background .12s,color .12s}
.ax-b:hover:not(:disabled){background:#27272a}
.ax-b.act{background:#0d99ff;color:#fff}
.ax-b.warn{background:#f59e0b;color:#111;font-weight:600}
.ax-b.pri{background:#0d99ff;color:#fff;font-weight:600}
.ax-b.pri:hover:not(:disabled){background:#2ea8ff}
.ax-b:disabled{opacity:.35;cursor:default}
.ax-b.ic{padding:6px;display:inline-flex;align-items:center;justify-content:center}
.ax-b.pri.ic{gap:6px;padding:6px 11px}
.ax-ic{width:17px;height:17px;display:block;flex:none}
.ax-sep{width:1px;height:18px;background:#3f3f46;margin:0 3px;flex:none}
.ax-n{padding:3px 9px;background:#27272a;border-radius:999px;color:#a1a1aa;font-size:11px;white-space:nowrap}

.ax-hd{display:flex;align-items:center;justify-content:space-between;padding:9px 10px 9px 14px;border-bottom:1px solid #27272a;position:sticky;top:0;background:#18181b;z-index:2}
.ax-hd strong{font-size:12px;letter-spacing:.02em}
.ax-s{padding:10px 12px}
.ax-s.ax-acc{margin:8px 10px 0;padding:0;border:1px solid #3f3f46;border-radius:12px;background:#1f1f23;overflow:hidden}
.ax-s.ax-acc:last-child{margin-bottom:12px}
.ax-ah{display:flex;align-items:center;gap:8px;width:100%;background:#27272d;border:0;color:#e4e4e7;cursor:pointer;padding:9px 12px;text-align:left}
.ax-ah:hover{background:#303038}
.ax-ah span{flex:1;font:600 12px/1.3 system-ui}
.ax-ah .ax-ic{width:15px;height:15px;color:#5cb8ff}
.ax-chev{transition:transform .15s;color:#a1a1aa!important}
.ax-s.shut .ax-chev{transform:rotate(-90deg)}
.ax-s.ax-acc:not(.shut) .ax-ah{border-bottom:1px solid #3f3f46}
.ax-ab{padding:11px}
.ax-s.shut .ax-ab{display:none}

.ax-g{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ax-g3{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.ax-f{display:flex;flex-direction:column;gap:3px;color:#a1a1aa;font-size:11px}
.ax-i{width:100%;background:#27272a;border:1px solid #3f3f46;color:#fff;border-radius:6px;padding:5px 7px;min-height:28px;font-size:12px;outline:none}
.ax-i:focus{border-color:#0d99ff}
textarea.ax-i{font:11.5px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
input[type=color].ax-i{padding:2px;height:28px;cursor:pointer}
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
input[type=number]{-moz-appearance:textfield}
select.ax-i{appearance:none;padding-right:24px;background:#27272a url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23a1a1aa' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 8px center}
.ax-scrub{cursor:ns-resize}

.ax-sel{font:600 11px ui-monospace,SFMono-Regular,Menlo,monospace;color:#7dd3fc;background:#27272a;border-radius:7px;padding:6px 8px;word-break:break-all;margin-bottom:8px;border:1px solid #3f3f46}
.ax-nav{display:flex;gap:4px}
.ax-nav .ax-b{flex:1;background:#27272a;padding:5px;font-size:11px}
.ax-seg{display:flex;background:#27272a;border-radius:6px;overflow:hidden;border:1px solid #3f3f46}
.ax-seg .ax-b{flex:1;border-radius:0;padding:5px 4px;font-size:11px}
.ax-wide{width:100%;margin-top:8px;background:#27272a;border:1px solid #3f3f46}
.ax-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ax-mvh{display:flex;justify-content:space-between;color:#a1a1aa;font-size:11px;margin:10px 0 5px}

.ax-empty{padding:24px 16px;color:#a1a1aa;text-align:center;line-height:1.6}
.ax-empty strong{display:block;color:#e4e4e7;font-size:13px;margin-bottom:6px}
.ax-art{width:144px;height:auto;display:block;margin:0 auto 14px}
.ax-empty kbd{background:#27272a;border:1px solid #3f3f46;border-radius:4px;padding:1px 5px;color:#e4e4e7;font-size:11px}

.ax-cg{margin-top:10px}.ax-ab>.ax-cg:first-child{margin-top:0}
.ax-ch{display:flex;justify-content:space-between;gap:8px;color:#a1a1aa;font-size:11px;margin-bottom:5px}
.ax-ch em{font-style:normal;color:#71717a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ax-cr{display:flex;align-items:center;gap:5px}
.ax-cur{position:relative;flex:none;width:28px;height:28px;border-radius:7px;border:2px solid #0d99ff;box-shadow:inset 0 0 0 2px #18181b;cursor:pointer;overflow:hidden}
.ax-cur input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;padding:0;border:0}
.ax-cur.tr,.ax-c.ax-none{background:conic-gradient(#3f3f46 25%,#27272a 0 50%,#3f3f46 0 75%,#27272a 0) 0 0/8px 8px}
.ax-chips{display:flex;gap:5px;flex:1;min-width:0;overflow:hidden;padding-left:6px;margin-left:1px;border-left:1px solid #3f3f46}
.ax-c{width:20px;height:20px;flex:none;border-radius:5px;border:1px solid #52525b;cursor:pointer;padding:0}
.ax-c.act{outline:2px solid #0d99ff;outline-offset:1px}
.ax-c.cu{border-style:dashed}
.ax-cb{flex:none;width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:#3f3f46;border:1px solid #71717a;border-radius:7px;color:#fff;cursor:pointer;padding:0}
.ax-cb:hover{background:#52525b}
.ax-cb .ax-ic{width:15px;height:15px;transition:transform .15s}
.ax-cb.open .ax-ic{transform:rotate(180deg)}
.ax-cb.pl{background:#0d99ff;border-color:#0d99ff}
.ax-cgrid,.ax-add,.ax-fx{margin-top:8px;padding:8px;background:#2a2a30;border-radius:8px}
.ax-cgrid{display:flex;flex-wrap:wrap;gap:6px}
.ax-add{display:flex;flex-direction:column;gap:8px}
.ax-add .ax-r{display:flex;gap:6px;align-items:center}
.ax-add .ax-r .ax-i[type=color]{width:38px;flex:none}
.ax-add .ax-i[data-ga]{width:66px;flex:none}
.ax-add[data-mode="solid"] .ax-gr{display:none}
.ax-prev{height:22px;border-radius:5px;border:1px solid #52525b}
.ax-sw{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.ax-sw button{width:18px;height:18px;border-radius:5px;border:1px solid #52525b;cursor:pointer;padding:0}

.ax-mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:6px}
.ax-mbtn{background:#27272a;border:1px solid #3f3f46;border-radius:7px;padding:6px 4px;color:#e4e4e7;font-size:10.5px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.ax-mbtn:hover{border-color:#71717a;background:#303038}
.ax-mbtn.act{border-color:#0d99ff;background:rgba(13,153,255,.18);color:#fff}
.ax-mbtn svg{width:28px;height:20px;display:block}
.ax-shitem{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#2a2a30;border-radius:7px;margin-top:6px;font-size:11px}
.ax-shitem span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ax-badge{font-size:10px;padding:2px 6px;border-radius:999px;font-weight:600;cursor:pointer;border:0}
.ax-badge.guide{background:rgba(245,158,11,.2);color:#fbbf24}
.ax-badge.real{background:rgba(16,185,129,.2);color:#34d399}

.ax-hov,.ax-box,.ax-zone,.ax-frame{position:fixed;pointer-events:none;display:none}
.ax-hov{border:1.5px dashed #0d99ff;z-index:2147483638}
.ax-box{border:2px solid #0d99ff;z-index:2147483639}
.ax-tag{position:absolute;top:-22px;left:-2px;background:#0d99ff;color:#fff;font:600 10px ui-monospace,monospace;padding:3px 6px;border-radius:4px;white-space:nowrap}
.ax-h{position:absolute;width:9px;height:9px;background:#fff;border:2px solid #0d99ff;pointer-events:auto;border-radius:2px}
.ax-zone{border:1.5px dashed #0d99ff;background:rgba(13,153,255,.1);z-index:2147483639}
.ax-frame{border:1.5px dashed #f59e0b;background:rgba(245,158,11,.08);border-radius:4px;z-index:2147483637}
.ax-pin{pointer-events:auto;position:fixed;z-index:2147483639;width:24px;height:24px;border-radius:12px 12px 12px 2px;background:#f59e0b;color:#111;font:700 12px/24px system-ui;text-align:center;transform:translate(-4px,-24px);box-shadow:0 4px 10px rgba(0,0,0,.35);cursor:pointer;user-select:none}

.ax-svg{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483638;overflow:visible}

.ax-pop,.ax-mod{pointer-events:auto;position:fixed;z-index:2147483645;display:none;background:#18181b;color:#e4e4e7;border:1px solid #3f3f46;box-shadow:0 16px 40px rgba(0,0,0,.5)}
.ax-pop{width:256px;padding:10px;border-radius:11px;flex-direction:column;gap:8px}
.ax-pop.show{display:flex}
.ax-mod{inset:0;background:rgba(0,0,0,.65);align-items:center;justify-content:center;padding:20px;border:0}
.ax-mod.show{display:flex}
.ax-card{width:min(720px,100%);max-height:92vh;overflow:auto;background:#18181b;border:1px solid #3f3f46;border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px}
.ax-card textarea{width:100%;background:#0b0b0d;color:#e4e4e7;border:1px solid #3f3f46;border-radius:8px;padding:10px;font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
.ax-th{max-width:100%;max-height:90px;border-radius:6px;display:block;margin-top:4px;border:1px solid #3f3f46}

.ax-pan,.ax-card,.ax-card textarea,.ax-top{scrollbar-width:thin;scrollbar-color:#71717a transparent}
@media(max-width:1180px){.ax-lbl{display:none}}
@media(min-width:600px) and (max-width:899px){.ax-pan{width:248px}}
@media(max-width:599px){.ax-top{max-width:calc(100vw - 16px)}.ax-pan{top:auto;left:8px;right:8px;bottom:8px;width:auto;height:auto;max-height:46vh}}
`;
