// import { useEffect } from "react";

// // ตั้งชื่อให้ถูก (TH) และ EN ที่ต้องการ
// const EN_FULL = "Puripat Lakornthai";
// const TH_FULL = "ภูริพัฒน์ ลครไทย";

// // regex หา EN ชื่อ-นามสกุล (เว้นวรรคหลายตัว/ตัวพิมพ์ใหญ่เล็กไม่ตรงก็หาได้)
// const EN_REGEX = /\bpuripat\s+lakornthai\b/i;

// // regex หา TH (ถ้าอยากครอบคลุมสะกดผิดๆ เพิ่มทางเลือกได้)
// const TH_REGEX = /ภูริพัฒน์\s+ลครไทย/; // ตรง ๆ ก่อน

// // ชิ้น HTML ที่จะใส่แทนข้อความดิบ
// function makeLockedNameNode(doc: Document) {
//   const wrapper = doc.createElement("span");
//   wrapper.className = "name-lock-wrapper";
//   // EN
//   const en = doc.createElement("span");
//   en.className = "name-en notranslate";
//   en.setAttribute("translate", "no");
//   en.textContent = EN_FULL;

//   // TH
//   const th = doc.createElement("span");
//   th.className = "name-th notranslate";
//   th.setAttribute("translate", "no");
//   th.textContent = TH_FULL;

//   wrapper.appendChild(en);
//   wrapper.appendChild(th);
//   return wrapper;
// }

// // ฉีด style global ครั้งเดียว
// function ensureStyleTag() {
//   const id = "global-name-lock-style";
//   if (document.getElementById(id)) return;
//   const style = document.createElement("style");
//   style.id = id;
//   style.textContent = `
//     /* แสดง/ซ่อนตามภาษา */
//     html[lang="en"] .name-lock-wrapper .name-th { display: none !important; }
//     html[lang="th"] .name-lock-wrapper .name-en { display: none !important; }
//     /* กัน Google/overlay จับไปแปล */
//     .name-lock-wrapper .notranslate { -webkit-user-modify: read-only; }
//   `;
//   document.head.appendChild(style);
// }

// function shouldSkipNode(node: Node): boolean {
//   if (!(node instanceof HTMLElement)) return false;
//   const tag = node.tagName.toLowerCase();
//   // ข้าม element บางชนิด
//   if (["script", "style", "textarea"].includes(tag)) return true;
//   // ข้าม input/textarea/contenteditable
//   if ((node as HTMLElement).isContentEditable) return true;
//   if (node.closest("input, textarea")) return true;
//   // ข้ามลิงก์อีเมล (ไม่อยากพัง mailto หรืออีเมล)
//   if (node.closest('a[href^="mailto:"]')) return true;
//   return false;
// }

// // เดิน DOM แบบปลอดภัย: แก้เฉพาะ text node ที่มีชื่อเป้าหมาย
// function lockNamesIn(root: Node) {
//   const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
//     acceptNode: (textNode) => {
//       const p = textNode.parentElement;
//       if (!p) return NodeFilter.FILTER_REJECT;
//       if (shouldSkipNode(p)) return NodeFilter.FILTER_REJECT;
//       const t = textNode.nodeValue || "";
//       if (EN_REGEX.test(t) || TH_REGEX.test(t)) return NodeFilter.FILTER_ACCEPT;
//       return NodeFilter.FILTER_REJECT;
//     },
//   });

//   const targets: Text[] = [];
//   let n: Node | null;
//   while ((n = tw.nextNode())) targets.push(n as Text);

//   for (const textNode of targets) {
//     const parent = textNode.parentElement!;
//     const text = textNode.nodeValue || "";

//     // สร้าง fragment ใหม่แทน text node เดิม (รองรับหลายแมตช์ในบรรทัด)
//     const frag = document.createDocumentFragment();
//     let lastIdx = 0;

//     const allMatches: Array<{ start: number; end: number; type: "EN" | "TH" }> = [];

//     // หา EN
//     {
//       let m: RegExpExecArray | null;
//       const re = new RegExp(EN_REGEX.source, EN_REGEX.flags.replace("g", "") + "g");
//       while ((m = re.exec(text))) {
//         allMatches.push({ start: m.index, end: m.index + m[0].length, type: "EN" });
//       }
//     }
//     // หา TH
//     {
//       let m: RegExpExecArray | null;
//       const re = new RegExp(TH_REGEX.source, "g");
//       while ((m = re.exec(text))) {
//         allMatches.push({ start: m.index, end: m.index + m[0].length, type: "TH" });
//       }
//     }

//     if (!allMatches.length) continue;

//     // เรียงจากซ้ายไปขวา
//     allMatches.sort((a, b) => a.start - b.start);

//     for (const m of allMatches) {
//       // ข้อความก่อนหน้า
//       if (m.start > lastIdx) {
//         frag.appendChild(document.createTextNode(text.slice(lastIdx, m.start)));
//       }
//       // ใส่ name-lock (EN/TH แสดงตามภาษาอยู่แล้ว)
//       const node = makeLockedNameNode(document);
//       frag.appendChild(node);
//       lastIdx = m.end;
//     }
//     // ส่วนท้าย
//     if (lastIdx < text.length) {
//       frag.appendChild(document.createTextNode(text.slice(lastIdx)));
//     }

//     parent.replaceChild(frag, textNode);
//   }
// }

// export default function GlobalNameLock() {
//   useEffect(() => {
//     ensureStyleTag();

//     // ล็อกครั้งแรก
//     lockNamesIn(document.body);

//     // เฝ้าดู DOM เผื่อมีการเพิ่ม/เปลี่ยน (เช่นสลับภาษา/SPA อัพเดต)
//     const obs = new MutationObserver((mutations) => {
//       for (const m of mutations) {
//         // แก้เฉพาะสิ่งที่เพิ่มเข้ามา
//         m.addedNodes.forEach((node) => {
//           if (node.nodeType === 1 && !shouldSkipNode(node as HTMLElement)) {
//             lockNamesIn(node);
//           } else if (node.nodeType === 3) {
//             lockNamesIn(node.parentNode || document.body);
//           }
//         });
//         // ถ้าข้อความเปลี่ยนในที่เดิม
//         if (m.type === "characterData" && m.target) {
//           const p = (m.target as CharacterData).parentNode || document.body;
//           lockNamesIn(p);
//         }
//       }
//     });

//     obs.observe(document.body, {
//       subtree: true,
//       childList: true,
//       characterData: true,
//     });

//     return () => obs.disconnect();
//   }, []);

//   // ไม่ render อะไร — แค่ทำงานเบื้องหลัง
//   return null;
// }
