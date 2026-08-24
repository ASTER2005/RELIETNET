import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as Outlet, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./app-shell-DnhJ4uQV.mjs";
import { i as Splash, p as useReliefStore } from "./router-ClfUIAXn.mjs";
import { t as useCurrentUserState } from "./use-current-user-Bi-OxCGF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-eG_gJTST.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
function AuthenticatedLayout() {
	const hydrated = useReliefStore((s) => s._hydrated);
	const dbUsers = useReliefStore((s) => s.users);
	const currentUser = useReliefStore((s) => s.currentUser);
	const loginAs = useReliefStore((s) => s.loginAs);
	const { user: authUser, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		if (authUser && !isPending) {
			if (dbUsers.find((u) => u.id === authUser.id) && (!currentUser || currentUser.id !== authUser.id)) loginAs(authUser.id);
		}
	}, [
		true,
		authUser,
		isPending,
		dbUsers,
		currentUser,
		loginAs
	]);
	if (!hydrated || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!authUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!dbUsers.find((u) => u.id === authUser.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthenticatedLayout as component };
