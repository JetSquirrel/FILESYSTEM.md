import type { FaqItem } from "@/types";

/** Extract FAQ Q&A pairs from markdown `##` sections. */
export function extractFaqItems(markdown: string): FaqItem[] {
	const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
	const sections = body.split(/\n(?=## )/).filter((s) => s.startsWith("## "));
	return sections
		.map((section) => {
			const lines = section.split("\n");
			const question = lines[0]?.replace(/^##\s+/, "").trim() ?? "";
			const answer = lines
				.slice(1)
				.join("\n")
				.trim()
				.replace(/\n{2,}/g, "\n")
				.replace(/\n/g, " ");
			return { question, answer };
		})
		.filter((item) => item.question && item.answer);
}

/** Extract HowTo step names from numbered `## N. Title` headings. */
export function extractHowToSteps(markdown: string): string[] {
	const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
	const matches = body.matchAll(/^##\s+\d+\.\s+(.+)$/gm);
	return [...matches].map((m) => m[1]?.trim() ?? "").filter(Boolean);
}
