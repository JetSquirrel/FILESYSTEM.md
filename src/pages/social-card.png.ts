import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site.config";
import satori from "satori";
import { html } from "satori-html";
import fs from "node:fs";
import path from "node:path";

export const prerender = true;

const fontBold = fs.readFileSync(path.resolve("public/fonts/atkinson-bold.woff"));
const fontRegular = fs.readFileSync(path.resolve("public/fonts/atkinson-regular.woff"));

export async function GET() {
	const markup = html`<div
		style="display:flex; flex-direction:column; width:1200px; height:630px; background:#1d1f21; padding:72px; box-sizing:border-box; position:relative; font-family:Atkinson; justify-content:center;"
	>
		<div
			style="position:absolute; top:0; left:0; right:0; height:6px; background:#2bbc8a; display:flex;"
		></div>
		<div
			style="position:absolute; bottom:0; left:0; right:0; height:1px; background:#2bbc8a; display:flex; opacity:0.3;"
		></div>

		<div style="display:flex; flex-direction:column; gap:28px;">
			<div
				style="font-size:88px; font-weight:700; color:#2bbc8a; letter-spacing:-3px; line-height:1; display:flex;"
			>
				FILESYSTEM.md
			</div>
			<div style="font-size:34px; color:#ffffff; line-height:1.3; max-width:820px; display:flex;">
				Agent-Native Filesystem Standard
			</div>
			<div style="font-size:22px; color:#6a6a6a; line-height:1.4; max-width:900px; display:flex;">
				${siteConfig.description}
			</div>
		</div>

		<div style="position:absolute; bottom:72px; right:72px; display:flex;">
			<span style="font-size:22px; color:#2bbc8a; font-weight:700; opacity:0.8;">filesystem.md</span>
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
