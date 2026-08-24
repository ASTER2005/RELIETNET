import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ArrowRight, f as Mail, h as LoaderCircle, m as Lock, n as User } from "../_libs/lucide-react.mjs";
import { t as GROK_PROVIDERS } from "./server-ChZJ2784.mjs";
import { r as signIn, t as authClient } from "./client-KRVwBcS2.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useCurrentUserState } from "./use-current-user-Bi-OxCGF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D5Opypf0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "grid size-10 grid-cols-2 gap-1 animate-pulse",
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
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		if (!email.trim() || !password.trim()) {
			toast.error("Please enter both email and password.");
			return;
		}
		if (isSignUp && !name.trim()) {
			toast.error("Please enter your name.");
			return;
		}
		setLoading(true);
		try {
			if (isSignUp) {
				const { error } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim()
				});
				if (error) toast.error(error.message || "Failed to create account.");
				else {
					toast.success("Account created successfully!");
					navigate({ to: "/" });
				}
			} else {
				const { error } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (error) toast.error(error.message || "Invalid email or password.");
				else {
					toast.success("Signed in successfully!");
					navigate({ to: "/" });
				}
			}
		} catch (err) {
			toast.error(err?.message || "An unexpected error occurred.");
		} finally {
			setLoading(false);
		}
	};
	const handleOAuth = async (providerId) => {
		try {
			await signIn(providerId, { callbackURL: "/" });
		} catch (err) {
			toast.error(err?.message || "Sign-in failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg flex flex-col justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 bg-accent w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "mx-auto w-full max-w-6xl px-[var(--space-page)] py-4 flex justify-between items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "grid size-6 grid-cols-2 gap-0.5",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-accent" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-[0.14em]",
						children: "RELIETNET"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-md px-6 py-12 flex-grow flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight",
								children: isSignUp ? "Create your account" : "Welcome back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-1",
								children: isSignUp ? "Join the coordinated disaster relief ledger." : "Sign in to coordinate disaster relief resources."
							})]
						}),
						GROK_PROVIDERS.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 mb-6",
							children: [GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => handleOAuth(p.providerId),
								className: "w-full flex justify-center items-center gap-2 cursor-pointer",
								children: ["Continue with ", p.label]
							}, p.providerId)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative my-4 flex items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-4 text-xs text-muted font-medium uppercase tracking-wider",
										children: "Or email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleEmailSubmit,
							className: "space-y-4",
							children: [
								isSignUp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "signup-name",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center text-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "signup-name",
											type: "text",
											value: name,
											onChange: (e) => setName(e.target.value),
											placeholder: "Your name",
											className: "pl-9",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "login-email",
										children: "Email Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center text-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "login-email",
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "name@example.com",
											className: "pl-9",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "login-password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center text-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "login-password",
											type: "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "••••••••",
											className: "pl-9",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "primary",
									className: "w-full flex justify-center items-center gap-2 cursor-pointer mt-6",
									disabled: loading,
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isSignUp ? "Create Account" : "Sign In", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mt-6 pt-4 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsSignUp(!isSignUp),
								className: "text-xs text-accent hover:underline font-medium cursor-pointer",
								children: isSignUp ? "Already have an account? Sign In" : "Don't have an account yet? Create one"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "py-6 text-center text-xs text-subtle",
				children: [
					"ReliefNet © ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" · Ledger coordinates verified."
				]
			})
		]
	});
}
//#endregion
export { Login as component };
