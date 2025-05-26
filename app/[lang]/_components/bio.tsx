"use client";

import { m } from "motion/react";
import type { Dictionary } from "@/get-dictionaries";

export default function Bio({ dictionary }: { dictionary: Dictionary }) {
	return (
		<m.div
			id="bio"
			className="text-xs text-slate-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.5 }}
		>
			{dictionary.description}
		</m.div>
	);
}
