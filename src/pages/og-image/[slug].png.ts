import { Resvg } from "@resvg/resvg-js";
import { getAllPosts } from "@/data/post";
import type { APIContext, GetStaticPaths } from "astro";
import satori from "satori";
import { html } from "satori-html";
import fs from "node:fs";
import path from "node:path";

export const prerender = true;

const fontBold = fs.readFileSync(path.resolve("public/fonts/atkinson-bold.woff"));
const fontRegular = fs.readFileSync(path.resolve("public/fonts/atkinson-regular.woff"));

function escapeHtml(str: string) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export const getStaticPaths = (async () => {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			title: post.data.title,
			description: post.data.description,
		},
	}));
}) satisfies GetStaticPaths;

export async function GET({ props }: APIContext) {
	const { title, description } = props as { title: string; description: string };

	const markup = html`<div
		style="display:flex; flex-direction:column; width:1200px; height:630px; background:#1d1f21; padding:64px; box-sizing:border-box; position:relative; font-family:Atkinson;"
	>
		<div
			style="position:absolute; top:0; left:0; right:0; height:6px; background:#2bbc8a; display:flex;"
		></div>

		<div style="display:flex; align-items:center; margin-bottom:32px;">
			<span style="font-size:22px; font-weight:700; color:#2bbc8a; letter-spacing:-0.5px;"
				>FILESYSTEM.md</span
			>
		</div>

		<div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center;">
			<div
				style="font-size:56px; font-weight:700; color:#ffffff; line-height:1.15; display:flex; flex-wrap:wrap; max-width:1000px;"
			>
				${escapeHtml(title)}
			</div>
			<div
				style="font-size:26px; color:#8a8a8a; line-height:1.5; display:flex; flex-wrap:wrap; max-width:900px;"
			>
				${escapeHtml(description)}
			</div>
		</div>

		<div style="display:flex; align-items:center; margin-top:32px;">
			<span style="font-size:20px; color:#2bbc8a; font-weight:700;">filesystem.md</span>
		</div>
	</div>`;

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: "Atkinson", data: fontRegular, weight: 400, style: "normal" },
			{ name: "Atkinson", data: fontBold, weight: 700, style: "normal" },
		],
	});

	const resvg = new Resvg(svg);
	const png = resvg.render().asPng();

	return new Response(png, {
		headers: { "Content-Type": "image/png" },
	});
}
