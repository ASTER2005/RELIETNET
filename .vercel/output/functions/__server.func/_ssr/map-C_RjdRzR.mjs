import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { h as formatNumber, m as cn, p as useReliefStore, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-C_RjdRzR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIORITY_FILL = {
	critical: "var(--rn-critical)",
	high: "var(--rn-high)",
	moderate: "var(--rn-moderate)",
	low: "var(--rn-low)"
};
function ReliefMap({ requirements }) {
	const camps = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of requirements) {
			const key = r.campName;
			const cur = map.get(key);
			if (cur) cur.items.push(r);
			else map.set(key, {
				name: r.campName,
				x: r.mapX,
				y: r.mapY,
				items: [r]
			});
		}
		return [...map.values()];
	}, [requirements]);
	const [active, setActive] = (0, import_react.useState)(camps[0]?.name ?? null);
	const selected = camps.find((c) => c.name === active);
	const top = selected?.items.slice().sort((a, b) => b.priorityScore - a.priorityScore)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pointer-events-none absolute top-3 left-3 z-10 rounded-md bg-surface/90 px-2 py-1 text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
					children: "Kaveri Basin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 800 520",
					className: "block h-auto w-full",
					role: "img",
					"aria-label": "Kaveri Basin relief map",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: "800",
							height: "520",
							fill: "var(--rn-surface-2)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-20 80 C 120 40, 200 120, 280 90 C 400 50, 460 160, 580 120 C 700 80, 820 140, 840 110 L 840 0 L -20 0 Z",
							fill: "var(--rn-bg)",
							opacity: "0.7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-10 200 C 80 240, 140 180, 220 220 C 320 270, 380 210, 500 260 C 620 310, 700 250, 820 300 L 820 540 L -10 540 Z",
							fill: "var(--rn-bg)",
							opacity: "0.55"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M40 0 C 90 80, 70 160, 120 240 C 170 330, 130 400, 190 520",
							fill: "none",
							stroke: "var(--rn-transit)",
							strokeWidth: "18",
							opacity: "0.35"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M40 0 C 90 80, 70 160, 120 240 C 170 330, 130 400, 190 520",
							fill: "none",
							stroke: "var(--rn-transit)",
							strokeWidth: "6",
							opacity: "0.7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M0 310 H 800",
							stroke: "var(--rn-fg)",
							strokeOpacity: "0.08",
							strokeWidth: "2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M310 0 V 520",
							stroke: "var(--rn-fg)",
							strokeOpacity: "0.08",
							strokeWidth: "2"
						})
					]
				}),
				camps.map((camp) => {
					const lead = camp.items.slice().sort((a, b) => b.priorityScore - a.priorityScore)[0];
					const isOn = active === camp.name;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActive(camp.name),
						className: cn("absolute z-[1] flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full", "shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", isOn && "z-[2]"),
						style: {
							left: `${12 + camp.x * .76}%`,
							top: `${16 + camp.y * .68}%`,
							background: PRIORITY_FILL[lead?.priority ?? "low"],
							color: "var(--rn-accent-fg)",
							transform: isOn ? "translate(-50%, -50%) scale(1.12)" : "translate(-50%, -50%)"
						},
						"aria-label": `${camp.name}, ${lead?.priority ?? "low"} priority`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] font-bold",
							children: camp.name.replace("Camp ", "").slice(0, 2).toUpperCase()
						})
					}, camp.name);
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
			children: [selected && top ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-wide text-muted uppercase",
					children: selected.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, {
						priority: top.priority,
						score: top.priorityScore
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 text-base font-semibold leading-snug",
					children: top.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						RESOURCE_LABEL[top.resourceType],
						" ·",
						" ",
						formatNumber(top.peopleAffected),
						" people"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1.5 text-sm",
					children: selected.items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-2 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: RESOURCE_LABEL[r.resourceType]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-fg",
							children: [
								formatNumber(r.quantityNeeded - r.quantityFulfilled),
								" ",
								r.quantityUnit
							]
						})]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/feed/$id",
					params: { id: top.id },
					className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-accent",
					children: "Open requirement"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Select a camp pin."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 gap-2 text-[11px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						c: "var(--rn-critical)",
						l: "Critical"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						c: "var(--rn-high)",
						l: "High"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						c: "var(--rn-moderate)",
						l: "Moderate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						c: "var(--rn-low)",
						l: "Low"
					})
				]
			})]
		})]
	});
}
function Legend({ c, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2 rounded-full",
			style: { background: c }
		}), l]
	});
}
function MapPage() {
	const requirements = useReliefStore((s) => s.requirements);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Kaveri Basin",
				title: "Camp map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 max-w-2xl text-sm text-muted",
				children: "Pins are colour-coded by the highest open AI Priority Score at that camp. Select a pin for the active requirement."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReliefMap, { requirements })
		]
	});
}
//#endregion
export { MapPage as component };
