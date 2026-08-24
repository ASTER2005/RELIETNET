import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader, n as Bento, r as BentoCell } from "./app-shell-DnhJ4uQV.mjs";
import { t as StageBadge } from "./status-badge-DCxNGzvR.mjs";
import { t as Button } from "./label-C4XT45Y8.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ContributeDialog } from "./contribute-dialog-DoMQRw7a.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { t as RequirementCard } from "./requirement-card-brABdNs6.mjs";
import { a as PRIORITY_ORDER, h as formatNumber, p as useReliefStore, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-h8SJq_kx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const user = useReliefStore((s) => s.currentUser);
	if (!user) return null;
	if (user.role === "donor") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonorHome, {});
	if (user.role === "receiver") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiverHome, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinatorHome, {});
}
function DonorHome() {
	const user = useReliefStore((s) => s.currentUser);
	const requirements = useReliefStore((s) => s.requirements);
	const transactions = useReliefStore((s) => s.transactions);
	const contribute = useReliefStore((s) => s.contribute);
	const navigate = useNavigate();
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const feed = (0, import_react.useMemo)(() => requirements.filter((r) => r.status !== "fulfilled").slice().sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.priorityScore - a.priorityScore), [requirements]);
	const mine = transactions.filter((t) => t.donorId === user.id);
	const people = mine.reduce((a, t) => {
		const r = requirements.find((x) => x.id === t.requirementId);
		return a + (r ? Math.round(r.peopleAffected * (t.quantity / r.quantityNeeded)) : 0);
	}, 0);
	const top = feed[0];
	const quickDonate = () => {
		if (!top) return;
		const remaining = Math.max(1, top.quantityNeeded - top.quantityFulfilled);
		const qty = Math.max(1, Math.round(remaining * .2));
		const tx = contribute(top.id, qty, "Quick donate from dashboard");
		toast.success(`Committed ${tx.quantity} ${tx.quantityUnit} to ${top.campName}.`);
		navigate({
			to: "/transactions/$id",
			params: { id: tx.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `Donor · ${user.name}`,
				title: "Where help is needed",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: quickDonate,
					disabled: !top,
					children: "Quick donate"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bento, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Open critical",
					value: feed.filter((r) => r.priority === "critical").length,
					tone: "critical"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "My transfers",
					value: mine.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "People reached",
					value: formatNumber(people),
					hint: "Estimated from share of each request"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Preferred",
					value: user.contributionType ? RESOURCE_LABEL[user.contributionType] : "Any"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Priority feed",
					to: "/feed",
					link: "Open feed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: feed.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, {
						item,
						role: "donor",
						onContribute: setOpenId
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "My contributions",
					to: "/transactions",
					link: "All transfers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferList, {
					items: mine,
					empty: "No contributions yet. Open the feed to commit."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeDialog, {
				requirementId: openId,
				open: !!openId,
				onOpenChange: (v) => !v && setOpenId(null)
			})
		]
	});
}
function ReceiverHome() {
	const user = useReliefStore((s) => s.currentUser);
	const requirements = useReliefStore((s) => s.requirements.filter((r) => r.receiverId === user.id));
	const surplus = useReliefStore((s) => s.surplus.filter((x) => x.receiverId === user.id));
	const inbound = useReliefStore((s) => s.transactions.filter((t) => t.receiverId === user.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: user.orgName || "Receiver",
				title: "Camp operations",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/post",
						children: "Post a requirement"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bento, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Active requests",
					value: requirements.filter((r) => r.status !== "fulfilled").length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "People listed",
					value: formatNumber(requirements.reduce((a, r) => a + r.peopleAffected, 0))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Inbound transfers",
					value: inbound.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Surplus posts",
					value: surplus.length
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "My requests",
					to: "/feed"
				}), requirements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { children: "No requests yet. Post what the camp needs." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: requirements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, {
						item,
						role: "receiver"
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Incoming",
					to: "/transactions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferList, {
					items: inbound,
					empty: "No inbound transfers yet."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/surplus",
						children: "Post surplus"
					})
				})
			})
		]
	});
}
function CoordinatorHome() {
	const requirements = useReliefStore((s) => s.requirements);
	const surplus = useReliefStore((s) => s.surplus);
	const transactions = useReliefStore((s) => s.transactions);
	const matchSurplus = useReliefStore((s) => s.matchSurplus);
	const navigate = useNavigate();
	const pending = transactions.filter((t) => t.stage === "pending" || t.stage === "donated");
	const active = transactions.filter((t) => t.stage === "received_by_coordinator" || t.stage === "in_transit");
	const flagged = transactions.filter((t) => t.disputed);
	const available = surplus.filter((s) => s.status === "available" && s.quantity > 0);
	const suggestions = available.flatMap((s) => {
		const need = requirements.filter((r) => r.resourceType === s.resourceType && r.status !== "fulfilled" && r.receiverId !== s.receiverId).sort((a, b) => b.priorityScore - a.priorityScore)[0];
		return need ? [{
			surplus: s,
			need
		}] : [];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Coordinator",
				title: "Basin overview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bento, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Pending matches",
					value: pending.length,
					hint: "Donated, awaiting intake"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Active deliveries",
					value: active.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Flagged",
					value: flagged.length,
					tone: flagged.length ? "critical" : "default",
					hint: "Quantity mismatch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoCell, {
					label: "Surplus queue",
					value: available.length
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Surplus → need"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Match idle stock at one camp to a high-need camp of the same resource."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: "No compatible surplus right now."
							}) : suggestions.map(({ surplus: s, need }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-col gap-2 rounded-lg bg-bg p-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [
											s.campName,
											" → ",
											need.campName
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											s.quantity,
											" ",
											s.quantityUnit,
											" ",
											RESOURCE_LABEL[s.resourceType].toLowerCase(),
											" ",
											"· need score ",
											need.priorityScore
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "primary",
									onClick: () => {
										const tx = matchSurplus(s.id, need.id);
										if (tx) navigate({
											to: "/transactions/$id",
											params: { id: tx.id }
										});
									},
									children: "Match & transfer"
								})]
							}, s.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Flagged transactions"
					}), flagged.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No disputes in the queue."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: flagged.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/transactions/$id",
							params: { id: t.id },
							className: "flex min-h-12 items-center justify-between gap-2 rounded-lg bg-bg px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate",
								children: [
									t.donorName,
									" → ",
									t.campName
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: requirements.find((r) => r.id === t.requirementId)?.priority ?? "moderate" })]
						}) }, t.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Open requirements",
					to: "/feed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: requirements.filter((r) => r.status !== "fulfilled").slice().sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, {
						item,
						role: "coordinator",
						compact: true
					}, item.id))
				})]
			})
		]
	});
}
function SectionTitle({ title, to, link }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold tracking-tight",
			children: title
		}), to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-xs font-medium text-muted hover:text-fg",
			children: link ?? "View all"
		}) : null]
	});
}
function TransferList({ items, empty }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { children: empty });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: items.slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/transactions/$id",
			params: { id: t.id },
			className: "flex min-h-14 items-center justify-between gap-3 px-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block truncate font-medium",
					children: [
						t.quantity,
						" ",
						t.quantityUnit,
						" · ",
						t.campName
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: t.donorName
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: t.stage })]
		}) }, t.id))
	});
}
function Empty({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--shadow-border)]",
		children
	});
}
//#endregion
export { DashboardPage as component };
