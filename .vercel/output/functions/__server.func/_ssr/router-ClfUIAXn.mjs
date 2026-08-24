import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { c as seedSurplus, l as seedTransactions, n as computePriorityScore, o as mockVerifyAmount, s as seedRequirements, t as authMiddleware, u as seedUsers } from "./seed-o426wP7e.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-ChZJ2784.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-D_t2131g.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatNumber(n) {
	return new Intl.NumberFormat("en-IN").format(n);
}
function formatWhen(iso) {
	const d = new Date(iso);
	const diff = Date.now() - d.getTime();
	const mins = Math.round(diff / 6e4);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.round(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.round(hours / 24);
	if (days < 7) return `${days}d ago`;
	return d.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatStamp(iso) {
	return new Date(iso).toLocaleString("en-IN", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
var selectClass = "h-[var(--control-h)] w-full rounded-lg bg-bg px-3 text-sm text-fg shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/store-Dg_8-Izu.js
var RESOURCE_LABEL = {
	food: "Food",
	water: "Water",
	shelter: "Shelter",
	medical: "Medical",
	hygiene: "Hygiene",
	clothing: "Clothing"
};
var RESOURCE_UNIT = {
	food: "packets",
	water: "litres",
	shelter: "tents",
	medical: "kits",
	hygiene: "kits",
	clothing: "blankets"
};
var PRIORITY_ORDER = {
	critical: 0,
	high: 1,
	moderate: 2,
	low: 3
};
var STAGE_ORDER = [
	"pending",
	"donated",
	"received_by_coordinator",
	"in_transit",
	"delivered",
	"confirmed"
];
var STAGE_LABEL = {
	pending: "Pending",
	donated: "Donated",
	received_by_coordinator: "Received by Coordinator",
	in_transit: "In Transit",
	delivered: "Delivered",
	confirmed: "Confirmed"
};
function nextStage(stage) {
	const i = STAGE_ORDER.indexOf(stage);
	if (i < 0 || i >= STAGE_ORDER.length - 1) return null;
	return STAGE_ORDER[i + 1] ?? null;
}
var ROLE_LABEL = {
	donor: "Donor",
	receiver: "Receiver",
	coordinator: "Coordinator"
};
var PROOF_LABEL = {
	receipt: "Receipt",
	invoice: "Invoice",
	delivery_bill: "Delivery bill",
	distribution_record: "Distribution record"
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchReliefData = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ccf41574ad77e9c2123ac11a4f81b6bc532d2c455d7e0c7f49056828496d3357"));
var dbSignup = createServerFn({ method: "POST" }).validator((u) => u).middleware([authMiddleware]).handler(createSsrRpc("7c2fe20d684d7721e0ba1ae67947c4be818bb6514030111e6289c825fbbcd735"));
var dbPostRequirement = createServerFn({ method: "POST" }).validator((r) => r).middleware([authMiddleware]).handler(createSsrRpc("d63e5d478844a54436417a88533307d056a8803553248d4d269884d064445f28"));
var dbPostSurplus = createServerFn({ method: "POST" }).validator((s) => s).middleware([authMiddleware]).handler(createSsrRpc("fda674c299e9ba9c2f745e73b6733f530405b74cdb86a8796d2016ede1ecc5d1"));
var dbSaveTransaction = createServerFn({ method: "POST" }).validator((data) => data).middleware([authMiddleware]).handler(createSsrRpc("d312aa074e77191567d473556e3cee89824692922619b0dc39a8bd9a8f26af72"));
var dbResetDemo = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("32acf49916632c960adf2a0878f0a8880374683b1eff56d33df4202e968932a5"));
function refreshRequirementStatus(r) {
	const status = r.quantityNeeded - r.quantityFulfilled <= 0 ? "fulfilled" : r.quantityFulfilled > 0 ? "partial" : "open";
	const scored = computePriorityScore({
		peopleAffected: r.peopleAffected,
		quantityRequired: r.quantityNeeded,
		quantityFulfilled: r.quantityFulfilled,
		durationDays: r.durationDays,
		urgency: r.urgency
	});
	return {
		...r,
		status,
		priority: scored.priority,
		priorityScore: scored.score,
		scoreBreakdown: scored.breakdown
	};
}
function applyProofs(tx, proofs) {
	const amounts = proofs.map((p) => p.amountEntered).filter((n) => n > 0);
	let disputed = false;
	let disputeReason;
	if (amounts.length >= 2) {
		const min = Math.min(...amounts);
		const max = Math.max(...amounts);
		if (max - min > Math.max(tx.declaredAmount, 1) * .08) {
			disputed = true;
			disputeReason = `Entered quantities do not match (${min} vs ${max}). Auto-flagged for review.`;
		}
	}
	if (proofs.some((p) => p.verification === "mismatch_flagged")) {
		disputed = true;
		disputeReason = disputeReason ?? "AI/OCR verification flagged a mismatch against the declared quantity.";
	}
	return {
		...tx,
		proofs,
		disputed,
		disputeReason
	};
}
var useReliefStore = create()(persist((set, get) => ({
	_hydrated: false,
	currentUser: null,
	fieldMode: false,
	users: seedUsers,
	requirements: seedRequirements,
	surplus: seedSurplus,
	transactions: seedTransactions,
	setHydrated: () => set({ _hydrated: true }),
	toggleFieldMode: () => set((s) => ({ fieldMode: !s.fieldMode })),
	loginAs: (userId) => {
		const user = get().users.find((u) => u.id === userId);
		if (user) set({ currentUser: user });
	},
	syncFromDb: async () => {
		try {
			const data = await fetchReliefData();
			set({
				users: data.users,
				requirements: data.requirements,
				surplus: data.surplus,
				transactions: data.transactions
			});
		} catch (err) {
			if (err?.message === "Unauthorized" || err?.status === 401) console.log("Database sync deferred: user not logged in.");
			else console.error("Failed to sync from database:", err);
		}
	},
	signup: (input, forcedId) => {
		const user = {
			id: forcedId || uid("u"),
			name: input.name.trim(),
			role: input.role,
			orgName: input.orgName?.trim() || void 0,
			location: input.location?.trim() || void 0,
			region: input.region?.trim() || void 0,
			contributionType: input.contributionType
		};
		set((s) => ({
			users: [...s.users, user],
			currentUser: user
		}));
		dbSignup({ data: user }).catch((err) => console.error("[db] signup sync failed:", err));
		return user;
	},
	logout: () => set({ currentUser: null }),
	resetDemo: () => {
		set({
			currentUser: null,
			users: seedUsers,
			requirements: seedRequirements,
			surplus: seedSurplus,
			transactions: seedTransactions
		});
		dbResetDemo().catch((err) => console.error("[db] reset demo sync failed:", err));
	},
	postRequirement: (input) => {
		const user = get().currentUser;
		if (!user || user.role !== "receiver") throw new Error("Only receivers can post requirements.");
		const scored = computePriorityScore({
			peopleAffected: input.peopleAffected,
			quantityRequired: input.quantityNeeded,
			quantityFulfilled: 0,
			durationDays: input.durationDays,
			urgency: input.urgency
		});
		const campName = user.orgName || user.name;
		const existing = get().requirements.find((r) => r.receiverId === user.id);
		const item = {
			id: uid("req"),
			title: input.title.trim(),
			campName,
			receiverId: user.id,
			resourceType: input.resourceType,
			quantityNeeded: input.quantityNeeded,
			quantityUnit: RESOURCE_UNIT[input.resourceType],
			quantityFulfilled: 0,
			peopleAffected: input.peopleAffected,
			durationDays: input.durationDays,
			urgency: input.urgency,
			location: user.location || "Unspecified",
			mapX: existing?.mapX ?? 50 + Math.random() * 20,
			mapY: existing?.mapY ?? 40 + Math.random() * 20,
			notes: input.notes.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "open",
			priority: scored.priority,
			priorityScore: scored.score,
			scoreBreakdown: scored.breakdown
		};
		set((s) => ({ requirements: [item, ...s.requirements] }));
		dbPostRequirement({ data: item }).catch((err) => console.error("[db] postRequirement sync failed:", err));
		return item;
	},
	postSurplus: (input) => {
		const user = get().currentUser;
		if (!user || user.role !== "receiver") throw new Error("Only receivers can post surplus.");
		const existing = get().requirements.find((r) => r.receiverId === user.id);
		const item = {
			id: uid("sur"),
			campName: user.orgName || user.name,
			receiverId: user.id,
			resourceType: input.resourceType,
			quantity: input.quantity,
			quantityUnit: RESOURCE_UNIT[input.resourceType],
			location: user.location || "Unspecified",
			mapX: existing?.mapX ?? 50,
			mapY: existing?.mapY ?? 50,
			notes: input.notes.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "available"
		};
		set((s) => ({ surplus: [item, ...s.surplus] }));
		dbPostSurplus({ data: item }).catch((err) => console.error("[db] postSurplus sync failed:", err));
		return item;
	},
	contribute: (requirementId, quantity, notes) => {
		const user = get().currentUser;
		if (!user || user.role !== "donor") throw new Error("Only donors can contribute.");
		const req = get().requirements.find((r) => r.id === requirementId);
		if (!req) throw new Error("Requirement not found.");
		const remaining = Math.max(0, req.quantityNeeded - req.quantityFulfilled);
		const qty = Math.max(1, Math.min(quantity, remaining || quantity));
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const tx = {
			id: uid("tx"),
			kind: "donation",
			requirementId: req.id,
			donorId: user.id,
			donorName: user.name,
			receiverId: req.receiverId,
			receiverName: get().users.find((u) => u.id === req.receiverId)?.name ?? req.campName,
			campName: req.campName,
			resourceType: req.resourceType,
			quantity: qty,
			quantityUnit: req.quantityUnit,
			declaredAmount: qty,
			stage: "donated",
			stageHistory: [{
				stage: "pending",
				at: now,
				by: user.name
			}, {
				stage: "donated",
				at: now,
				by: user.name
			}],
			proofs: [],
			disputed: false,
			createdAt: now,
			notes: notes.trim() || void 0
		};
		const updatedReq = refreshRequirementStatus({
			...req,
			quantityFulfilled: req.quantityFulfilled + qty
		});
		set((s) => ({
			transactions: [tx, ...s.transactions],
			requirements: s.requirements.map((r) => r.id === req.id ? updatedReq : r)
		}));
		dbSaveTransaction({ data: {
			tx,
			requirement: updatedReq
		} }).catch((err) => console.error("[db] contribute sync failed:", err));
		return tx;
	},
	advanceStage: (txId) => {
		const user = get().currentUser;
		if (!user) return;
		let updatedTx;
		set((s) => ({ transactions: s.transactions.map((tx) => {
			if (tx.id !== txId) return tx;
			const nxt = nextStage(tx.stage);
			if (!nxt) return tx;
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const patch = {
				stage: nxt,
				stageHistory: [...tx.stageHistory, {
					stage: nxt,
					at: now,
					by: user.name
				}]
			};
			if (user.role === "coordinator" && (nxt === "received_by_coordinator" || nxt === "in_transit")) {
				patch.coordinatorId = user.id;
				patch.coordinatorName = user.name;
			}
			updatedTx = {
				...tx,
				...patch
			};
			return updatedTx;
		}) }));
		if (updatedTx) dbSaveTransaction({ data: { tx: updatedTx } }).catch((err) => console.error("[db] advanceStage sync failed:", err));
	},
	uploadProof: ({ txId, kind, fileName, dataUrl, mimeType, amountEntered }) => {
		const user = get().currentUser;
		if (!user) return;
		let updatedTx;
		set((s) => ({ transactions: s.transactions.map((tx) => {
			if (tx.id !== txId) return tx;
			const verification = mockVerifyAmount(amountEntered, tx.declaredAmount);
			const proof = {
				id: uid("pf"),
				uploadedBy: user.role,
				uploaderName: user.name,
				kind,
				fileName,
				dataUrl,
				mimeType,
				amountEntered,
				uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
				verification
			};
			updatedTx = applyProofs(tx, [...tx.proofs, proof]);
			return updatedTx;
		}) }));
		if (updatedTx) dbSaveTransaction({ data: { tx: updatedTx } }).catch((err) => console.error("[db] uploadProof sync failed:", err));
	},
	matchSurplus: (surplusId, requirementId) => {
		const user = get().currentUser;
		if (!user || user.role !== "coordinator") return null;
		const sur = get().surplus.find((x) => x.id === surplusId);
		const req = get().requirements.find((r) => r.id === requirementId);
		if (!sur || !req || sur.status !== "available") return null;
		const remaining = Math.max(0, req.quantityNeeded - req.quantityFulfilled);
		const qty = Math.max(1, Math.min(sur.quantity, remaining || sur.quantity));
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const tx = {
			id: uid("tx"),
			kind: "redistribution",
			requirementId: req.id,
			donorId: sur.receiverId,
			donorName: sur.campName,
			coordinatorId: user.id,
			coordinatorName: user.name,
			receiverId: req.receiverId,
			receiverName: get().users.find((u) => u.id === req.receiverId)?.name ?? req.campName,
			campName: req.campName,
			resourceType: sur.resourceType,
			quantity: qty,
			quantityUnit: sur.quantityUnit,
			declaredAmount: qty,
			stage: "received_by_coordinator",
			stageHistory: [
				{
					stage: "pending",
					at: now,
					by: user.name
				},
				{
					stage: "donated",
					at: now,
					by: sur.campName
				},
				{
					stage: "received_by_coordinator",
					at: now,
					by: user.name
				}
			],
			proofs: [],
			disputed: false,
			createdAt: now,
			notes: `Matched surplus from ${sur.campName} to ${req.campName}.`
		};
		const updatedSur = {
			...sur,
			status: "matched",
			matchedToRequirementId: req.id,
			quantity: Math.max(0, sur.quantity - qty)
		};
		const updatedReq = refreshRequirementStatus({
			...req,
			quantityFulfilled: req.quantityFulfilled + qty
		});
		set((s) => ({
			transactions: [tx, ...s.transactions],
			surplus: s.surplus.map((x) => x.id === surplusId ? updatedSur : x),
			requirements: s.requirements.map((r) => r.id === req.id ? updatedReq : r)
		}));
		dbSaveTransaction({ data: {
			tx,
			requirement: updatedReq,
			surplus: updatedSur
		} }).catch((err) => console.error("[db] matchSurplus sync failed:", err));
		return tx;
	},
	resolveDispute: (txId) => {
		const user = get().currentUser;
		if (!user || user.role !== "coordinator") return;
		let updatedTx;
		set((s) => ({ transactions: s.transactions.map((tx) => {
			if (tx.id !== txId) return tx;
			updatedTx = {
				...tx,
				disputed: false,
				disputeReason: void 0,
				proofs: tx.proofs.map((p) => p.verification === "mismatch_flagged" ? {
					...p,
					verification: "verified"
				} : p)
			};
			return updatedTx;
		}) }));
		if (updatedTx) dbSaveTransaction({ data: { tx: updatedTx } }).catch((err) => console.error("[db] resolveDispute sync failed:", err));
	}
}), {
	name: "relietnet-v2",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({
		currentUser: s.currentUser,
		fieldMode: s.fieldMode,
		users: s.users,
		requirements: s.requirements,
		surplus: s.surplus,
		transactions: s.transactions
	})
}));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-ClfUIAXn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-critical",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold tracking-tight",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function StoreHydration() {
	const fieldMode = useReliefStore((s) => s.fieldMode);
	const setHydrated = useReliefStore((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		const unsub = useReliefStore.persist.onFinishHydration(() => {
			setHydrated();
			useReliefStore.getState().syncFromDb();
		});
		useReliefStore.persist.rehydrate();
		if (useReliefStore.persist.hasHydrated()) {
			setHydrated();
			useReliefStore.getState().syncFromDb();
		}
		return unsub;
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.mode = fieldMode ? "field" : "default";
		const meta = document.querySelector("meta[name=\"theme-color\"]");
		if (meta) meta.setAttribute("content", fieldMode ? "#0C0C0B" : "#F3F1EC");
	}, [fieldMode]);
	return null;
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "grid size-10 grid-cols-2 gap-1",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-accent" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs font-semibold tracking-[0.2em]",
			children: "RELIETNET"
		})]
	});
}
var styles_default = "/assets/styles-DfP7bc7Q.css";
var APP_NAME = "RelietNet";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Disaster-relief coordination for donors, receivers, and coordinators. Every transfer auditable."
			},
			{
				name: "theme-color",
				content: "#F3F1EC"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreHydration, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-center",
					toastOptions: { className: "font-sans !bg-surface !text-fg !border-border" }
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$11 = () => import("./routes-gT-CPakY.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./route-eG_gJTST.mjs");
var Route$11 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./login-D5Opypf0.mjs");
var Route$10 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./audit-Bx2aOgIB.mjs");
var Route$9 = createFileRoute("/_app/audit")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./dashboard-h8SJq_kx.mjs");
var Route$8 = createFileRoute("/_app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./feed-pcgCDe5-.mjs");
var Route$7 = createFileRoute("/_app/feed")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./map-C_RjdRzR.mjs");
var Route$6 = createFileRoute("/_app/map")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./post-BLAAXKiy.mjs");
var Route$5 = createFileRoute("/_app/post")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./surplus-BFl830bF.mjs");
var Route$4 = createFileRoute("/_app/surplus")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./transactions-Bf23cC5n.mjs");
var Route$3 = createFileRoute("/_app/transactions")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./feed._id-3NtqWK4-.mjs");
var Route$2 = createFileRoute("/_app/feed/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./transactions._id-saEyBiDr.mjs");
var Route$1 = createFileRoute("/_app/transactions/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AppRouteRoute = Route$11.update({
	id: "/_app",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var AppAuditRoute = Route$9.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AppRouteRoute
});
var AppDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRouteRoute
});
var AppFeedRoute = Route$7.update({
	id: "/feed",
	path: "/feed",
	getParentRoute: () => AppRouteRoute
});
var AppMapRoute = Route$6.update({
	id: "/map",
	path: "/map",
	getParentRoute: () => AppRouteRoute
});
var AppPostRoute = Route$5.update({
	id: "/post",
	path: "/post",
	getParentRoute: () => AppRouteRoute
});
var AppSurplusRoute = Route$4.update({
	id: "/surplus",
	path: "/surplus",
	getParentRoute: () => AppRouteRoute
});
var AppTransactionsRoute = Route$3.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => AppRouteRoute
});
var AppFeedIdRoute = Route$2.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppFeedRoute
});
var AppTransactionsIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppTransactionsRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$13
});
var AppFeedRouteChildren = { AppFeedIdRoute };
var AppFeedRouteWithChildren = AppFeedRoute._addFileChildren(AppFeedRouteChildren);
var AppTransactionsRouteChildren = { AppTransactionsIdRoute };
var AppRouteRouteChildren = {
	AppAuditRoute,
	AppDashboardRoute,
	AppFeedRoute: AppFeedRouteWithChildren,
	AppMapRoute,
	AppPostRoute,
	AppSurplusRoute,
	AppTransactionsRoute: AppTransactionsRoute._addFileChildren(AppTransactionsRouteChildren)
};
var rootRouteChildren = {
	IndexRoute,
	AppRouteRoute: AppRouteRoute._addFileChildren(AppRouteRouteChildren),
	LoginRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { formatWhen as _, PRIORITY_ORDER as a, RESOURCE_UNIT as c, STAGE_ORDER as d, nextStage as f, formatStamp as g, formatNumber as h, Splash as i, ROLE_LABEL as l, cn as m, Route$1 as n, PROOF_LABEL as o, useReliefStore as p, Route$2 as r, RESOURCE_LABEL as s, router_exports as t, STAGE_LABEL as u, selectClass as v };
