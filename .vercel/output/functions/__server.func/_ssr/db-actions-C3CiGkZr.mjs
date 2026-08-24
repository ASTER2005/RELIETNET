import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as getSql, c as seedSurplus, l as seedTransactions, s as seedRequirements, t as authMiddleware, u as seedUsers } from "./seed-o426wP7e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-actions-C3CiGkZr.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function seedDatabase(sql) {
	console.log("[db] Seeding database with initial relief data...");
	for (const u of seedUsers) await sql`
      INSERT INTO users (id, name, role, org_name, location, region, contribution_type)
      VALUES (${u.id}, ${u.name}, ${u.role}, ${u.orgName ?? null}, ${u.location ?? null}, ${u.region ?? null}, ${u.contributionType ?? null})
    `;
	for (const r of seedRequirements) await sql`
      INSERT INTO requirements (
        id, title, camp_name, receiver_id, resource_type, quantity_needed, quantity_fulfilled, 
        quantity_unit, people_affected, duration_days, urgency, location, map_x, map_y, notes, 
        created_at, status, priority, priority_score, score_breakdown
      )
      VALUES (
        ${r.id}, ${r.title}, ${r.campName}, ${r.receiverId}, ${r.resourceType}, ${r.quantityNeeded}, 
        ${r.quantityFulfilled}, ${r.quantityUnit}, ${r.peopleAffected}, ${r.durationDays}, ${r.urgency}, 
        ${r.location}, ${r.mapX}, ${r.mapY}, ${r.notes}, ${r.createdAt}, ${r.status}, ${r.priority}, 
        ${r.priorityScore}, ${JSON.stringify(r.scoreBreakdown)}
      )
    `;
	for (const s of seedSurplus) await sql`
      INSERT INTO surplus (id, camp_name, receiver_id, resource_type, quantity, quantity_unit, location, map_x, map_y, notes, created_at, matched_to_requirement_id, status)
      VALUES (${s.id}, ${s.campName}, ${s.receiverId}, ${s.resourceType}, ${s.quantity}, ${s.quantityUnit}, ${s.location}, ${s.mapX}, ${s.mapY}, ${s.notes}, ${s.createdAt}, ${s.matchedToRequirementId ?? null}, ${s.status})
    `;
	for (const t of seedTransactions) await sql`
      INSERT INTO transactions (
        id, kind, requirement_id, donor_id, donor_name, coordinator_id, coordinator_name, 
        receiver_id, receiver_name, camp_name, resource_type, quantity, quantity_unit, 
        declared_amount, stage, stage_history, proofs, disputed, dispute_reason, created_at, notes
      )
      VALUES (
        ${t.id}, ${t.kind}, ${t.requirementId}, ${t.donorId}, ${t.donorName}, ${t.coordinatorId ?? null}, 
        ${t.coordinatorName ?? null}, ${t.receiverId}, ${t.receiverName}, ${t.campName}, ${t.resourceType}, 
        ${t.quantity}, ${t.quantityUnit}, ${t.declaredAmount}, ${t.stage}, ${JSON.stringify(t.stageHistory)}, 
        ${JSON.stringify(t.proofs)}, ${t.disputed}, ${t.disputeReason ?? null}, ${t.createdAt}, ${t.notes ?? null}
      )
    `;
}
var fetchReliefData_createServerFn_handler = createServerRpc({
	id: "ccf41574ad77e9c2123ac11a4f81b6bc532d2c455d7e0c7f49056828496d3357",
	name: "fetchReliefData",
	filename: "src/lib/db-actions.ts"
}, (opts) => fetchReliefData.__executeServer(opts));
var fetchReliefData = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(fetchReliefData_createServerFn_handler, async () => {
	const sql = await getSql();
	if ((await sql`SELECT COUNT(*)::integer as count FROM users`)[0]?.count === 0) await seedDatabase(sql);
	const users = await sql`SELECT * FROM users`;
	const requirementsRaw = await sql`SELECT * FROM requirements`;
	const surplusRaw = await sql`SELECT * FROM surplus`;
	const transactionsRaw = await sql`SELECT * FROM transactions`;
	return {
		users,
		requirements: requirementsRaw.map((r) => ({
			...r,
			scoreBreakdown: typeof r.score_breakdown === "string" ? JSON.parse(r.score_breakdown) : r.score_breakdown,
			campName: r.camp_name,
			receiverId: r.receiver_id,
			resourceType: r.resource_type,
			quantityNeeded: r.quantity_needed,
			quantityUnit: r.quantity_unit,
			quantityFulfilled: r.quantity_fulfilled,
			peopleAffected: r.people_affected,
			durationDays: r.duration_days,
			mapX: r.map_x,
			mapY: r.map_y,
			createdAt: r.created_at,
			priorityScore: r.priority_score
		})),
		surplus: surplusRaw.map((s) => ({
			...s,
			campName: s.camp_name,
			receiverId: s.receiver_id,
			resourceType: s.resource_type,
			quantityUnit: s.quantity_unit,
			mapX: s.map_x,
			mapY: s.map_y,
			createdAt: s.created_at,
			matchedToRequirementId: s.matched_to_requirement_id
		})),
		transactions: transactionsRaw.map((t) => ({
			...t,
			stageHistory: typeof t.stage_history === "string" ? JSON.parse(t.stage_history) : t.stage_history,
			proofs: typeof t.proofs === "string" ? JSON.parse(t.proofs) : t.proofs,
			requirementId: t.requirement_id,
			donorId: t.donor_id,
			donorName: t.donor_name,
			coordinatorId: t.coordinator_id,
			coordinatorName: t.coordinator_name,
			receiverId: t.receiver_id,
			receiverName: t.receiver_name,
			campName: t.camp_name,
			resourceType: t.resource_type,
			quantityUnit: t.quantity_unit,
			declaredAmount: t.declared_amount,
			disputeReason: t.dispute_reason,
			createdAt: t.created_at
		}))
	};
});
var dbSignup_createServerFn_handler = createServerRpc({
	id: "7c2fe20d684d7721e0ba1ae67947c4be818bb6514030111e6289c825fbbcd735",
	name: "dbSignup",
	filename: "src/lib/db-actions.ts"
}, (opts) => dbSignup.__executeServer(opts));
var dbSignup = createServerFn({ method: "POST" }).validator((u) => u).middleware([authMiddleware]).handler(dbSignup_createServerFn_handler, async ({ data: u, context }) => {
	if (u.id !== context.userId) throw new Error("Unauthorized profile creation");
	await (await getSql())`
      INSERT INTO users (id, name, role, org_name, location, region, contribution_type)
      VALUES (${u.id}, ${u.name}, ${u.role}, ${u.orgName ?? null}, ${u.location ?? null}, ${u.region ?? null}, ${u.contributionType ?? null})
    `;
	return { ok: true };
});
var dbPostRequirement_createServerFn_handler = createServerRpc({
	id: "d63e5d478844a54436417a88533307d056a8803553248d4d269884d064445f28",
	name: "dbPostRequirement",
	filename: "src/lib/db-actions.ts"
}, (opts) => dbPostRequirement.__executeServer(opts));
var dbPostRequirement = createServerFn({ method: "POST" }).validator((r) => r).middleware([authMiddleware]).handler(dbPostRequirement_createServerFn_handler, async ({ data: r, context }) => {
	if (r.receiverId !== context.userId) throw new Error("Unauthorized requirement creation");
	await (await getSql())`
      INSERT INTO requirements (
        id, title, camp_name, receiver_id, resource_type, quantity_needed, quantity_fulfilled, 
        quantity_unit, people_affected, duration_days, urgency, location, map_x, map_y, notes, 
        created_at, status, priority, priority_score, score_breakdown
      )
      VALUES (
        ${r.id}, ${r.title}, ${r.campName}, ${r.receiverId}, ${r.resourceType}, ${r.quantityNeeded}, 
        ${r.quantityFulfilled}, ${r.quantityUnit}, ${r.peopleAffected}, ${r.durationDays}, ${r.urgency}, 
        ${r.location}, ${r.mapX}, ${r.mapY}, ${r.notes}, ${r.createdAt}, ${r.status}, ${r.priority}, 
        ${r.priorityScore}, ${JSON.stringify(r.scoreBreakdown)}
      )
    `;
	return { ok: true };
});
var dbPostSurplus_createServerFn_handler = createServerRpc({
	id: "fda674c299e9ba9c2f745e73b6733f530405b74cdb86a8796d2016ede1ecc5d1",
	name: "dbPostSurplus",
	filename: "src/lib/db-actions.ts"
}, (opts) => dbPostSurplus.__executeServer(opts));
var dbPostSurplus = createServerFn({ method: "POST" }).validator((s) => s).middleware([authMiddleware]).handler(dbPostSurplus_createServerFn_handler, async ({ data: s, context }) => {
	if (s.receiverId !== context.userId) throw new Error("Unauthorized surplus creation");
	await (await getSql())`
      INSERT INTO surplus (id, camp_name, receiver_id, resource_type, quantity, quantity_unit, location, map_x, map_y, notes, created_at, matched_to_requirement_id, status)
      VALUES (${s.id}, ${s.campName}, ${s.receiverId}, ${s.resourceType}, ${s.quantity}, ${s.quantityUnit}, ${s.location}, ${s.mapX}, ${s.mapY}, ${s.notes}, ${s.createdAt}, ${s.matchedToRequirementId ?? null}, ${s.status})
    `;
	return { ok: true };
});
var dbSaveTransaction_createServerFn_handler = createServerRpc({
	id: "d312aa074e77191567d473556e3cee89824692922619b0dc39a8bd9a8f26af72",
	name: "dbSaveTransaction",
	filename: "src/lib/db-actions.ts"
}, (opts) => dbSaveTransaction.__executeServer(opts));
var dbSaveTransaction = createServerFn({ method: "POST" }).validator((data) => data).middleware([authMiddleware]).handler(dbSaveTransaction_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const t = data.tx;
	await sql`
      INSERT INTO transactions (
        id, kind, requirement_id, donor_id, donor_name, coordinator_id, coordinator_name, 
        receiver_id, receiver_name, camp_name, resource_type, quantity, quantity_unit, 
        declared_amount, stage, stage_history, proofs, disputed, dispute_reason, created_at, notes
      )
      VALUES (
        ${t.id}, ${t.kind}, ${t.requirementId}, ${t.donorId}, ${t.donorName}, ${t.coordinatorId ?? null}, 
        ${t.coordinatorName ?? null}, ${t.receiverId}, ${t.receiverName}, ${t.campName}, ${t.resourceType}, 
        ${t.quantity}, ${t.quantityUnit}, ${t.declaredAmount}, ${t.stage}, ${JSON.stringify(t.stageHistory)}, 
        ${JSON.stringify(t.proofs)}, ${t.disputed}, ${t.disputeReason ?? null}, ${t.createdAt}, ${t.notes ?? null}
      )
      ON CONFLICT (id) DO UPDATE SET
        coordinator_id = EXCLUDED.coordinator_id,
        coordinator_name = EXCLUDED.coordinator_name,
        stage = EXCLUDED.stage,
        stage_history = EXCLUDED.stage_history,
        proofs = EXCLUDED.proofs,
        disputed = EXCLUDED.disputed,
        dispute_reason = EXCLUDED.dispute_reason,
        notes = EXCLUDED.notes
    `;
	if (data.requirement) {
		const r = data.requirement;
		await sql`
        UPDATE requirements SET
          quantity_fulfilled = ${r.quantityFulfilled},
          status = ${r.status},
          priority = ${r.priority},
          priority_score = ${r.priorityScore},
          score_breakdown = ${JSON.stringify(r.scoreBreakdown)}
        WHERE id = ${r.id}
      `;
	}
	if (data.surplus) {
		const s = data.surplus;
		await sql`
        UPDATE surplus SET
          status = ${s.status},
          quantity = ${s.quantity},
          matched_to_requirement_id = ${s.matchedToRequirementId ?? null}
        WHERE id = ${s.id}
      `;
	}
	return { ok: true };
});
var dbResetDemo_createServerFn_handler = createServerRpc({
	id: "32acf49916632c960adf2a0878f0a8880374683b1eff56d33df4202e968932a5",
	name: "dbResetDemo",
	filename: "src/lib/db-actions.ts"
}, (opts) => dbResetDemo.__executeServer(opts));
var dbResetDemo = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(dbResetDemo_createServerFn_handler, async () => {
	const sql = await getSql();
	await sql`TRUNCATE TABLE users, requirements, surplus, transactions RESTART IDENTITY CASCADE`;
	await seedDatabase(sql);
	return { ok: true };
});
//#endregion
export { dbPostRequirement_createServerFn_handler, dbPostSurplus_createServerFn_handler, dbResetDemo_createServerFn_handler, dbSaveTransaction_createServerFn_handler, dbSignup_createServerFn_handler, fetchReliefData_createServerFn_handler };
