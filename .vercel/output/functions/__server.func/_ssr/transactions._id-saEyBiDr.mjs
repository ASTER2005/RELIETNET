import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as Check, r as Upload, y as FileText } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-z9sb49Tx.mjs";
import { n as VerifyBadge, t as StageBadge } from "./status-badge-DCxNGzvR.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as STAGE_ORDER, f as nextStage, g as formatStamp, h as formatNumber, m as cn, n as Route$1, o as PROOF_LABEL, p as useReliefStore, s as RESOURCE_LABEL, u as STAGE_LABEL, v as selectClass } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions._id-saEyBiDr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"receipt",
	"invoice",
	"delivery_bill",
	"distribution_record"
];
function ProofUpload({ txId }) {
	const uploadProof = useReliefStore((s) => s.uploadProof);
	const [kind, setKind] = (0, import_react.useState)("receipt");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [dataUrl, setDataUrl] = (0, import_react.useState)(null);
	const [mime, setMime] = (0, import_react.useState)("application/octet-stream");
	const onFile = (file) => {
		if (!file) return;
		if (file.size > 25e5) {
			toast.error("Keep proof files under 2.5 MB for this prototype.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setDataUrl(String(reader.result));
			setFileName(file.name);
			setMime(file.type || "application/octet-stream");
		};
		reader.readAsDataURL(file);
	};
	const submit = () => {
		if (!fileName || !dataUrl) {
			toast.error("Attach a receipt, invoice, or delivery bill.");
			return;
		}
		const n = Number(amount);
		if (!Number.isFinite(n) || n <= 0) {
			toast.error("Enter the quantity shown on the document.");
			return;
		}
		uploadProof({
			txId,
			kind,
			fileName,
			dataUrl,
			mimeType: mime,
			amountEntered: n
		});
		toast.success("Proof uploaded. AI/OCR check ran against the declared quantity.");
		setFileName(null);
		setDataUrl(null);
		setAmount("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: "Upload proof"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Simulated AI/OCR compares the quantity you enter with the declared amount. A mismatch flags the transfer as disputed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "kind",
							children: "Document type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "kind",
							value: kind,
							onChange: (e) => setKind(e.target.value),
							className: selectClass,
							children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: PROOF_LABEL[k]
							}, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "amt",
							children: "Quantity on document"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "amt",
							inputMode: "numeric",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: "Must match declared quantity"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg bg-bg px-3 py-2 text-sm shadow-[var(--shadow-border)]",
						children: [
							fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 shrink-0 text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 shrink-0 text-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-muted",
								children: fileName ?? "Image or PDF"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*,.pdf,application/pdf",
								className: "sr-only",
								onChange: (e) => onFile(e.target.files?.[0])
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: submit,
						children: "Run verification"
					})
				]
			})
		]
	});
}
function TransactionTimeline({ current, history }) {
	const currentIndex = STAGE_ORDER.indexOf(current);
	const stampFor = (stage) => history.find((h) => h.stage === stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col gap-0 sm:flex-row sm:items-start",
		children: STAGE_ORDER.map((stage, i) => {
			const done = i < currentIndex;
			const active = i === currentIndex;
			const event = stampFor(stage);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex sm:flex-1 sm:flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center sm:flex-row sm:items-center sm:w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", done && "bg-delivered text-accent-fg", active && "bg-fg text-bg", !done && !active && "bg-surface-2 text-subtle"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-3.5",
							strokeWidth: 3
						}) : i + 1
					}), i < STAGE_ORDER.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("w-px flex-1 sm:h-px sm:w-auto", done ? "bg-delivered" : "bg-border") }) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 pb-4 pl-3 sm:pt-2 sm:pl-0 sm:pr-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-xs font-medium leading-snug", active ? "text-fg" : "text-muted"),
						children: STAGE_LABEL[stage]
					}), event ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-[11px] text-subtle tabular",
						children: [formatStamp(event.at), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate",
							children: event.by
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-subtle",
						children: "—"
					})]
				})]
			}, stage);
		})
	});
}
function canAdvance(role, stage) {
	const nxt = nextStage(stage);
	if (!nxt) return null;
	if (role === "coordinator") return nxt;
	if (role === "receiver" && (stage === "in_transit" || stage === "delivered")) return nxt;
	return null;
}
function TransactionDetailPage() {
	const { id } = Route$1.useParams();
	const user = useReliefStore((s) => s.currentUser);
	const tx = useReliefStore((s) => s.transactions.find((t) => t.id === id));
	const req = useReliefStore((s) => s.requirements.find((r) => r.id === tx?.requirementId));
	const advanceStage = useReliefStore((s) => s.advanceStage);
	const resolveDispute = useReliefStore((s) => s.resolveDispute);
	if (!tx) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"Transfer not found.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/transactions",
				className: "text-fg underline",
				children: "Back"
			})
		]
	});
	const nxt = user ? canAdvance(user.role, tx.stage) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: tx.stage }),
					tx.disputed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "critical",
						children: "Disputed"
					}) : null,
					tx.kind === "redistribution" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "transit",
						children: "Redistribution"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 text-2xl font-semibold tracking-tight sm:text-3xl",
				children: [
					tx.donorName,
					" → ",
					tx.campName
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					formatNumber(tx.quantity),
					" ",
					tx.quantityUnit,
					" of",
					" ",
					RESOURCE_LABEL[tx.resourceType].toLowerCase(),
					req ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" ",
						"for",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/feed/$id",
							params: { id: req.id },
							className: "text-fg underline-offset-2 hover:underline",
							children: req.title
						})
					] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-sm font-semibold",
					children: "Status timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTimeline, {
					current: tx.stage,
					history: tx.stageHistory
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Donor",
						v: tx.donorName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Coordinator",
						v: tx.coordinatorName ?? "Unassigned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Receiver",
						v: `${tx.receiverName} · ${tx.campName}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Declared qty",
						v: `${tx.declaredAmount} ${tx.quantityUnit}`
					})
				]
			}),
			tx.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: tx.notes
			}) : null,
			tx.disputed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-critical/10 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-critical",
						children: "Disputed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: tx.disputeReason
					}),
					user?.role === "coordinator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						onClick: () => {
							resolveDispute(tx.id);
							toast.success("Dispute marked resolved.");
						},
						children: "Resolve as verified"
					}) : null
				]
			}) : null,
			nxt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					onClick: () => {
						advanceStage(tx.id);
						toast.success(`Moved to ${STAGE_LABEL[nxt]}.`);
					},
					children: ["Mark ", STAGE_LABEL[nxt].toLowerCase()]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Proofs"
				}), tx.proofs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No documents uploaded yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: tx.proofs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
						children: [p.dataUrl && p.mimeType.startsWith("image/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.dataUrl,
							alt: "",
							className: "size-14 rounded-md object-cover outline outline-1 -outline-offset-1 outline-fg/10"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 items-center justify-center rounded-md bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-muted" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: p.fileName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										p.uploaderName,
										" · ",
										p.kind.replace("_", " "),
										" · qty",
										" ",
										p.amountEntered,
										" · ",
										formatStamp(p.uploadedAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyBadge, { status: p.verification })
								})
							]
						})]
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofUpload, { txId: tx.id })
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-medium",
			children: v
		})]
	});
}
//#endregion
export { TransactionDetailPage as component };
